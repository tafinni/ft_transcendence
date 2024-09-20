import * as THREE from 'three'
import gsap from 'gsap'

import { loadContent } from './router.js'
import * as t from './game.defs.js'
import * as i from './idle.js'
import * as s from './solo.js'
import * as l2 from './local-2p.js'
import * as l4 from './local-4p.js'

// Variable to track current mode
let m = i

// Resize listener
window.addEventListener('resize', () => {
    t.setWinSizes()
    t.renderer.setSize(t.sizes.width, t.sizes.height)
    t.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera setups
t.camera.position.z = 5
t.scene.add(t.camera)
t.gcamera.position.set(4, 4, 4)
t.gcamera.rotation.y = Math.PI / 2
t.gcamera.lookAt(t.scene.position)
t.scene.add(t.gcamera)

// Frame tick
const tick = () => {
    m.tick()
    m.controls.update()
    t.renderer.render(t.scene, m.camera)
    window.requestAnimationFrame(tick)
}
tick()

var gametype = -1
export function loadGame(nbr) {
    gametype = nbr
    if (nbr === 1) return `<form id="playerSelectForm">
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
    if (nbr == 3)
        return '<button class="btn btn-primary btn-lg mb-3" id="begin-tourney-match">Begin</button>'
    return ``
}

export function startGame(gametype, name1, name2) {
    if (gametype === 0) startQuickGame()
    else if (gametype === 1) startTwoLocal()
    else if (gametype === 2) startFourLocal()
    else if (gametype === 3) startTourney(name1, name2)
    gametype = -1
}

export function endGame() {
    gametype = -1
}

export function sendResults(scoreLeft, scoreRight, oppIsHuman, oppName) {
    try {
        loadContent('result', scoreLeft, scoreRight, oppIsHuman, "", oppName)
    } catch (error) {
        console.log('failed to sendResults:', error)
    }
}

export function sendTourneyResults(scoreLeft, scoreRight, oppIsHuman, name1, name2) {
    try {
        loadContent('tourneyResult', scoreLeft, scoreRight, oppIsHuman, name1, name2)
    } catch (error) {
        console.log('failed to sendResults:', error)
    }
}

export function switchToIdle() {
    m.cleanUp()
    m = i
    m.addIdleObjs()
}

// external functions
export function startQuickGame() {
    m.cleanUp()
    m = s
    m.startQuickGame()
}

export function startTwoLocal() {
    m.cleanUp()
    m = l2
    m.startGame(0)
}

export function startTourney(name1, name2){
    m.cleanUp()
    m = l2
    m.startGame(1, name1, name2)
}

function startFourLocal() {
    m.cleanUp()
    m = l4
    m.startGame()
}