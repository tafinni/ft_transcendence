import * as THREE from 'three'
import gsap from 'gsap'
import * as i from './include.js'
import * as i2 from './2p-pong-include.js'
import { vars as v } from './2p-pong-include.js'
import { sendResults, switchToIdle } from './main.js'
//import { DynamicReadUsage } from 'three'

export const ball_drop = gsap.to(i2.ball.position, { y: 0.1, duration: 0.7, paused: true, onComplete: () => {
    setTimeout(() => { v.game_running = true }, 500);
}})

export function randomizeBallDir2p() {
    v.ball_direction = (Math.random() < 0.5) ? Math.random() * 90 + 225 : Math.random() * 90 + 45
    // set always the same direction for testing purposes
    //v.ball_direction = Math.random() * 90 + 225
    //v.ball_direction = 270
    v.ball_direction *= Math.PI / 180
}

var ticknbr = 0

export function gametick60() {
    if (!v.game_running && v.game_started) {
        if (v.score_left > i.score_to_win || v.score_right > i.score_to_win) {
            if (v.gameover_timer++ > i.idle_timer) switchToIdle()
            return
        }
    }
    if (v.l_left_pressed) v.left_pos -= i.player_speed
    if (v.l_right_pressed) v.left_pos += i.player_speed
    if (v.left_pos > i.paddle_max) v.left_pos = i.paddle_max
    else if (v.left_pos < -i.paddle_max) v.left_pos = -i.paddle_max
    if (v.ai_right !== null) {
        ticknbr++;
        //console.log(v.ai_right.aiMove(v.right_pos))
        v.right_pos -= v.ai_right.aiMove()
        v.right_pos += v.ai_right.aiMove(v.right_pos) * i.player_speed
        //console.log(v.right_pos)
        //console.assert(typeof v.right_pos !== 'number', 'right_pos is NaN!!!', ticknbr)
    } else {
        if (v.r_left_pressed) v.right_pos -= i.player_speed
        if (v.r_right_pressed) v.right_pos += i.player_speed
        if (v.right_pos > i.paddle_max) v.right_pos = i.paddle_max
        else if (v.right_pos < -i.paddle_max) v.right_pos = -i.paddle_max
    }
    if (!v.game_started || !v.game_running) return
    if (v.ball_speed < i.ball_base_speed) {
        v.ball_speed += Math.floor((i.ball_base_speed - v.ball_speed) / 100) * 10
        if (v.ball_speed > (i.ball_base_speed - 250)) v.ball_speed = i.ball_base_speed
    }
    v.ballX -= v.ball_speed * Math.sin(v.ball_direction)
    v.ballY -= v.ball_speed * Math.cos(v.ball_direction)
    if (!v.ball_passed && (v.ballX > i.ball_max || v.ballX < -i.ball_max) && checkPaddleHit()) {
        if (v.ballX > 0) {
            v.ball_direction = (Math.PI - v.ball_direction) - Math.PI
            v.ballX = i.ball_max - (v.ballX - i.ball_max)
            v.ball_direction -= v.bounce_distance / i.paddle_halfwidth * Math.PI / 4
        }
        else {
            v.ball_direction = (2 * Math.PI) - v.ball_direction
            v.ballX = -i.ball_max - (v.ballX + i.ball_max)
            v.ball_direction += v.bounce_distance / i.paddle_halfwidth * Math.PI / 4
        }
        v.ball_speed += i.ball_increase_speed
        v.bounced = true
    }
    if (!v.ball_passed && v.ballY > i.ball_max) {
        v.ball_direction = Math.PI - v.ball_direction
        v.ballY = i.ball_max - (v.ballY - i.ball_max)
        v.bounced = true
    } else if (!v.ball_passed && v.ballY < -i.ball_max) {
        v.ball_direction = Math.PI - v.ball_direction
        v.ballY = -i.ball_max - (v.ballY + i.ball_max)
        v.bounced = true
    }
    if (v.bounced) {
        if (v.ball_direction < 0)
            v.ball_direction += 2 * Math.PI
        else if (v.ball_direction > 2 * Math.PI)
            v.ball_direction += 2 * Math.PI
        v.bounced = false
    }
    console.assert(v.ball_direction >= 0 && v.ball_direction <= 2 * Math.PI,
        'ball direction outside normal variation: ' + v.ball_direction)
    if (v.ball_passed && ++v.ball_passed_timer > i.aftergame_timer) endRound() 
}

export function checkPaddleHit() {
    if (v.ballX > 0 && Math.abs(v.bounce_distance = v.left_pos - v.ballY) < i.paddle_halfwidth)
        return true
    else if (v.ballX < 0 && Math.abs(v.bounce_distance = v.right_pos - v.ballY) < i.paddle_halfwidth)
        return true
    if (v.ballX > 0) addScore('right')
    else addScore('left')
    return (v.ball_passed = true, false)
}

export function endRound() {
    v.game_running = false
    if (v.score_right === i.score_to_win || v.score_left === i.score_to_win)
        return
    resetRound()
    startRound(0.5)
}

export function startRound(speed) {
    if (typeof speed !== 'number') {
        console.error('startRound parameter was not a number:', speed)
        speed = 1.1
    }
    i.three_t.quaternion.setFromUnitVectors(new THREE.Vector3(-1, -1, -1).normalize(), new THREE.Vector3(0, 0, 0))
    i.two_t.quaternion.setFromUnitVectors(new THREE.Vector3(-1, -1, -1).normalize(), new THREE.Vector3(0, 0, 0))
    i.one_t.quaternion.setFromUnitVectors(new THREE.Vector3(-1, -1, -1).normalize(), new THREE.Vector3(0, 0, 0))
    i.three_t.rotation.y += Math.PI * 3 / 4
    i.two_t.rotation.y += Math.PI * 3 / 4
    i.one_t.rotation.y += Math.PI * 3 / 4
    i.start_t.lookAt(i.renderer.camera.position)
    gsap.to(i.three_t.rotation, { y: (Math.PI * 11)/4, duration: speed, delay: 0.3, ease: "none", onComplete: () => {
        i.scene.remove(i.three_t)
        gsap.to(i.two_t.rotation, { y: (Math.PI * 11)/4, duration: speed, ease: "none", onComplete: () => {
            i.scene.remove(i.two_t)
            gsap.to(i.one_t.rotation, { y: (Math.PI * 11)/4, duration: speed, ease: "none", onComplete: () => {
                i.scene.remove(i.one_t)
                i.scene.add(i.start_t)
                setTimeout(() => {
                    i.scene.remove(i.start_t)
                    ball_drop.restart()
                }, 250)
            }})
            i.scene.add(i.one_t)
        }})
        i.scene.add(i.two_t)
    }})
    i.scene.add(i.three_t)
    //console.log()
    //ball_drop.restart()
}

export function resetRound() {
    v.ball_passed = v.game_running = false
    v.ballX = v.ballY = v.ball_passed_timer = 0
    v.ball_speed = i.ball_start_speed
    randomizeBallDir2p()
    i2.ball.position.y = 5
}

function addScore(player) {
    if (player === 'left') {
        if (++v.score_left === v.score_to_win) {
            console.log('victory')
            showVictory()
            return
        }
        const score_clone = i2.score.clone()
        score_clone.name = "score"
        score_clone.material = i2.score.material.clone()
        score_clone.material.color = i2.left.material.color.clone()
        score_clone.position.set(-1.7 + 0.25 * v.score_left, 0, 2.25)
        i.scene.add(score_clone)
        // v.score_left++
    }
    else if (player === 'right') {
        if (++v.score_right === v.score_to_win) {
            console.log('loss')
            showLoss()
            return
        }
        const score_clone = i2.score.clone()
        score_clone.name = "score"
        score_clone.material = i2.score.material.clone()
        score_clone.material.color = i2.right.material.color.clone()
        score_clone.position.set(1.7 - 0.25 * v.score_right, 0, -2.25)
        i.scene.add(score_clone)
        // v.score_right++
    }
}

function showVictory() {
    i.win_text.material.color = i2.left.material.color.clone()
    i.win_text.lookAt(i.renderer.camera.position)
    i.scene.add(i.win_text)
    //console.log('vic left', v.score_left, 'right', v.score_right)
    sendResults(v.score_left, v.score_right, true)
}

function showLoss() {
    i.lose_text.material.color = i2.right.material.color.clone()
    i.lose_text.lookAt(i.renderer.camera.position)
    i.scene.add(i.lose_text)
    //console.log('loss left', v.score_left, 'right', v.score_right)
    sendResults(v.score_left, v.score_right, true)
}

export function resetScore() {
    v.score_left = v.score_right = 0
    i.scene.remove(i.win_text)
    i.scene.remove(i.lose_text)
    while (i.scene.getObjectByName("score"))
        i.scene.remove(i.scene.getObjectByName("score"))
}