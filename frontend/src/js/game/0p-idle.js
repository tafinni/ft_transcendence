//import './style.css'
import * as THREE from 'three'
//import * as THREE from "../node_modules/three/build/three.module.js"
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import GUI from 'lil-gui'
import * as t from './include.js'
//import gsap from 'gsap'

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


let idle_mode = false
const radius = 5; // Distance from origin

export function cleanUp() {
    rmvIdleObjs()
    idle_mode = false   
}

export const camera = t.camera
export const controls = t.gcontrols
export const tick = () =>
{
    if (idle_mode) {
        const elapsedTime = t.clock.getElapsedTime()
        t.renderer.camera.position.x = radius * Math.cos(elapsedTime);
        t.renderer.camera.position.z = radius * Math.sin(elapsedTime);
        t.renderer.camera.lookAt(t.scene.position);
    }
}

//external functions
export function startGame() {
    t.renderer.camera = new THREE.PerspectiveCamera(75, t.sizes.width / t.sizes.height, 0.1, 100)
    t.renderer.camera.position.x = radius * Math.cos(0);
    t.renderer.camera.position.z = radius * Math.sin(0);
    t.renderer.camera.lookAt(t.scene.position);
    addIdleObjs()
    idle_mode = true
}