import * as THREE from 'three'

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
    new THREE.BoxGeometry(0.2, 0.2, 0.7),
    new THREE.MeshBasicMaterial()
)
top.name = "top"
top.material.color = new THREE.Color('blue')
top.position.set(-2.1, 0.1, 0)

export const bot = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.7),
    new THREE.MeshBasicMaterial()
)
bot.name = "bot"
bot.material.color = new THREE.Color('red')
bot.position.set(2.1, 0.1, 0)
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
score.name = "score"
export const corner = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.125, 0.2),
    new THREE.MeshBasicMaterial()
)
corner.name = "corner"
corner.material.color = new THREE.Color('darkblue')
corner.position.set(-2.1, 0.0625, -2.1)
export const corner2 = corner.clone()
corner2.position.set(2.1, 0.0625, 2.1)
export const corner3 = corner.clone()
corner3.position.set(-2.1, 0.0625, 2.1)
export const corner4 = corner.clone()
corner4.position.set(2.1, 0.0625, -2.1)
export const h_wall = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.125, 0.2),
    new THREE.MeshBasicMaterial()
)
h_wall.name = 'wall'
h_wall.material.color = new THREE.Color('darkblue')
export const v_wall = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.125, 4),
    new THREE.MeshBasicMaterial()
)
v_wall.name = 'wall'
v_wall.material.color = new THREE.Color('darkblue')

// consts
export const area_vmax = 2
export const paddle_vmax = 1.65
export const pos_max = 1000000
export const ball_radius = 12500
export const paddle_halfwidth  = (area_vmax - paddle_vmax) * pos_max / area_vmax + (ball_radius * 1.5)
export const ball_max = pos_max - ball_radius
export const paddle_max = pos_max - paddle_halfwidth
export const player_speed = 12000
// base 8000 increase 1000
export const ball_base_speed = 8000 // 8000
export const ball_increase_speed = 1000 // 1000
export const score_to_win = 3
export const obj_stack = []

// pre-calculated values
export const pvmax_pmx = paddle_vmax / paddle_max
export const avmax_pmx = area_vmax / pos_max

export const vars = {
    nameLeft: "",
    nameRight: "",
    nameTop: "",
    nameBottom: "",
    left_pos: 0,
    right_pos: 0,
    top_pos: 0,
    bot_pos: 0,
    l_left_pressed: false,
    l_right_pressed: false,
    r_left_pressed: false,
    r_right_pressed: false,
    t_left_pressed: false,
    t_right_pressed: false,
    b_left_pressed: false,
    b_right_pressed: false,
    game_started: false,
    game_running: false,
    score_to_win: score_to_win,
    player_status: [
        { lives: score_to_win, obj: left }, { lives: score_to_win, obj: right },
        { lives: score_to_win, obj: top }, { lives: score_to_win, obj: bot }
    ],
    lives_left: score_to_win,
    lives_right: score_to_win,
    lives_top: score_to_win,
    lives_bot: score_to_win,
    players_remaining: 4,
    score_left: 0,
    score_right: 0,
    ballX: 0,
    ballY: 0,
    ball_direction: 0,
    ball_speed: ball_base_speed,
    bounce_distance: 0,
    ball_passed: false,
    ball_passed_timer: 0,
    gameover_timer: 0,
    reset: function() {
        this.left_pos = this.right_pos = this.top_pos = this.bot_pos = 0
        this.lives_left = this.lives_bot = this.lives_right = this.lives_top = score_to_win
        this.ballX = this.ballY = this.ball_direction = this.bounce_distance = this.ball_passed_timer = 0
        this.gameover_timer = 0
        this.l_left_pressed = this.l_right_pressed = this.r_left_pressed = this.r_right_pressed = false
        this.b_left_pressed = this.b_right_pressed = this.t_left_pressed = this.top_pos_right_pressed = false
        this.game_running = this.game_started = this.ball_passed = false
        this.score_to_win = score_to_win
        this.ball_speed = ball_base_speed
        this.players_remaining = 4
        this.player_status.forEach((i) => { i.lives = score_to_win })
    }
}