import * as THREE from 'three'
import gsap from 'gsap'

import * as t from './game.defs.js'
import { switchToIdle } from './game.js'

const plate = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.01, 4),
    new THREE.MeshBasicMaterial()
)
plate.name = "plate"
plate.material.color = new THREE.Color('grey')
plate.material.transparent = true
plate.material.opacity = 0.25
plate.position.set(0, 0.005, 0)
//t.scene.add(plate)
const left = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.2, 0.2),
    new THREE.MeshBasicMaterial()
)
left.name = "left"
left.material.color = new THREE.Color('yellow')
left.position.set(0, 0.1, 2.1)
//t.scene.add(left)
const right = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.2, 0.2),
    new THREE.MeshBasicMaterial()
)
right.name = "right"
right.material.color = new THREE.Color('purple')
right.position.set(0, 0.1, -2.1)
//t.scene.add(right)
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
score.name = "score_original"
score.position.set(20, 0, 0)

// cube.position.x = -1
// let movecube = gsap.to(cube.position, { x: 1, duration: 1, paused: true, overwrite: true })
// t.scene.add(cube)
// movecube.play()

// const itick = () =>
// {
//     const elapsedTime = t.clock.getElapsedTime()
//     t.camera.position.x = i.radius * Math.cos(elapsedTime);
//     t.camera.position.z = i.radius * Math.sin(elapsedTime);
//     t.camera.lookAt(t.scene.position);
    
//     t.controls.update()
//     t.renderer.render(t.scene, t.camera)
//     window.requestAnimationFrame(curtick)
// }
export const camera = t.gcamera
export const controls = t.gcontrols
export const tick = () => {
    //console.log(t.camera.x, t.camera.y, t.camera.z)
    left.position.x = left_pos * paddle_max / paddle_pos_max
    right.position.x = right_pos * paddle_max / paddle_pos_max
    ball.position.z = ballX * area_max / pos_max
    ball.position.x = ballY * area_max / pos_max
}
// let curtick = itick
// curtick()

// game logic
const area_max = 2
const paddle_max = 1.65
const pos_max = 1000000
const ball_radius = 12500
const paddle_halfwidth = (area_max - paddle_max) * pos_max / area_max + ball_radius // ball_radius simplified
const ball_max = pos_max - ball_radius
const paddle_pos_max = pos_max - paddle_halfwidth
const player_speed = 12000
let left_pos = 0
let right_pos = 0
let up_pressed = false
let down_pressed = false
let up2_pressed = false
let down2_pressed = false
let game_running = false
const score_to_win = 2
let score_left = 0
let score_right = 0
let ballX = 0
let ballY = 0
let ball_direction = 0
function randomizeBallDir() {
    ball_direction = (Math.random() < 0.5) ? Math.random() * 90 + 225 : Math.random() * 90 + 45
    // set always the same direction for testing purposes
    ball_direction = Math.random() * 90 + 225
    ball_direction *= Math.PI / 180
}
randomizeBallDir()
const ball_base_speed = 8000
let ball_speed = ball_base_speed
//let ball_dx = 0 // todo: calculate once with cos/sin instead of every tick
//let ball_dy = 0
let bounce_distance = 0
let ball_passed = false
let ball_passed_timer = 0
let gameover_timer = 0
function gametick() {
    if (!game_running) {
        if (score_left > score_to_win || score_right > score_to_win)
            if (gameover_timer++ > 360)
                switchToIdle()
        return
    }
    if (up_pressed) left_pos -= player_speed
    if (down_pressed) left_pos += player_speed
    if (left_pos > paddle_pos_max) left_pos = paddle_pos_max
    else if (left_pos < -paddle_pos_max) left_pos = -paddle_pos_max
    if (up2_pressed) right_pos -= player_speed
    if (down2_pressed) right_pos += player_speed
    if (right_pos > paddle_pos_max) right_pos = paddle_pos_max
    else if (right_pos < -paddle_pos_max) right_pos = -paddle_pos_max
    ballX -= ball_speed * Math.sin(ball_direction)
    ballY -= ball_speed * Math.cos(ball_direction)
    if (!ball_passed && (ballX > ball_max || ballX < -ball_max) && checkPaddleHit()) {
        if (ballX > 0) {
            ball_direction = (Math.PI - ball_direction) - Math.PI
            ballX = ball_max - (ballX - ball_max)
        }
        else {
            ball_direction = 2 * Math.PI - ball_direction
            ballX = -ball_max - (ballX + ball_max)
            //console.log(ballX)
        }
        ball_direction -= bounce_distance / paddle_halfwidth * Math.PI / 4
        ball_speed += 1000
        //console.log(bounce_distance)
    }
    if (!ball_passed && ballY > ball_max) {
        ball_direction = Math.PI - ball_direction
    } else if (!ball_passed && ballY < -ball_max) {
        ball_direction = Math.PI - ball_direction
    }
    if (ball_passed && ball_passed_timer++ > 180) endRound()
}
function checkPaddleHit() {
    // console.log(ballX)
    //console.log('left', Math.abs(left_pos - ballY), ' right:', Math.abs(right_pos - ballY))
    // console.log(paddle_halfwidth)
    //console.log('bY:', ballY, ' left:', left_pos, ' right:', right_pos)
    if (ballX > 0 && Math.abs(bounce_distance = left_pos - ballY) < paddle_halfwidth)
        return true
    else if (ballX < 0 && Math.abs(bounce_distance = right_pos - ballY) < paddle_halfwidth)
        return true
    if (ballX > 0) addScore('right')
    else addScore('left')
    return (ball_passed = true, false)
}
setInterval(gametick, 1000 / 120)

function endRound() {
    game_running = false
    if (score_right > score_to_win || score_left > score_to_win)
        return
    randomizeBallDir()
    ballX = 0
    ballY = 0
    game_running = false
    ball_passed = false
    ball_passed_timer = 0
    ball_speed = ball_base_speed
    ball.position.y = 5
    gsap.to(ball.position, { y: 0.1, duration: 1, onComplete: () => {
        game_running = true
    }})
}

function addScore(player) {
    if (player === 'left') {
        if (score_left === score_to_win) {
            console.log('victory')
            showVictory()
            return
        }
        const score_clone = score.clone()
        score_clone.name = "score"
        score_clone.material = score.material.clone()
        score_clone.material.color = left.material.color.clone()
        score_clone.position.set(-1.8 + 0.25 * score_left, 0, 2.25)
        t.scene.add(score_clone)
        score_left++
    }
    else if (player === 'right') {
        if (score_right === score_to_win) {
            console.log('loss')
            showLoss()
            return
        }
        const score_clone = score.clone()
        score_clone.name = "score"
        score_clone.material = score.material.clone()
        score_clone.material.color = right.material.color.clone()
        score_clone.position.set(1.8 - 0.25 * score_right, 0, -2.25)
        t.scene.add(score_clone)
        score_right++
    }
}

function showVictory() {
    t.win_text.material.color = left.material.color.clone()
    t.win_text.lookAt(t.gcamera.position)
    t.scene.add(t.win_text)
    score_left++
}

function showLoss() {
    t.lose_text.material.color = right.material.color.clone()
    t.lose_text.lookAt(t.gcamera.position)
    t.scene.add(t.lose_text)
    score_right++
}

function resetScore() {
    score_left = score_right = 0
    t.scene.remove(t.win_text)
    t.scene.remove(t.lose_text)
    while (t.scene.getObjectByName("score"))
        t.scene.remove(t.scene.getObjectByName("score"))
}

// Key listener functions
function onDocumentKeyDown(event) {
    var key_code = event.which
    if (key_code === 65) { up_pressed = true }
    else if (key_code === 68) { down_pressed = true }
    else if (key_code === 37) { up2_pressed = true }
    else if (key_code === 39) { down2_pressed = true }
    else if (key_code === 80) { game_running = !game_running }
}
function onDocumentKeyUp(event) {
    var key_code = event.which
    if (key_code === 65) { up_pressed = false }
    else if (key_code === 68) { down_pressed = false }
    else if (key_code === 37) { up2_pressed = false }
    else if (key_code === 39) { down2_pressed = false }
}

// external functions
export function startQuickGame() {
    if (game_running) {
        endRound()
        return
    }
    else if (score_left != 0 || score_right != 0) {
    }
    //console.log("game.js: startQuickGame called", ball_direction * 180 / Math.PI)
    t.scene.add(plate, left, right, top, bot)
    gsap.to(ball.position, { y: 0.1, duration: 0.7, onComplete: () => {
        game_running = true
    }})
    t.scene.add(ball)
    //const grid = new THREE.GridHelper(5, 30);
    //t.scene.add(grid);
    //curtick = tick
    document.addEventListener("keydown", onDocumentKeyDown, true);
    document.addEventListener("keyup", onDocumentKeyUp, true);
}

export function cleanUp() {
    resetScore()
    document.removeEventListener("keydown", onDocumentKeyDown, true)
    document.removeEventListener("keyup", onDocumentKeyUp, true)
    t.scene.remove(plate, left, right, top, bot, ball)
}