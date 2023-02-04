import *  as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // for ability of moving scene

// SCENE
const scene = new THREE.Scene();
// CAMERA
const viewPoint = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true
// Allows you to move scene around and view object from multiple directions
const controls = new OrbitControls(viewPoint, renderer.domElement);

// SCENE
scene.background = new THREE.Color(0x87ceeb);

// CONE
const object1 = new THREE.Mesh(new THREE.ConeGeometry(4, 8, 72), 
new THREE.MeshPhongMaterial({ color: 0xffffff }));
scene.add(object1);
object1.position.set(10, 4, 4)
object1.receiveShadow = true
object1.castShadow = true

// FLOOR
const plane = new THREE.Mesh(new THREE.PlaneGeometry(450, 450, 28),
new THREE.MeshPhongMaterial({ color: 0x90ee90}));
scene.add(plane);
plane.rotation.x = - Math.PI / 2
plane.receiveShadow = true


viewPoint.position.z = 40;
viewPoint.position.x = 25;
viewPoint.position.y = 60;
viewPoint.lookAt(0, 10, -20)

// DIRECTIONAL LIGHT
const posOfLight = new THREE.DirectionalLight(0xffffff, 1);
posOfLight.position.x += 15
posOfLight.position.y += 15
posOfLight.position.z += 15
posOfLight.castShadow = true
posOfLight.shadow.mapSize.width = 4096;
posOfLight.shadow.mapSize.height = 4096;
const angled = 30;
posOfLight.shadow.camera.left = - angled;
posOfLight.shadow.camera.right = angled;
posOfLight.shadow.camera.top = angled;
posOfLight.shadow.camera.bottom = - angled;
scene.add(posOfLight);

scene.add( new THREE.CameraHelper( posOfLight.shadow.camera ) );



// ANIMATE
function animate() {
    // TARGET
    const time = Date.now() * 0.0005;
    posOfLight.position.x = Math.sin(time * 0.5) * 15;
    posOfLight.position.z = Math.cos(time * 0.5) * 15;
    renderer.render(scene, viewPoint);
    requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();