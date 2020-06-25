import * as THREE from 'three';
import { CONSTANTS } from '../constants';

const floorTexture = new THREE.TextureLoader().load( '../textures/floor.jpg');
const alphamap = new THREE.TextureLoader().load( '../textures/alphamap.png');
const wallTexture = new THREE.TextureLoader().load('../textures/wall.jpg');
const plane = new THREE.PlaneGeometry(CONSTANTS.world.w, CONSTANTS.world.h);

const makeFloor = scene => {
    var material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: floorTexture, alphaMap: alphamap } );
    var floor = new THREE.Mesh( plane, material );
    scene.add( floor );

    floor.rotateX(Math.PI / 2);  
}

const makeBackWall = scene => {
    const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: wallTexture, opacity: 0.3 });
    const backWall = new THREE.Mesh(plane, material);
    scene.add(backWall);
    backWall.position.y = CONSTANTS.world.h / 2;
    backWall.position.z = -CONSTANTS.world.z / 2;
}

const makeFrontWall = scene => {
    const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: wallTexture, opacity: 0.3 });
    const backWall = new THREE.Mesh(plane, material);
    scene.add(backWall);
    backWall.position.y = CONSTANTS.world.h / 2;
    backWall.position.z = CONSTANTS.world.z / 2;
}

const makeLeftWall = scene => {
    const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: wallTexture, alphaMap: alphamap });
    const leftWall = new THREE.Mesh(plane, material);
    scene.add(leftWall);
    leftWall.position.x = -CONSTANTS.world.w / 2;
    leftWall.position.y = CONSTANTS.world.h / 2;
    leftWall.rotateY(Math.PI / 2);
}

const setupLights = scene => {
    var light2 = new THREE.PointLight( 0xffffff, 1, 100 );
    light2.position.set( 0, CONSTANTS.world.h / 2, 0 );
    scene.add( light2 );
}

const makeRightWall = scene => {
    const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: wallTexture, alphaMap: alphamap });
    const rightWall = new THREE.Mesh(plane, material);
    scene.add(rightWall);
    rightWall.position.x = CONSTANTS.world.w / 2;
    rightWall.position.y = CONSTANTS.world.h / 2;
    rightWall.rotateY(Math.PI / 2);
}

export const setupWorld = (scene) => {
    makeFloor(scene);
    makeBackWall(scene);
    makeFrontWall(scene);
    makeLeftWall(scene);
    makeRightWall(scene);
    setupLights(scene);
}
