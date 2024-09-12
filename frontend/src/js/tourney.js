import { loadContent } from './router.js';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { updateContent } from './i18n.js';

export async function endGame() {
    gameRunning = 0; //ends the game, if score 0-0, result not sent
    prematureEnding = 1;
}

export async function startGame() {
    const nameRed = document.getElementById('redName');
    const submitbtn = document.getElementById('submitRed');
    
    startButton.addEventListener('click', (event) => {
            if (oppName !== "") {
                event.preventDefault();
                startButton.remove();
                nameForm.remove();
                submitbtn.remove();
                tick();
        }
    });
}

export async function loadTournament() {
    redName = "";
    blueName = "";
    goalsBlue = 0;
    goalsRed = 0;
    gameRunning = true;
    timerBlue = 0;
    timerRed = 0;
    blueIsAi = false;
    redIsAi = false;
    paddleBlue.position.z = 0;
    paddleRed.position.z = 0;
    dataSent = 0;
    return `
    <button type="button" id="startTourney" class="btn btn-link" translate="start"></button>
    <p>Blue player uses keys W and S</p>
    <p>Red player uses Arrowkeys up and down</p>
    <form>
        <div class="form-group mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="redName" placeholder="Enter username for red player" required>
        </div>
        <div class="form-group mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="redPassword" placeholder="Enter password for red player" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Sign In</button>
    </form>

     <form>
        <div class="form-group mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="blueName" placeholder="Enter username for blue player" requiblue>
        </div>
        <div class="form-group mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="bluePassword" placeholder="Enter password for blue player" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Sign In</button>
    </form>
    `;
}

// blue is left
// red is right
var gameRunning = true;
var goalsNeeded = 2;

let oppName = "";
let paddleSpeed = 0.05;

let blueIsAi = false;
let redIsAi = false;

let timerRed = 0;
let timerBlue = 0;

let areaSize = 4;

//import './style.css'
//import * as THREE from "../node_modules/three/build/three.module.js"
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
const paddleBlue = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 1, 0.25),
    new THREE.MeshBasicMaterial()
)
paddleBlue.position.x = -2

const paddleRed = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 1, 0.25),
    new THREE.MeshBasicMaterial()
)
paddleRed.position.x = 2

const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshNormalMaterial()
)

paddleBlue.material.color = new THREE.Color('blue')
paddleRed.material.color = new THREE.Color('red')
//ball.material.color = new THREE.Color('yellow')

var dBallX = 0.01;
var dBallZ = 0.01;

scene.add(paddleBlue, paddleRed, ball)

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

window.addEventListener('resize', () => {
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
let angle = Math.PI / 2; // Start angle
const radius = 5; // Distance from origin
const speed = 0.01; // Rotation speed

/**
 * Animate
 */
const clock = new THREE.Clock()

function checkCollisionBlue() {
    if (ball.position.x - 0.25 <= paddleBlue.position.x
        && ball.position.z - 0.25 <= paddleBlue.position.z
        && ball.position.z + 0.25 >= paddleBlue.position.z) {
        dBallX *= -1;
    }
}

function checkCollisionRed() {
    if (ball.position.x + 0.25 >= paddleRed.position.x
        && ball.position.z - 0.25 <= paddleRed.position.z
        && ball.position.z + 0.25 >= paddleRed.position.z) {
        dBallX *= -1;
    }
}

var goalsRed = 0;
var goalsBlue = 0;
function checkGoal() {
    if (ball.position.x < -2.1) {
        ball.position.x = 0;
        ball.position.z = 0;
        goalsRed++;
        console.log(goalsBlue, "-", goalsRed);
    }

    if (ball.position.x > 2.1) {
        ball.position.x = 0;
        ball.position.z = 0;
        goalsBlue++;
        console.log(goalsBlue, "-", goalsRed);
    }
}

function moveBall() {
    checkCollisionBlue();
    checkCollisionRed();
    checkGoal();
    ball.position.x += dBallX;
    ball.position.z += dBallZ;
    ball.position.y += 0;
}

function checkBorderZ() {
    if (ball.position.z >= 2 || ball.position.z <= -2) {
        dBallZ *= -1;
    }
}

var dirRed = 0;
var dirBlue = 0;

function moveRed() {
    paddleRed.position.z += paddleSpeed * dirRed;
}

function moveBlue() {
    paddleBlue.position.z += paddleSpeed * dirBlue;
}

let dataSent = 0;
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update camera position
    angle += speed;
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    camera.lookAt(scene.position); // Assuming the origin is at (0, 0, 0)


    // Update controls
    controls.update()
    moveBall();
    // console.log("Ball place = ", ball.position.x, ball.position.z);
    checkBorderZ();

    moveRed();
    if (paddleRed.position.z > 2) //area boundaries
        paddleRed.position.z = 2;
    if (paddleRed.position.z < -2)
        paddleRed.position.z = -2;

    moveBlue();
    if (paddleBlue.position.z > 2) //area boundaries
        paddleBlue.position.z = 2;
    if (paddleBlue.position.z < -2)
        paddleBlue.position.z = -2;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame

    if (goalsBlue == goalsNeeded) {
        console.log("BLUE victory");
        gameRunning = false;
    }
    else if (goalsRed == goalsNeeded) {
        console.log("RED victory");
        gameRunning = false;
    }

    if (gameRunning)
        window.requestAnimationFrame(tick)
    else {
        if (dataSent === 0) {
            if (prematureEnding == 0 && blueIsAi == 0)
                loadContent('result', goalsBlue, goalsRed, oppName);
        }
        dataSent = 1;
    };
    if (blueIsAi == 0)
        sessionStorage.setItem('timeoutTimer', Date.now());
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        dirRed = 1;
    } else if (e.key === 'ArrowDown') {
        dirRed = -1;
    }
});


document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') {
        dirRed = 0;
    } else if (e.key === 'ArrowDown') {
        dirRed = -0;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') {
        dirBlue = 1;
    } else if (e.key === 's') {
        dirBlue = -1;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w') {
        dirBlue = 0;
    } else if (e.key === 's') {
        dirBlue = -0;
    }
});

tick()
