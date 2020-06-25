import * as THREE from 'three';
import { randomVec } from '../utils';
import { CONSTANTS } from '../constants';
class Boid {
    constructor(geometry, scene) {
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.boid = new THREE.Mesh( geometry, material );
        this.vel = randomVec();
        this.a = { x: 0, y: 0, z: 0};
        scene.add( this.boid );
    }

    push(f) {
        this.a.x += f.x;
        this.a.y += f.y;
        this.a.z += f.z;

        if (this.a.x > 0.1) {
            this.a.x = 0.1;
        }

        if (this.a.x < -0.1) {
            this.a.x = -0.1;
        }

        if (this.a.y > 0.1) {
            this.a.y = 0.1;
        }

        if (this.a.y < -0.1) {
            this.a.y = -0.1;
        }

        if (this.a.z > 0.1) {
            this.a.z = 0.1;
        }

        if (this.a.z < -0.1) {
            this.a.z = -0.1;
        }
    }

    setPosition(x, y, z) {
        this.boid.position.x = x;
        this.boid.position.y = y;
        this.boid.position.z = z;
    }

    update() {

        // accumulation vel to get position
        this.boid.position.x += this.vel.x;
        this.boid.position.y += this.vel.y;
        this.boid.position.z += this.vel.z;

        // accumation a to get vel
        this.vel.x += this.a.x;
        this.vel.y += this.a.y;
        this.vel.z += this.a.z;

        if (this.vel.x > 0.1) {
            this.vel.x = 0.1;
        }

        if (this.vel.x < -0.1) {
            this.vel.x = -0.1;
        }

        if (this.vel.y > 0.1) {
            this.vel.y > 0.1;
        }

        if (this.vel.y < -0.1) {
            this.vel.y = -0.1;
        }

        if (this.vel.z > 0.1) {
            this.vel.z = 0.1;
        }

        if (this.vel.z < -0.1) {
            this.vel.z = -0.1;
        }

        this.a = { x: 0, y: 0, z: 0 };

        if (this.boid.position.x > CONSTANTS.world.w / 2) {
            this.boid.position.x = -CONSTANTS.world.w / 2;
        }
        if (this.boid.position.y > CONSTANTS.world.w) {
            this.boid.position.y = 0;
        }

        if (this.boid.position.z > CONSTANTS.world.w / 2) {
            this.boid.position.z = -CONSTANTS.world.w / 2;
        }

        if (this.boid.position.x < -CONSTANTS.world.w / 2) {
            this.boid.position.x = CONSTANTS.world.w / 2;
        }

        if (this.boid.position.y < 0) {
            this.boid.position.y = CONSTANTS.world.w;
        }

        if (this.boid.position.z < -CONSTANTS.world.w / 2) {
            this.boid.position.z = CONSTANTS.world.w / 2;
        }
    }
}

export default Boid;