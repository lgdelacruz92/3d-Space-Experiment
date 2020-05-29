import * as THREE from 'three';
import { setupWorld } from './setup/world';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 20;
camera.position.y = 10;
camera.lookAt(0, 0, 0);

setupWorld(scene);

var animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

animate();