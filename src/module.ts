import * as BABYLON from "babylonjs";
import { Globals } from "./globals";
import { Pickup } from "./pickup";
import { GameData } from "./data";
import { Booster } from "./booster";

export class Module {
    // module data
    public _name: string;
    public _geometry: BABYLON.Mesh;

    constructor(name: string, geometry: BABYLON.Mesh) {
        this._name = name;
        this._geometry = geometry;
    }

    public instanitateHoops(hoop_locations: Array<BABYLON.TransformNode>) {
        for (let i = 0; i < hoop_locations.length; i++) {
            GameData._booster.push(new Booster(new BABYLON.Vector3(
                hoop_locations[i].position.x * GameData.world_scale, 
                hoop_locations[i].position.y * GameData.world_scale, 
                -hoop_locations[i].position.z * GameData.world_scale
            )));
        }
    }

    public instanitatePickups(pickup_locations: Array<BABYLON.TransformNode>) {
        for (let i = 0; i < pickup_locations.length; i++)
            GameData._pickups.push(new Pickup(new BABYLON.Vector3(
                pickup_locations[i].position.x * GameData.world_scale,
                pickup_locations[i].position.y * GameData.world_scale,
                -pickup_locations[i].position.z * GameData.world_scale
            )));
    }
    
    public resetPickups() {
        for (let i = 0; i < GameData._pickups.length; i++) {
            GameData._pickups[i].pickupMesh.setEnabled(true);
        }
    }
}