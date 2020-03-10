import * as BABYLON from "babylonjs";
import { Actor } from "./actor";
import { Globals } from "./globals";
import { addPointLight } from "./helper";

export class Pickup extends Actor {
    private glowLayer: BABYLON.GlowLayer;
    public pickupMesh: BABYLON.Mesh;

    constructor(pos) {
        super(new BABYLON.Vector3(0, 0, 0));

        var glowMat = new BABYLON.StandardMaterial("glow_mat", Globals._scene);
        glowMat.emissiveColor = new BABYLON.Color3(1, 1, 1);

        this.pickupMesh = BABYLON.Mesh.CreateSphere("sphere3", 16, 1, Globals._scene);
        this.pickupMesh.position = pos;
        this.pickupMesh.material = glowMat;
        this.pickupMesh.checkCollisions = true;

        this.glowLayer = new BABYLON.GlowLayer("glow", Globals._scene);
        this.glowLayer.addIncludedOnlyMesh(this.pickupMesh);
        this.glowLayer.intensity = 2.5;

        addPointLight(1.0, new BABYLON.Vector3(0, 1, -15), new BABYLON.Color3(1, 1, 1), 3);
    }

    update(dT: number): void {}  
}