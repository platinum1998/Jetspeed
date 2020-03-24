import * as BABYLON from "babylonjs";
import { Actor } from "./Actor";
import { Globals } from "./globals";
import { addPointLight } from "./helper";

export class Pickup extends Actor {
    public pickupMesh: BABYLON.Mesh;

    constructor(pos) {
        super(new BABYLON.Vector3(0, 0, 0));

        var glowMat = new BABYLON.StandardMaterial("glow_mat", Globals._scene);
        glowMat.emissiveColor = new BABYLON.Color3(1, 1, 1);

        this.pickupMesh = BABYLON.Mesh.CreateSphere("sphere3", 16, 1.5, Globals._scene);
        this.pickupMesh.position = pos;
        this.pickupMesh.material = glowMat;
        this.pickupMesh.checkCollisions = true;
    }

    update(dT: number): void {}  
}