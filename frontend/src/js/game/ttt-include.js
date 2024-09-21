import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import GUI from 'lil-gui'
//import gsap from 'gsap'

//import * as i from './include.js'

// class grid {  }

export const left = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial()
)
left.name = "left"
left.material.color = new THREE.Color('yellow')
left.position.set(0, 0.1, 0.1)

// class TicTacToeGame {
//   constructor(scene, renderer, container) {
//     this.container = container;
//     this.scene = scene
//     this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     this.renderer = renderer
//     //this.renderer.setSize(window.innerWidth, window.innerHeight);
//     //this.container.appendChild(this.renderer.domElement);

//     this.grid = Array(9).fill(null);
//     this.currentPlayer = 'X';
//     this.initGrid();

//     this.animate();
//   }

//   initGrid() {
//     // Create grid planes
//     const geometry = new THREE.PlaneGeometry(2, 2);
//     const material = new THREE.MeshBasicMaterial({ color: 0xafffff });
//     const plane = new THREE.Mesh(geometry, material);

//     for (let i = 0; i < 9; i++) {
//       const clone = plane.clone();
//       clone.position.set(
//         ((i % 3) * 3) - 4,
//         Math.floor(i / 3) * 3 + 1.5,
//         0
//       );
//       clone.userData.index = i;
//       this.scene.add(clone);

//       // Add click event listener
//       const raycaster = new THREE.Raycaster();
//       const mouse = new THREE.Vector2();

//       clone.addEventListener('click', (event) => {
//         console.log('ttt plane click')
//         if (this.grid[event.target.userData.index] === null) {
//           this.grid[event.target.userData.index] = this.currentPlayer;
//           this.updateGrid(event.target.userData.index);
//           this.checkWin();

//           this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
//         }
//       });
//     }

//     // Add grid lines
//     const lineMaterial = new THREE.LineBasicMaterial({ color: 0x404040 });
//     const lineGeometry = new THREE.BufferGeometry();
//     lineGeometry.setAttribute(
//       'position',
//       new THREE.Float32BufferAttribute([
//         -4, 1.5, 0, 4, 1.5, 0,
//         -4, -1.5, 0, 4, -1.5, 0,
//         -4, 1.5, 0, -4, -1.5, 0,
//         4, 1.5, 0, 4, -1.5, 0,
//         -4, 0, 0, 4, 0, 0,
//         0, 1.5, 0, 0, -1.5, 0
//       ], 3)
//     );

//     const lines = new THREE.Line(lineGeometry, lineMaterial);
//     this.scene.add(lines);

//     this.camera.position.z = 15;
//   }

//   updateGrid(index) {
//     const geometry = new THREE.PlaneGeometry(1.5, 1.5);
//     const material = new THREE.MeshBasicMaterial({ color: this.grid[index] === 'X' ? 0xff0000 : 0x0000ff });
//     const mark = new THREE.Mesh(geometry, material);

//     mark.position.set(
//       ((index % 3) * 3) - 4 + 1.5,
//       Math.floor(index / 3) * 3 + 1.5,
//       0.01
//     );
//     this.scene.add(mark);
//   }

//   checkWin() {
//     const winConditions = [
//       [0, 1, 2], [3, 4, 5], [6, 7, 8],
//       [0, 3, 6], [1, 4, 7], [2, 5, 8],
//       [0, 4, 8], [2, 4, 6]
//     ];

//     for (const condition of winConditions) {
//       if (
//         this.grid[condition[0]] === this.currentPlayer &&
//         this.grid[condition[1]] === this.currentPlayer &&
//         this.grid[condition[2]] === this.currentPlayer
//       ) {
//         console.log(`Player ${this.currentPlayer} wins!`);
//         return true;
//       }
//     }

//     return false;
//   }

//   animate() {
//     requestAnimationFrame(() => this.animate());
//     this.renderer.render(this.scene, this.camera);
//   }
// }

// export default TicTacToeGame;