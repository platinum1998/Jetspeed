// Dependencies
import * as BABLYLON from "babylonjs"

// Game object types
const PLAYER: number = 0;   // Main player controller containing spacecraft mesh and camera
const BLOCK: number = 1;    // Cube blocks for constructing map and collidable towers
const LOOP: number = 2;     // Increase score as player intersects
const PICKUP: number = 3;   // Consumable item by player


// Base abstract class for instancing
export abstract class Entity {
    public type: number;
    public mesh: BABYLON.Mesh;

    constructor(pos : BABYLON.Vector3) {
        this.type = 0;
    }

    abstract update(dT: number) : void;
}

