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

    static CheckForLocalStorage(uri) {
        // Load and assign data here if there is any...
    }
}