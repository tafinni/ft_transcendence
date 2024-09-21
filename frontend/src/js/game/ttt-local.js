import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import GUI from 'lil-gui'
//import gsap from 'gsap'

import * as i from './include.js'
import * as it from './ttt-include.js'

export const camera = i.camera
export const tick = () => {}
let tester = {}

class TicTacToeGame {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 8)
        //this.camera.lookAt(i.scene.position)
        //this.camera.rotation.y = Math.PI / 2
        //this.camera.position.set(0, 5, 10); // Above and behind the center of the board
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        i.renderer.camera = this.camera
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);
        //this.camera.position.set(0, 5, 10); // Above and behind the center of the board
        //this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.clickHandler = (event) => this.onClick(event);
        window.addEventListener('click', this.clickHandler);

        this.board = [];
        this.currentPlayer = 'X';
        this.gameOver = false;

        this.initBoard();
    }

    initBoard() {
        const size = 2
        const geometry = new THREE.PlaneGeometry(size, size);
        const material = new THREE.MeshBasicMaterial({ color: 0x202020 });
        const spacing = 0.5
        const startX = 0 - spacing - (size * 1.5)

        for (let i = 0; i < 9; i++) {
            const square = new THREE.Mesh(geometry, material);
            square.position.set(
                startX + (Math.floor(i / 3) * (size + spacing)),
                startX + (Math.floor((i  + 1) % 3) * (size + spacing)),
                0
            );
            console.log(square.position)
            square.userData.index = i;
            this.board.push(square);
            this.scene.add(square);
        }

        // Add grid lines
        this.addGridLines();
    }

    addGridLines() {
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const lineGeometry = new THREE.BufferGeometry();
        
        // Calculate the positions based on your square dimensions and spacing
        const squareSize = 1.2; // Adjust this value to match your square size
        const spacing = 1.75; // Adjust this value to match the spacing between squares
        const startX = -5.5; // Adjust this value to match the starting x position of your board
        const startY = 9; // Adjust this value to match the starting y position of your board
    
        const positions = [
            // Horizontal lines
            startX, startY, 0, startX + 3 * (squareSize + spacing), startY, 0,
            startX, startY - (squareSize + spacing), 0, startX + 3 * (squareSize + spacing), startY - (squareSize + spacing), 0,
            
            // Vertical lines
            startX, startY, 0, startX, startY - 2 * (squareSize + spacing), 0,
            startX + (squareSize + spacing), startY, 0, startX + (squareSize + spacing), startY - 2 * (squareSize + spacing), 0,
            startX + 2 * (squareSize + spacing), startY, 0, startX + 2 * (squareSize + spacing), startY - 2 * (squareSize + spacing), 0
        ];
    
        lineGeometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3)
        );
    
        const lines = new THREE.Line(lineGeometry, lineMaterial);
        console.log('line:', lines)
        this.scene.add(lines);
    }
    

    // addGridLines() {
    //     const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    //     const lineGeometry = new THREE.BufferGeometry();
    //     lineGeometry.setAttribute(
    //         'position',
    //         new THREE.Float32BufferAttribute([
    //             -4, 1.5, 0, 4, 1.5, 0,
    //             -4, -1.5, 0, 4, -1.5, 0,
    //             -4, 1.5, 0, -4, -1.5, 0,
    //             4, 1.5, 0, 4, -1.5, 0,
    //             -4, 0, 0, 4, 0, 0,
    //             0, 1.5, 0, 0, -1.5, 0
    //         ], 3)
    //     );

    //     const lines = new THREE.Line(lineGeometry, lineMaterial);
    //     this.scene.add(lines);
    // }

    onClick(event) {
        if (!this.gameOver) {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouse, this.camera);

            const intersects = this.raycaster.intersectObjects(this.board, true);
            if (intersects.length > 0) {
                const clickedSquare = intersects[0].object;
                if (!clickedSquare.userData.marked) {
                    this.placeMark(clickedSquare);
                }
            }
        }
    }

    placeMark(square) {
        const geometry = new THREE.PlaneGeometry(1.5, 1.5);
        const material = new THREE.MeshBasicMaterial({ color: this.currentPlayer === 'X' ? 0xff0000 : 0x0000ff });
        const mark = new THREE.Mesh(geometry, material);

        mark.position.set(
            square.position.x,
            square.position.y,
            0.01
        );
        this.scene.add(mark);

        square.userData.marked = true;
        square.userData.player = this.currentPlayer;

        if (this.checkWin()) {
            console.log(`Player ${this.currentPlayer} wins!`);
            this.gameOver = true;
        } else if (!this.board.some(square => !square.userData.marked)) {
            console.log('It\'s a draw!');
            this.gameOver = true;
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const condition of winConditions) {
            const player = this.board[condition[0]].userData.player;
            if (player && 
                this.board[condition[0]].userData.player === this.board[condition[1]].userData.player &&
                this.board[condition[0]].userData.player === this.board[condition[2]].userData.player) {
                return true;
            }
        }

        return false;
    }

    resetGame() {
        this.gameOver = false;
        this.currentPlayer = 'X';

        for (const square of this.board) {
            square.userData.marked = false;
            square.userData.player = null;

            // Remove all child objects (marks)
            while (square.children.length > 0) {
                this.scene.remove(square.children[0]);
            }
        }
    }

    destructor() {
        window.removeEventListener('click', this.clickHandler);
    }
}

// class test {
//     constructor() {
//         this.raycaster = new THREE.Raycaster()
//         this.mouse = new THREE.Vector2()
//         this.clickHandler = (event) => this.onClick(event)
//         window.addEventListener('click', this.clickHandler)
//     }

//     onClick(event) {
//         // this.mouse.x = (event.clientX / i.sizes.width) * 2 - 1
//         this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
//         this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
//         this.raycaster.setFromCamera(this.mouse, camera)
//         const intersects = this.raycaster.intersectObjects(i.scene.children, true)
//         if (intersects.length > 0) {
//             const clickedObject = intersects[0].object;
//             console.log('Clicked object:', clickedObject.name || clickedObject.uuid);
//         }
//     }

//     destructor() {
//         window.removeEventListener('click', this.clickHandler)
//     }
// }

export function startGame() {
    console.log('tictactoe startGame')
    tester = new TicTacToeGame(i.scene, camera)
    //camera.position.set(0, 0, 4)
    //i.scene.add(t.left)
    console.log(tester.camera.position)
}

export function cleanUp() {
    tester.destructor()
}

