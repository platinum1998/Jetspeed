// Classes
import { Entity } from "./Entity";
import { OrthoCamera } from "./Camera";

// The main game object
class Game {
  // Main elements
  public _canvas: HTMLCanvasElement;
  public _engine: BABYLON.Engine;
  public _scene: BABYLON.Scene;

  // Stats
  public _delta: number;
  public _gravity: number;
  public _score: number;
  public _interp_t: number; // dist during interp
  public _interp_speed: number; // Interp speed
  public _gameover: boolean; // Check if player hit spike
  public _player_ready: boolean; // Check if player has been reset back after gameover (or first time playing)
  public _generated_spikes: boolean; // Check whether or not spikes have been generated

  // Game objects
  private _cam: OrthoCamera;

  constructor(canvasElement: string) {
    /* ----------------------------- ENGINE SET-UP ----------------------------- */
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
    this._scene = new BABYLON.Scene(this._engine);
  }

  /* ----------------------------- PRE-LOADED CONTENT ----------------------------- */
  initialise(): void {
    this._scene.gravity = new BABYLON.Vector3(0, -500, 0);
    this._scene.collisionsEnabled = true;
    this._scene.enablePhysics(
      new BABYLON.Vector3(0, this._gravity, 0),
      new BABYLON.AmmoJSPlugin()
    );
    // Initialise camera
    this._cam = new OrthoCamera(
      new BABYLON.Vector2(0, 0),
      this._scene,
      this._canvas
    );

    /* -------------------------------- UPDATE ------------------------------- */
    var update = () => {
      // Calc delta here
      this._delta = this._engine.getDeltaTime();
    };

    // Updates
    this._scene.registerBeforeRender(function() {
      update();
    });
  }

  /* -------------------------------- BABYLON RENDER LOOP ------------------------------- */
  playLoop(): void {
    let self = this;

    // run the render loop
    this._engine.runRenderLoop(() => {
      //this.update();
      this._scene.clearColor = new BABYLON.Color4(1, 0.94, 0.96, 1);
      self._scene.render();
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
