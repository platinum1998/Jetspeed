/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";

/**
 * An enumator of all the possible different actor types
 */
export enum ActorTypes {
    PLAYER_CHARACTER,
    MAP_OBJECT,
    PARTICLE_FX
}

/**
 * The base class for both static and moveable actors in the world 
 */
export abstract class Actor {
    protected type: number;
    protected position: BABYLON.Vector3;

    constructor(pos) {
        this.position = pos;
    }

    abstract update(dT: number): void;
}