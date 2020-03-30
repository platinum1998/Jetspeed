import * as BABYLON from "babylonjs";
import { Pickup } from "./pickup";
import { GameData } from "./data";
import { Booster } from "./booster";

/**
 * This classes handles the setup of a single module 
 */
export class Module {
    // module data
    public _name: string;
    public _geometry: BABYLON.Mesh;

    /**
     * Constructer | everything initialised here
     * @param name Name of the module
     * @param geometry the geometry of this particular module
     */
    constructor(name: string, geometry: BABYLON.Mesh) {
        this._name = name;
        this._geometry = geometry;
    }

    /**
     * Spawn all of the hoops in the module at there correct locators
     * @param hoop_locations The list of hoop locator positions in the module
     */
    public instanitateHoops(hoop_locations: Array<BABYLON.TransformNode>) {
        for (let i = 0; i < hoop_locations.length; i++) {
            GameData._booster.push(new Booster(new BABYLON.Vector3(
                hoop_locations[i].position.x * GameData.world_scale, 
                hoop_locations[i].position.y * GameData.world_scale, 
                -hoop_locations[i].position.z * GameData.world_scale
            )));
        }
    }

    /**
     * Spawn all of the pickups in the module at there correct locators
     * @param pickup_locations The list of pickup locator positions in the module
     */
    public instanitatePickups(pickup_locations: Array<BABYLON.TransformNode>) {
        for (let i = 0; i < pickup_locations.length; i++)
            GameData._pickups.push(new Pickup(new BABYLON.Vector3(
                pickup_locations[i].position.x * GameData.world_scale,
                pickup_locations[i].position.y * GameData.world_scale,
                -pickup_locations[i].position.z * GameData.world_scale
            )));
    }
    
    /**
     * Reset all the pickups in the module
     */
    public resetPickups() {
        for (let i = 0; i < GameData._pickups.length; i++) {
            GameData._pickups[i].pickupMesh.setEnabled(true);
        }
    }
}