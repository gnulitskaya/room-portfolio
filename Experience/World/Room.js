import * as THREE from "three";
import Experience from "../Experience.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.setModel();
        this.setAnimation();
        // console.log(this.actualRoom)
        // camera.position.z = 5;
    }
    setModel() {
        // add shadows
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    // console.log(groupchild.material);
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
            console.log(child.name);
            // для аквариума добавляяем эффект стекла
            if (child.name === "AquariumGlass") {
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x549dd2);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
                // child.children[0].material.depthWrite = false;
                // child.children[0].material.depthTest = false;
            }

            // заставка на компе
            if (child.name === "Screen") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.66,0.66,0.66);
        // this.actualRoom.rotation.y = Math.PI;
    }

    // animation fish
    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        console.log(this.room)
        this.swim = this.mixer.clipAction(this.room.animations[128]);
        this.swim.play();
    }


    resize() {
    }

    update() {
        this.mixer.update(this.time.delta * 0.0009);
    }

}

