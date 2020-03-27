import * as BABYLON from "babylonjs";
import { Module } from "./module";
import { GUI } from "./gui";
import { Pickup } from "./pickup";
import { Booster } from "./booster";
import { Content } from "./content";

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
    best_score: 0,
};

export class UserData {
    // static userSettings: UserSettings; 

    static boosted: boolean;

    static CheckForChallengeCompletion(challenge: number) {
        if (UserSettings.current_Challenge == challenge) 
        {
            UserSettings.current_Challenge++;
            console.log(UserSettings.challenges[UserSettings.current_Challenge]);
        }
    }
    static IncreaseTokenCount(add: number) {
        UserData.boosted = false;
        if (UserData.boosted == false) {
            UserSettings.tokens = UserSettings.tokens + add;
            GUI.tokens_txt.text = "Tokens: " + UserSettings.tokens;
            UserData.boosted = true;
        }
    }
    static ClearLocalStorage() {
        localStorage.clear();
    }
    static CheckForLocalStorage(uri) {
        // Load and assign data here if there is any...
    }
    static WriteUserDataToLocalStorage() {
        console.log("Saved to Local Storage!");

        window.localStorage.setItem("high_score", JSON.stringify(GUI.distance));
        window.localStorage.setItem("num_tokens", JSON.stringify(UserSettings.tokens));
        window.localStorage.setItem("xp", JSON.stringify(UserSettings.xp));
        window.localStorage.setItem("current_challenge", JSON.stringify(UserSettings.current_Challenge));
    }
}

export class GameData {
    static world_scale: number = 500;
    static number_of_modules: number = 3;
    static number_of_hoops_per_module: number = 2;

    static _pickups: Array<Pickup> = new Array<Pickup>();
    static _booster: Array<Booster> = new Array<Booster>();
    static modules: Array<Module> = new Array<Module>();
    static collisions: Array<BABYLON.Mesh> = new Array<BABYLON.Mesh>();
}