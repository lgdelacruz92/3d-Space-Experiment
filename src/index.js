import * as THREE from 'three';
import { setupWorld } from './world/setup';
import Boid from './world/Boid';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CONSTANTS } from './constants';
import { map } from './utils';

window.onload = () => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const canvasEl = document.querySelector('#scene_canvas');
    var renderer = new THREE.WebGLRenderer({ canvas: canvasEl });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    
    var controls = new OrbitControls( camera, renderer.domElement );
    camera.position.z = CONSTANTS.world.z;
    camera.position.y = CONSTANTS.world.h / 3;
    camera.lookAt(0, 0, 0);
    
    setupWorld(scene);
    
    const sphereGeometry = new THREE.SphereGeometry(0.2);

    const boids = [];

    for (let i = 0; i < CONSTANTS.num_boids; i++) {
        const boid = new Boid(sphereGeometry, scene);
        boid.setPosition(
            map(Math.random(), 0, 1, -CONSTANTS.world.w / 2, CONSTANTS.world.w / 2), 
            map(Math.random(), 0, 1, 0, CONSTANTS.world.h), 
            map(Math.random(), 0, 1, -CONSTANTS.world.z / 2, CONSTANTS.world.z / 2)
        );
        boids.push(boid);
    }
    
    controls.update();
    console.log('Hello World');

    var animate = function () {
        requestAnimationFrame( animate );

        controls.update();
        for (let i = 0; i < CONSTANTS.num_boids; i++) {
            boids[i].update();
        }

        renderer.render( scene, camera );
    };
    
    animate();
};

