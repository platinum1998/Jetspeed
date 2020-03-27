import * as BABYLON from "babylonjs";
import { Actor } from "./Actor";
import { Globals } from "./globals";
import { ISubject } from "./observer";

export interface IPickup extends ISubject {
    registerObserver(x: IPickupDelegates): void; 
    notifyOnPickup(): void;
}

export interface IPickupDelegates {
    onPickup(): void;
}

export class Pickup extends Actor implements IPickup {
    private _delegates: IPickupDelegates[] = [];
    public pickupMesh: BABYLON.Mesh;
    
    constructor(pos) 
    {
        super(new BABYLON.Vector3(0, 0, 0));

        var glowMat = new BABYLON.StandardMaterial("glow_mat", Globals._scene);
        glowMat.emissiveColor = new BABYLON.Color3(1, 1, 1);

        this.pickupMesh = BABYLON.Mesh.CreateSphere("sphere3", 16, 1.5, Globals._scene);
        this.pickupMesh.position.x = pos.x;
        this.pickupMesh.position.y = pos.y;
        this.pickupMesh.position.z = pos.z;
        this.pickupMesh.scaling.x = 2;
        this.pickupMesh.scaling.y = 2;
        this.pickupMesh.scaling.z = 2;
        this.pickupMesh.applyFog = true;
        this.pickupMesh.material = glowMat;
        this.pickupMesh.checkCollisions = true;    
    }
 
    update(dT: number): void {}  
        
    registerObserver(x: IPickupDelegates): void {
        this._delegates.push(x);
    }

    notifyOnPickup(): void {
        for(let x of this._delegates) {
            if(x.onPickup)
                x.onPickup();
        }
    }

    firePickupEvent() {
        console.log("Pickup event fired!");
        this.notifyOnPickup();
    }
}