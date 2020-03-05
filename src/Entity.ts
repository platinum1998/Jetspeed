// Dependencies
import * as BABLYLON from "babylonjs"

// Base abstract class for instancing
export abstract class Entity {
    // Game object types
    public PLAYER: number = 0;   // Main player controller containing spacecraft mesh and camera
    public BLOCK: number = 1;    // Cube blocks for constructing map and collidable towers
    public LOOP: number = 2;     // Increase score as player intersects
    public PICKUP: number = 3;   // Consumable item by player

    public type: number;
    public mesh: BABYLON.Mesh;

    constructor(pos : BABYLON.Vector3) {
        this.type = 0;
    }

    abstract update(dT: number) : void;
}

