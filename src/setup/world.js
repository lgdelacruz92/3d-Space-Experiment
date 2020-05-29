import * as THREE from 'three';

const floorTexture = new THREE.TextureLoader().load( '../textures/floor.jpg' );
const wallTexture = new THREE.TextureLoader().load('../textures/wall.jpg');
const plane = new THREE.PlaneGeometry(10, 10);

const makeFloor = scene => {
    var material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: floorTexture } );
    var floor = new THREE.Mesh( plane, material );
    scene.add( floor );

    floor.rotateX(Math.PI / 2);  
}

const makeBackWall = scene => {
    const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: wallTexture });
    const backWall = new THREE.Mesh(plane, material);
    scene.add(backWall);
    backWall.position.y = 5;
    backWall.position.z = -5;
}

const makeLeftWall = scene => {
    const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: wallTexture });
    const leftWall = new THREE.Mesh(plane, material);
    scene.add(leftWall);
    leftWall.position.x = -5;
    leftWall.position.y = 5;
    leftWall.rotateY(Math.PI / 2);
}

const setupLights = scene => {
    var light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 0, 10, 10 );
    scene.add( light );

}

const makeRightWall = scene => {
    const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: wallTexture });
    const rightWall = new THREE.Mesh(plane, material);
    scene.add(rightWall);
    rightWall.position.x = 5;
    rightWall.position.y = 5;
    rightWall.rotateY(Math.PI / 2);
}

export const setupWorld = (scene) => {
    makeFloor(scene);
    makeBackWall(scene);
    makeLeftWall(scene);
    makeRightWall(scene);
    setupLights(scene);
}
