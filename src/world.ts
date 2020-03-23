/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import * as BABYLON_UI from "babylonjs-gui";
import { generateSunlight } from "./helper";
import { Player } from "./player";
import { Globals } from "./globals";
import { Pickup } from "./pickup";
import { GUI } from "./gui";
import { LavaMaterial } from "./BabylonScripts/babylon.lavaMaterial";
import { Menu } from "./menu";
import { SceneParser } from "./sceneParser";
import { GameData } from "./data";

/**
 * This class handles creating the game world. Things like instantiating the player, NPC's and lighting
 */
export class World {
  public static meshAssetTask: BABYLON.MeshAssetTask;
  public static _player: Player;
  public static _pickup: Array<Pickup> = Array<Pickup>();
  public static _menu_test: Menu;
  public static _sceneParser: SceneParser;

  /**
   * Initialise the game world
   */
  static Initialise() {
    Globals.uiTexture = BABYLON_UI.AdvancedDynamicTexture.CreateFullscreenUI("UI")

    // TEMP!
    this._menu_test = new Menu();

    GUI.create();

    // lighting & fog
    generateSunlight(
      1.5,
      new BABYLON.Vector3(0.6, 0.8, 1.0),
      new BABYLON.Vector3(0.3, 0.5, 1)
    );

    // Audio
    var music = new BABYLON.Sound(
      "Soundtrack",
      "assets/sfx/soundtrack.wav",
      Globals._scene,
      null,
      {
        loop: true,
        autoplay: true
      }
    );
    music.setVolume(0.02);

    // Globals._scene.debugLayer.show(); // DEBUGGING PURPOSES  

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

      World._sceneParser = new SceneParser(root);
      World._sceneParser.updateWorldCollision(root);

      let mesh = Globals._scene.getNodeByName("module_0_geo") as BABYLON.Mesh;
      mesh.scaling.x = -500;
      mesh.scaling.y = 500;
      mesh.scaling.z = -500;
      mesh.applyFog = true;
    });

    if (Globals._scene.activeCamera == undefined) {
      Globals._scene.createDefaultCamera(false, true);
    }

    // instaniate the player
    this._player = new Player();

    Globals._scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    Globals._scene.fogDensity = 0.3;
    Globals._scene.fogStart = 5.0;
    Globals._scene.fogEnd = 900.0;
    Globals._scene.fogColor = new BABYLON.Color3(0.65 / 2, 0.7 / 2, 0.8 / 2);
  }

  /**
   * Update the contents of the world
   * @param dT delta time
   */
  static update(dT) {
    this._menu_test.update(dT);

    this._player.update(dT);

    for (let i = 0; i < this._pickup.length; i++)
      this._pickup[i].update(dT);
  }
}
