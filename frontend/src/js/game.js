import * as THREE from 'three'
import gsap from 'gsap'

import { loadContent } from './router.js'
import * as t from './game.defs.js'
import * as i from './idle.js'
import * as s from './solo.js'
import * as l2 from './local-2p.js'
import * as l4 from './local-4p.js'
import { updateContent } from "./i18n";
import { showAlert } from './index.js'

// Variable to track current mode
let m = i

// Resize listener
window.addEventListener('resize', () => {
    t.setWinSizes()
    t.renderer.setSize(t.sizes.width, t.sizes.height)
    t.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera setups
t.camera.position.z = 5
t.scene.add(t.camera)
t.gcamera.position.set(4, 4, 4)
t.gcamera.rotation.y = Math.PI / 2
t.gcamera.lookAt(t.scene.position)
t.scene.add(t.gcamera)

// Frame tick
const tick = () => {
    m.tick()
    m.controls.update()
    t.renderer.render(t.scene, m.camera)
    window.requestAnimationFrame(tick)
}
tick()

var gametype = -1
export async function loadGame(nbr, nameLeft, nameRight) {
    gametype = nbr
    if (nbr === 0) return `
     <button class="btn btn-primary btn-lg mb-3" id="begin-solo-match" translate="begin"></button>
            <p class="w-100" style="color: white;" translate="instruction solo"></p>
            </div>`;
    if (nbr === 1) return `
    <button type="button" id="start-button" class="btn btn-link" translate="start"></button>
    <p class="w-100" style="color: white; id="instruction-yellow"><span>${nameLeft}</span><span translate="instruction yellow"></span></p></p>
    <p class="w-100" style="color: white;" id="instruction-purple" translate="instruction purple"></p>
 
    <form id="name-red">
        <div class="form-group">
            <input type="text" id="opp-name" class="form-control" required>
        </div>
    <button type="submit" class="btn btn-success mt-3" id="opp-name-submit" translate="set name"></button>
    </form>
    `;
    if (nbr === 2)
    {
        try
        {
            const response = await fetch(`http://localhost:8000/profile/`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok)
            {
                console.error('Failed getting display name:', response.statusText);
                showAlert('Error occurred getting display name. Try again.', 'danger');
                loadContent('home');
                return ;
            }
            const user = await response.json();

            return `
            <p style="color: white;"><span>${user.display_name} </span><span translate="4p p1"></span></p>
            <p class="w-100" style="color: white;" id="instruction-blue-4" translate="instruction blue 4"></p>
            <p class="w-100" style="color: white;" id="instruction-purple-4" translate="instruction purple 4"></p>
            <p class="w-100" style="color: white;" id="instruction-red-4" translate="instruction red 4"></p>
            <form id="playerSelectForm">
            
            <label for="username1" style="color: white;" translate="4p p2"></label><br>
            <input type="text" id="username1" name="username1" list="players"><br>
            
            <label for="username2" style="color: white;" translate="4p p3"></label><br>
            <input type="text" id="username2" name="username2" list="players"><br>
            
            <label for="username3" style="color: white;" translate="4p p4"></label><br>
            <input type="text" id="username3" name="username3" list="players"><br>
            
            <datalist id="players" style="color: white;">
                <option value="Player1">
                <option value="Player2">
                <option value="Player3">
                <!-- Add more options as needed -->
            </datalist><br>
            
            <input type="submit" value="Start">
            </form>
            `;
        }
        catch (error)
        {
            console.log(error);
            loadContent('home');
            return ; // ?edit to be like tournament ?
        }

    }
    if (nbr == 3)
    {
        try
        {
            const response = await fetch(`http://localhost:8000/get_display_name/?username=${nameLeft}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok)
            {
                console.error('Failed getting display name:', response.statusText);
                showAlert('Error occurred getting display name. Try again.', 'danger');
                loadContent('home');
                return ;
            }
            const left = await response.json();

            const reply = await fetch(`http://localhost:8000/get_display_name/?username=${nameRight}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!reply.ok)
            {
                console.error('Failed getting display name:', response.statusText);
                showAlert('Error occurred getting display name. Try again.', 'danger');
                
            }
            const right = await reply.json();

            return `
            <button class="btn btn-primary btn-lg mb-3" id="begin-tourney-match" translate="begin"></button>
            <p class="w-100" style="color: white;">
                <span>${left.display_name} </span>
                <span translate="instruction tournament p1"></span>
            </p>
            <p class="w-100" style="color: white;">
                <span>${right.display_name} </span>
                <span translate="instruction tournament p2"><span/>
            </p>
            </div>
            `;
        }
        catch (error)
        {
            console.log(error);
            loadContent('home');
        }

    }
    return ``
}

export function startGame(gametype, nameLeft, nameRight) {
    if (gametype === 0) startQuickGame()
    else if (gametype === 1) startTwoLocal()
    else if (gametype === 2) startFourLocal()
    else if (gametype === 3) startTourney(nameLeft, nameRight)
    gametype = -1
}

export function endGame() {
    gametype = -1
}

export function sendResults(scoreLeft, scoreRight, oppIsHuman, oppName) {
    try {
        console.log('result', scoreLeft, scoreRight, oppIsHuman, "", oppName);
        if (scoreLeft > scoreRight)
            showAlert('Player on the left wins', 'warning');
        else
            showAlert('Player on the right wins', 'warning');
        loadContent('result', scoreLeft, scoreRight, oppIsHuman, "", oppName)
    } catch (error) {
        console.log('failed to sendResults:', error)
    }
}

export function sendTourneyResults(scoreLeft, scoreRight, oppIsHuman, nameLeft, nameRight) {
    try {
        loadContent('tourneyResult', scoreLeft, scoreRight, oppIsHuman, nameLeft, nameRight)
    } catch (error) {
        console.log('failed to sendResults:', error)
    }
}


export function switchToIdle() {
    m.cleanUp()
    m = i
    m.addIdleObjs()
}

// external functions
export function startQuickGame() {
    m.cleanUp()
    m = s
    m.startQuickGame()
}

export function startTwoLocal() {
    m.cleanUp()
    m = l2
    m.startGame(0)
}

export function startTourney(nameLeft, nameRight) {
    m.cleanUp()
    m = l2
    m.startGame(1, nameLeft, nameRight)
}

function startFourLocal() {
    console.log("Start 4");
    m.cleanUp()
    m = l4
    m.startGame()
}