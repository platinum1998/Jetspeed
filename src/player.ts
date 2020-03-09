/**
 * Class Importations
 */
import { Actor } from "./Actor";
import { loadMesh } from "./helper";

/**
 * The main player class for creating and updating the player
 */
export class Player extends Actor {
    /**
     * Variables and Objects
     */
    private meshAssetTask: BABYLON.MeshAssetTask;

    /**
     * Initialise variables and objects here 
    */
    constructor() {
        super(new BABYLON.Vector3(0, 5, -10));

        // add mesh here
        loadMesh("player mesh", "assets/ship.babylon", this.meshAssetTask);
    }

    /**
     * Update the players movement
     */
    update(dT: number): void {}
}