import gsap from 'gsap'

import * as t from './game.defs.js'
import * as d from './local-4p.defs.js'
import { vars as v }  from './local-4p.defs.js'
import { switchToIdle, sendResults } from './game.js'
import { loadContent } from './router.js'
import { showAlert } from './index.js'

const plate = d.plate; const left = d.left; const right = d.right; const top = d.top;
const bot = d.bot; const ball = d.ball; const score = d.score;
let ball_drop = gsap.to(ball.position, { y: 0.1, duration: 0.3, paused: true, onComplete: () => {
    v.game_running = true
}})

export const camera = t.gcamera
export const controls = t.gcontrols
export const tick = () => {
    left.position.x = v.left_pos * d.pvmax_pmx
    right.position.x = v.right_pos * d.pvmax_pmx
    top.position.z = v.top_pos * d.pvmax_pmx
    bot.position.z = v.bot_pos * d.pvmax_pmx
    ball.position.z = v.ballX * d.avmax_pmx
    ball.position.x = v.ballY * d.avmax_pmx
}

function randomizeBallDir() {
    if (v.players_remaining === 4) v.ball_direction = Math.random() * 360
    else {
        const ranges = []
        if (v.lives_right !== 0) ranges.push(45)
        if (v.lives_bot !== 0) ranges.push(135)
        if (v.lives_left !== 0) ranges.push(225)
        if (v.lives_top !== 0) ranges.push(315)
        v.ball_direction = ranges[Math.floor(Math.random() * v.players_remaining)] + Math.random() * 90
        if (v.ball_direction >= 360) v.ball_direction -= 360
    }
    // set always the same direction for testing purposes
    //v.ball_direction = 255
    v.ball_direction *= Math.PI / 180
}

function gametick() {
    if (!v.game_running && v.game_started) {
        if (v.players_remaining === 1) {
            if (v.gameover_timer++ > 360)
                {
                    clearInterval(gamePlay);
                    v.reset();
                    switchToIdle()
                }
            return
        }
    }
    // console.log("ball pos is", v.ballX, v.ballY, "dir is ", v.ball_direction, "speed is", v.ball_speed);
    v.left_pos = movePlayer(v.left_pos, v.l_left_pressed, v.l_right_pressed)
    v.right_pos = movePlayer(v.right_pos, v.r_left_pressed, v.r_right_pressed)
    v.top_pos = movePlayer(v.top_pos, v.t_left_pressed, v.t_right_pressed)
    v.bot_pos = movePlayer(v.bot_pos, v.b_left_pressed, v.b_right_pressed)
    if (!v.game_started || !v.game_running) return
    v.ballX -= v.ball_speed * Math.sin(v.ball_direction)
    v.ballY -= v.ball_speed * Math.cos(v.ball_direction)
    if (!v.ball_passed && v.ballX > d.ball_max && (v.lives_left === 0 || checkPaddleHit2('left', v.ballY, v.left_pos))) {
        v.ball_direction = (Math.PI - v.ball_direction) - Math.PI
        v.ballX = d.ball_max - (v.ballX - d.ball_max)
        if (v.lives_left !== 0) {
            v.ball_direction -= v.bounce_distance / d.paddle_halfwidth * Math.PI / 4
            v.ball_speed += d.ball_increase_speed / 2
        }
    }
    else if (!v.ball_passed && v.ballX < -d.ball_max && (v.lives_right === 0 || checkPaddleHit2('right', v.ballY, v.right_pos))) {
        v.ball_direction = 2 * Math.PI - v.ball_direction
        v.ballX = -d.ball_max - (v.ballX + d.ball_max)
        if (v.lives_right !== 0) {
            v.ball_direction -= v.bounce_distance / d.paddle_halfwidth * Math.PI / 4
            v.ball_speed += d.ball_increase_speed / 2
        }
    }
    if (!v.ball_passed && v.ballY > d.ball_max && (v.lives_bot === 0 || checkPaddleHit2('bot', v.ballX, v.bot_pos))) {
        v.ball_direction = Math.PI - v.ball_direction
        v.ballY = d.ball_max - (v.ballY - d.ball_max)
        if (v.lives_bot !== 0) {
            v.ball_direction += v.bounce_distance / d.paddle_halfwidth * Math.PI / 4
            v.ball_speed += d.ball_increase_speed / 2
        }
    }
    else if (!v.ball_passed && v.ballY < -d.ball_max && (v.lives_top === 0 || checkPaddleHit2('top', v.ballX, v.top_pos))) {
        v.ball_direction = Math.PI - v.ball_direction
        v.ballY = -d.ball_max - (v.ballY + d.ball_max)
        if (v.lives_top !== 0) {
            v.ball_direction -= v.bounce_distance / d.paddle_halfwidth * Math.PI / 4
            v.ball_speed += d.ball_increase_speed / 2
        }
    }
    if (v.ball_passed && v.ball_passed_timer++ > 200) endRound()
}
// run gametick at 120 Hz
let gamePlay;

function movePlayer(pos, up, down) {
    if (up && down) return pos
    if (up) {
        pos -= d.player_speed
        if (pos < -d.paddle_max) pos = -d.paddle_max
    }
    else if (down) {
        pos += d.player_speed
        if (pos > d.paddle_max) pos = d.paddle_max
    }
    return pos
}

function checkPaddleHit2(player, ball_pos, plr_pos) {
    if (Math.abs(v.bounce_distance = plr_pos - ball_pos) < d.paddle_halfwidth)
        return true
    removeLife(player)
    return (v.ball_passed = true, false)
}

function endRound() {
    v.game_running = false
    if (v.players_remaining === 1)
        return
    randomizeBallDir()
    resetRound()
    ball_drop.restart()
}

function resetRound() {
    v.ball_passed = v.game_running = false
    v.ballX = v.ballY = v.ball_passed_timer = 0
    v.ball_speed = d.ball_base_speed
    ball.position.y = 5
}

function createScore(player, color, vec1, vec2) {
    const score1 = score.clone()
    score1.name = player + '_score1'
    score1.material = score.material.clone()
    score1.material.color = color
    const score2 = score1.clone()
    score2.name = player + '_score2'
    score1.position.set(vec1.x, vec1.y, vec1.z)
    score2.position.set(vec2.x, vec2.y, vec2.z)
    d.obj_stack.push(score1, score2)
    t.scene.add(score1, score2)
}

function addLives() {
    const horiz = 2.3
    const vert = 1.7
    const spc = 0.3
    createScore('l', left.material.color.clone(), { x: -vert, y: 0, z: horiz }, { x: -vert + spc, y: 0, z: horiz })
    createScore('r', right.material.color.clone(), { x: vert, y: 0, z: -horiz }, { x: vert - spc, y: 0, z: -horiz })
    createScore('t', top.material.color.clone(), { x: -horiz, y: 0, z: -vert }, { x: -horiz, y: 0, z: -vert + spc })
    createScore('b', bot.material.color.clone(), { x: horiz, y: 0, z: vert }, { x: horiz, y: 0, z: vert - spc })
    console.log(d.obj_stack)
}

function removeLife(player) {
    switch (player) {
        case 'left':
            if ((v.lives_left = --v.player_status.filter(i => i.obj === left)[0].lives) === 0) 
                removePlayer('left')
            else
            t.scene.remove(t.scene.getObjectByName('l_score' + String.fromCharCode(48 + d.score_to_win - v.lives_left)))
        break
        case 'right':
            if ((v.lives_right = --(v.player_status.filter(i => i.obj === right)[0].lives)) === 0) 
                removePlayer('right')
            else
            t.scene.remove(t.scene.getObjectByName('r_score' + String.fromCharCode(48 + d.score_to_win - v.lives_right)))
        break
        case 'top':
            if ((v.lives_top = --v.player_status.filter(i => i.obj === top)[0].lives) === 0) 
                removePlayer('top')
            else
                t.scene.remove(t.scene.getObjectByName('t_score' + String.fromCharCode(48 + d.score_to_win - v.lives_top)))
            break
        case 'bot':
            if ((v.lives_bot = --v.player_status.filter(i => i.obj === bot)[0].lives) === 0) 
                removePlayer('bot')
            else
                t.scene.remove(t.scene.getObjectByName('b_score' + String.fromCharCode(48 + d.score_to_win - v.lives_bot)))
            break
    }
}

function removePlayer(player) {
    console.log('removePlayer:', player)
    if (--v.players_remaining === 1) {
        let winner;
        if (v.lives_right)
            winner = v.nameRight;
        else if (v.lives_bot)
            winner = v.nameBottom;
        else if (v.lives_left)
            winner = sessionStorage.getItem("username");
        else if (v.lives_top)
            winner = v.nameTop;
        showVictory(winner)
    } else {
        const wall = (player === 'left' || player === 'right') ? d.h_wall : d.v_wall
        const new_wall = wall.clone()
        new_wall.material = wall.material
        new_wall.material.color = wall.material.color
        console.log(player, "lost last life");
        if (player === 'left') {
            new_wall.position.set(0, 5, 2.1)
            gsap.to(left.position, { z: 5, duration: 0.5, onComplete: () => {
                t.scene.remove(left)
                left.position.z = 2.1
            }})
        }
        else if (player === 'right') {
            new_wall.position.set(0, 5, -2.1)
            gsap.to(right.position, { z: -5, duration: 0.5, onComplete: () => {
                t.scene.remove(right)
                right.position.z = -2.1
            }})
        }
        else if (player === 'top') {
            new_wall.position.set(-2.1, 5, 0)
            t.scene.remove(top)
            gsap.to(top.position, { x: -5, duration: 0.5, onComplete: () => {
                t.scene.remove(top)
                top.position.x = -2.1
            }})
        }
        else if (player === 'bot') {
            new_wall.position.set(2.1, 5, 0)
            gsap.to(bot.position, { x: 5, duration: 0.5, onComplete: () => {
                t.scene.remove(bot)
                bot.position.x = 2.1
            }})
        }
        gsap.to(new_wall.position, { y: 0.0625, duration: 0.5 })
        t.scene.add(new_wall)
    }
}

function showVictory(winner) {
    t.win_text.material.color = v.player_status.filter(i => i.lives !== 0)[0].obj.material.color.clone()
    t.win_text.lookAt(t.gcamera.position)
    t.scene.add(t.win_text)
    let message;
    message = "Winner is " + winner;
    showAlert(message, 'warning');
    loadContent('home');
}

function resetScore() {
    t.scene.remove(t.win_text)
    t.scene.remove(t.lose_text)
    while (d.obj_stack.length > 0)
        t.scene.remove(d.obj_stack.pop())
    console.log('SCORE RESET')
}

export function startGame() {
    t.scene.add(plate, left, right, top, bot)
    t.scene.add(d.corner, d.corner2, d.corner3, d.corner4)
    t.scene.add(ball)
    document.addEventListener("keydown", onDocumentKeyDown, true);
    document.addEventListener("keyup", onDocumentKeyUp, true);
    const playerselect = document.getElementById("playerSelectForm")
    const form1 = document.getElementById("username1");
    const form2 = document.getElementById("username2");
    const form3 = document.getElementById("username3");
    const instb4 = document.getElementById("instruction-blue-4");
    const instp4 = document.getElementById("instruction-purple-4");
    const instr4 = document.getElementById("instruction-red-4");
    instb4.hidden = true;
    instp4.hidden = true;
    instr4.hidden = true;
    playerselect.addEventListener("click", (e) => {
        e.preventDefault()
        v.nameTop = form1.value;
        v.nameRight = form2.value;
        v.nameBottom = form3.value;
        if (v.nameTop != "")
            form1.remove();
        if (v.nameRight != "")
            form2.remove();
        if (v.nameBottom != "")
            form3.remove();
        if (v.nameTop != "" && v.nameRight != "" && v.nameBottom != "")
        {
            console.log("users are", v.nameTop, v.nameRight, v.nameBottom);
            clearInterval(gamePlay);
            gamePlay = setInterval(gametick, 1000 / 120)
            reallyStart()
            playerselect.remove();
            instb4.innerText = `${v.nameTop} N - M`;
            instb4.hidden = false;
            instp4.innerText = `${v.nameRight} - - +`;
            instp4.hidden = false;
            instr4.innerText = `${v.nameBottom} <- - ->`;
            instr4.hidden = false;
        }
    })
}

export function cleanUp() {
    resetScore()
    resetRound()
    v.game_started = false
    document.removeEventListener("keydown", onDocumentKeyDown, true)
    document.removeEventListener("keyup", onDocumentKeyUp, true)
    t.scene.remove(plate, left, right, top, bot, ball)
    t.scene.remove(d.corner, d.corner2, d.corner3, d.corner4)
    while (t.scene.getObjectByName('wall'))
        t.scene.remove(t.scene.getObjectByName('wall'))
}

// Key listeners
function onDocumentKeyDown(event) {
    var key_code = event.which
    if (key_code === 65) { v.l_left_pressed = true }
    else if (key_code === 90) { v.l_right_pressed = true }
    else if (key_code === 78) { v.t_right_pressed = true }
    else if (key_code === 77) { v.t_left_pressed = true }
    else if (key_code === 37) { v.b_right_pressed = true }
    else if (key_code === 39) { v.b_left_pressed = true }
    else if (key_code === 109) { v.r_left_pressed = true }
    else if (key_code === 107) { v.r_right_pressed = true }
    // else if (key_code === 80) { 
    //     if (!v.game_started) reallyStart()
    //     v.game_running = !v.game_running
    // }
}
function onDocumentKeyUp(event) {
    var key_code = event.which
    if (key_code === 65) { v.l_left_pressed = false }
    else if (key_code === 90) { v.l_right_pressed = false }
    else if (key_code === 78) { v.t_right_pressed = false }
    else if (key_code === 77) { v.t_left_pressed = false }
    else if (key_code === 37) { v.b_right_pressed = false }
    else if (key_code === 39) { v.b_left_pressed = false }
    else if (key_code === 109) { v.r_left_pressed = false }
    else if (key_code === 107) { v.r_right_pressed = false }
}
function reallyStart() {
    v.reset()
    addLives()
    randomizeBallDir()
    v.game_started = true
    ball_drop.restart()
}