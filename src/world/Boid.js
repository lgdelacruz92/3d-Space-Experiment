import * as THREE from 'three';
class Boid {
    constructor(geometry, scene) {
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.boid = new THREE.Mesh( geometry, material );
        scene.add( this.boid );
    }

    setPosition(x, y, z) {
        this.boid.position.x = x;
        this.boid.position.y = y;
        this.boid.position.z = z;
    }
}

export default Boid;