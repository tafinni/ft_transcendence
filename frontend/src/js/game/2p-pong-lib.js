import gsap from 'gsap'
import * as i from './include.js'
import * as i2 from './2p-pong-include.js'
import { vars as v } from './2p-pong-include.js'
import { sendResults, switchToIdle } from './main.js'
//import { DynamicReadUsage } from 'three'

export const ball_drop = gsap.to(i2.ball.position, { y: 0.1, duration: 0.7, paused: true, onComplete: () => {
    setTimeout(() => { v.game_running = true }, 500);
}})

var last_spd = Math.floor(v.ball_speed / 1000) 
export const tick = () => {
    if (last_spd !== Math.floor(v.ball_speed / 1000)) {
        console.log('ball_speed:', v.ball_speed)
        last_spd = Math.floor(v.ball_speed / 1000)
    }
    i2.left.position.x = v.left_pos * i.pvmax_pmx
    i2.right.position.x = v.right_pos * i.pvmax_pmx
    i2.ball.position.z = v.ballX * i.avmax_pmx
    i2.ball.position.x = v.ballY * i.avmax_pmx
}

export function randomizeBallDir2p() {
    v.ball_direction = (Math.random() < 0.5) ? Math.random() * 90 + 225 : Math.random() * 90 + 45
    // set always the same direction for testing purposes
    //v.ball_direction = Math.random() * 90 + 225
    v.ball_direction = 270
    v.ball_direction *= Math.PI / 180
}

export function gametick() {
    if (!v.game_running && v.game_started) {
        if (v.score_left > i.score_to_win || v.score_right > i.score_to_win) {
            if (v.gameover_timer++ > 360) switchToIdle()
            return
        }
    }
    if (v.ball_speed < i.ball_base_speed) v.ball_speed += 10
    if (v.l_left_pressed) v.left_pos -= i.player_speed
    if (v.l_right_pressed) v.left_pos += i.player_speed
    if (v.left_pos > i.paddle_max) v.left_pos = i.paddle_max
    else if (v.left_pos < -i.paddle_max) v.left_pos = -i.paddle_max
    if (v.r_left_pressed) v.right_pos -= i.player_speed
    if (v.r_right_pressed) v.right_pos += i.player_speed
    if (v.right_pos > i.paddle_max) v.right_pos = i.paddle_max
    else if (v.right_pos < -i.paddle_max) v.right_pos = -i.paddle_max
    if (!v.game_started || !v.game_running) return
    v.ballX -= v.ball_speed * Math.sin(v.ball_direction)
    v.ballY -= v.ball_speed * Math.cos(v.ball_direction)
    if (!v.ball_passed && (v.ballX > i.ball_max || v.ballX < -i.ball_max) && checkPaddleHit()) {
        if (v.ballX > 0) {
            v.ball_direction = (Math.PI - v.ball_direction) - Math.PI
            v.ballX = i.ball_max - (v.ballX - i.ball_max)
        }
        else {
            v.ball_direction = 2 * Math.PI - v.ball_direction
            v.ballX = -i.ball_max - (v.ballX + i.ball_max)
        }
        v.ball_direction -= v.bounce_distance / i.paddle_halfwidth * Math.PI / 4
        v.ball_speed += i.ball_increase_speed
    }
    if (!v.ball_passed && v.ballY > i.ball_max) {
        v.ball_direction = Math.PI - v.ball_direction
    } else if (!v.ball_passed && v.ballY < -i.ball_max) {
        v.ball_direction = Math.PI - v.ball_direction
    }
    if (v.ball_passed && v.ball_passed_timer++ > 200) endRound()
}

function checkPaddleHit() {
    if (v.ballX > 0 && Math.abs(v.bounce_distance = v.left_pos - v.ballY) < i.paddle_halfwidth)
        return true
    else if (v.ballX < 0 && Math.abs(v.bounce_distance = v.right_pos - v.ballY) < i.paddle_halfwidth)
        return true
    if (v.ballX > 0) addScore('right')
    else addScore('left')
    return (v.ball_passed = true, false)
}

function endRound() {
    v.game_running = false
    if (v.score_right > i.score_to_win || v.score_left > i.score_to_win)
        return
    randomizeBallDir2p()
    resetRound()
    ball_drop.restart()
}

export function resetRound() {
    v.ball_passed = v.game_running = false
    v.ballX = v.ballY = v.ball_passed_timer = 0
    v.ball_speed = i.ball_base_speed / 2
    i2.ball.position.y = 5
}

function addScore(player) {
    if (player === 'left') {
        if (v.score_left === v.score_to_win) {
            console.log('victory')
            showVictory()
            return
        }
        const score_clone = i2.score.clone()
        score_clone.name = "score"
        score_clone.material = i2.score.material.clone()
        score_clone.material.color = i2.left.material.color.clone()
        score_clone.position.set(-1.8 + 0.25 * v.score_left, 0, 2.25)
        i.scene.add(score_clone)
        v.score_left++
    }
    else if (player === 'right') {
        if (v.score_right === v.score_to_win) {
            console.log('loss')
            showLoss()
            return
        }
        const score_clone = i2.score.clone()
        score_clone.name = "score"
        score_clone.material = i2.score.material.clone()
        score_clone.material.color = i2.right.material.color.clone()
        score_clone.position.set(1.8 - 0.25 * v.score_right, 0, -2.25)
        i.scene.add(score_clone)
        v.score_right++
    }
}

function showVictory() {
    i.win_text.material.color = i2.left.material.color.clone()
    i.win_text.lookAt(i.gcamera.position)
    i.scene.add(i.win_text)
    v.score_left++
    sendResults(v.score_left, v.score_right, true)
}

function showLoss() {
    i.lose_text.material.color = i2.right.material.color.clone()
    i.lose_text.lookAt(i.gcamera.position)
    i.scene.add(i.lose_text)
    v.score_right++
    sendResults(v.score_left, v.score_right, true)
}

export function resetScore() {
    v.score_left = v.score_right = 0
    i.scene.remove(i.win_text)
    i.scene.remove(i.lose_text)
    while (i.scene.getObjectByName("score"))
        i.scene.remove(i.scene.getObjectByName("score"))
}