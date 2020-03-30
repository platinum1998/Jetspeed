import * as BABYLON from "babylonjs";
import { Actor } from "./Actor";
import { Globals } from "./globals";
import { EventSubject } from "./eventDispatcher";

/**
 * This class creates and updates a single pickup
 */
export class Pickup extends Actor {
    // the pickup is an event subject. This means that it will fire events in-game when notified based on the observer class(player)
    private _event_subject: EventSubject;
    public get event_subject(): EventSubject {
        return this._event_subject;
    }

    // the pickup mesh
    public pickupMesh: BABYLON.Mesh;

    /**
     * Constructer | initialise variables and create the pickup mesh
     * @param pos the position of the pickup
     */
    constructor(pos) {
        super(new BABYLON.Vector3(0, 0, 0));

        this._event_subject = new EventSubject();

        var glowMat = new BABYLON.StandardMaterial("glow_mat", Globals._scene);
        glowMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
        glowMat.specularColor = new BABYLON.Color3(0, 0, 0);

        this.pickupMesh = BABYLON.Mesh.CreateSphere("sphere3", 16, 1.5, Globals._scene);
        this.pickupMesh.position = pos;
        this.pickupMesh.applyFog = true;
        this.pickupMesh.material = glowMat;
        this.pickupMesh.checkCollisions = true;
    }

    /**
    * Update the pickup 
    * @param dT delta time
    */
    update(dT: number): void { }
}