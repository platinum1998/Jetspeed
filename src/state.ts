import { Actor } from "./actor";

/**
 * Contains game state information
 */
export abstract class State {
    public active: boolean;
    public name: string;
    public actors: Array<Actor>;

    constructor() {
        this.active = false;
        this.name = "";
    }

    abstract update(delta): void;
}

/**
 * Manages state conditions to prevent clashing
 */
export namespace StateManager {

    /**
     * Get state object from array
     */
    export function GetState(state: State, state_arr) {
        if (state instanceof State) 
            return state;
        else if (typeof state === "number") 
            return state_arr[state];
        else if (typeof state === "string") {
            for (let i = 0; i < state_arr.length; i++) {
                if (state_arr[i].name === state)
                    return state_arr[i];
            }
        }
        
        throw new Error(`Error: Failed to get state. Object ${state} is undefined!`);
    }

    /**
     * Switch states from state array
     */
    export function SwitchStates(current_state, new_state) {
        if (current_state instanceof State) {
            current_state.active = false;
            new_state.active = true;
        }

        throw new Error("Error: Failed to switch states!");
    }

    /**
     * Isolate state to solo
     */
    export function IsolateState() {

    }
}
