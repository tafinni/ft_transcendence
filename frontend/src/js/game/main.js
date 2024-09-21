//import * as THREE from 'three'
//import gsap from 'gsap'

import { loadContent } from '../router.js'
import * as t from './include.js'
import * as i from './0p-idle.js'
import * as s2 from './2p-pong-single.js'
import * as l2 from './2p-pong-local.js'
import * as t2 from './2p-pong-tournament.js'
import * as l4 from './4p-pong-local.js'
import * as ttt from './ttt-local.js'
import { sendLocalResults } from '../localtournament.js'

// Variable to track current mode
let m = i

// Resize listener
window.addEventListener('resize', () => {
    t.setWinSizes()
    t.renderer.setSize(t.sizes.width, t.sizes.height)
    t.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Frame tick
const tick = () => {
    m.tick()
    //m.controls.update()
    t.renderer.render(t.scene, t.renderer.camera)
    window.requestAnimationFrame(tick)
}
tick()

var gametype = ''
export function loadGame(type) {
    console.log('loadGame:', type)
    gametype = type
    if (type === '11111') return `<form id="playerSelectForm">
      <label for="username">Player Name:</label><br>
      <input type="text" id="username" name="username" list="players">
      <datalist id="players">
        <option value="Player1">
        <option value="Player2">
        <option value="Player3">
        <!-- Add more options as needed -->
      </datalist><br>
      <input type="submit" value="Invite">
    </form>`
    return ``
}

export function startGame() {
    switch (gametype) {
        case 's2':
            startQuickGame();
            break;
        case 'l2':
            startTwoLocal();
            break;
        case 's4':
            //startSolo4P();
            break;
        case 'l4':
            startFourLocal();
            break;
        case 'st':
            //startSoloTTT();
            break;
        case 'lt':
            startTTT();
            break;
    }
}

export function endGame() {
    gametype = -1
}

export function sendResults(scoreLeft, scoreRight, oppIsHuman) {
    try {
        loadContent('result', scoreLeft, scoreRight, oppIsHuman)
    } catch (error) {
        console.log('error: failed to send results')
    }
}

export function switchToIdle() {
    m.cleanUp()
    m = i
    m.startGame()
}
switchToIdle()

// external functions
export function startQuickGame() {
    m.cleanUp()
    m = s2
    m.startGame()
}

export function startTwoLocal() {
    m.cleanUp()
    m = l2
    m.startGame()
}

export async function startTwoTournament(match, next_bracket, p1, p2) {
    m.cleanUp()
    m = t2
    const result = await m.startGame(match, next_bracket, p1, p2)
    sendLocalResults(result)
}

function startFourLocal() {
    m.cleanUp()
    m = l4
    m.startGame()
}

function startTTT() {
    console.log('startTTT')
    m.cleanUp()
    m = ttt
    m.startGame()
}