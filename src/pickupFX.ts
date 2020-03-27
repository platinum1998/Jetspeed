import * as BABYLON from "babylonjs";
import { Actor } from "./Actor"
import { Globals } from "./globals";

export class PickupFX extends Actor {
    public particleSystem: BABYLON.ParticleSystem;

    constructor(pos) {
        super(new BABYLON.Vector3(1, 1, 1));

        this.particleSystem = new BABYLON.ParticleSystem(
            "particles",
            50,
            Globals._scene
        );

        this.particleSystem.particleTexture = new BABYLON.Texture(
            "assets/particles/flare.png",
            Globals._scene
        );

        this.particleSystem.emitter = pos;
        this.particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0);
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0);

        this.particleSystem.minSize = 0.5;
        this.particleSystem.maxSize = 0.7;

        this.particleSystem.minLifeTime = 0.3;
        this.particleSystem.maxLifeTime = 1.5;

        this.particleSystem.manualEmitCount = 500;

        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        this.particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

        this.particleSystem.direction1 = new BABYLON.Vector3(7, 8, 6);
        this.particleSystem.direction2 = new BABYLON.Vector3(-7, -8, 6);

        this.particleSystem.minAngularSpeed = 0;
        this.particleSystem.maxAngularSpeed = Math.PI;

        this.particleSystem.minEmitPower = 1;
        this.particleSystem.maxEmitPower = 3;
        this.particleSystem.updateSpeed = 0.1;

        this.particleSystem.start();
    }

    update(dT: number): void {}
} 