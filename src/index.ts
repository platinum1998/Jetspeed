import { createApplication, loadAllContent } from "./helper"
import { Globals } from "./globals";

// The main game object
class Game {
  // Main elements
  public _canvas: HTMLCanvasElement;
  public _engine: BABYLON.Engine;

  public _scene: BABYLON.Scene;

  // Stats
  public _delta: number;
  public _score: number;

  /**
   * initialise the babylon engine and create a new empty scene
   * @param canvasElement the canvas that the content will be rendered to
   */
  constructor(canvasElement: string) {
    /* ----------------------------- ENGINE SET-UP ----------------------------- */
    createApplication(canvasElement);
  }

  /* ----------------------------- PRE-LOADED CONTENT ----------------------------- */
  initialise(): void 
  {
    /* -------------------------------- UPDATE ------------------------------- */
    var update = () => {
      this._delta = Globals._engine.getDeltaTime();
    };

    // Updates
    Globals._scene.registerBeforeRender(function() {
      update();
    });
  }

  /* -------------------------------- BABYLON RENDER LOOP ------------------------------- */
  playLoop(): void {
    let self = this;

    // run the render loop
    Globals._engine.runRenderLoop(() => {
      Globals._scene.clearColor = new BABYLON.Color4(1, 0.9, 0.8, 1);
      Globals._scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener("resize", () => {
      self._engine.resize();
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
