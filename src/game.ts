import {State  } from "./state"

export class Game extends State {
    active: boolean;
    name: string;

    constructor() {
        super();
        this.active = true;
        this.name = "game_state";
    }

    update(delta): void {

    }
}