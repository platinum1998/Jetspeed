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

        let pick_up_geo = Globals._scene.getNodeByName("pickup_geo") as BABYLON.Mesh;
        pick_up_geo.position.x = pos.x;
        pick_up_geo.position.y = pos.y;
        pick_up_geo.position.z = pos.z;
        pick_up_geo.scaling.x = 20;
        pick_up_geo.scaling.y = 20;
        pick_up_geo.scaling.z = 20;
        pick_up_geo.applyFog = true;
        pick_up_geo.material = glowMat;
        pick_up_geo.checkCollisions = true;

        //this.pickupMesh = BABYLON.Mesh.CreateSphere("sphere3", 16, 1.5, Globals._scene);
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