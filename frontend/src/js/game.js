import * as THREE from 'three'
import gsap from 'gsap'

import * as t from './game.defs.js'
import * as i from './idle.js'

window.addEventListener('resize', () => {
    t.setWinSizes()
    t.renderer.setSize(t.sizes.width, t.sizes.height)
    t.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const plate = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.01, 4),
    new THREE.MeshBasicMaterial()
)
plate.material.color = new THREE.Color('grey')
plate.material.transparent = true
plate.material.opacity = 0.25
plate.position.set(0, 0.005, 0)
//t.scene.add(plate)
const left = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.2, 0.2),
    new THREE.MeshBasicMaterial()
)
left.name = "left"
left.material.color = new THREE.Color('yellow')
left.position.set(0, 0.1, 2.1)
//t.scene.add(left)
const right = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.2, 0.2),
    new THREE.MeshBasicMaterial()
)
right.name = "right"
right.material.color = new THREE.Color('purple')
right.position.set(0, 0.1, -2.1)
//t.scene.add(right)
const top = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 4.4),
    new THREE.MeshBasicMaterial()
)
top.material.color = new THREE.Color('darkblue')
top.position.set(-2.1, 0.1, 0)
const bot = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 4.4),
    new THREE.MeshBasicMaterial()
)
bot.material.color = new THREE.Color('darkblue')
bot.position.set(2.1, 0.1, 0)
const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshNormalMaterial()
)
ball.name = "ball"
ball.position.set(0, 5, 0)


// cube.position.x = -1
// let movecube = gsap.to(cube.position, { x: 1, duration: 1, paused: true, overwrite: true })
// t.scene.add(cube)
// movecube.play()

t.camera.position.z = 4
t.scene.add(t.camera)

t.gcamera.position.set(3, 3, 3)
t.gcamera.rotation.y = Math.PI / 2
t.gcamera.lookAt(t.scene.position)
t.scene.add(t.gcamera)

const itick = () =>
{
    const elapsedTime = t.clock.getElapsedTime()
    t.camera.position.x = i.radius * Math.cos(elapsedTime);
    t.camera.position.z = i.radius * Math.sin(elapsedTime);
    t.camera.lookAt(t.scene.position);
    
    t.controls.update()
    t.renderer.render(t.scene, t.camera)
    window.requestAnimationFrame(curtick)
}
const tick = () => {
    //console.log(t.camera.x, t.camera.y, t.camera.z)
    left.position.x = left_pos * paddle_max / pos_max
    right.position.x = left.position.x
    ball.position.z = ballX * area_max / pos_max
    ball.position.x = ballY * area_max / pos_max
    t.renderer.render(t.scene, t.gcamera)
    window.requestAnimationFrame(curtick)
}
let curtick = itick
curtick()

// game logic
const area_max = 2
const paddle_max = 1.65
const pos_max = 1000000
const paddle_halfwidth = (area_max - paddle_max) * pos_max / area_max * 2
const ball_radius = 12500
const ball_max = pos_max - ball_radius
const player_speed = 12000
let left_pos = 0
let right_pos = 0
let up_pressed = false
let down_pressed = false
let game_running = false
let ballX = 0
let ballY = 0
let ball_direction = 0
function randomizeBallDir() {
    ball_direction = (Math.random() < 0.5) ? Math.random() * 90 + 225 : Math.random() * 90 + 45
    // set always the same direction for testing purposes
    ball_direction = Math.random() * 90 + 225
    ball_direction *= Math.PI / 180
}
randomizeBallDir()
let ball_speed = 8000
let ball_dx = 0
let ball_dy = 0
let ball_passed = false
function gametick() {
    if (!game_running) return
    if (up_pressed) left_pos -= player_speed
    if (down_pressed) left_pos += player_speed
    if (left_pos > pos_max) left_pos = pos_max
    else if (left_pos < -pos_max) left_pos = -pos_max
    right_pos = left_pos
    ballX -= ball_speed * Math.sin(ball_direction)
    ballY -= ball_speed * Math.cos(ball_direction)
    if (!ball_passed && (ballX > ball_max || ballX < -ball_max) && checkPaddleHit()) {
        if (ballX > 0)
            ball_direction = (Math.PI - ball_direction) - Math.PI
        else if (ballX < 0)
            ball_direction = 2 * Math.PI - ball_direction
    }
    if (ballY > ball_max) {
        ball_direction = Math.PI - ball_direction
    } else if (ballY < -ball_max) {
        ball_direction = Math.PI - ball_direction
    }
}
function checkPaddleHit() {
    console.log(Math.abs(left_pos - ballY))
    console.log(paddle_halfwidth)
    if (Math.abs(left_pos - ballY) < paddle_halfwidth)
        return true
    return (ball_passed = true, false)
}
setInterval(gametick, 1000 / 120)

// external functions
export function startQuickGame() {
    if (game_running) {
        randomizeBallDir()
        ballX = 0
        ballY = 0
        game_running = false
        ball_passed = false
        ball.position.y = 5
        gsap.to(ball.position, { y: 0.05, duration: 0.5, onComplete: () => {
            game_running = true
        }})
    }
    console.log("game.js: startQuickGame called", ball_direction * 180 / Math.PI)
    t.scene.remove(t.scene.getObjectByName("idle1"))
    t.scene.remove(t.scene.getObjectByName("idle2"))
    t.scene.remove(t.scene.getObjectByName("idle3"))
    t.scene.add(plate, left, right, top, bot)
    gsap.to(ball.position, { y: 0.05, duration: 0.5, onComplete: () => {
        game_running = true
    }})
    t.scene.add(ball)
    //const grid = new THREE.GridHelper(5, 30);
    //t.scene.add(grid);
    curtick = tick
    document.addEventListener("keydown", onDocumentKeyDown, true);
    function onDocumentKeyDown(event) {
        var key_code = event.which
        //console.log('game.js keylistener:', key_code)
        if (key_code === 87) { up_pressed = true }
        else if (key_code === 83) { down_pressed = true}
    }
    document.addEventListener("keyup", onDocumentKeyUp, true);
    function onDocumentKeyUp(event) {
        var key_code = event.which
        //console.log('game.js keylistener:', key_code)
        if (key_code === 87) { up_pressed = false }
        else if (key_code === 83) { down_pressed = false}
    }
}