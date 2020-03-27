import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import * as BABYLON_UI from "babylonjs-gui";
import { State } from "./state"
import { Player } from "./player";
import { SceneParser } from "./sceneParser";
import { GUI } from "./gui";
import { Globals } from "./globals";
import { generateSunlight } from "./helper";

export class Game extends State {
    active: boolean;
    name: string;

    public _player: Player;
    public _sceneParser: SceneParser;

    constructor() {
        super();
        this.active = true;
        this.name = "game_state";

        GUI.create();


        // lighting & fog
        generateSunlight(
            1.5,
            new BABYLON.Vector3(0.6, 0.8, 1.0),
            new BABYLON.Vector3(0.3, 0.5, 1)
        );

        //Globals._scene.debugLayer.show(); // DEBUGGING PURPOSES  

        BABYLON.SceneLoader.Append
            (
                "assets/scenes/",
                "scene.gltf",
                Globals._scene,
                function (scene) {
                    Globals._scene = scene;
                    console.log("READY");
                }
            );

        Globals._scene.executeWhenReady(() => {
            let root = Globals._scene.getNodeByName("__root__");

            // Get scene data
            this._sceneParser = new SceneParser(root);
            this._sceneParser.updateWorldCollision(root);
        });

        this._player = new Player();

        if (Globals._scene.activeCamera == undefined) {
            Globals._scene.createDefaultCamera(false, true);
        }

        Globals._scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
        Globals._scene.fogDensity = 0.3;
        Globals._scene.fogStart = 5.0;
        Globals._scene.fogEnd = 500.0;
        Globals._scene.fogColor = new BABYLON.Color3(0.25, 0.25, 0.26);

    }

    update(delta): void {
        this._player.update(delta);
    }
}