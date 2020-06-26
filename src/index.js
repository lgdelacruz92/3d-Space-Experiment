import * as THREE from 'three';
import { setupWorld } from './world/setup';
import Boid from './world/Boid';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CONSTANTS } from './constants';
import { map, dist } from './utils';
import { PlaneGeometry } from 'three';

window.onload = () => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    let alignmentOn = false;
    let cohesionOn = false;
    let separationOn = false;

    const canvasEl = document.querySelector('#scene_canvas');
    var renderer = new THREE.WebGLRenderer({ canvas: canvasEl });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    var controls = new OrbitControls(camera, renderer.domElement);
    camera.position.y = CONSTANTS.world.h / 3;
    camera.lookAt(0, CONSTANTS.world.h / 2, 0);

    setupWorld(scene);

    const sphereGeometry = new THREE.SphereGeometry(0.2);

    const boids = [];

    for (let i = 0; i < CONSTANTS.num_boids; i++) {
        const boid = new Boid(sphereGeometry, scene);
        boid.setPosition(
            map(Math.random(), 0, 1, -CONSTANTS.world.w / 2, CONSTANTS.world.w / 2),
            map(Math.random(), 0, 1, 0, -CONSTANTS.world.h / 2, CONSTANTS.world.w / 2),
            map(Math.random(), 0, 1, -CONSTANTS.world.z / 2, CONSTANTS.world.z / 2)
        );
        boids.push(boid);
    }

    controls.update();
    console.log('Hello World 7');

    var animate = function () {
        requestAnimationFrame(animate);

        controls.update();

        console.log({alignmentOn, cohesionOn, separationOn});
        
        for (let i = 0; i < CONSTANTS.num_boids; i++) {
            const boid = boids[i];
            if (alignmentOn) {
                const alignmentForce = alignment(boid);
                boid.push(alignmentForce);
            }

            if (cohesionOn) {
                const cohesionForce = cohesion(boid);
                boid.push(cohesionForce);
            }

            if (separationOn) {
                const separationForce = separation(boid);
                boid.push(separationForce);
            }
            boid.update();
        }

        renderer.render(scene, camera);
    };


    var alignment = (boid) => {
        const maxSpeed = .03;
        const nearBoids = [];
        for (let j = 0; j < CONSTANTS.num_boids; j++) {
            if (boid != boids[j] && dist(boid.boid.position, boids[j].boid.position) < CONSTANTS.field_of_view_radius) {
                nearBoids.push(boids[j]);
            }
        }

        // collect average velocity
        const averageVel = { x: 0, y: 0, z: 0 };
        for (let b of nearBoids) {
            averageVel.x += b.vel.x;
            averageVel.y += b.vel.y;
            averageVel.z += b.vel.z;
        }

        if (nearBoids.length > 0) {
            averageVel.x /= nearBoids.length;
            averageVel.y /= nearBoids.length;
            averageVel.z /= nearBoids.length;

            // get steering force
            const steering = {
                x: (averageVel.x - boid.vel.x),
                y: (averageVel.y - boid.vel.y),
                z: (averageVel.z - boid.vel.z)
            };

            const steeringMag = Math.sqrt(
                steering.x * steering.x +
                steering.y * steering.y +
                steering.z * steering.z);

            if (steeringMag > 0) {
                const scaledSteering = {
                    x: steering.x * (maxSpeed / steeringMag),
                    y: steering.y * (maxSpeed / steeringMag),
                    z: steering.z * (maxSpeed / steeringMag)
                }
                return scaledSteering;
            }
            return { x: 0, y: 0, z: 0 };
        }
        return { x: 0, y: 0, z: 0 }
    }

    var cohesion = (boid) => {

        const nearBoids = [];

        for (let j = 0; j < CONSTANTS.num_boids; j++) {
            if (boid != boids[j] && dist(boid.boid.position, boids[j].boid.position) < CONSTANTS.field_of_view_radius) {
                nearBoids.push(boids[j]);
            }
        }

        // collect average position
        const avgPos = { x: 0, y: 0, z: 0 };
        for (let b of nearBoids) {
            avgPos.x += b.boid.position.x;
            avgPos.y += b.boid.position.y;
            avgPos.z += b.boid.position.z;
        }

        if (nearBoids.length > 0) {
            avgPos.x /= nearBoids.length;
            avgPos.y /= nearBoids.length;
            avgPos.z /= nearBoids.length;

            // get steering force
            const steering = {
                x: (avgPos.x - boid.boid.position.x) - boid.vel.x,
                y: (avgPos.y - boid.boid.position.y) - boid.vel.y,
                z: (avgPos.z - boid.boid.position.z) - boid.vel.z
            }

            const steeringMag = Math.sqrt(
                steering.x * steering.x +
                steering.y * steering.y +
                steering.z * steering.z);

            if (steeringMag > 0) {
                const maxSpeed = .01;
                const scaledSteering = {
                    x: steering.x * (maxSpeed / steeringMag),
                    y: steering.y * (maxSpeed / steeringMag),
                    z: steering.z * (maxSpeed / steeringMag)
                }
                return scaledSteering;
            }
            return { x: 0, y: 0, z: 0};
            
        }
        return { x: 0, y: 0, z: 0};
    }

    var separation = (boid) => {
        const nearBoids = [];

        for (let j = 0; j < CONSTANTS.num_boids; j++) {
            if (boid != boids[j] && dist(boid.boid.position, boids[j].boid.position) < CONSTANTS.field_of_view_radius) {
                nearBoids.push(boids[j]);
            }
        }

        if (nearBoids.length > 0) {
            for (let other of nearBoids) {
                // vector between boid and other
                const alertVec = {
                    x: other.boid.position.x - boid.boid.position.x,
                    y: other.boid.position.y - boid.boid.position.y,
                    z: other.boid.position.z - boid.boid.position.z
                };

                if (alertVec.x > 0.01 && alertVec.y > 0.01 && alertVec.z > 0.01) {
                    const inverseAlertVec = {
                        x: (-1 / alertVec.x),
                        y: (-1 / alertVec.y),
                        z: (-1 / alertVec.z)
                    }
                    
                    if (inverseAlertVec.x > 0.1) {
                        inverseAlertVec.x = 0.1;
                    }

                    if (inverseAlertVec.y > 0.1) {
                        inverseAlertVec.y = 0.1;
                    }

                    if (inverseAlertVec.z > 0.1) {
                        inverseAlertVec.z = 0.1;
                    }

                    if (inverseAlertVec.x < -0.1) {
                        inverseAlertVec.x = -0.1;
                    }

                    if (inverseAlertVec.y < -0.1) {
                        inverseAlertVec.y = -0.1;
                    }

                    if (inverseAlertVec.z < -0.1) {
                        inverseAlertVec.z = -0.1;
                    }

                    return inverseAlertVec;
                }
                return { x: 0, y: 0, z: 0 };
            }
            return { x: 0, y: 0, z: 0 };
        }
        return { x: 0, y: 0, z: 0 };

    }

    animate();

    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', e => {
            const classAttribute = e.target.parentElement.getAttribute('class');
            if (classAttribute == 'button on') {
                e.target.parentElement.setAttribute('class', 'button off');

                const id = e.target.parentElement.getAttribute('id');
                if (id === 'alignment-button') {
                    alignmentOn = false;
                } else if (id === 'cohesion-button') {
                    cohesionOn = false;
                } else {
                    separationOn = false;
                }
            } else {
                e.target.parentElement.setAttribute('class', 'button on');

                const id = e.target.parentElement.getAttribute('id');
                if (id === 'alignment-button') {
                    alignmentOn = true;
                } else if (id === 'cohesion-button') {
                    cohesionOn = true;
                } else {
                    separationOn = true;
                }
            }
        });
    });

};

