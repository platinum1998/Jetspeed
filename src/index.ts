// Classes
import { Entity } from "./Entity";
import { GUI } from "./GUI";
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

  constructor(canvasElement: string) {
    /* ----------------------------- ENGINE SET-UP ----------------------------- */
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
    this._scene = new BABYLON.Scene(this._engine);
  }

  /* ----------------------------- PRE-LOADED CONTENT ----------------------------- */
  initialise(): void {
    // TEMP // MOVE THIS INTO A INPUT CLASS
    var map = {};

    this._scene.actionManager = new BABYLON.ActionManager(this._scene);

    this._scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyDownTrigger,
        function(evt) {
          map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }
      )
    );

    this._scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyUpTrigger,
        function(evt) {
          map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }
      )
    );
    //////////////////////////////////////////

    GUI.create();

    World.initialise(this._scene, this._canvas);

    const assetsManager = new BABYLON.AssetsManager(this._scene);
    const meshTask = assetsManager.addMeshTask(
      "block_instance",
      "",
      "assets/geometry/",
      "jet_rxtz.babylon"
    );
    assetsManager.load();

    /* -------------------------------- UPDATE ------------------------------- */
    var update = () => {
      // Calc delta here
      this._delta = this._engine.getDeltaTime();

      World.update(this._delta);

      var mesh;
      meshTask.onSuccess = task => {
        mesh = task.loadedMeshes[0];
        mesh.position.x = 0;
        mesh.position.y = -1;
        mesh.position.z = 10;

        mesh.scaling.x = 100;
        mesh.scaling.y = 100;
        mesh.scaling.z = 100;

        this._scene.registerBeforeRender(function() {
          mesh.position.z += 0.5;

          World.camera.camObj.position.x = mesh.position.x;

          if (map["a"] || map["A"]) {
            mesh.position.x -= 0.3;
            mesh.rotation = BABYLON.Vector3.Lerp(
              mesh.rotation,
              new BABYLON.Vector3(0, 0, 0.5),
              0.1
            );
          }
          if (map["d"] || map["D"]) {
            mesh.position.x += 0.3;
            mesh.rotation = BABYLON.Vector3.Lerp(
              mesh.rotation,
              new BABYLON.Vector3(0, 0, -0.5),
              0.1
            );
          } else {
            mesh.rotation = BABYLON.Vector3.Lerp(
              mesh.rotation,
              new BABYLON.Vector3(0, 0, 0),
              0.1
            );
          }
        });
      };
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
