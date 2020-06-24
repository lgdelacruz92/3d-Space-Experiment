import * as THREE from 'three';
import { randomVec } from '../utils';
import { CONSTANTS } from '../constants';
class Boid {
    constructor(geometry, scene) {
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.boid = new THREE.Mesh( geometry, material );
        this.vel = randomVec();
        scene.add( this.boid );
    }

    setPosition(x, y, z) {
        this.boid.position.x = x;
        this.boid.position.y = y;
        this.boid.position.z = z;
    }

    update() {
        this.boid.position.x += this.vel.x;
        this.boid.position.y += this.vel.y;
        this.boid.position.z += this.vel.z;

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