//import * as THREE from 'three'
//import gsap from 'gsap'

import * as i from './include.js'
//import * as l from './library.js'
import * as i2 from './2p-pong-include.js'
import * as l2 from './2p-pong-lib.js'
import { vars as v } from './2p-pong-include.js'
import { AIPlayer, AIPlayer2 } from './pong-aiplayer.js'

const ai_right = new AIPlayer(i.ball_max, i.paddle_halfwidth, i.player_speed)
export const camera = i.gcamera
export const tick = () => {
    i2.left.position.x = v.left_pos * i.pvmax_pmx
    i2.right.position.x = v.right_pos * i.pvmax_pmx
    i2.ball.position.z = v.ballX * i.avmax_pmx
    i2.ball.position.x = v.ballY * i.avmax_pmx
    i2.ball2.position.x = i.ball_max * i.avmax_pmx - 0.1
    i2.ball3.position.z = i.ball_max * i.avmax_pmx - 0.1
}

export function startGame() {
    i.renderer.camera = i.newIsoCamera()
    i.scene.add(i2.plate, i2.left, i2.right, i2.top, i2.bot)
    i.scene.add(i2.ball)
    i.scene.add(i2.ball2, i2.ball3)
    i.three_t.lookAt(i.renderer.camera.position)
    v.left_pos = v.right_pos = 0
    v.ai_right = ai_right
    document.addEventListener("keydown", onDocumentKeyDown, true);
    document.addEventListener("keyup", onDocumentKeyUp, true);
    ai_right.setInterval(setInterval(() => {
        if (v.game_running) {
            //console.log('calling predictBallX:', v.ballX, v.ballY, v.ball_direction, v.ball_speed)
            ai_right.predictBallX(v.ballX, v.ballY, v.ball_direction, v.ball_speed)
            console.log('predict: ', ai_right.calculatedX, 'ballX', v.ballX)
            console.log()
        }
        //console.log(ai_right.aiMove())
    }, 1000))
    if (i2.interval.id === -1)
        i2.interval.id = setInterval(l2.gametick60, 1000 / 60)
    // const testai2 = new AIPlayer2(i.ball_max, i.paddle_halfwidth, i.player_speed)
    // console.log('running predict with 22.5 deg')
    // testai2.predict(0, 0, Math.PI / 8, 10000)
    // console.log('move:', testai2.aiMove(0))
    // console.log('running predict with 202.5 deg')
    // testai2.predict(0, 0, Math.PI * 9 / 8, 10000)
    // var testpos = 0
    // setInterval(() => {
    //     var w = 0, d = 0, dir = Math.PI * 9 / 8
    //     testai2.predict(w, d, dir, 1000)
    //     for (var i = 0; i < 30; i++) {
    //         console.log(testpos, 'aiMove:', testai2.aiMove(testpos))
    //         testpos += testai2.aiMove(testpos) * 10000
    //     }
    //     console.log('pos after predict: ', testpos)
    // }, 500)
    reallyStart()
}

export function reallyStart() {
    v.game_started = true
    l2.resetRound()
    l2.startRound(0.3) // 1.1
}

export function cleanUp() {
    if (i2.interval.id !== -1)
        clearInterval(i2.interval.id)
    clearInterval(ai_right.intervalID)
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
    //else if (key_code === 37) { v.r_left_pressed = true }
    //else if (key_code === 39) { v.r_right_pressed = true }
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
    //else if (key_code === 37) { v.r_left_pressed = false }
    //else if (key_code === 39) { v.r_right_pressed = false }
}