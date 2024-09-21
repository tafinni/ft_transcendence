import gsap from 'gsap'

import * as i from './include.js'
import * as i4 from './4p-pong-include.js'
import * as l4 from './4p-pong-lib.js'
import { vars as v }  from './4p-pong-include.js'
import { switchToIdle, sendResults } from './main.js'

// const plate = d.plate; const left = d.left; const right = d.right; const top = d.top;
// const bot = d.bot; const ball = d.ball; const score = d.score;

export const camera = i.gcamera
export const tick = l4.tick
//export const controls = i.gcontrols
// export const tick = () => {
//     left.position.x = v.left_pos * d.pvmax_pmx
//     right.position.x = v.right_pos * d.pvmax_pmx
//     top.position.z = v.top_pos * d.pvmax_pmx
//     bot.position.z = v.bot_pos * d.pvmax_pmx
//     ball.position.z = v.ballX * d.avmax_pmx
//     ball.position.x = v.ballY * d.avmax_pmx
// }

export function startGame() {
    i.renderer.camera = i.newIsoCamera()
    i.scene.add(i4.plate, i4.left, i4.right, i4.top, i4.bot)
    i.scene.add(i4.corner, i4.corner2, i4.corner3, i4.corner4)
    i.scene.add(i4.ball)
    document.addEventListener("keydown", onDocumentKeyDown, true);
    document.addEventListener("keyup", onDocumentKeyUp, true);
    if (i4.interval.id === -1)
        i4.interval.id = setInterval(l4.gametick60, 1000 / 60)
    console.log('4P solo game: Start!')
}

function reallyStart() {
    v.reset()
    l4.resetRound()
    l4.addLives()
    l4.randomizeBallDir()
    v.game_started = true
    l4.ball_drop.restart()
}

export function cleanUp() {
    if (i4.interval.id !== -1)
        clearInterval(i4.interval.id)
    i4.interval.id = -1
    l4.resetScore()
    l4.resetRound()
    v.game_started = false
    document.removeEventListener("keydown", onDocumentKeyDown, true)
    document.removeEventListener("keyup", onDocumentKeyUp, true)
    i.scene.remove(i4.plate, i4.left, i4.right, i4.top, i4.bot, i4.ball)
    i.scene.remove(i4.corner, i4.corner2, i4.corner3, i4.corner4)
    while (i.scene.getObjectByName('wall'))
        i.scene.remove(i.scene.getObjectByName('wall'))
}

// Key listeners
function onDocumentKeyDown(event) {
    var key_code = event.which
    if (key_code === 65) { v.l_left_pressed = true }
    else if (key_code === 90) { v.l_right_pressed = true }
    else if (key_code === 78) { v.t_right_pressed = true }
    else if (key_code === 77) { v.t_left_pressed = true }
    else if (key_code === 37) { v.b_right_pressed = true }
    else if (key_code === 39) { v.b_left_pressed = true }
    else if (key_code === 109) { v.r_left_pressed = true }
    else if (key_code === 107) { v.r_right_pressed = true }
    else if (key_code === 80) { 
        if (!v.game_started) reallyStart()
        else v.game_running = !v.game_running
    }
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