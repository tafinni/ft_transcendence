// import { ball } from "./2p-pong-include";
// import { player_speed } from "./include";


export class AIPlayer {
    calculatedX;
    predictedX;
    predictedDeltaX;
    deltaZ;
    distanceRemaining;
    max; // max is i.ball_max !
    halfpaddle;
    playerSpeed;
    intervalID;
    constructor(max, halfpaddle, playerSpeed) {
        this.max = max
        this.halfpaddle = halfpaddle
        //this.ballradius = ballradius
        //this.position = 0
        this.intervalID = -1
        this.playerSpeed = playerSpeed
        this.calculatedX = 0
        this.predictedX = 0
    }

    setInterval(id) {
        this.intervalID = id
        console.assert(this.intervalID !== -1, 'AIPlayer interval -1!')
    }

    predictBallX(x, y, direction, speed) {
        this.predictedX = y;
        this.predictedDeltaX = -Math.cos(direction) * speed
        this.deltaZ = -Math.sin(direction) * speed
        this.distanceRemaining = this.max + x
        if (this.distanceRemaining > this.max * 2 || this.distanceRemaining < 0)
            return 0;
        while (this.distanceRemaining > 0) {
            //console.log(this.distanceRemaining)
            this.predictedX += this.predictedDeltaX
            if (this.predictedX < -this.max || this.predictedX > this.max)
                this.predictedDeltaX *= -1
            if (this.predictedX < -this.max)
                this.predictedX = -this.max
            else if (this.predictedX > this.max)
                this.predictedX = this.max
            //let effectiveDirection = within2PI(v.ball_direction);
            // distanceRemaining -= Math.abs((Math.cos(predictedDirection) * v.ball_speed));
            if (direction > 0 && direction < Math.PI)
                this.distanceRemaining += this.deltaZ;
            else if (direction > Math.PI && direction < Math.PI * 2)
                this.distanceRemaining -= this.deltaZ;
            else
                return 0;
            // console.log("dist now", distanceRemaining, "ball dir", v.ball_direction);
            if (this.distanceRemaining > this.max * 2) // if beyond either paddle
                return 0;
        }
        this.calculatedX = this.predictedX
    }

    aiMove(position) {
        const oldPosition = position
        //const positionDifference = (this.position + max) - (this.supposedXPurple + max)
        if (position > this.calculatedX) { // && this.position < this.max - this.halfpaddle) {
            position = Math.min(position + this.playerSpeed, this.max - this.halfpaddle)
            return -1
            //return this.position - oldPosition
        }
        else if (this.position < this.calculatedX) { // && this.position > -this.max + this.halfpaddle) {
            position = Math.max(position - this.playerSpeed, this.halfpaddle - this.max)
            return 1
            //return this.position - oldPosition
        }
        return 0
    }
}

export class AIPlayer2 {
    max = 0
    halfpaddle = 0
    playerSpeed = 0
    intervalID = -1
    calculatedX = 0
    setInterval(id) { this.intervalID = id }

    constructor(max, halfpaddle, playerSpeed) {
        this.max = max
        this.halfpaddle = halfpaddle
        this.playerSpeed = playerSpeed
    }

    aiMove(position) {
        if (position < this.calculatedX) return 1
        else if (position > this.calculatedX) return -1
        return 0;
    }

    predict(wide, dist, direction, speed) {
        if (dist < -this.max || dist > this.max) return 0;
        var predict = wide
        var remain = 0
        var delta_w = -Math.cos(direction) * speed;
        var delta_d = -Math.sin(direction) * speed;
        console.log('dY(pos)', delta_w, ' dX(dist)', delta_d)
        while (wide > -this.max && wide < this.max) {
            wide += delta_w
            if (wide < -this.max) {
                delta_w *= -1
                remain = wide + this.max
                wide = -this.max + remain
            } else if (wide > this.max) {
                delta_w *= -1
                remain = wide - this.max
                wide = this.max - remain
            }
            if (delta_d !== 0)
                dist += delta_d
            else {
                console.error('ai delta_d is zero!')
                return
            }
            if (dist < -this.max || dist > this.max)
                break
        }
        this.calculatedX = wide
    }
}

let supposedXPurple;


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

function within2PI(initial){
    while (initial < 0)
        initial += Math.PI * 2;
    while (initial > Math.PI * 2)
        initial -= Math.PI * 2;
    return initial;
}
