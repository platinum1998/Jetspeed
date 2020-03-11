import { State } from "./state"

/**
 * The main menu class for Jetspeed
 */
export class Menu extends State {
    textblocks: Array<BABYLON.GUI.TextBlock> = new Array();
    buttons: Array<BABYLON.GUI.Button> = new Array();

    constructor() {
        super();

        let uiTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        let last = -300;
        let margin = 200;
        
        /**
         * MAIN MENU BUTTONS
         */

        // Token store
        this.buttons[0] = BABYLON.GUI.Button.CreateImageOnlyButton("tokens_btn", "assets/btn0.png");
        this.buttons[0].width = "811px";
        this.buttons[0].height = "190px";
        this.buttons[0].top = last + margin;
        //this.buttons[0].background = "grey";
        last += margin;
        
        // Challenges
        this.buttons[1] = BABYLON.GUI.Button.CreateImageOnlyButton("challenges_btn", "assets/btn0.png");
        this.buttons[1].width = "811px";
        this.buttons[1].height = "190px";
        this.buttons[1].top = last + margin;
        last += margin;

        // Jet Hanger
        this.buttons[2] = BABYLON.GUI.Button.CreateImageOnlyButton("jet_hanger_btn", "assets/btn0.png");
        this.buttons[2].width = "811px";
        this.buttons[2].height = "190px";
        this.buttons[2].top = last + margin;
        last += margin;

        // Leaderboard
        this.buttons[3] = BABYLON.GUI.Button.CreateImageOnlyButton("leaderboard_btn", "assets/btn0.png");
        this.buttons[3].width = "811px";
        this.buttons[3].height = "190px";
        this.buttons[3].top = last + margin;

        /**
         * SPECIAL MENU BUTTONS
         */

        // Settings
        // this.buttons[4] = BABYLON.GUI.Button.CreateSimpleButton("settings_btn", "");
        // this.buttons[4].width = "40px";
        // this.buttons[4].height = "40px";
        // this.buttons[4].top = "-430px";
        // this.buttons[4].left = "-220px";
        // this.buttons[4].color = "white";
        // this.buttons[4].background = "grey";

        // // Settings
        // this.buttons[5] = BABYLON.GUI.Button.CreateSimpleButton("settings_btn", "");
        // this.buttons[5].width = "40px";
        // this.buttons[5].height = "40px";
        // this.buttons[5].top = "-375px";
        // this.buttons[5].left = "-220px";
        // this.buttons[5].color = "white";
        // this.buttons[5].background = "grey";

        // Add all buttons to UI texture
        for (let i = 0; i < this.buttons.length; i++)
            uiTexture.addControl(this.buttons[i]);
    }

    update(delta): void {

    }
}