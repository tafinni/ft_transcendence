import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// DEBUG
export const debug = true

// Timers
export const aftergame_timer = 115 // 60 = 1 second
export const idle_timer = 360 // 60 = 1 second

// Consts
export const area_vmax = 2
export const paddle_vmax = 1.65
export const pos_max = 1000000
export const ball_radius = 50000
export const paddle_halfwidth = (area_vmax - paddle_vmax) * pos_max / area_vmax + (ball_radius * 1.5) // ball_radius simplified
export const ball_max = pos_max - ball_radius
export const paddle_max = pos_max - paddle_halfwidth
export const player_speed = 20000 // 20000
export const ball_base_speed = 60000 // 14000
export const ball_start_speed = 7000 // 7000
export const ball_increase_speed = 2000
export const score_to_win = 1
export const obj_stack = []
export const d = 3 // this is for orthographic camera

// Export canvas, scene, textureLoader
export const canvas = document.querySelector('canvas.webgl')
export const scene = new THREE.Scene()
export const textureLoader = new THREE.TextureLoader()

export var win_text = {}
export var lose_text = {}
// Font loading
export const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/SuperCornRegular.json',
    (font) => {
        const textGeometry = new TextGeometry(
        'Victory!',
        {
            font: font,
            size: 0.5,
            depth: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        })
        textGeometry.center()
        const textMaterial = new THREE.MeshBasicMaterial()
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.set(1, 1, 1)
        text.material.transparent = true
        text.material.opacity = 0.8
        win_text = text
        const textGeometry2 = new TextGeometry(
        'Game Over',
        {
            font: font,
            size: 0.5,
            depth: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        })
        textGeometry2.center()
        const textMaterial2 = new THREE.MeshBasicMaterial()
        const text2 = new THREE.Mesh(textGeometry2, textMaterial2)
        text2.position.set(1, 1, 1)
        text2.material.transparent = true
        text2.material.opacity = 0.8
        lose_text = text2
    }
)

// Window sizes and a function to set them, run it once
export const sizes = { width: 0, height: 0 }
export function setWinSizes() {
    sizes.width = window.innerWidth * 0.95
    sizes.height = window.innerHeight * 0.9
}
setWinSizes()
export function getAspect() { return sizes.width / sizes.height }

// Export camera, controls, renderer, clock
export const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
//export const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true
export const gcamera = new THREE.OrthographicCamera(-d * getAspect(), d * getAspect(), d, -d, 1, 1000)
//export const gcontrols = new OrbitControls(gcamera, canvas)
//gcontrols.enableDamping = true

export function newIsoCamera() {
    const newcamera = new THREE.OrthographicCamera(-d * getAspect(), d * getAspect(), d, -d, 1, 1000)
    newcamera.position.set(4, 4, 4)
    newcamera.rotation.y = Math.PI / 2
    newcamera.lookAt(scene.position)
    return newcamera
}

export const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.camera = camera
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
export const clock = new THREE.Clock()

// pre-calculated values
export const pvmax_pmx = paddle_vmax / paddle_max
export const avmax_pmx = area_vmax / pos_max