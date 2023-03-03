import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Resources from "./Utils/Resources.js";
import Time from "./Utils/Time.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";

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
        this.world = new World();

        // слушает событие которое пришло
        this.time.on("update", () => {
            this.update();
        })
        this.sizes.on("resize", () => {
            this.resize();
        })
    }

    update() {
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