//import * as THREE from 'three'
import gsap from 'gsap'

import * as t from './game.defs.js'
import * as d from './local-4p.defs.js'
import { vars as v }  from './local-4p.defs.js'
import { switchToIdle, sendResults } from './game.js'

const plate = d.plate
const left = d.left
const right = d.right
const top = d.top
const bot = d.bot
const ball = d.ball
const score = d.score
let ball_drop = gsap.to(ball.position, { y: 0.1, duration: 0.8, paused: true, onComplete: () => {
    v.game_running = true
}})

export const camera = t.gcamera
export const tick = () => {
    left.position.x = v.left_pos * d.pvmax_pmx
    right.position.x = v.right_pos * d.pvmax_pmx
    top.position.z = v.top_pos * d.pvmax_pmx
    bot.position.z = v.bot_pos * d.pvmax_pmx
    ball.position.z = v.ballX * d.avmax_pmx
    ball.position.x = v.ballY * d.avmax_pmx
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

function randomizeBallDir() {
    v.ball_direction = (Math.random() < 0.5) ? Math.random() * 90 + 225 : Math.random() * 90 + 45
    // set always the same direction for testing purposes
    //v.ball_direction = Math.random() * 90 + 225
    v.ball_direction = 240
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
    v.left_pos = movePlayer(v.left_pos, v.l_left_pressed, v.l_right_pressed)
    v.right_pos = movePlayer(v.right_pos, v.r_left_pressed, v.r_right_pressed)
    v.top_pos = movePlayer(v.top_pos, v.t_left_pressed, v.t_right_pressed)
    v.bot_pos = movePlayer(v.bot_pos, v.b_left_pressed, v.b_right_pressed)
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
        v.ball_speed += d.ball_increase_speed / 2
    }
    if (!v.ball_passed && (v.ballY > c.ball_max || v.ballY < -c.ball_max) && checkPaddleHitV()) {
        if (v.ballY > 0) {
            v.ball_direction = Math.PI - v.ball_direction
        }
        else {
            v.ball_direction = Math.PI - v.ball_direction
        }
        v.ball_direction -= v.bounce_distance / c.paddle_halfwidth * Math.PI / 4
        v.ball_speed += d.ball_increase_speed / 2
    }
    if (v.ball_passed && v.ball_passed_timer++ > 200) endRound()
}
// run gametick at 120 Hz
setInterval(gametick, 1000 / 120)

function movePlayer(pos, up, down) {
    if (up && down) return pos
    if (up) {
        pos -= d.player_speed
        if (pos < -d.paddle_max) pos = -d.paddle_max
    }
    else if (down) {
        pos += d.player_speed
        if (pos > d.paddle_max) pos = d.paddle_max
    }
    return pos
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

function checkPaddleHitV() {
    if (v.ballY > 0 && Math.abs(v.bounce_distance = v.bot_pos - v.ballX) < c.paddle_halfwidth)
        return true
    else if (v.ballY < 0 && Math.abs(v.bounce_distance = v.top_pos - v.ballX) < c.paddle_halfwidth)
        return true
    if (v.ballY > 0) addScore('top')
    else addScore('bot')
    return (v.ball_passed = true, false)
}

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
            console.log('victory')
            showVictory()
            return
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
            console.log('loss')
            showLoss()
            return
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
    sendResults(v.score_left, v.score_right, true)
}

function showLoss() {
    t.lose_text.material.color = right.material.color.clone()
    t.lose_text.lookAt(t.gcamera.position)
    t.scene.add(t.lose_text)
    v.score_right++
    sendResults(v.score_left, v.score_right, true)
}

function resetScore() {
    v.score_left = v.score_right = 0
    t.scene.remove(t.win_text)
    t.scene.remove(t.lose_text)
    while (t.scene.getObjectByName("score"))
        t.scene.remove(t.scene.getObjectByName("score"))
}

export function startGame() {
    t.scene.add(plate, left, right, top, bot)
    t.scene.add(d.corner, d.corner2, d.corner3, d.corner4)
    t.scene.add(ball)
    document.addEventListener("keydown", onDocumentKeyDown, true);
    document.addEventListener("keyup", onDocumentKeyUp, true);
    const playerselect = document.getElementById("playerSelectForm")
    playerselect.style.zIndex = 100
    playerselect.addEventListener("submit", (e) => {
        e.preventDefault()
        startSolo()
        playerselect.style.zIndex = -999
    })
}

export function cleanUp() {
    resetScore()
    resetRound()
    v.game_started = false
    document.removeEventListener("keydown", onDocumentKeyDown, true)
    document.removeEventListener("keyup", onDocumentKeyUp, true)
    t.scene.remove(plate, left, right, top, bot, ball)
    t.scene.remove(d.corner, d.corner2, d.corner3, d.corner4)
}

// Key listeners
function onDocumentKeyDown(event) {
    var key_code = event.which
    //console.log(key_code)
    //A65 Z90 -109 +107 n78 m77
    if (key_code === 65) { v.l_left_pressed = true }
    else if (key_code === 90) { v.l_right_pressed = true }
    else if (key_code === 78) { v.t_right_pressed = true }
    else if (key_code === 77) { v.t_left_pressed = true }
    else if (key_code === 37) { v.b_right_pressed = true }
    else if (key_code === 39) { v.b_left_pressed = true }
    else if (key_code === 109) { v.r_left_pressed = true }
    else if (key_code === 107) { v.r_right_pressed = true }
    else if (key_code === 80) { v.game_running = !v.game_running }
}
function onDocumentKeyUp(event) {
    var key_code = event.which
    if (key_code === 65) { v.l_left_pressed = false }
    else if (key_code === 90) { v.l_right_pressed = false }
    else if (key_code === 78) { v.t_right_pressed = false }
    else if (key_code === 77) { v.t_left_pressed = false }
    else if (key_code === 37) { v.b_right_pressed = false }
    else if (key_code === 39) { v.b_left_pressed = false }
    else if (key_code === 109) { v.r_left_pressed = false }
    else if (key_code === 107) { v.r_right_pressed = false }
}
function startSolo() {
    v.game_started = true
    console.log(v)
    ball_drop.restart()
}