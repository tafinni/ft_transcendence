//import './style.css'
import * as THREE from 'three'
//import * as THREE from "../node_modules/three/build/three.module.js"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import GUI from 'lil-gui'
import * as t from './game.defs.js'
import gsap from 'gsap'

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 1, 0.25),
    new THREE.MeshBasicMaterial()
)
cube.name = "idle1"
cube.position.x = -2

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 1, 0.25),
    new THREE.MeshBasicMaterial()
)
cube2.name = "idle2"
cube2.position.x = 2

const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshNormalMaterial()
)
ball.name = "idle3"

cube.material.color =  new THREE.Color('red')
cube2.material.color = new THREE.Color('blue')
//ball.material.color = new THREE.Color('yellow')

const gsapAnim = null

export function addIdleObjs() {
    t.scene.add(cube, cube2, ball)
}
addIdleObjs()

export function rmvIdleObjs() {
    t.scene.remove(cube, cube2, ball)
}

export function cleanUp() {
    rmvIdleObjs()
    t.scene.remove(t.camera)
}

export const radius = 5; // Distance from origin

export const tick = () =>
{
    const elapsedTime = t.clock.getElapsedTime()
    t.camera.position.x = radius * Math.cos(elapsedTime);
    t.camera.position.z = radius * Math.sin(elapsedTime);
    t.camera.lookAt(t.scene.position);
    t.controls.update()
    t.renderer.render(t.scene, t.gcamera)
    // window.requestAnimationFrame(tick)
}
//tick()

//external functions
export function startIdle() {

}