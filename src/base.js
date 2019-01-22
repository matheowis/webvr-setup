import { WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, Mesh, Color } from 'three';
import { WEBVR } from './vr/WebVR';

export const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 50);
export const scene = new Scene();
scene.background = new Color(0x222222);
export const renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.shadowMap.enabled = true;
renderer.vr.enabled = true;

document.body.appendChild(renderer.domElement);
document.body.appendChild(WEBVR.createButton(renderer));

export const rightController = renderer.vr.getController(0);

rightController.addEventListener('selectstart', e => { console.log('selectstart_R', e) });
rightController.addEventListener('selectend', e => { console.log('selectend_R', e) });
rightController.userData.id = 0;

export const leftController = renderer.vr.getController(1);

leftController.addEventListener('selectstart', e => { console.log('selectstart_L', e) });
leftController.addEventListener('selectend', e => { console.log('selectend_L', e) });
leftController.userData.id = 1;

const ControllerModel = new Mesh(new BoxGeometry(0.1, 0.1, 0.2));

rightController.add(ControllerModel.clone());
leftController.add(ControllerModel.clone());

const aloneCube1 = new Mesh(new BoxGeometry(1, 1, 1));
aloneCube1.position.set(2, 0.5, 0);
const aloneCube2 = new Mesh(new BoxGeometry(1, 1.75, 1));
aloneCube2.position.set(0, 1.75 / 2, 2);
scene.add(rightController, leftController, aloneCube1, aloneCube2);
// scene.add(rightController, leftController);

console.log('rightController', rightController);
console.log(renderer.vr);


export const handleController = controller => {
  var pivot = controller.getObjectByName('pivot');
  if (pivot) {
    var id = controller.userData.id;
    var matrix = pivot.matrixWorld;
    points[id].position.setFromMatrixPosition(matrix);
    transformPoint(points[id].position);
    if (controller.userData.isSelecting) {
      var strength = points[id].strength / 2;
      var vector = new THREE.Vector3().setFromMatrixPosition(matrix);
      transformPoint(vector);
      points.push({ position: vector, strength: strength, subtract: 10 });
    }
  }
}