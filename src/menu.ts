import {Globals } from "./globals"
import { State } from "./state"
import {Input} from "./input"
import { UserData } from "./data"
import { Scene } from "babylonjs";
import { convolutionPixelShader } from "babylonjs/Shaders/convolution.fragment";

/**
 * List of text elements to be assigned
 */
export enum TextElements {
    CURRENT_RANK,   // 0
    TOKENS,         // 2
    XP,             // 3
    BEST,           // 4
    TAP             // 5
}

export enum MenuStates {
    ORIGIN,
    GAME,
    TOKEN_SHOP,
    CHALLENGES,
    JET_HANGER,
    LEADERBOARD,
    SETTINGS,
    SOCIAL,
    PAYMENT
} 

/**
 * The main menu class for Jetspeed
 */
export class Menu extends State {
    menu_state: number;
    background: BABYLON.GUI.StackPanel;
    rank_bar: BABYLON.GUI.Slider;
    booster_bar: BABYLON.GUI.Slider;
    textblocks: Array<BABYLON.GUI.TextBlock> = new Array();
    buttons: Array<BABYLON.GUI.Button> = new Array();
    transition_rate: number;


    constructor() {
        super();

        // Assign default values
        this.menu_state = MenuStates.ORIGIN;
        this.transition_rate = 0.2;

        // Button layout properties
        let last = -520;
        let margin = 224;

        // Background
        this.background = new BABYLON.GUI.StackPanel();
        this.background.width = 1;
        this.background.height = 1;
        this.background.background = "white";
        this.background.alpha = 0.9;
        Globals.uiTexture.addControl(this.background);

        // Button content
        this.buttons[0] = BABYLON.GUI.Button.CreateImageOnlyButton("tokens_btn", "assets/ui/tokens_btn.png");
        this.buttons[1] = BABYLON.GUI.Button.CreateImageOnlyButton("challenges_btn", "assets/ui/challenges_btn.png");
        this.buttons[2] = BABYLON.GUI.Button.CreateImageOnlyButton("jet_hanger_btn", "assets/ui/hanger_btn.png");
        this.buttons[3] = BABYLON.GUI.Button.CreateImageOnlyButton("leaderboard_btn", "assets/ui/leaderboard_btn.png");
        this.buttons[4] = BABYLON.GUI.Button.CreateImageOnlyButton("leaderboard_btn", "assets/ui/settings_btn.png");
        this.buttons[5] = BABYLON.GUI.Button.CreateImageOnlyButton("leaderboard_btn", "assets/ui/social_btn.png");
        
        // Icons
        this.buttons[6] = BABYLON.GUI.Button.CreateImageOnlyButton("token_icon", "assets/ui/token_icon.png");
        this.buttons[7] = BABYLON.GUI.Button.CreateImageOnlyButton("token_icon", "assets/ui/dot_icon.png");
        this.buttons[8] = BABYLON.GUI.Button.CreateImageOnlyButton("token_icon", "assets/ui/logo.png");

        // Main menu buttons
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].width = "811px";
            this.buttons[i].height = "190px";
            this.buttons[i].top = last + margin;
            this.buttons[i].thickness = 0;
            last += margin;
        }
        
        // Settings
        this.buttons[4].width = "64px";
        this.buttons[4].height = "64px";
        this.buttons[4].top = -880;
        this.buttons[4].left = -460;
        this.buttons[4].thickness = 0;

        // Social
        this.buttons[5].width = "64px";
        this.buttons[5].height = "64px";
        this.buttons[5].top = -795;
        this.buttons[5].left = -460;
        this.buttons[5].thickness = 0;

        // Booster bar
        this.booster_bar = new BABYLON.GUI.Slider("booster_bar");
        this.booster_bar.height = 0.02;
        this.booster_bar.width = 0.7;
        this.booster_bar.verticalAlignment = BABYLON.GUI.Slider.VERTICAL_ALIGNMENT_BOTTOM;
        this.booster_bar.background = "#616161";
        this.booster_bar.top = -100;
        this.booster_bar.displayThumb = false;
        Globals.uiTexture.addControl(this.booster_bar);

        // Rank bar
        this.rank_bar = new BABYLON.GUI.Slider("rank_bar_bg");
        this.rank_bar.height = 0.01;
        this.rank_bar.width = 0.6;
        this.rank_bar.verticalAlignment = BABYLON.GUI.Slider.VERTICAL_ALIGNMENT_TOP;
        this.rank_bar.background = "#d9d6d4";
        this.rank_bar.color = "#616161";
        this.rank_bar.displayValueBar = true;
        this.rank_bar.top = 80;
        this.rank_bar.displayThumb = false;
        this.rank_bar.isEnabled = false;
        Globals.uiTexture.addControl(this.rank_bar);


        /**
         * ICONS
         */
        // Token
        this.buttons[6].width = "33px";
        this.buttons[6].height = "62px";
        this.buttons[6].verticalAlignment = BABYLON.GUI.Button.VERTICAL_ALIGNMENT_TOP;
        this.buttons[6].horizontalAlignment = BABYLON.GUI.Button.HORIZONTAL_ALIGNMENT_RIGHT;
        this.buttons[6].left = -40;
        this.buttons[6].top = 50;
        this.buttons[6].thickness = 0;
        this.buttons[6].isEnabled = false;

        // Dot
        this.buttons[7].width = "23px";
        this.buttons[7].height = "23px";
        this.buttons[7].verticalAlignment = BABYLON.GUI.Button.VERTICAL_ALIGNMENT_BOTTOM;
        this.buttons[7].horizontalAlignment = BABYLON.GUI.Button.HORIZONTAL_ALIGNMENT_CENTER;
        this.buttons[7].top = -109;
        this.buttons[7].left = -360;
        this.buttons[7].thickness = 0;
        this.buttons[7].isEnabled = false;

        // Logo
        this.buttons[8].width = "654px";
        this.buttons[8].height = "99px";
        this.buttons[8].top = -740;
        this.buttons[8].thickness = 0;
        this.buttons[8].isEnabled = false;

        /**
         * Text blocks
         */
        // Current rank / next
        let tb = TextElements;  // Ref shortcut
        this.textblocks[tb.CURRENT_RANK] = new BABYLON.GUI.TextBlock("current_rank_tb", "");
        this.textblocks[tb.CURRENT_RANK].fontFamily = "SquareFont";
        this.textblocks[tb.CURRENT_RANK].text = "0";
        this.textblocks[tb.CURRENT_RANK].isEnabled = false;
        this.textblocks[tb.CURRENT_RANK].color = "#616161";
        this.textblocks[tb.CURRENT_RANK].fontSize = "42px";
        this.textblocks[tb.CURRENT_RANK].top = -910; 
        this.textblocks[tb.CURRENT_RANK].left = -310;

        // Next rank / next
        this.textblocks[tb.CURRENT_RANK + 1] = new BABYLON.GUI.TextBlock("next_rank_tb", "");
        this.textblocks[tb.CURRENT_RANK + 1].fontFamily = "SquareFont";
        let rank_value = +this.textblocks[tb.CURRENT_RANK + 1].text + 1;
        this.textblocks[tb.CURRENT_RANK + 1].text = rank_value.toString();
        this.textblocks[tb.CURRENT_RANK + 1].isEnabled = false;
        this.textblocks[tb.CURRENT_RANK + 1].color = "#616161";
        this.textblocks[tb.CURRENT_RANK + 1].fontSize = "42px";
        this.textblocks[tb.CURRENT_RANK + 1].top = -910;
        this.textblocks[tb.CURRENT_RANK + 1].left = 310;

        // XP
        this.textblocks[tb.XP] = new BABYLON.GUI.TextBlock("xp_tb", "XP");
        this.textblocks[tb.XP].fontFamily = "SquareFont";
        this.textblocks[tb.XP].isEnabled = false;
        this.textblocks[tb.XP].color = "#616161";
        this.textblocks[tb.XP].fontSize = "61px";
        this.textblocks[tb.XP].left = -200;
        this.textblocks[tb.XP].top = -460;

        // BEST
        this.textblocks[tb.BEST] = new BABYLON.GUI.TextBlock("best_tb", "BEST");
        this.textblocks[tb.BEST].fontFamily = "SquareFont";
        this.textblocks[tb.BEST].isEnabled = false;
        this.textblocks[tb.BEST].color = "#616161";
        this.textblocks[tb.BEST].fontSize = "61px";
        this.textblocks[tb.BEST].left = 160;
        this.textblocks[tb.BEST].top = -460;

        // XP VALUE
        this.textblocks[tb.BEST + 1] = new BABYLON.GUI.TextBlock("xp_value_tb", "64");
        this.textblocks[tb.BEST + 1].fontFamily = "SquareFont";
        this.textblocks[tb.BEST + 1].isEnabled = false;
        this.textblocks[tb.BEST + 1].color = "#616161";
        this.textblocks[tb.BEST + 1].fontSize = "180px";
        this.textblocks[tb.BEST + 1].left = -210;
        this.textblocks[tb.BEST + 1].top = -580;

        // BEST VALUE
        this.textblocks[tb.BEST + 2] = new BABYLON.GUI.TextBlock("best_value_tb", "512");
        this.textblocks[tb.BEST + 2].fontFamily = "SquareFont";
        this.textblocks[tb.BEST + 2].isEnabled = false;
        this.textblocks[tb.BEST + 2].color = "#616161";
        this.textblocks[tb.BEST + 2].fontSize = "180px";
        this.textblocks[tb.BEST + 2].left = 160;
        this.textblocks[tb.BEST + 2].top = -580;

        // TOKENS
        this.textblocks[tb.BEST + 3] = new BABYLON.GUI.TextBlock("tokens_value", "13");
        this.textblocks[tb.BEST + 3].fontFamily = "SquareFont";
        this.textblocks[tb.BEST + 3].isEnabled = false;
        this.textblocks[tb.BEST + 3].color = "#616161";
        this.textblocks[tb.BEST + 3].verticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
        this.textblocks[tb.BEST + 3].fontSize = "44px";
        this.textblocks[tb.BEST + 3].left = 430;
        this.textblocks[tb.BEST + 3].top = -876;

        // TAP
        this.textblocks[tb.BEST + 4] = new BABYLON.GUI.TextBlock("best_value_tb", "TAP");
        this.textblocks[tb.BEST + 4].fontFamily = "SquareFont";
        this.textblocks[tb.BEST + 4].isEnabled = false;
        this.textblocks[tb.BEST + 4].color = "#616161";
        this.textblocks[tb.BEST + 4].alpha = 1;
        this.textblocks[tb.BEST + 4].fontSize = "200px";
        this.textblocks[tb.BEST + 4].top = 640;
                

        // Add all buttons to UI texture
        for (let i = 0; i < this.buttons.length; i++)
        Globals.uiTexture.addControl(this.buttons[i]);
        // Add all textblocks to UI texture
        for (let i = 0; i < this.textblocks.length; i++)
        Globals.uiTexture.addControl(this.textblocks[i]);
    }

    /**
     * 
     * @param delta Main update method
     */
    update(delta): void {
        switch (this.menu_state) {
            case MenuStates.ORIGIN:
                this.updatePlayButton(delta);
                this.updateBoosterBar(delta);
                break;
            case MenuStates.GAME:
                this.updateGameState(delta);
        }
    }

    /**
     * Tap animation
     */
    switch: number = 1;
    animatePlayButton(dT): void {
        this.textblocks[TextElements.BEST + 4].alpha = BABYLON.Scalar.Lerp(this.textblocks[TextElements.BEST + 4].alpha, this.switch, 0.03);
        let prev_alpha = this.textblocks[TextElements.BEST + 4].alpha;
        if (prev_alpha >= 0.95 - 0.5)
            this.switch = 0;
        else if (prev_alpha <= 0.15)
            this.switch = 1;
    }
    
    /**
     * Dot animation for booster bar
     */
    current_dir: number = -360;
    dir_switch: number = -this.current_dir;
    animateBooster(dT) {
        this.buttons[7].left = this.current_dir;
        this.current_dir = BABYLON.Scalar.Lerp(this.current_dir, this.dir_switch, 0.025);

        let greater = this.buttons[7].left > 358;
        if (greater) {
            this.dir_switch = -this.dir_switch;
            console.log("SWITCH");
        }
        // else if (current_x <=  -358)
        //     this.dir_switch = 360;
    }

    /**
     * Update booster bar
     * @param dT Delta time
     */
    updateBoosterBar(dT) {
        this.animateBooster(dT);
    }

    /**
     * Update play btn tap events
     * @param dT Delta time
     */
    updatePlayButton(dT) {
        this.animatePlayButton(dT);

        if (Input.tap === true) {
            if (Input.mouse_y > 1440) {
                console.log("PLAY!");
                this.menu_state = MenuStates.GAME;  // Assign game state
            }
        }
    }

    /**
     * Update game state from menu
     * @param dT Delta time
     */
    updateGameState(dT) {
        // Tween background
        this.background.alpha = BABYLON.Scalar.Lerp(this.background.alpha, 0, this.transition_rate);
        
        // Tween button alpha
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].isEnabled = false;
            this.buttons[i].alpha = BABYLON.Scalar.Lerp(this.buttons[i].alpha, 0, this.transition_rate);
        }

        // Tween textblock alpha
        for (let i = 0; i < this.textblocks.length; i++)
            this.textblocks[i].alpha = BABYLON.Scalar.Lerp(this.textblocks[i].alpha, 0, this.transition_rate);

        this.rank_bar.alpha = BABYLON.Scalar.Lerp(this.rank_bar.alpha, 0, this.transition_rate);
        this.booster_bar.alpha = BABYLON.Scalar.Lerp(this.booster_bar.alpha, 0, this.transition_rate);
    }
}