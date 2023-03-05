import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;

        this.progress = 0;
        this.dummyCurve = new THREE.Vector3(0, 0, 0);

        this.lerp = {
            current: 0,
            target: 1,
            ease: 0.1
        }

        this.position = new THREE.Vector3(0, 0, 0);

        this.setPath();
        this.onWheel();
    }

    // create path that camera can follow
    setPath() {
        // create a closed wavey loop
        this.curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -10, 0, 10 ),
            new THREE.Vector3( -5, 5, 5 ),
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 5, -5, 5 ),
            new THREE.Vector3( 10, 0, 10 )
        ], true );

        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

        // create the final object to add to the scene
        const curveObject = new THREE.Line( geometry, material );
        this.scene.add(curveObject);
    }

    onWheel() {
        window.addEventListener("wheel", (e) => {
            if (e.deltaY > 0) {
                this.lerp.target += 0.1;
            } else {
                this.lerp.target -= 0.1;
                // if(this.progress < 0) {
                //     this.progress = 1;
                // }
            }
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
        // to animate camera alonge the curve on each frame
        this.curve.getPointAt(this.lerp.current, this.position);
        // this.progress -= 0.01;

        this.camera.orthographicCamera.position.copy(this.position);
    }

}

