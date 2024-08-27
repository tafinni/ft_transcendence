import * as THREE from '/build/three.module.js'

/**
 * MAIN: Socket
*/

const socket = io();

const startbutton = document.getElementById('start');

startbutton.addEventListener("click", function() {
    socket.emit('startbutton');
});

socket.on('startbutton', () => {
    console.log('starting game')
    socket.emit('requeststatus')
  });

socket.on('status', (update) => {
    Object.assign(gamedata, update)
    //gamedata = { ...gamedata, ...update }
})

socket.on('score', (newScore) => {
    console.log('score: ', newScore.left, "-", newScore.right)
    Object.assign(score, newScore)
    const element = document.getElementById("score")
    element.textContent = score.left + " - " + score.right
})

/**
 * MAIN: Three
 */

// Canvas, Scene, Texture
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
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

// Sizes
const sizes = { width: 0, height: 0 }
function setWinSizes() {
    sizes.width = window.innerWidth * .8
    sizes.height = window.innerHeight * .6
}
setWinSizes()

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 4)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let lastRefresh = clock.getElapsedTime()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // if (gamedata.run && elapsedTime - lastRefresh > 0.05) {
    //     socket.emit('requeststatus')
    //     lastRefresh = elapsedTime
    // }
    if (gamedata.ballX > 0)
        ball.position.x = gamedata.ballX * right_bound / xmax
    else
        ball.position.x = gamedata.ballX * right_bound / xmax
    if (gamedata.ballY > 0)
        ball.position.y = gamedata.ballY * top_bound / ymax
    else
        ball.position.y = gamedata.ballY * top_bound / ymax
    //ball.position.set(gamedata.ballX / xmax, gamedata.ballY / ymax)
    cube.position.y = gamedata.left * top_bound / ymax
    cube2.position.y = gamedata.right * top_bound / ymax

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

/**
 * Keypress handling
 */

var moveUp = false
var moveDown = false

document.addEventListener("keydown", onDocumentKeyDown, true);
function onDocumentKeyDown(event) {
    var key_code = event.which
    if (key_code == 87)
        moveUp = true
    else if (key_code == 83)
        moveDown = true
    else if (key_code == 82)
        socket.emit('endgame')
}
document.addEventListener("keyup", onDocumentKeyUp, true);
function onDocumentKeyUp(event) {
    var key_code = event.which
    //console.log(key_code)
    if (key_code == 87)
        moveUp = false
    else if (key_code == 83)
        moveDown = false
    else if (key_code == 32) {
        if (!gamedata.run)
        socket.emit('startbutton')
    }
    else if (key_code == 73) {
        socket.emit('requeststatus')
        console.log(gamedata)
    }
}

/**
 * Logic
 */

const xmax = 1000000
const ymax = 1000000
const left_bound = cube.position.x + cube.geometry.parameters.width / 2 + ball.geometry.parameters.radius
const right_bound = cube2.position.x - cube2.geometry.parameters.width / 2 - ball.geometry.parameters.radius
const top_bound = 2
//var game_run = false
const gamedata = { tick: 0, left: 0, right: 0, ballX: 0, ballY: 0, ballDX: 0, ballDY: 0, ballpass: 0, run: false }
const score = {left: 0, right: 0 }

// Send keypresses to server periodically
setInterval(() => {
    socket.emit('updown', moveUp, moveDown);
  }, 1000 / 60); // Send 60 times per second  

// Tick must be run, but cannot be run before declaring all accessed variables
tick()