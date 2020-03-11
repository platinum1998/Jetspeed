/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";
import { generateSunlight } from "./helper";
import { Player } from "./player";
import { Globals } from "./globals";
import { Pickup } from "./pickup";
import { GUI } from "./gui";

/**
 * This class handles creating the game world. Things like instantiating the player, NPC's and lighting
 */
export class World {
  public static meshAssetTask: BABYLON.MeshAssetTask;
  public static _player: Player;

  public static _pickup: Array<Pickup> = Array<Pickup>();

  /**
   * Initialise the game world
   */
  static Initialise() {
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
      "content/audio/SoundTrack.wav",
      Globals._scene,
      null,
      {
        loop: true,
        autoplay: true
      }
    );

    this._pickup.push(new Pickup(new BABYLON.Vector3(-19, -1, 300)));
    this._pickup.push(new Pickup(new BABYLON.Vector3(50, -1, 550)));
    this._pickup.push(new Pickup(new BABYLON.Vector3(68, -1, 550)));

    // import the map
    this.meshAssetTask = Globals._asset_manager.addMeshTask(
      "jet rxtz",
      "",
      "content/maps/",
      "level1.babylon"
    );
    this.meshAssetTask.onSuccess = function(task) {
      console.log("Map Loaded Successfully!");

      task.loadedMeshes[0].position = new BABYLON.Vector3(0, -8, 0);
      task.loadedMeshes[0].scaling = new BABYLON.Vector3(800, 800, 800);
      task.loadedMeshes[0].applyFog = true;
    };

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
    this._player.update(dT);
    
    for(let i = 0; i < this._pickup.length; i++)
        this._pickup[i].update(dT);
  }
}
