import * as i from './include.js'
import * as i2 from './2p-pong-include.js'
import * as l2 from './2p-pong-lib.js'
import { vars as v } from './2p-pong-include.js'

export const camera = i.gcamera
export const tick = () => {
    i2.left.position.x = v.left_pos * i.pvmax_pmx
    i2.right.position.x = v.right_pos * i.pvmax_pmx
    i2.ball.position.z = v.ballX * i.avmax_pmx
    i2.ball.position.x = v.ballY * i.avmax_pmx
}

export function startGame() {
    i.scene.add(i2.plate, i2.left, i2.right, i2.top, i2.bot)
    i.scene.add(i2.ball)
    v.left_pos = v.right_pos = 0
    document.addEventListener("keydown", onDocumentKeyDown, true);
    document.addEventListener("keyup", onDocumentKeyUp, true);
    if (i2.interval.id === -1)
        i2.interval.id = setInterval(l2.gametick60, 1000 / 60)
    console.log('2P local game: Start!')
}

export function reallyStart() {
    v.game_started = true
    v.oppIsHuman = true
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