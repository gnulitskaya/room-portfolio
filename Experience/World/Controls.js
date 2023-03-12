import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        // for light in Aquarium
        this.room.children.forEach((child) => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        });

        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();

        // this.progress = 0;
        // this.dummyCurve = new THREE.Vector3(0, 0, 0);

        // this.position = new THREE.Vector3(0, 0, 0);
        // this.lookAtPosition = new THREE.Vector3(0, 0, 0);
        //
        // this.directionalVector = new THREE.Vector3(0, 0, 0);
        // this.staticVector = new THREE.Vector3(0, 1, 0);
        // this.crossVector = new THREE.Vector3(0, 0, 0);
        //
        // this.setPath();
        // this.onWheel();
    }

    setScrollTrigger() {
        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": () => {
                // console.log("fired desktop");

                this.room.scale.set(0.23, 0.23, 0.23);
                this.rectLight.width = 0.5;
                this.rectLight.height = 0.7;
                this.camera.orthographicCamera.position.set(0, 6.5, 10);
                this.room.position.set(0, 0, 0);

                // First section -----------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                    },
                });
                this.firstMoveTimeline.fromTo(
                    this.room.position,
                    { x: 0, y: 0, z: 0 },
                    {
                        x: () => {
                            return this.sizes.width * 0.0014;
                        },
                    }
                );

                // Second section -----------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(
                        this.room.position,
                        {
                            x: () => {
                                return 1;
                            },
                            z: () => {
                                return this.sizes.height * 0.0032;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.scale,
                        {
                            x: 0.66,
                            y: 0.66,
                            z: 0.66,
                        },
                        "same"
                    )
                    .to(
                        this.rectLight,
                        {
                            width: 0.5 * 4,
                            height: 0.7 * 4,
                        },
                        "same"
                    );

                // Third section -----------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.camera.orthographicCamera.position, {
                    y: 1.5,
                    x: -4.1,
                });
            },

            // Mobile
            "(max-width: 968px)": () => {
                // console.log("fired mobile");

                // Resets
                this.room.scale.set(0.16, 0.16, 0.16);
                this.room.position.set(0, 0, 0);
                this.rectLight.width = 0.3;
                this.rectLight.height = 0.4;
                this.camera.orthographicCamera.position.set(0, 6.5, 10);

                // First section -----------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        // invalidateOnRefresh: true,
                    },
                }).to(this.room.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                });

                // Second section -----------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(
                        this.room.scale,
                        {
                            x: 0.25,
                            y: 0.25,
                            z: 0.25,
                        },
                        "same"
                    )
                    .to(
                        this.rectLight,
                        {
                            width: 0.3 * 3.4,
                            height: 0.4 * 3.4,
                        },
                        "same"
                    )
                    .to(
                        this.room.position,
                        {
                            x: 1.5,
                        },
                        "same"
                    );

                // Third section -----------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    z: -4.5,
                });
            },

            // all
            all: () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper =
                        section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });

                // All animations
                // First section -----------------------------------------
                this.firstCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                    },
                }).to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                });

                // Second section -----------------------------------------
                this.secondCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                    },
                })
                    .to(
                        this.circleSecond.scale,
                        {
                            x: 3,
                            y: 3,
                            z: 3,
                        },
                        "same"
                    )
                    .to(
                        this.room.position,
                        {
                            y: 0.7,
                        },
                        "same"
                    );

                // Third section -----------------------------------------
                this.thirdCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                    },
                }).to(this.circleThird.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                });

                // Mini Platform Animations
                // this.secondPartTimeline = new GSAP.timeline({
                //     scrollTrigger: {
                //         trigger: ".third-move",
                //         start: "center center",
                //     },
                // });

                // this.room.children.forEach((child) => {
                //     if (child.name === "Mini_Floor") {
                //         this.first = GSAP.to(child.position, {
                //             x: -5.44055,
                //             z: 13.6135,
                //             duration: 0.3,
                //         });
                //     }
                //     if (child.name === "Mailbox") {
                //         this.second = GSAP.to(child.scale, {
                //             x: 1,
                //             y: 1,
                //             z: 1,
                //             duration: 0.3,
                //         });
                //     }
                //     if (child.name === "Lamp") {
                //         this.third = GSAP.to(child.scale, {
                //             x: 1,
                //             y: 1,
                //             z: 1,
                //             ease: "back.out(2)",
                //             duration: 0.3,
                //         });
                //     }
                //     if (child.name === "FloorFirst") {
                //         this.fourth = GSAP.to(child.scale, {
                //             x: 1,
                //             y: 1,
                //             z: 1,
                //             ease: "back.out(2)",
                //             duration: 0.3,
                //         });
                //     }
                //     if (child.name === "FloorSecond") {
                //         this.fifth = GSAP.to(child.scale, {
                //             x: 1,
                //             y: 1,
                //             z: 1,
                //             duration: 0.3,
                //         });
                //     }
                //     if (child.name === "FloorThird") {
                //         this.sixth = GSAP.to(child.scale, {
                //             x: 1,
                //             y: 1,
                //             z: 1,
                //             ease: "back.out(2)",
                //             duration: 0.3,
                //         });
                //     }
                //     if (child.name === "Dirt") {
                //         this.seventh = GSAP.to(child.scale, {
                //             x: 1,
                //             y: 1,
                //             z: 1,
                //             ease: "back.out(2)",
                //             duration: 0.3,
                //         });
                //     }
                //     if (child.name === "Flower1") {
                //         this.eighth = GSAP.to(child.scale, {
                //             x: 1,
                //             y: 1,
                //             z: 1,
                //             ease: "back.out(2)",
                //             duration: 0.3,
                //         });
                //     }
                //     if (child.name === "Flower2") {
                //         this.ninth = GSAP.to(child.scale, {
                //             x: 1,
                //             y: 1,
                //             z: 1,
                //             ease: "back.out(2)",
                //             duration: 0.3,
                //         });
                //     }
                // });
                // this.secondPartTimeline.add(this.first);
                // this.secondPartTimeline.add(this.second);
                // this.secondPartTimeline.add(this.third);
                // this.secondPartTimeline.add(this.fourth, "-=0.2");
                // this.secondPartTimeline.add(this.fifth, "-=0.2");
                // this.secondPartTimeline.add(this.sixth, "-=0.2");
                // this.secondPartTimeline.add(this.seventh, "-=0.2");
                // this.secondPartTimeline.add(this.eighth);
                // this.secondPartTimeline.add(this.ninth, "-=0.1");
            },
        });

        // this.timeline = new GSAP.timeline();
        // this.timeline.to(this.room.position, {
        //     x: () => {
        //         return this.sizes.width * 0.0012;
        //     },
        //     scrollTrigger: {
        //         trigger: ".first-move",
        //         markers: true,
        //         start: "top top",
        //         end: "bottom bottom",
        //         scrub: 0.6,
        //         invalidateOnRefresh: true
        //     }
        // });
    }

    // create path that camera can follow
    // setPath() {
    //     // create a closed wavey loop
    //     this.curve = new THREE.CatmullRomCurve3( [
    //         new THREE.Vector3( -5, 0, 0 ),
    //         new THREE.Vector3( 0, 0, -5 ),
    //         new THREE.Vector3( 5, 0, 0 ),
    //         new THREE.Vector3( 0, 0, 5 )
    //     ], true );
    //
    //     const points = this.curve.getPoints( 50 );
    //     const geometry = new THREE.BufferGeometry().setFromPoints( points );
    //
    //     const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
    //
    //     // create the final object to add to the scene
    //     const curveObject = new THREE.Line( geometry, material );
    //     this.scene.add(curveObject);
    // }

    // onWheel() {
    //     window.addEventListener("wheel", (e) => {
    //         if (e.deltaY > 0) {
    //             this.lerp.target += 0.01;
    //             this.back = false;
    //         } else {
    //             this.lerp.target -= 0.01;
    //             this.back = true;
    //         }
    //     })
    // }


    resize() {
    }

    update() {
        // custom camera movements along curves
        // this.curve.getPointAt(this.lerp.current % 1, this.position);
        // this.camera.orthographicCamera.position.copy(this.position);
        //
        // this.directionalVector.subVectors(
        //     this.curve.getPointAt((this.lerp.current % 1) + 0.000001),
        //     this.position
        // )
        //
        // this.directionalVector.normalize();
        // this.crossVector.crossVectors(
        //     this.directionalVector,
        //     this.staticVector
        // );
        // // this.crossVector.multiplyScalar(100000);
        // this.camera.orthographicCamera.lookAt(this.crossVector);

        // // keeps moving when scroll ends
        // if (this.back) {
        //     this.lerp.target -= 0.001;
        // } else {
        //     this.lerp.target += 0.001;
        // }
        //
        // // values in certain range
        // this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
        // this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current);
        //
        // // to animate camera alonge the curve on each frame
        // this.curve.getPointAt(this.lerp.current, this.position);
        //
        // this.curve.getPointAt(this.lerp.current + 0.00001, this.lookAtPosition);
        // // this.progress -= 0.01;
        //
        // this.camera.orthographicCamera.position.copy(this.position);
        // this.camera.orthographicCamera.lookAt(this.lookAtPosition);
    }

}

