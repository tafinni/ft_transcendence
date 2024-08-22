import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

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
    sizes.width = window.innerWidth * .8
    sizes.height = window.innerHeight * .6
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // rotate
    //cube.rotation.x = elapsedTime / 2
    //cube.rotation.y = elapsedTime / 2

    // check to move
    if (moveUp2 != moveDown2) {
        if (moveUp2 && cube2.position.y <= 2) {
            cube2.position.y += yMove
            //cube2.position.z -= yMove
        }
        else if (moveDown2 && cube2.position.y >= -2) {
            cube2.position.y -= yMove
            //cube2.position.z += yMove
        }
    }
    if (moveUp1 != moveDown1) {
        if (moveUp1 && cube.position.y <= 2) {
            cube.position.y += yMove
            //cube.position.z -= yMove
        }
        else if (moveDown1 && cube.position.y >= -2) {
            cube.position.y -= yMove
            //cube.position.z += yMove
        }
    }
    // ball movement during game
    if (game_run) {
        //if (ball.position.x + (ball.width / 2) >= 1.75 && checkHit(cube2.height / 2, cube2.position.y)) {
        //if (ball.position.x <= left_bound && checkHit(cube.geometry.parameters.width, cube.position.y)
        //|| (ball.position.x >= right_bound && checkHit(cube2.geometry.parameters.width, cube2.position.y))) {
        var hit = null
        if (!ball_passed && ball.position.x <= left_bound) hit = cube
        else if (!ball_passed && ball.position.x >= right_bound) hit = cube2
        if (hit != null) {
            if (checkHit(hit.geometry.parameters.height / 2 + ball.geometry.parameters.radius, hit.position.y)) {
                ball_direction.x *= -1.05
                ball_direction.y *= 1.01
                if (ball_direction.x > 0)
                    document.querySelector('#test-comp').changeContent("bounce left!")
                else
                    document.querySelector('#test-comp').changeContent("bounce right!")
            }
            else
                ball_passed = true
        }
        if (ball.position.y >= top_bound || ball.position.y <= -top_bound)
            ball_direction.y *= -1
        ball.position.x += ball_direction.x
        ball.position.y += ball_direction.y
        if (ball_passed && (ball.position.x < -4 || ball.position.x > 4))
            endGame()
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

/**
 * Keypress handling
 */

//const xMove = 0.05
const yMove = 0.1
var moveUp1 = false
var moveDown1 = false
var moveUp2 = false
var moveDown2 = false

//document.addEventListener("keydown", onDocumentKeydown, false);
// function onDocumentKeydown(event) {
//     var keyCode = event.which
//     console.log(keyCode)
//     // 40 down 38 up 37 left 39 right
//     // 87 W 65 A 83 S 68 D
//     // 82 R
//     if (keyCode == 87) cube.position.y += yMove
//     else if (keyCode == 65) cube.position.x -= xMove
//     else if (keyCode == )
// }

document.addEventListener("keydown", onDocumentKeyDown, true);
function onDocumentKeyDown(event) {
    var key_code = event.which
    //console.log(key_code)
    if (key_code == 38) moveUp2 = true
    else if (key_code == 40) moveDown2 = true
    if (key_code == 87) moveUp1 = true
    else if (key_code == 83) moveDown1 = true
    else if (key_code == 32 && !game_run) startGame()
}
document.addEventListener("keyup", onDocumentKeyUp, true);
function onDocumentKeyUp(event) {
    var key_code = event.which
    //console.log(event.which)
    if (key_code == 38) moveUp2 = false
    else if (key_code == 40) moveDown2 = false
    else if (key_code == 87) moveUp1 = false
    else if (key_code == 83) moveDown1 = false
    else if (key_code == 82) {
        cube.position.y = cube2.position.y = 0
        ball.position.x = ball.position.y = 0
        game_run = false
    }
}

/**
 * Game logic
 */
var game_run = false
var ball_passed = false
var ball_direction = { x: 0, y: 0 }
var top_bound = 2
var left_bound = cube.position.x + cube.geometry.parameters.width / 2 + ball.geometry.parameters.radius
var right_bound = cube2.position.x - cube2.geometry.parameters.width / 2 - ball.geometry.parameters.radius
var game_score = { left: 0, right: 0}

export function startGame() {
    ball_direction.x = .05
    ball_direction.y = Math.random() * .05
    if (Math.floor(Math.random() * 2) == 1)
        ball_direction.x *= -1
    if (Math.floor(Math.random() * 2) == 1)
        ball_direction.y *= -1
    //ball_direction.y = Math.cos(ball_direction.x)
    game_run = true
    ball_passed = false
}

function checkHit(tolerance, paddle_y) {
    var delta = Math.abs(ball.position.y - paddle_y)
    if (delta <= tolerance) return true
    // if (ball.position.y <= tolerance + paddle_y) return true
    // else if (tolerance + paddle_y <= ball.position.y) return true
    return false
}

function endGame() {
    game_run = false
    if (ball.position.x > 0) game_score.left += 1
    else game_score.right += 1
    ball.position.x = ball.position.y = 0
    const element = document.getElementById("score")
    element.textContent = game_score.left + " - " + game_score.right
    console.log(element.textContent)
}

// html manipulation
const element = document.getElementById("score")
element.textContent = game_score.left + " - " + game_score.right
//text = document.createTextNode("1 - 0")
//element.appendChild(text)
//if (element.innerText) element.innerText = "1 - 0"
//else if (element.textContent) element.textContent = "1 - 0"

/**
 * webcomponent test
 */
class CustomComp extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<h3>This is a demonstration of Custom elements</h3>`
        console.log('callback called')
    }
    changeContent(content) {
        this.innerHTML = content
    }
}
customElements.define("test-comp", CustomComp)
