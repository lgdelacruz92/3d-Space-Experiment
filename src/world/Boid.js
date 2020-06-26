import * as THREE from 'three';
import { randomVec } from '../utils';
import { CONSTANTS } from '../constants';

const dot = (v1, v2) => {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

const cross = (a, b) => {
    return { x: a.y*b.z - a.z*b.y, y: a.z*b.x - a.x*b.z, z: a.x*b.y - a.y*b.x };
}

const mag = (a) => {
    return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
}

const normalize = a => {
    return { x: a.x / mag(a), y: a.y / mag(a), z: a.z / mag(a) };
}

class Boid {
    constructor(geometry, scene) {

        this.geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array( [
            -0.007615 , 0.013256 , -0.031019 ,
            -0.006984 , 0.016063 , -0.010518 ,
            -0.023849 , 0.008293 , 0.019892 ,
            -0.007615 , 0.013256 , -0.031019 ,
            -0.023849 , 0.008293 , 0.019892 ,
            -0.006984 , 0.016063 , -0.010518 ,
            0.007089 , 0.012602 , -0.030398 ,
            0.024072 , 0.007984 , 0.020334 ,
            0.006445 , 0.015995 , -0.010998 ,
            0.007089 , 0.012602 , -0.030398 ,
            0.006445 , 0.015995 , -0.010998 ,
            0.024072 , 0.007984 , 0.020334 ,
            0.008748 , 0.015613 , 0.051516 ,
            0.024072 , 0.007984 , 0.020334 ,
            0.007089 , 0.012602 , -0.030398 ,
            0.008748 , 0.015613 , 0.051516 ,
            0.007089 , 0.012602 , -0.030398 ,
            0.024072 , 0.007984 , 0.020334 ,
            -0.007615 , 0.013256 , -0.031019 ,
            0.000202 , -0.005722 , 0.051011 ,
            0.000033 , -0.00099 , -0.055 ,
            -0.007615 , 0.013256 , -0.031019 ,
            0.000033 , -0.00099 , -0.055 ,
            0.000202 , -0.005722 , 0.051011 ,
            0.007089 , 0.012602 , -0.030398 ,
            0.000202 , -0.005722 , 0.051011 ,
            0.008748 , 0.015613 , 0.051516 ,
            0.007089 , 0.012602 , -0.030398 ,
            0.008748 , 0.015613 , 0.051516 ,
            0.000202 , -0.005722 , 0.051011 ,
            0.000934 , 0.006966 , -0.015758 ,
            0.007089 , 0.012602 , -0.030398 ,
            0.006445 , 0.015995 , -0.010998 ,
            0.000934 , 0.006966 , -0.015758 ,
            0.006445 , 0.015995 , -0.010998 ,
            0.007089 , 0.012602 , -0.030398 ,
            -0.007615 , 0.013256 , -0.031019 ,
            -0.000857 , 0.007344 , -0.015608 ,
            -0.006984 , 0.016063 , -0.010518 ,
            -0.007615 , 0.013256 , -0.031019 ,
            -0.006984 , 0.016063 , -0.010518 ,
            -0.000857 , 0.007344 , -0.015608 ,
            -0.023849 , 0.008293 , 0.019892 ,
            -0.008872 , 0.016049 , 0.051516 ,
            -0.007615 , 0.013256 , -0.031019 ,
            -0.023849 , 0.008293 , 0.019892 ,
            -0.007615 , 0.013256 , -0.031019 ,
            -0.008872 , 0.016049 , 0.051516 ,
            0.008748 , 0.015613 , 0.051516 ,
            0.024072 , 0.007984 , 0.051516 ,
            0.024072 , 0.007984 , 0.020334 ,
            0.008748 , 0.015613 , 0.051516 ,
            0.024072 , 0.007984 , 0.020334 ,
            0.024072 , 0.007984 , 0.051516 ,
            -0.007615 , 0.013256 , -0.031019 ,
            -0.008872 , 0.016049 , 0.051516 ,
            0.000202 , -0.005722 , 0.051011 ,
            -0.007615 , 0.013256 , -0.031019 ,
            0.000202 , -0.005722 , 0.051011 ,
            -0.008872 , 0.016049 , 0.051516 ,
            0.007089 , 0.012602 , -0.030398 ,
            0.000033 , -0.00099 , -0.055 ,
            0.000202 , -0.005722 , 0.051011 ,
            0.007089 , 0.012602 , -0.030398 ,
            0.000202 , -0.005722 , 0.051011 ,
            0.000033 , -0.00099 , -0.055 ,
            0.000934 , 0.006966 , -0.015758 ,
            0.000033 , -0.00099 , -0.055 ,
            0.007089 , 0.012602 , -0.030398 ,
            0.000934 , 0.006966 , -0.015758 ,
            0.007089 , 0.012602 , -0.030398 ,
            0.000033 , -0.00099 , -0.055 ,
            -0.007615 , 0.013256 , -0.031019 ,
            0.000033 , -0.00099 , -0.055 ,
            -0.000857 , 0.007344 , -0.015608 ,
            -0.007615 , 0.013256 , -0.031019 ,
            -0.000857 , 0.007344 , -0.015608 ,
            0.000033 , -0.00099 , -0.055 ,
            -0.023849 , 0.008293 , 0.019892 ,
            -0.023849 , 0.008293 , 0.051516 ,
            -0.008872 , 0.016049 , 0.051516 ,
            -0.023849 , 0.008293 , 0.019892 ,
            -0.008872 , 0.016049 , 0.051516 ,
            -0.023849 , 0.008293 , 0.051516 ,
        ] );

        const scaledVertices = vertices.map(val => val * 10);

        this.geometry.setAttribute( 'position', new THREE.BufferAttribute( scaledVertices, 3 ));
        this.geometry.computeVertexNormals();
        this.material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
        this.boid = new THREE.Mesh( this.geometry, this.material );

        this.vel = randomVec();
        this.a = { x: 0, y: 0, z: 0};
        scene.add( this.boid );

        this.dir = { x: 0, y: 0, z: -1 };

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

        this.boid.rotation.x = 0;
        this.boid.rotation.y = 0;
        this.boid.rotation.z = 0;

        const dotProduct = dot(this.dir, this.vel);
        const aMag = mag(this.dir);
        const bMag = mag(this.vel);
        const angle = Math.acos(dotProduct / (aMag * bMag));
        const crossProduct = cross(this.dir, this.vel);
        // console.log(normalize(crossProduct), angle);
        this.boid.rotateOnAxis(normalize(crossProduct), angle);
        
        this.a = { x: 0, y: 0, z: 0 };

        if (this.boid.position.x > CONSTANTS.world.w / 2) {
            this.boid.position.x = -CONSTANTS.world.w / 2;
        }
        if (this.boid.position.y > CONSTANTS.world.w / 2) {
            this.boid.position.y = -CONSTANTS.world.w / 2;
        }

        if (this.boid.position.z > CONSTANTS.world.w / 2) {
            this.boid.position.z = -CONSTANTS.world.w / 2;
        }

        if (this.boid.position.x < -CONSTANTS.world.w / 2) {
            this.boid.position.x = CONSTANTS.world.w / 2;
        }

        if (this.boid.position.y < -CONSTANTS.world.w / 2) {
            this.boid.position.y = CONSTANTS.world.w / 2;
        }

        if (this.boid.position.z < -CONSTANTS.world.w / 2) {
            this.boid.position.z = CONSTANTS.world.w / 2;
        }
    }
}

export default Boid;