import * as BABYLON from "babylonjs";
import { Module } from "./module";
import { GUI } from "./gui";
import { Pickup } from "./pickup";
import { Booster } from "./booster";
import { Content } from "./content";
import { World } from "./world";
import { Menu } from "./menu";

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

export enum ChallengeTypes {
    COLLECT_3_PICKUPS,
    GO_THROUGH_A_HOOP
}

/**
 * Global user data / information
 */
export var UserSettings = {
    MAX_ONGOING_CHALLENGES: 3,
    MAX_CHALLANGES: 10,
    tokens: 0,
    challenges: [],
    current_Challenge: ChallengeTypes.COLLECT_3_PICKUPS,
    jets: [],   // Indices
    xp: 0,
    last_score: 0,
    best_score: 0
};

/**
 * This classes contains function related to the user
 */
export class UserData {
    // has the player just boosted through a hoop?
    static local_storage_variables: Array<number> = Array<number>();
    static boosted: boolean;

    /**
     * Has the player completed the certain challenge yet?
     * @param challenge the challenge to check for completetion
     */
    static CheckForChallengeCompletion(challenge: number) {
        if (UserSettings.current_Challenge == challenge) 
        {
            UserSettings.current_Challenge++;
            console.log(UserSettings.challenges[UserSettings.current_Challenge]);
        }
    }

    /**
     * Increase the users token count 
     * @param add amount of increase
     */
    static IncreaseTokenCount(add: number) {
        UserData.boosted = false;
        if (UserData.boosted == false) {
            UserSettings.tokens = UserSettings.tokens + add;
            GUI.tokens_txt.text = "" + UserSettings.tokens;
            UserData.boosted = true;
        }
    }

    /**
     * Clear local storage
     */
    static ClearLocalStorage() {
        localStorage.clear();
    }

    /**
     * Write the user data to local storage
     */
    static WriteUserDataToLocalStorage() {
        window.localStorage.setItem("data", JSON.stringify(UserSettings)); 
    }
}

/**
 * This class stores main game data 
 */
export class GameData {
    static world_scale: number = 500;
    static number_of_modules: number = 3;
    static number_of_hoops_per_module: number = 2;

    static _pickups: Array<Pickup> = new Array<Pickup>();
    static _booster: Array<Booster> = new Array<Booster>();
    static modules: Array<Module> = new Array<Module>();
    static collisions: Array<BABYLON.Mesh> = new Array<BABYLON.Mesh>();
}