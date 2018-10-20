import Animations from animations

window.addEventListener("mousedown", onMouseDown, false)

function onMouseDown(e) {
  var vectorMouse = new THREE.Vector3( //vector from camera to mouse
    -(window.innerWidth / 2 - e.clientX) * 2 / window.innerWidth,
    (window.innerHeight / 2 - e.clientY) * 2 / window.innerHeight,
    -1 / Math.tan(22.5 * Math.PI / 180)); //22.5 is half of camera frustum angle 45 degree
  vectorMouse.applyQuaternion(camera.quaternion);
  vectorMouse.normalize();

  var vectorObject = new THREE.Vector3()
  vectorObject.set(wireframe.position.x - camera.position.x,
    wireframe.position.y - camera.position.y,
    wireframe.position.z - camera.position.z)
  vectorObject.normalize();

  console.log(vectorObject)
  if (vectorMouse.angleTo(vectorObject) * 180 / Math.PI < 6) {
    //mouse's position is near object's position

    explode = true
    console.log("HUZZAH")
  }
}

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1)
var geo = new THREE.EdgesGeometry(geometry)
var mat = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 })
var wireframe = new THREE.LineSegments(geo, mat)

scene.add(wireframe);

camera.position.z = 5

export function animate() {
  requestAnimationFrame(animate)

  wireframe.rotation.x += 0.01
  wireframe.rotation.y += 0.01
  if (explode && wireframe.scale.x < 2) {
    console.log(wireframe)
    wireframe.material.opacity -= 0.01
    wireframe.material.transparent = true
    wireframe.scale.x += 0.01
    wireframe.scale.y += 0.01
    wireframe.scale.z += 0.01
  }

  renderer.render(scene, camera)
}