//import './style.css'
import * as THREE from 'three'
//import * as THREE from "../node_modules/three/build/three.module.js"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
//const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 1, 0.25),
    new THREE.MeshBasicMaterial()
)
cube.position.x = -2

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 1, 0.25),
    new THREE.MeshBasicMaterial()
)
cube2.position.x = 2

const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshNormalMaterial()
)

cube.material.color =  new THREE.Color('red')
cube2.material.color = new THREE.Color('blue')
//ball.material.color = new THREE.Color('yellow')

scene.add(cube, cube2, ball)

/**
 * Sizes
 */
// const sizes = {
//     width: window.innerWidth * .8,
//     height: window.innerHeight / 2
// }
const sizes = { width: 0, height: 0 }
function setWinSizes() {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
}
setWinSizes()

window.addEventListener('resize', () =>
{
    // Update sizes
    setWinSizes()

    // Update camera
    //camera.aspect = sizes.width / sizes.height
    //camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
//const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Camera rotation values
let angle = 0; // Start angle
const radius = 5; // Distance from origin
const speed = 0.01; // Rotation speed

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update camera position
    angle += speed;
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    camera.lookAt(scene.position); // Assuming the origin is at (0, 0, 0)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()