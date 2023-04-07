import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import spaceTextureSrc from './black2.jpg';
import moonTextureSrc from './moon.jpg';
import normalTextureSrc from './normal.jpg';
import earthTextureSrc from './earth.jpg';
import sunTextureSrc from './sun.jpg';
import jupiterTextureSrc from './jupiter.jpg';

const spaceTexture = new THREE.TextureLoader().load(spaceTextureSrc);
const moonTexture = new THREE.TextureLoader().load(moonTextureSrc);
const normalTexture = new THREE.TextureLoader().load(normalTextureSrc);
const earthTexture = new THREE.TextureLoader().load(earthTextureSrc);
const sunTexture = new THREE.TextureLoader().load(sunTextureSrc);
const jupiterTexture = new THREE.TextureLoader().load(jupiterTextureSrc);

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background


scene.background = spaceTexture;



// Moon


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

// Earth


const earth = new THREE.Mesh(
  new THREE.SphereGeometry(8, 40, 40),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);

earth.position.z = 38;
earth.position.setX(-30);


// Sun

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(62, 40, 40),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture,
  })
);

scene.add(sun);

sun.position.z = -100;
sun.position.setX(-10);


// Sun


const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(20, 40, 40),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
    normalMap: normalTexture,
  })
);

scene.add(jupiter);

jupiter.position.z = -10;
jupiter.position.setX(-60);
jupiter.position.setY(24);


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;



  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;
  sun.rotation.x += 0.005;
  earth.rotation.x += 0.005;
  jupiter.rotation.x -= 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
