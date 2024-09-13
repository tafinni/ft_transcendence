import * as THREE from 'three'
import gsap from 'gsap'

import * as t from './game.defs.js'
import * as i from './idle.js'
import * as s from './solo.js'
import * as l2 from './local-2p.js'

const uselessvar = 3

// Variable to track current mode
let m = i

// Resize listener
window.addEventListener('resize', () => {
    t.setWinSizes()
    t.renderer.setSize(t.sizes.width, t.sizes.height)
    t.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera setups
t.camera.position.z = 4
t.scene.add(t.camera)
t.gcamera.position.set(4, 4, 4)
t.gcamera.rotation.y = Math.PI / 2
t.gcamera.lookAt(t.scene.position)
t.scene.add(t.gcamera)

// Frame tick
let tickpointer = i.tick
const tick = () => {
    //tickpointer()
    m.tick()
    t.renderer.render(t.scene, m.camera)
    window.requestAnimationFrame(tick)
}
tick()

export function switchToIdle() {
    m.cleanUp()
    m = i
    tickpointer = i.tick
    i.addIdleObjs()
}

// external functions
export function startQuickGame() {
    m.cleanUp()
    m = s
    tickpointer = m.tick
    m.startQuickGame()
}

export function startTwoLocal() {
    m.cleanUp()
    m = l2
    tickpointer = m.tick
    m.startGame()
}