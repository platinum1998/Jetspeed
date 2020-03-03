// Classes
import { Entity } from "./Entity";
import { PerspCamera } from "./Camera";
import { GUI } from "./GUI";
import { Player } from "./Player";
import { World } from "./World";

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

  private _cam: PerspCamera;
  private _player: Player;

  constructor(canvasElement: string) {
    /* ----------------------------- ENGINE SET-UP ----------------------------- */
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
    this._scene = new BABYLON.Scene(this._engine);
  }

  /* ----------------------------- PRE-LOADED CONTENT ----------------------------- */
  initialise(): void {
    // TEMP // MOVE THIS INTO A INPUT CLASS
    var map = {}; //object for multiple key presses
    this._scene.actionManager = new BABYLON.ActionManager(this._scene);

    this._scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";

    }));

    this._scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    //////////////////////////////////////////

    this._scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    this._scene.fogDensity = 0.03;
    this._scene.fogStart = 5.0; // START
    this._scene.fogEnd = 150.0; // END
    this._scene.fogColor = new BABYLON.Color3(1, 0.9, 0.8);

    GUI.create();

    // Camera
    this._cam = new PerspCamera(new BABYLON.Vector3(0, 8, -30), this._scene, this._canvas);

    // Skylight
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this._scene);
    light.intensity = 0.7;

    this._player = new Player(this._scene, 0.03);

    var trail_ps = new BABYLON.ParticleSystem("particles", 1100, this._scene);
    trail_ps.particleTexture = new BABYLON.Texture("textures/flare.png", this._scene);
    trail_ps.emitter = this._player.playerCharacter;
    trail_ps.minEmitBox = new BABYLON.Vector3(-1, 0, 0);
    trail_ps.maxEmitBox = new BABYLON.Vector3(1, 0, 0);
    trail_ps.minSize = 0.5;
    trail_ps.maxSize = 0.8;
    trail_ps.minLifeTime = 0.3;
    trail_ps.maxLifeTime = 1.5;
    trail_ps.emitRate = 1500;
    trail_ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    trail_ps.direction1 = new BABYLON.Vector3(0, 0, -3);
    trail_ps.direction2 = new BABYLON.Vector3(0, 0, -3);
    trail_ps.minAngularSpeed = 0;
    trail_ps.maxAngularSpeed = Math.PI;
    trail_ps.minEmitPower = 1;
    trail_ps.maxEmitPower = 3;
    trail_ps.updateSpeed = 0.15;
    trail_ps.start();

    World.generate(this._scene);

    /* -------------------------------- UPDATE ------------------------------- */
    var update = () => {
      // Calc delta here
      this._delta = this._engine.getDeltaTime();

      this._player.update(this._delta);
      this._cam.camObj.position.x = this._player.playerCharacter.position.x;
      this._cam.camObj.position.z += 0.08 * this._delta;
      
      if(map['a'] || map['A']) 
      {
        this._player.setCurrentDirection(-1);
      }
      else if(map['d'] || map['D']) 
      {
        this._player.setCurrentDirection(1);
      }
      else 
        this._player.setCurrentDirection(0);
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
      this._scene.clearColor = new BABYLON.Color4(1, 0.9, 0.8, 1);
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
