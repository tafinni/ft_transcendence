import * as THREE from 'three'
import * as i from './include'

export var interval = { id: -1 }
export const vars = {
    left_pos: 0,
    right_pos: 0,
    l_left_pressed: false,
    l_right_pressed: false,
    r_left_pressed: false,
    r_right_pressed: false,
    game_started: false,
    game_running: false,
    score_to_win: i.score_to_win,
    score_left: 0,
    score_right: 0,
    ballX: 0,
    ballY: 0,
    ball_direction: 0,
    ball_speed: i.ball_base_speed,
    bounce_distance: 0,
    ball_passed: false,
    ball_passed_timer: 0,
    gameover_timer: 0,
    oppIsHuman:true,
    reset: function() { resetvars() }
}
const default_vars = JSON.parse(JSON.stringify(vars))
function resetvars() {
    Object.assign(vars, default_vars)
}

export const plate = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.01, 4),
    new THREE.MeshBasicMaterial()
)
plate.name = "plate"
plate.material.color = new THREE.Color('grey')
plate.material.transparent = true
plate.material.opacity = 0.25
plate.position.set(0, 0.005, 0)
export const left = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.2, 0.2),
    new THREE.MeshBasicMaterial()
)
left.name = "left"
left.material.color = new THREE.Color('yellow')
left.position.set(0, 0.1, 2.1)
export const right = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.2, 0.2),
    new THREE.MeshBasicMaterial()
)
right.name = "right"
right.material.color = new THREE.Color('purple')
right.position.set(0, 0.1, -2.1)
export const top = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.125, 4),
    new THREE.MeshBasicMaterial()
)
top.name = "top"
top.material.color = new THREE.Color('darkblue')
top.position.set(-2.1, 0.0625, 0)
export const bot = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.125, 4),
    new THREE.MeshBasicMaterial()
)
bot.name = "bot"
bot.material.color = new THREE.Color('darkblue')
bot.position.set(2.1, 0.0625, 0)
export const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshNormalMaterial()
)
ball.name = "ball"
ball.position.set(0, 5, 0)
export const score = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshBasicMaterial()
)
score.name = "score_original"
score.position.set(20, 0, 0)

//debug
// export const ball2 = new THREE.Mesh(
//     new THREE.SphereGeometry(0.1, 16, 16),
//     new THREE.MeshNormalMaterial()
// )
// ball2.name = "ball"
// ball2.position.set(1000000 * i.avmax_pmx, 0.1, 1)
// i.scene.add(ball2)