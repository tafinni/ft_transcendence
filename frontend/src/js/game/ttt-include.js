import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import GUI from 'lil-gui'
//import gsap from 'gsap'

import * as t from './include.js'

// class grid {  }

// export const left = new THREE.Mesh(
//     new THREE.BoxGeometry(0.7, 0.2, 0.2),
//     new THREE.MeshBasicMaterial()
// )
// left.name = "left"
// left.material.color = new THREE.Color('yellow')
// left.position.set(0, 0.1, 2.1)

class TicTacToeGrid {
  constructor(container) {
    this.container = container;
    this.grid = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    this.initGrid();
    this.animate();

    window.addEventListener('resize', () => this.onWindowResize());
  }

  initGrid() {
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const plane = new THREE.Mesh(geometry, material);

    for (let i = 0; i < 9; i++) {
      const clone = plane.clone();
      clone.position.set(
        ((i % 3) * 3.5) - 4,
        Math.floor(i / 3) * 3.5 + 1.75,
        0
      );
      this.scene.add(clone);
    }

    // Add lines to separate cells
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute([
        -4, 1.75, 0, 4, 1.75, 0,
        -4, -1.25, 0, 4, -1.25, 0,
        -4, 1.75, 0, -4, -1.25, 0,
        4, 1.75, 0, 4, -1.25, 0
      ], 3)
    );

    const lines = new THREE.Line(lineGeometry, lineMaterial);
    this.scene.add(lines);

    this.camera.position.z = 15;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  placeMark(index) {
    if (this.grid[index] === null) {
      this.grid[index] = this.currentPlayer;

      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.MeshBasicMaterial({ color: this.currentPlayer === 'X' ? 0xff0000 : 0x0000ff });
      const mark = new THREE.Mesh(geometry, material);

      mark.position.set(
        ((index % 3) * 3.5) - 4,
        Math.floor(index / 3) * 3.5 + 1.75,
        0.01
      );
      this.scene.add(mark);

      if (this.checkWin()) {
        console.log(`Player ${this.currentPlayer} wins!`);
        this.gameOver();
      } else if (!this.grid.includes(null)) {
        console.log('It\'s a draw!');
        this.gameOver();
      }

      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  checkWin() {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions) {
      if (
        this.grid[condition[0]] === this.currentPlayer &&
        this.grid[condition[1]] === this.currentPlayer &&
        this.grid[condition[2]] === this.currentPlayer
      ) {
        return true;
      }
    }

    return false;
  }

  gameOver() {
    alert('Game Over!');
    // Reset game state here if needed
  }
}

export default TicTacToeGrid;
