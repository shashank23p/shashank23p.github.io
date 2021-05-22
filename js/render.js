import * as THREE from "./three/three.module.js";

let camera, scene, renderer;
let moon;

init();

function init() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  camera.position.z = 30;

  scene = new THREE.Scene();

  const moonGeometry = new THREE.SphereGeometry(10, 50, 50);
  const moonTexture = new THREE.TextureLoader().load(
    "./assets/materials/moon.jpg"
  );
  const moonNormal = new THREE.TextureLoader().load(
    "./assets/materials/normal.jpg"
  );
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormal,
  });

  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.z = 15;
  moon.position.x = 5;
  moon.rotation.y = 5;
  scene.add(moon);

  // add point light
  const pointLight = new THREE.PointLight("white", 2);
  pointLight.position.set(20, 10, 30);
  scene.add(pointLight);

  // ambiant light
  const ambiantLight = new THREE.AmbientLight("#404040", 0.1);
  scene.add(ambiantLight);

  renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg") });
  resize();
  renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);
  moveCamera();
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animation(time) {
  //   moon.rotation.y = time / 2000;
  renderer.render(scene, camera);
}

function moveCamera() {
  rotateMoon();
  const top = document.body.getBoundingClientRect().top;
  camera.position.z = top * -0.01 + 30;
}

function rotateMoon() {
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.01;
}

document.body.onscroll = moveCamera;
document.body.onresize = resize;
