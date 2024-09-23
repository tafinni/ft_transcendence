import * as THREE from 'three'
import gsap from 'gsap'

import * as t from './game.defs.js'
import { switchToIdle, sendResults, sendTourneyResults } from './game.js'

const plate = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.01, 4),
    new THREE.MeshBasicMaterial()
)
plate.name = "plate"
plate.material.color = new THREE.Color('grey')
plate.material.transparent = true
plate.material.opacity = 0.25
plate.position.set(0, 0.005, 0)
const left = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.2, 0.2),
    new THREE.MeshBasicMaterial()
)
left.name = "left"
left.material.color = new THREE.Color('yellow')
left.position.set(0, 0.1, 2.1)
const right = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.2, 0.2),
    new THREE.MeshBasicMaterial()
)
right.name = "right"
right.material.color = new THREE.Color('purple')
right.position.set(0, 0.1, -2.1)
const top = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.125, 4),
    new THREE.MeshBasicMaterial()
)
top.name = "top"
top.material.color = new THREE.Color('darkblue')
top.position.set(-2.1, 0.0625, 0)
const bot = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.125, 4),
    new THREE.MeshBasicMaterial()
)
bot.name = "bot"
bot.material.color = new THREE.Color('darkblue')
bot.position.set(2.1, 0.0625, 0)
const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshNormalMaterial()
)
ball.name = "ball"
ball.position.set(0, 5, 0)
const score = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshBasicMaterial()
)
let ball_drop = gsap.to(ball.position, { y: 0.1, duration: 0.7, paused: true, onComplete: () => {
    v.game_running = true
}})
score.name = "score_original"
score.position.set(20, 0, 0)

export const camera = t.gcamera
export const controls = t.gcontrols
export const tick = () => {
    left.position.x = v.left_pos * c.paddle_vmax / c.paddle_max
    right.position.x = v.right_pos * c.paddle_vmax / c.paddle_max
    ball.position.z = v.ballX * c.area_vmax / c.pos_max
    ball.position.x = v.ballY * c.area_vmax / c.pos_max
}

const c = {
    area_vmax: 2,
    paddle_vmax: 1.65,
    pos_max: 1000000,
    ball_radius: 12500,
    paddle_halfwidth : 0,
    ball_max: 0,
    paddle_max: 0,
    player_speed: 12000,
    ball_speed: 8000
}
c.paddle_halfwidth = (c.area_vmax - c.paddle_vmax) * c.pos_max / c.area_vmax + (c.ball_radius * 1.5)
c.ball_max = c.pos_max - c.ball_radius
c.paddle_max = c.pos_max - c.paddle_halfwidth
Object.freeze(c)
const v = {
    matchIsTourney: false,
    left_pos: 0,
    leftName: "",
    right_pos: 0,
    rightName: "",
    up_pressed: false,
    down_pressed: false,
    up2_pressed: false,
    down2_pressed: false,
    game_started: false,
    game_running: false,
    score_to_win: 1,
    score_left: 0,
    score_right: 0,
    ballX: 0,
    ballY: 0,
    ball_direction: 0,
    ball_speed: c.ball_speed,
    bounce_distance: 0,
    ball_passed: false,
    ball_passed_timer: 0,
    gameover_timer: 0
}

function randomizeBallDir() {
    v.ball_direction = (Math.random() < 0.5) ? Math.random() * 90 + 225 : Math.random() * 90 + 45
    // set always the same direction for testing purposes
    v.ball_direction = Math.random() * 90 + 225
    v.ball_direction *= Math.PI / 180
}
randomizeBallDir()

function gametick() {
    if (!v.game_running && v.game_started) {
        if (v.score_left > v.score_to_win || v.score_right > v.score_to_win) {
            if (v.gameover_timer++ > 360)
                switchToIdle()
            return
        }
    }
    if (v.up_pressed) v.left_pos -= c.player_speed
    if (v.down_pressed) v.left_pos += c.player_speed
    if (v.left_pos > c.paddle_max) v.left_pos = c.paddle_max
    else if (v.left_pos < -c.paddle_max) v.left_pos = -c.paddle_max
    if (v.up2_pressed) v.right_pos -= c.player_speed
    if (v.down2_pressed) v.right_pos += c.player_speed
    if (v.right_pos > c.paddle_max) v.right_pos = c.paddle_max
    else if (v.right_pos < -c.paddle_max) v.right_pos = -c.paddle_max
    if (!v.game_started || !v.game_running) return
    v.ballX -= v.ball_speed * Math.sin(v.ball_direction)
    v.ballY -= v.ball_speed * Math.cos(v.ball_direction)
    if (!v.ball_passed && (v.ballX > c.ball_max || v.ballX < -c.ball_max) && checkPaddleHit()) {
        if (v.ballX > 0) {
            v.ball_direction = (Math.PI - v.ball_direction) - Math.PI
            v.ballX = c.ball_max - (v.ballX - c.ball_max)
        }
        else {
            v.ball_direction = 2 * Math.PI - v.ball_direction
            v.ballX = -c.ball_max - (v.ballX + c.ball_max)
        }
        v.ball_direction -= v.bounce_distance / c.paddle_halfwidth * Math.PI / 4
        v.ball_speed += 1000
    }
    if (!v.ball_passed && v.ballY > c.ball_max) {
        v.ball_direction = Math.PI - v.ball_direction
    } else if (!v.ball_passed && v.ballY < -c.ball_max) {
        v.ball_direction = Math.PI - v.ball_direction
    }
    if (v.ball_passed && v.ball_passed_timer++ > 200) endRound()
}
function checkPaddleHit() {
    if (v.ballX > 0 && Math.abs(v.bounce_distance = v.left_pos - v.ballY) < c.paddle_halfwidth)
        return true
    else if (v.ballX < 0 && Math.abs(v.bounce_distance = v.right_pos - v.ballY) < c.paddle_halfwidth)
        return true
    if (v.ballX > 0) addScore('right')
    else addScore('left')
    return (v.ball_passed = true, false)
}
setInterval(gametick, 1000 / 120)

function endRound() {
    v.game_running = false
    if (v.score_right > v.score_to_win || v.score_left > v.score_to_win)
        return
    randomizeBallDir()
    resetRound()
    ball_drop.restart()
}

function resetRound() {
    v.ball_passed = v.game_running = false
    v.ballX = v.ballY = v.ball_passed_timer = 0
    v.ball_speed = c.ball_speed
    ball.position.y = 5
}

function addScore(player) {
    if (player === 'left') {
        if (v.score_left === v.score_to_win) {
            if (v.matchIsTourney == false){
                console.log('victory')
                showVictory()
                return
            }
            else{
                v.score_left++
                showResult()
                return
            }
        }
        const score_clone = score.clone()
        score_clone.name = "score"
        score_clone.material = score.material.clone()
        score_clone.material.color = left.material.color.clone()
        score_clone.position.set(-1.8 + 0.25 * v.score_left, 0, 2.25)
        t.scene.add(score_clone)
        v.score_left++
    }
    else if (player === 'right') {
        if (v.score_right === v.score_to_win) {
            if (v.matchIsTourney == false){
            console.log('loss')
            showLoss()
            return
            }
            else{
                v.score_right++
                showResult()
                return
            }
        }
        const score_clone = score.clone()
        score_clone.name = "score"
        score_clone.material = score.material.clone()
        score_clone.material.color = right.material.color.clone()
        score_clone.position.set(1.8 - 0.25 * v.score_right, 0, -2.25)
        t.scene.add(score_clone)
        v.score_right++
    }
}

function showVictory() {
    t.win_text.material.color = left.material.color.clone()
    t.win_text.lookAt(t.gcamera.position)
    t.scene.add(t.win_text)
    v.score_left++
    sendResults(v.score_left, v.score_right, true, v.rightName)
}

function showLoss() {
    t.lose_text.material.color = right.material.color.clone()
    t.lose_text.lookAt(t.gcamera.position)
    t.scene.add(t.lose_text)
    v.score_right++
    sendResults(v.score_left, v.score_right, true, v.nameRight)
}

function showResult(){
    sendTourneyResults(v.score_left, v.score_right, true, v.leftName, v.rightName)
}
function resetScore() {
    v.score_left = v.score_right = 0
    t.scene.remove(t.win_text)
    t.scene.remove(t.lose_text)
    while (t.scene.getObjectByName("score"))
        t.scene.remove(t.scene.getObjectByName("score"))
}

export function startGame(isTourney, nameLeft, nameRight) {
    t.scene.add(plate, left, right, top, bot)
    t.scene.add(ball)
    document.addEventListener("keydown", onDocumentKeyDown, true);
    document.addEventListener("keyup", onDocumentKeyUp, true);
    if (!isTourney)
    {
        const playerselect = document.getElementById("playerSelectForm")
        const nameForm = document.getElementById('username');
        playerselect.style.zIndex = 100
        playerselect.addEventListener("submit", (e) => {
            let oppName = nameForm.value;
            console.log("playing against", oppName);
            if (oppName != "")
            {
                e.preventDefault()
                startSolo(0, "", oppName)
                playerselect.remove()
            }
        })
    }
    else
    {
        const beginMatch = document.getElementById('begin-tourney-match')
        beginMatch.addEventListener('click', (e) => {
            e.preventDefault
            console.log("Tournament match between", nameLeft, "and", nameRight, "started");
            startSolo(1, nameLeft, nameRight);
            beginMatch.remove();
        })
    }
}

export function cleanUp() {
    resetScore()
    resetRound()
    v.game_started = false
    document.removeEventListener("keydown", onDocumentKeyDown, true)
    document.removeEventListener("keyup", onDocumentKeyUp, true)
    t.scene.remove(plate, left, right, top, bot, ball)
}

// Key listeners
function onDocumentKeyDown(event) {
    var key_code = event.which
    if (key_code === 65) { v.up_pressed = true }
    else if (key_code === 68) { v.down_pressed = true }
    else if (key_code === 37) { v.up2_pressed = true }
    else if (key_code === 39) { v.down2_pressed = true }
    else if (key_code === 80) { v.game_running = !v.game_running }
}
function onDocumentKeyUp(event) {
    var key_code = event.which
    if (key_code === 65) { v.up_pressed = false }
    else if (key_code === 68) { v.down_pressed = false }
    else if (key_code === 37) { v.up2_pressed = false }
    else if (key_code === 39) { v.down2_pressed = false }
}
function startSolo(isTourney, nameLeft, nameRight) {
    v.game_started = true
    if (isTourney)
    {
        v.matchIsTourney = true
        v.leftName = nameLeft
        v.rightName = nameRight
    }
    else
    {   
        v.rightName = nameRight;
    }
    console.log(v)
    ball_drop.restart()
}