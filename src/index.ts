import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui"
import { createApplication, loadAllContent } from "./helper"
import { World } from "./world"
import { Globals } from "./globals"
import { Input } from "./input";

// The main game object
class Game {
  // Stats
  public _delta: number;
  public _score: number;

  private distance_travelled: BABYLON_GUI.TextBlock;

  /**
   * initialise the babylon engine and create a new empty scene
   * @param canvasElement the canvas that the content will be rendered to
   */
  constructor(canvasElement: string) {
    /* ----------------------------- ENGINE SET-UP ----------------------------- */
    createApplication(canvasElement);
  }

  /* ----------------------------- PRE-LOADED CONTENT ----------------------------- */
  initialise(): void {
    Globals._asset_manager = new BABYLON.AssetsManager(Globals._scene);

    // initialise the world and input
    Input.UpdateInput();
    World.Initialise();

    loadAllContent(); // TODO: put this in the world class

    /* -------------------------------- UPDATE ------------------------------- */
    var update = () => {
      this._delta = Globals._engine.getDeltaTime();

      World.update(this._delta);
    };

    // Updates
    Globals._scene.registerBeforeRender(function () {
      update();
    });
  }

  /* -------------------------------- BABYLON RENDER LOOP ------------------------------- */
  playLoop(): void {
    let self = this;

    // run the render loop
    Globals._engine.runRenderLoop(() => {
      Globals._scene.clearColor = new BABYLON.Color4(0.25, 0.25, 0.26, 1);
      Globals._scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener("resize", () => {
      Globals._engine.resize();
    });
  }
}

/* -------------------------------- ENTRY POINT ------------------------------- */
window.addEventListener("DOMContentLoaded", () => {

  // Create the game using the 'renderCanvas'
  let game = new Game("renderCanvas");

  // Create the scene
  game.initialise();

  // Game loop
  game.playLoop();
});
