import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import {RectAreaLightHelper} from "three/addons/helpers/RectAreaLightHelper.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        // controls for animation
        this.lerp = {
            current: 0,
            target: 1,
            ease: 0.1,
        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
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

        // add light for Aquarium
        const width = 0.5;
        const height = 0.7;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set( 7.68244, 7, 0.5);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = -Math.PI / 4;

        this.actualRoom.add( rectLight );

        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.23,0.23,0.23);
        // this.actualRoom.rotation.y = Math.PI;
    }

    // animation fish
    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[128]);
        this.swim.play();
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        })
    }

    resize() {
    }

    update() {
        // gsap utils lerp function
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        )

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }

}

