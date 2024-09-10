import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//import GUI from 'lil-gui'
//const gui = new GUI()

// Export canvas, scene, textureLoader
export const canvas = document.querySelector('canvas.webgl')
export const scene = new THREE.Scene()
export const textureLoader = new THREE.TextureLoader()

// Window sizes and a function to set them, run it once
export const sizes = { width: 0, height: 0 }
export function setWinSizes() {
    sizes.width = window.innerWidth * 0.9
    sizes.height = window.innerHeight * 0.7
}
setWinSizes()
export function getAspect() { return sizes.width / sizes.height }

// Export camera, controls, renderer, clock
export const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

const d = 2.5
export const gcamera = new THREE.OrthographicCamera(-d * getAspect(), d * getAspect(), -d, d, 1, 1000)
export const controls = new OrbitControls(gcamera, canvas)
controls.enableDamping = true

export const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
export const clock = new THREE.Clock()