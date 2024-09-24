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
export function loadGame(nbr, nameLeft, nameRight) {
    gametype = nbr
    if (nbr === 0) return `
     <button class="btn btn-primary btn-lg mb-3" id="begin-solo-match">Begin</button>
            <p class="w-100" style="color: white;">Player is yellow, movement keys are a and d</p>
            </div>`;
    if (nbr === 1) return `
    <button type="button" id="start-button" class="btn btn-link" translate="start"></button>
    <p class="w-100" style="color: white; id="instruction-yellow">${nameLeft} uses keys W and S</p>
    <p class="w-100" style="color: white;" id="instruction-purple">Purple player uses Arrowkeys left and right</p>

    <form id="name-red">
        <div class="form-group">
            <input type="text" id="opp-name" class="form-control" required>
        </div>
    <button type="submit" class="btn btn-success mt-3" id="opp-name-submit" translate="set name"></button>
    </form>
    `;
    if (nbr == 3)
        return `
            <button class="btn btn-primary btn-lg mb-3" id="begin-tourney-match">Begin</button>
            <p class="w-100" style="color: white;">${nameLeft} is yellow, movement keys are a and d, ${nameRight} is purple, movement keys are arrow keys left and right</p>
            </div>`;
    return ``
}

export function startGame(gametype, nameLeft, nameRight) {
    if (gametype === 0) startQuickGame()
    else if (gametype === 1) startTwoLocal()
    else if (gametype === 2) startFourLocal()
    else if (gametype === 3) startTourney(nameLeft, nameRight)
    gametype = -1
}

export function endGame() {
    gametype = -1
}

export function sendResults(scoreLeft, scoreRight, oppIsHuman, oppName) {
    try {
        console.log('result', scoreLeft, scoreRight, oppIsHuman, "", oppName);
        loadContent('result', scoreLeft, scoreRight, oppIsHuman, "", oppName)
    } catch (error) {
        console.log('failed to sendResults:', error)
    }
}

export function sendTourneyResults(scoreLeft, scoreRight, oppIsHuman, nameLeft, nameRight) {
    try {
        loadContent('tourneyResult', scoreLeft, scoreRight, oppIsHuman, nameLeft, nameRight)
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

export function startTourney(nameLeft, nameRight){
    m.cleanUp()
    m = l2
    m.startGame(1, nameLeft, nameRight)
}

function startFourLocal() {
    m.cleanUp()
    m = l4
    m.startGame()
}