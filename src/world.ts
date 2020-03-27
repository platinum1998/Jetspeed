/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import * as BABYLON_UI from "babylonjs-gui";
import { Globals } from "./globals";
import { Menu } from "./menu";
import { Content } from "./content"
import { State } from "./state";
import { Game } from "./game";

/**
 * This class handles creating the game world. Things like instantiating the player, NPC's and lighting
 */
export class World {
  public static meshAssetTask: BABYLON.MeshAssetTask;
  public static _states: Array<State> = Array<State>();
  public static _soundtrack: BABYLON.Sound;

  /**
   * Initialise the game world
   */
  static Initialise() {
    Globals.uiTexture = BABYLON_UI.AdvancedDynamicTexture.CreateFullscreenUI("UI")

    // Audio
    this._soundtrack = new BABYLON.Sound(
      "Soundtrack",
      "assets/sfx/soundtrack.wav",
      Globals._scene,
      null,
      {
        loop: true,
        autoplay: true
      }
    );
    this._soundtrack.setVolume(0.15);

    this._states.push(new Menu());
    this._states.push(new Game());

    // Load Content
    Content.Load();
  }

  /**
   * Update the contents of the world
   * @param dT delta time
   */
  static update(dT) {
    for (let i = 0; i < this._states.length; i++)
      this._states[i].update(dT);
  }
}
