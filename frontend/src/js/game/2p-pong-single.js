//import * as THREE from 'three'
//import gsap from 'gsap'

import * as i from './include.js'
//import * as l from './library.js'
import * as i2 from './2p-pong-include.js'
import * as l2 from './2p-pong-lib.js'
import { vars as v } from './2p-pong-include.js'

export const camera = i.gcamera
export const tick = () => {
    if (v.game_running)
        aiMovePurple();
    i2.left.position.x = v.left_pos * i.pvmax_pmx
    i2.right.position.x = v.right_pos * i.pvmax_pmx
    i2.ball.position.z = v.ballX * i.avmax_pmx
    i2.ball.position.x = v.ballY * i.avmax_pmx
}

let timerPurple = 0;
export function startGame() {
    i.scene.add(i2.plate, i2.left, i2.right, i2.top, i2.bot)
    i.scene.add(i2.ball)
    v.left_pos = v.right_pos = 0
    document.addEventListener("keydown", onDocumentKeyDown, true);
    document.addEventListener("keyup", onDocumentKeyUp, true);
    if (i2.interval.id === -1)
        i2.interval.id = setInterval(l2.gametick60, 1000 / 60)
    console.log('2P solo game: Start!')
}

export function reallyStart() {
    v.game_started = true
    l2.resetRound()
    l2.ball_drop.restart()
}


export function cleanUp() {
    if (i2.interval.id !== -1)
        clearInterval(i2.interval.id)
    i2.interval.id = -1
    l2.resetScore()
    l2.resetRound()
    v.game_started = false
    document.removeEventListener("keydown", onDocumentKeyDown, true)
    document.removeEventListener("keyup", onDocumentKeyUp, true)
    i.scene.remove(i2.plate, i2.left, i2.right, i2.top, i2.bot, i2.ball)
}

// Key listeners
function onDocumentKeyDown(event) {
    var key_code = event.which
    if (key_code === 65) { v.l_left_pressed = true }
    else if (key_code === 68) { v.l_right_pressed = true }
    // else if (key_code === 37) { v.r_left_pressed = true }
    // else if (key_code === 39) { v.r_right_pressed = true }
    else if (key_code === 80) { 
        if (i.debug) {
            if (!v.game_started) reallyStart()
            else v.game_running = !v.game_running
        }
    }
}
function onDocumentKeyUp(event) {
    var key_code = event.which
    if (key_code === 65) { v.l_left_pressed = false }
    else if (key_code === 68) { v.l_right_pressed = false }
    // else if (key_code === 37) { v.r_left_pressed = false }
    // else if (key_code === 39) { v.r_right_pressed = false }
}

let supposedXPurple;

function within2PI(initial){
    while (initial < 0)
        initial += Math.PI * 2;
    while (initial > Math.PI * 2)
        initial -= Math.PI * 2;
    return initial;
}

function predictBallXPurple() {
    //conversion from ball cooridnates to world coordinates
    //ball-x = world-z, ball-y = world-x
    //using world coordinates from now on
    let predictedX = v.ballY; // ball initial position
    let predictedDeltaX = -Math.cos(v.ball_direction) * v.ball_speed; // change in X-axis per step
    let deltaZ = -Math.sin(v.ball_direction) * v.ball_speed; // change in Z-axis per step
    let distanceRemaining = i.pos_max + v.ballX; // distance from paddle movement axis
    // let predictedDirection = v.ball_direction;
    if (distanceRemaining > i.pos_max * 2 || distanceRemaining < 0) // if beyond either paddle
        return 0;
    console.log("init dist:", distanceRemaining);
    while (distanceRemaining > 0) {
        predictedX += predictedDeltaX;
        if (predictedX < -i.pos_max || predictedX > i.pos_max) {
            // console.log("Ball hit the wall at X:", predictedX, "with distance to paddle:", distanceRemaining);
            // predictedDirection *= -1;
            predictedDeltaX *= -1;
        }
        if (predictedX < -i.pos_max) {
            predictedX = -i.pos_max;
        } else if (predictedX > i.pos_max) {
            predictedX = i.pos_max;
        }

        let effectiveDirection = within2PI(v.ball_direction);
        // distanceRemaining -= Math.abs((Math.cos(predictedDirection) * v.ball_speed));
        if (effectiveDirection > 0 && effectiveDirection < Math.PI)
            distanceRemaining += deltaZ;
        else if (effectiveDirection > Math.PI && effectiveDirection < Math.PI * 2)
            distanceRemaining -= deltaZ;
        else
            return 0;
        // console.log("dist now", distanceRemaining, "ball dir", v.ball_direction);
        if (distanceRemaining > i.pos_max * 2) // if beyond either paddle
            return 0;
    }
    return predictedX;
}


function aiMovePurple() {
    let predictedX;
    if (Date.now() - timerPurple > 1000) {
        predictedX = predictBallXPurple();
        supposedXPurple = predictedX;
        console.log("guessing, time now", Date.now());
        timerPurple = Date.now();
    }

    // console.log("pos is",v.right_pos, "supp is", supposedXPurple);
    if (v.right_pos > supposedXPurple) {
        v.r_left_pressed = true;
        v.r_right_pressed = false;
    } else if (v.right_pos < supposedXPurple) {
        v.r_left_pressed = false;
        v.r_right_pressed = true;
    }
    else{
        v.r_left_pressed = false;
        v.r_right_pressed = false;
    }
    // console.log("left pressed:", v.r_left_pressed, "right pressed:", v.r_right_pressed);
}