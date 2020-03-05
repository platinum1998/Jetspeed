// Classes
import { Entity } from "./Entity";
import { GUI } from "./GUI";
import { World } from "./World";
import { Globals } from "./Globals";
import { Player } from "./Player";
import { BonusGenerator } from "./BonusGenerator";
import { Content } from "./Content";
import { Input } from "./Input";

// The main game object
class Game {
  // Main elements
  public _canvas: HTMLCanvasElement;
  public _engine: BABYLON.Engine;

  // Stats
  public _delta: number;
  public _gravity: number;
  public _score: number;
  public _interp_t: number; // dist during interp
  public _interp_speed: number; // Interp speed
  public _gameover: boolean; // Check if player hit spike
  public _player_ready: boolean; // Check if player has been reset back after gameover (or first time playing)
  public _generated_spikes: boolean; // Check whether or not spikes have been generated

  private _player: Player;

  constructor(canvasElement: string) {
    /* ----------------------------- ENGINE SET-UP ----------------------------- */
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
    Globals._scene = new BABYLON.Scene(this._engine);
  }

  /* ----------------------------- PRE-LOADED CONTENT ----------------------------- */
  initialise(): void 
  {
    // Update the keyboard input
    Input.UpdateInput();

    // create the User Interface
    GUI.create();

    // Initialise the world
    World.initialise(Globals._scene, this._canvas);

    /* -------------------------------- UPDATE ------------------------------- */
    var update = () => {
      this._delta = this._engine.getDeltaTime();

      World.update(this._delta);
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
    this._engine.runRenderLoop(() => {
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
