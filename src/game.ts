import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { State } from "./state"
import { Player } from "./player";
import { GUI } from "./gui";
import { Globals } from "./globals";
import { generateSunlight } from "./helper";
import { World } from "./world";
import { SceneParser } from "./sceneParser";

/**
 * This class handles the main game state
 */
export class Game extends State {
    active: boolean;
    name: string;

    /**
     * the player 
     */
    public _player: Player;

    /**
     * Constructer | everything initialised here
     */    
    constructor() {
        super();
        this.active = true;
        this.name = "game_state";

        /**
         * Create the in-game UI
         */
        GUI.create();

        /**
         * lighting 
         */
        generateSunlight(
            1.5,
            new BABYLON.Vector3(0.6, 0.8, 1.0),
            new BABYLON.Vector3(0.3, 0.5, 1)
        );

        /**
         * When the scene is ready, get the root node and parse the scene through our scene parser
         */
        Globals._scene.executeWhenReady(() => {
            // get root node
            let root = Globals._scene.getNodeByName("__root__");
      
            // Get scene data
            World._sceneParser = new SceneParser(root);
            World._sceneParser.updateWorldCollision(root);
        });
            
        /**
         * Initialise the player
         */
        this._player = new Player();

        /**
         * If there is not active camera, use the default camera to avoid errors
         */
        if (Globals._scene.activeCamera == undefined) {
            Globals._scene.createDefaultCamera(false, true);
        }

        /**
         * Fog
         */
        Globals._scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
        Globals._scene.fogDensity = 0.3;
        Globals._scene.fogStart = 5.0;
        Globals._scene.fogEnd = 500.0;
        Globals._scene.fogColor = new BABYLON.Color3(0.18, 0.18, 0.18);
    }

    /**
     * Handles updating the game state every frame
     * @param delta delta time to maintain constant speed across systems
     */
    update(delta): void {
        // update the player
        this._player.update(delta);
    }
}