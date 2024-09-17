//import * as THREE from 'three'
import gsap from 'gsap'

import * as i from './include.js'
//import * as l from './library.js'
import * as i2 from './2p-pong-include.js'
import * as l2 from './2p-pong-lib.js'
import { vars as v } from './2p-pong-include.js'

export const camera = i.gcamera
export const tick = l2.tick

// const ball_base_speed = 8000
// let ball_speed = ball_base_speed
// //let ball_dx = 0 // todo: calculate once with cos/sin instead of every tick
// //let ball_dy = 0
// let bounce_distance = 0
// let ball_passed = false
// let ball_passed_timer = 0
// let gameover_timer = 0

// function checkPaddleHit() {
//     // console.log(ballX)
//     //console.log('left', Math.abs(left_pos - ballY), ' right:', Math.abs(right_pos - ballY))
//     // console.log(paddle_halfwidth)
//     //console.log('bY:', ballY, ' left:', left_pos, ' right:', right_pos)
//     if (ballX > 0 && Math.abs(bounce_distance = left_pos - ballY) < paddle_halfwidth)
//         return true
//     else if (ballX < 0 && Math.abs(bounce_distance = right_pos - ballY) < paddle_halfwidth)
//         return true
//     if (ballX > 0) addScore('right')
//     else addScore('left')
//     return (ball_passed = true, false)
//}

// external functions
export function startGame() {
    i.scene.add(i2.plate, i2.left, i2.right, i2.top, i2.bot)
    i.scene.add(i2.ball)
    v.left_pos = v.right_pos = 0
    document.addEventListener("keydown", onDocumentKeyDown, true);
    document.addEventListener("keyup", onDocumentKeyUp, true);
    if (i2.interval.id === -1)
        i2.interval.id = setInterval(l2.gametick, 1000 / 120)
    console.log('Solo game: Start!')
}

export function reallyStart() {
    v.game_started = true
    l2.resetRound()
    l2.ball_drop.restart()
}

export function cleanUp() {
    if (i2.interval.id !== -1)
        clearInterval(i2.interval.id)
    i2.interval.id = -1
    l2.resetScore()
    l2.resetRound()
    v.game_started = false
    document.removeEventListener("keydown", onDocumentKeyDown, true)
    document.removeEventListener("keyup", onDocumentKeyUp, true)
    i.scene.remove(i2.plate, i2.left, i2.right, i2.top, i2.bot, i2.ball)
}

// Key listeners
function onDocumentKeyDown(event) {
    var key_code = event.which
    if (key_code === 65) { v.l_left_pressed = true }
    else if (key_code === 68) { v.l_right_pressed = true }
    else if (key_code === 37) { v.r_left_pressed = true }
    else if (key_code === 39) { v.r_right_pressed = true }
    else if (key_code === 80) { 
        if (i.debug) {
            if (!v.game_started) reallyStart()
            else v.game_running = !v.game_running
        }
    }
}
function onDocumentKeyUp(event) {
    var key_code = event.which
    if (key_code === 65) { v.l_left_pressed = false }
    else if (key_code === 68) { v.l_right_pressed = false }
    else if (key_code === 37) { v.r_left_pressed = false }
    else if (key_code === 39) { v.r_right_pressed = false }
}