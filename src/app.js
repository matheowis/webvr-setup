import { renderer, scene, camera, rightController, leftController, handleController } from './base';
console.log('webpack works !!! - from app.js');

animate();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(render);
}

function render() {

  handleController(rightController);
  handleController(leftController);

  renderer.render(scene, camera);
}