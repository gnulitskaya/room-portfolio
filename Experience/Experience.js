import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Resources from "./Utils/Resources.js";
import Time from "./Utils/Time.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Theme from "./Theme.js";
import Preloader from "./Preloader.js";
import Controls from "./World/Controls.js";

export default class Experience {
    static instance
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.time = new Time();
        this.resources = new Resources(assets);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();

        this.preloader.on("enablecontrols", () => {
            this.controls = new Controls();
        });

        // слушает событие которое пришло
        this.time.on("update", () => {
            this.update();
        })
        this.sizes.on("resize", () => {
            this.resize();
        })
    }

    update() {
        this.preloader.update();
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

    resize() {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }
}