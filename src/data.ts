import * as BABYLON from "babylonjs";
import { Module } from "./module";

/**
 * List of rewards
 */
export enum RewardTypes {
    FREE_BOOST,
    TOKENS,
    UNLOCK_JET
}

/**
 * Challenge object
 */
export interface Challenge {
    complete,   // boolean
    reward     // reward type (int)
}

/**
 * Global user data / information
 */
export class UserData {
    static MAX_ONGOING_CHALLENGES = 3;
    static tokens = 0;
    static challenges = [{}];
    static jets = [];   // Indices
    static xp = 0;
    static best_score = 0;

    static ClearLocalStorage() {
        localStorage.clear();
    }
    static CheckForLocalStorage(uri) {
        // Load and assign data here if there is any...
    }
}

export class GameData {
    static world_scale: number = 500;
    static number_of_modules: number = 3;
    static number_of_hoops_per_module: number = 2;

    static modules: Array<Module> = new Array<Module>();
    static collisions: Array<BABYLON.Mesh> = new Array<BABYLON.Mesh>();
}