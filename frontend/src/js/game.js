export function loadGame() {
    goalsBlue = 0;
    goalsRed = 0;
    gameRunning = true;
    timerBlue = 0;
    timerRed = 0;
    // blueIsAi = false;
    // redIsAi = false;
    paddleBlue.position.z = 0;
    paddleRed.position.z = 0;
    tick();
}
// blue is left
// red is right

let paddleSpeed = 0.05;

let blueIsAi = true;
let redIsAi = true;

let timerRed = 0;
let timerBlue = 0;

let areaSize = 4;

//import './style.css'
import * as THREE from 'three'
//import * as THREE from "../node_modules/three/build/three.module.js"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { updateContent } from './i18n';
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
        console.log("Red made goal at ", ball.position.x, " ", ball.position.z);
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
    console.log("Blue paddle is at ", paddleBlue.position.z);
}

let supposedZRed;
let supposedZBlue;

function predictBallZRed() {
    let predictedZ = ball.position.z;
    let predictedDZ = dBallZ;
    let distanceToPaddle = Math.abs(paddleRed.position.x - ball.position.x);

    while (distanceToPaddle > 0) {
        predictedZ += predictedDZ;
        if (predictedZ < 0 || predictedZ > 4) {
            predictedDZ *= -1;
            predictedZ += 2 * predictedDZ;
        }
        distanceToPaddle -= Math.abs(dBallX);
    }
    return predictedZ;
}

function predictBallZBlue() {
    let predictedZ = ball.position.z;
    let predictedDZ = dBallZ;
    let distanceToPaddle = Math.abs(paddleBlue.position.x - ball.position.x);

    while (distanceToPaddle > 0) {
        predictedZ += predictedDZ;
        if (predictedZ < 0 || predictedZ > 4) {
            predictedDZ *= -1;
            predictedZ += 2 * predictedDZ;
        }
        distanceToPaddle -= Math.abs(dBallX);
    }
    return predictedZ;
}

function aiMoveRed() {
    let predictedZ;
    if (Date.now() - timerRed > 1000) {
        predictedZ = predictBallZRed() - 0.025; // half of paddle height
        if (predictedZ < 0) {
            predictedZ = 0;
        } else if (predictedZ + 0.1 > 4) {
            predictedZ = 4 - 0.1;
        }
        supposedZRed = predictedZ;
        timerRed = Date.now();
    }

    // console.log("Red supposed is ", supposedZRed);
    // console.log("Red place is ", paddleRed.position.z);
    if (paddleRed.position.z < supposedZRed) {
        // console.log("Red up");
        paddleRed.position.z += paddleSpeed;
    } else if (paddleRed.position.z > supposedZRed) {
        // console.log("Red down");
        paddleRed.position.z -= paddleSpeed;
    }

}
function aiMoveBlue() {
    let predictedZ;
    if (Date.now() - timerBlue > 1000) {
        predictedZ = predictBallZBlue() - 0.025;
        if (predictedZ < -2) {
            predictedZ = -2;
        } else if (predictedZ + 0.1 > 2) {
            predictedZ = 2 - 0.1;
        }
        supposedZBlue = predictedZ;
        timerBlue = Date.now;
    }
    console.log("Suppose ", supposedZBlue);
    if (paddleBlue.position.z < supposedZBlue) {
        console.log("Blue up");
        paddleBlue.position.z += paddleSpeed;
    } else if (paddleBlue.position.z > supposedZBlue) {
        console.log("Blue down");
        paddleBlue.position.z -= paddleSpeed;
    }
}
var gameRunning = true;
var goalsNeeded = 5;

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update camera position
    // angle += speed;
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    camera.lookAt(scene.position); // Assuming the origin is at (0, 0, 0)


    // Update controls
    controls.update()
    moveBall();
    // console.log("Ball place = ", ball.position.x, ball.position.z);
    checkBorderZ();

    if (redIsAi)
        aiMoveRed();
    else
        moveRed();

    if (paddleRed.position.z > 2)
        paddleRed.position.z = 2;
    if (paddleRed.position.z < -2)
        paddleRed.position.z = -2;

    if (blueIsAi)
        aiMoveBlue();
    else
        moveBlue();
    
    if (paddleBlue.position.z > 2)
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
        console.log("ENDED")
    };
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

// tick()
