/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";
import * as BABYLON_UI from "babylonjs-gui";
import { generateSunlight } from "./helper";
import { Player } from "./player";
import { Globals } from "./globals";
import { Pickup } from "./pickup";
import { GUI } from "./gui";
import { LavaMaterial } from "./BabylonScripts/babylon.lavaMaterial";

import { Menu } from "./menu";
import { CollisionHierachy } from "./collision_handler";

/**
 * This class handles creating the game world. Things like instantiating the player, NPC's and lighting
 */
export class World {
  public static meshAssetTask: BABYLON.MeshAssetTask;
  public static _player: Player;
  public static _pickup: Array<Pickup> = Array<Pickup>();

  public static _menu_test: Menu;

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
    // var music = new BABYLON.Sound(
    //   "Soundtrack",
    //   "content/audio/SoundTrack.wav",
    //   Globals._scene,
    //   null,
    //   {
    //     loop: true,
    //     autoplay: true
    //   }
    // );

    BABYLON.SceneLoader.ImportMesh(
      "", // import all meshes from the babylon file ("[mesh_name]" to import specfic)
      "assets/geometry/",
      "level0.babylon",
      Globals._scene,
      function (meshes) {
        meshes[0].position = new BABYLON.Vector3(0, -5, -80);
        meshes[0].scaling = new BABYLON.Vector3(1000, 1000, 1000);
        meshes[0].applyFog = true;
      }
    );

    // Instanitate the collision hierachy @param: number of colliders
    CollisionHierachy.Generate(1000);
    //CollisionHierachy.addCollider("left_wall");
    //CollisionHierachy.getColliderByName("left_wall").position.x = 5;

    // instaniate the player
    this._player = new Player();

    // TEMP GROUND
    let material = new BABYLON.StandardMaterial("reflection", Globals._scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    material.alpha = 0.35;
    let ground = BABYLON.MeshBuilder.CreatePlane("Ground", { width: 500, height: 2000 }, Globals._scene);
    ground.material = material;
    ground.rotate(new BABYLON.Vector3(1, 0, 0), BABYLON.Tools.ToRadians(90), BABYLON.Space.WORLD);
    ground.position.y = -9.5;

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

    for (let i = 0; i < this._pickup.length; i++) this._pickup[i].update(dT);
  }
}
