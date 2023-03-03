import { EventEmitter } from "events";

export default class Time extends EventEmitter {
    constructor() {
        super();
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        this.update();
    }

    update() {
        const currentTime = Date.now();
        // дельта между кадрами
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        // console.log(this.delta)

        // эмитим значение в другие классы, чтобы обновить анимацию
        this.emit("update");
        window.requestAnimationFrame(() => this.update());
    }
}
