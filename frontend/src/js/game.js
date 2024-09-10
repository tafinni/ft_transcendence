import * as THREE from 'three'
import gsap from 'gsap'

import * as t from './game.defs.js'
import * as i from './idle.js'

window.addEventListener('resize', () => {
    t.setWinSizes()
    t.renderer.setSize(t.sizes.width, t.sizes.height)
    t.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Grid Helper
var grid = new THREE.GridHelper(5, 30);
t.scene.add(grid);

const plate = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.01, 4),
    new THREE.MeshBasicMaterial()
)
plate.material.color = new THREE.Color('grey')
plate.material.transparent = true
plate.material.opacity = 0.25
plate.position.set(0, -0.005, 0)
t.scene.add(plate)
const left = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.7),
    new THREE.MeshBasicMaterial()
)
left.name = "left"
left.material.color = new THREE.Color('yellow')
left.position.set(-2.1, -0.1, 0)
t.scene.add(left)
const right = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.7),
    new THREE.MeshBasicMaterial()
)
right.material.color = new THREE.Color('purple')
right.position.set(2.1, -0.1, 0)
t.scene.add(right)

// cube.position.x = -1
// let movecube = gsap.to(cube.position, { x: 1, duration: 1, paused: true, overwrite: true })
// t.scene.add(cube)
// movecube.play()

t.camera.position.z = 4
t.scene.add(t.camera)

t.gcamera.position.set(3, 3, 3)
t.gcamera.lookAt(t.scene.position)
t.scene.add(t.gcamera)

const itick = () =>
{
    const elapsedTime = t.clock.getElapsedTime()
    t.camera.position.x = i.radius * Math.cos(elapsedTime);
    t.camera.position.z = i.radius * Math.sin(elapsedTime);
    t.camera.lookAt(t.scene.position);
    
    t.controls.update()
    t.renderer.render(t.scene, t.camera)
    window.requestAnimationFrame(curtick)
}
const tick = () => {
    //console.log(t.camera.x, t.camera.y, t.camera.z)
    t.renderer.render(t.scene, t.gcamera)
    window.requestAnimationFrame(curtick)
}
let curtick = itick
curtick()

//external functions
export function startQuickGame() {
    console.log("game.js: startQuickGame called")
    //cube.position.x = -1
    //movecube.reverse()
    t.scene.remove(t.scene.getObjectByName("idle1"))
    t.scene.remove(t.scene.getObjectByName("idle2"))
    t.scene.remove(t.scene.getObjectByName("idle3"))
    t.controls 
    curtick = tick
}