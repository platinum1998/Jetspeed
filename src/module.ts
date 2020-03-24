import * as BABYLON from "babylonjs";
import { Globals } from "./globals";
import { Pickup } from "./pickup";
import { GameData } from "./data";

export class Module {
    // module content
    public _pickups: Array<Pickup> = new Array<Pickup>();
    public _torus: Array<BABYLON.Mesh> = new Array<BABYLON.Mesh>();

    // module data
    public _name: string;
    public _geometry: BABYLON.Mesh;

    constructor(name: string, geometry: BABYLON.Mesh) {
        this._name = name;
        this._geometry = geometry;
    }

    public instanitateHoops(hoop_locations: Array<BABYLON.TransformNode>) {
        let torus = BABYLON.MeshBuilder.CreateTorus("torus", { thickness: 0.1 }, Globals._scene);
        for (let i = 0; i < hoop_locations.length; i++) {
            torus.position.x = hoop_locations[i].position.x * GameData.world_scale;
            torus.position.y = hoop_locations[i].position.y * GameData.world_scale;
            torus.position.z = -hoop_locations[i].position.z * GameData.world_scale;
            torus.scaling.x = 15;
            torus.scaling.y = 15;
            torus.scaling.z = 15;
            torus.rotate(new BABYLON.Vector3(1, 0, 0), BABYLON.Tools.ToRadians(90), BABYLON.Space.LOCAL);
        }
    }

    public instanitatePickups(pickup_locations: Array<BABYLON.TransformNode>) {
        for (let i = 0; i < pickup_locations.length; i++)
            this._pickups.push(new Pickup(new BABYLON.Vector3(
                pickup_locations[i].position.x * GameData.world_scale, 
                pickup_locations[i].position.y * GameData.world_scale, 
                -pickup_locations[i].position.z * GameData.world_scale
            )));
    }
}