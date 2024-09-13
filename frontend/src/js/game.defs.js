import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//import GUI from 'lil-gui'
//const gui = new GUI()

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
        text.material.opacity = 0.7
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
        text2.material.opacity = 0.7
        lose_text = text2
    }
)

// Window sizes and a function to set them, run it once
export const sizes = { width: 0, height: 0 }
export function setWinSizes() {
    sizes.width = window.innerWidth * 0.85
    sizes.height = window.innerHeight * 0.85
}
setWinSizes()
export function getAspect() { return sizes.width / sizes.height }

// Export camera, controls, renderer, clock
export const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

const d = 2.75
export const gcamera = new THREE.OrthographicCamera(-d * getAspect(), d * getAspect(), d, -d, 1, 1000)
export const controls = new OrbitControls(gcamera, canvas)
controls.enableDamping = true

export const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
export const clock = new THREE.Clock()