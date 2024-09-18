import gsap from 'gsap'
import * as i from './include.js'
import * as i4 from './4p-pong-include.js'
import { vars as v } from './4p-pong-include.js'
import { sendResults, switchToIdle } from './main.js'

export const ball_drop = gsap.to(i4.ball.position, { y: 0.1, duration: 0.3, paused: true, onComplete: () => {
    setTimeout(() => { v.game_running = true }, 200);
}})

export const tick = () => {
    i4.left.position.x = v.left_pos * i.pvmax_pmx
    i4.right.position.x = v.right_pos * i.pvmax_pmx
    i4.top.position.z = v.top_pos * i.pvmax_pmx
    i4.bot.position.z = v.bot_pos * i.pvmax_pmx
    i4.ball.position.z = v.ballX * i.avmax_pmx
    i4.ball.position.x = v.ballY * i.avmax_pmx
}

export function randomizeBallDir() {
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

export function gametick60() {
    if (!v.game_running && v.game_started) {
        if (v.players_remaining === 1) {
            if (v.gameover_timer++ > i.idle_timer)
                switchToIdle()
            return
    }   }
    v.left_pos = movePlayer(v.left_pos, v.l_left_pressed, v.l_right_pressed)
    v.right_pos = movePlayer(v.right_pos, v.r_left_pressed, v.r_right_pressed)
    v.top_pos = movePlayer(v.top_pos, v.t_left_pressed, v.t_right_pressed)
    v.bot_pos = movePlayer(v.bot_pos, v.b_left_pressed, v.b_right_pressed)
    if (!v.game_started || !v.game_running) return
    if (v.ball_speed < i.ball_base_speed) {
        v.ball_speed += Math.floor((i.ball_base_speed - v.ball_speed) / 100) * 10
        if (v.ball_speed > (i.ball_base_speed - 250)) v.ball_speed = i.ball_base_speed
    }
    v.ballX -= v.ball_speed * Math.sin(v.ball_direction)
    v.ballY -= v.ball_speed * Math.cos(v.ball_direction)
    if (!v.ball_passed && v.ballX > i.ball_max && (v.lives_left === 0 || checkPaddleHit2('left', v.ballY, v.left_pos))) {
        v.ball_direction = (Math.PI - v.ball_direction) - Math.PI
        v.ballX = i.ball_max - (v.ballX - i.ball_max)
        if (v.lives_left !== 0) {
            v.ball_direction -= v.bounce_distance / i.paddle_halfwidth * Math.PI / 4
            v.ball_speed += i.ball_increase_speed / 2
        }
    }
    else if (!v.ball_passed && v.ballX < -i.ball_max && (v.lives_right === 0 || checkPaddleHit2('right', v.ballY, v.right_pos))) {
        v.ball_direction = 2 * Math.PI - v.ball_direction
        v.ballX = -i.ball_max - (v.ballX + i.ball_max)
        if (v.lives_right !== 0) {
            v.ball_direction -= v.bounce_distance / i.paddle_halfwidth * Math.PI / 4
            v.ball_speed += i.ball_increase_speed / 2
        }
    }
    if (!v.ball_passed && v.ballY > i.ball_max && (v.lives_bot === 0 || checkPaddleHit2('bot', v.ballX, v.bot_pos))) {
        v.ball_direction = Math.PI - v.ball_direction
        v.ballY = i.ball_max - (v.ballY - i.ball_max)
        if (v.lives_bot !== 0) {
            v.ball_direction += v.bounce_distance / i.paddle_halfwidth * Math.PI / 4
            v.ball_speed += i.ball_increase_speed / 2
        }
    }
    else if (!v.ball_passed && v.ballY < -i.ball_max && (v.lives_top === 0 || checkPaddleHit2('top', v.ballX, v.top_pos))) {
        v.ball_direction = Math.PI - v.ball_direction
        v.ballY = -i.ball_max - (v.ballY + i.ball_max)
        if (v.lives_top !== 0) {
            v.ball_direction -= v.bounce_distance / i.paddle_halfwidth * Math.PI / 4
            v.ball_speed += i.ball_increase_speed / 2
        }
    }
    if (v.ball_passed && v.ball_passed_timer++ > i.aftergame_timer) endRound()
}

function movePlayer(pos, up, down) {
    if (up && down) return pos
    if (up) {
        pos -= i.player_speed
        if (pos < -i.paddle_max) pos = -i.paddle_max
    }
    else if (down) {
        pos += i.player_speed
        if (pos > i.paddle_max) pos = i.paddle_max
    }
    return pos
}

function checkPaddleHit2(player, ball_pos, plr_pos) {
    if (Math.abs(v.bounce_distance = plr_pos - ball_pos) < i.paddle_halfwidth)
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

export function resetRound() {
    v.ball_passed = v.game_running = false
    v.ballX = v.ballY = v.ball_passed_timer = 0
    v.ball_speed = i.ball_start_speed
    i4.ball.position.y = 5
}

export function createScore(player, color, vec1, vec2) {
    const score1 = i4.score.clone()
    score1.name = player + '_score1'
    score1.material = i4.score.material.clone()
    score1.material.color = color
    const score2 = score1.clone()
    score2.name = player + '_score2'
    score1.position.set(vec1.x, vec1.y, vec1.z)
    score2.position.set(vec2.x, vec2.y, vec2.z)
    i.obj_stack.push(score1, score2)
    i.scene.add(score1, score2)
}

export function addLives() {
    const horiz = 2.3
    const vert = 1.7
    const spc = 0.3
    createScore('l', i4.left.material.color.clone(), { x: -vert, y: 0, z: horiz }, { x: -vert + spc, y: 0, z: horiz })
    createScore('r', i4.right.material.color.clone(), { x: vert, y: 0, z: -horiz }, { x: vert - spc, y: 0, z: -horiz })
    createScore('t', i4.top.material.color.clone(), { x: -horiz, y: 0, z: -vert }, { x: -horiz, y: 0, z: -vert + spc })
    createScore('b', i4.bot.material.color.clone(), { x: horiz, y: 0, z: vert }, { x: horiz, y: 0, z: vert - spc })
}

export function removeLife(player) {
    switch (player) {
        case 'left':
            if ((v.lives_left = --(v.player_status.filter(x => x.obj.name === 'left')[0].lives)) === 0) 
                removePlayer('left')
            else
                i.scene.remove(i.scene.getObjectByName('l_score' + String.fromCharCode(48 + i.score_to_win - v.lives_left)))
            break
        case 'right':
            if ((v.lives_right = --(v.player_status.filter(x => x.obj.name === 'right')[0].lives)) === 0) 
                removePlayer('right')
            else
                i.scene.remove(i.scene.getObjectByName('r_score' + String.fromCharCode(48 + i.score_to_win - v.lives_right)))
            break
        case 'top':
            if ((v.lives_top = --(v.player_status.filter(x => x.obj.name === 'top')[0].lives)) === 0) 
                removePlayer('top')
            else
                i.scene.remove(i.scene.getObjectByName('t_score' + String.fromCharCode(48 + i.score_to_win - v.lives_top)))
            break
        case 'bot':
            if ((v.lives_bot = --(v.player_status.filter(x => x.obj === i4.bot)[0].lives)) === 0) 
                removePlayer('bot')
            else
                i.scene.remove(i.scene.getObjectByName('b_score' + String.fromCharCode(48 + i.score_to_win - v.lives_bot)))
            break
    }
}

function removePlayer(player) {
    console.log('removePlayer:', player)
    if (--v.players_remaining === 1) {
        showVictory()
    } else {
        const wall = (player === 'left' || player === 'right') ? i4.h_wall : i4.v_wall
        const new_wall = wall.clone()
        new_wall.material = wall.material
        new_wall.material.color = wall.material.color
        if (player === 'left') {
            new_wall.position.set(0, 5, 2.1)
            gsap.to(i4.left.position, { z: 5, duration: 0.5, onComplete: () => {
                i.scene.remove(i4.left)
                i4.left.position.z = 2.1
            }})
        }
        else if (player === 'right') {
            new_wall.position.set(0, 5, -2.1)
            gsap.to(i4.right.position, { z: -5, duration: 0.5, onComplete: () => {
                i.scene.remove(i4.right)
                i4.right.position.z = -2.1
            }})
        }
        else if (player === 'top') {
            new_wall.position.set(-2.1, 5, 0)
            gsap.to(i4.top.position, { x: -5, duration: 0.5, onComplete: () => {
                i.scene.remove(i4.top)
                i4.top.position.x = -2.1
            }})
        }
        else if (player === 'bot') {
            new_wall.position.set(2.1, 5, 0)
            gsap.to(i4.bot.position, { x: 5, duration: 0.5, onComplete: () => {
                i.scene.remove(i4.bot)
                i4.bot.position.x = 2.1
            }})
        }
        gsap.to(new_wall.position, { y: 0.0625, duration: 0.5 })
        i.scene.add(new_wall)
    }
}

function showVictory() {
    i.win_text.material.color = v.player_status.filter(i => i.lives !== 0)[0].obj.material.color.clone()
    i.win_text.lookAt(i.gcamera.position)
    i.scene.add(i.win_text)
    sendResults(v.score_left, v.score_right, true)
}

export function resetScore() {
    i.scene.remove(i.win_text)
    i.scene.remove(i.lose_text)
    while (i.obj_stack.length > 0)
        i.scene.remove(i.obj_stack.pop())
}