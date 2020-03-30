import * as BABYLON from "babylonjs";
import { Actor } from "./Actor";
import { Globals } from "./globals";
import { ISubject } from "./observer";
import { EventSubject } from "./eventDispatcher";

/**
 * The booster class handles the creation of the hoops 
 */
export class Booster extends Actor {
    // the booster is an event subject. This means that it will fire events in-game when notified based on the observer class(player)
    private _event_subject: EventSubject;
    public get event_subject(): EventSubject {
        return this._event_subject;
    }

    // the hoop mesh
    public boosterMesh: BABYLON.Mesh;

    /**
     * Constructer | initialise variables and create the hoop mesh
     * @param pos the position of the hoop
     */
    constructor(pos: BABYLON.Vector3) {
        super(new BABYLON.Vector3(0, 0, 0));

        this._event_subject = new EventSubject();

        var glowMat = new BABYLON.StandardMaterial("glow_mat", Globals._scene);
        glowMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
        glowMat.specularColor = new BABYLON.Color3(0, 0, 0);

        this.boosterMesh = BABYLON.MeshBuilder.CreateTorus("torus", { thickness: 0.1 }, Globals._scene);
        this.boosterMesh.position = pos;
        this.boosterMesh.scaling = new BABYLON.Vector3(15, 15, 15);
        this.boosterMesh.material = glowMat;
        this.boosterMesh.rotate(new BABYLON.Vector3(1, 0, 0), BABYLON.Tools.ToRadians(90), BABYLON.Space.LOCAL);
    }
    
    /**
     * Update the hoop 
     * @param dT delta time
     */
    update(dT: number): void {}
}