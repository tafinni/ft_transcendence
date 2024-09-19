import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import GUI from 'lil-gui'
//import gsap from 'gsap'

import * as i from './include.js'
import TicTacToeGrid from './ttt-include.js'

export const tick = () => {}

export function startGame() {
    console.log('tictactoe startGame')
    const game = new TicTacToeGrid(document.getElementById('webgl'))
}

export function cleanUp() {
    
}