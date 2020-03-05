// Classes
import { Entity } from "./Entity";
import { GUI } from "./GUI";
import { World } from "./World";
import { Globals } from "./Globals";
import { Player } from "./Player";
import { BonusGenerator } from "./BonusGenerator";
import { Content } from "./Content";

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

  constructor(canvasElement: string) {
    /* ----------------------------- ENGINE SET-UP ----------------------------- */
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
    Globals._scene = new BABYLON.Scene(this._engine);
  }

  /* ----------------------------- PRE-LOADED CONTENT ----------------------------- */
  initialise(): void {
    // TEMP // MOVE THIS INTO A INPUT CLASS  
    Globals._scene.actionManager = new BABYLON.ActionManager(Globals._scene);

    Globals._scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyDownTrigger,
        function(evt) {
          Globals.map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }
      )
    );

    Globals._scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyUpTrigger,
        function(evt) {
          Globals.map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }
      )
    );
    //////////////////////////////////////////

    GUI.create();

    World.initialise(Globals._scene, this._canvas);

    Content.LoadContent();

    /* -------------------------------- UPDATE ------------------------------- */
    var update = () => {
      this._delta = this._engine.getDeltaTime();

      World.update(this._delta);

      // Needs Refracting /////////////////////////////////////////////////////////////////////////
      var mesh;
      Content.MeshList.onSuccess = task => {
        mesh = task.loadedMeshes[0];
        mesh.material = Content.GetMaterialByName("Ship Material");

        mesh.position.x = 0;
        mesh.position.y = -1;
        mesh.position.z = -14;

        mesh.scaling.x = 100;
        mesh.scaling.y = 100;
        mesh.scaling.z = 100;

        Globals._scene.registerBeforeRender(function() {
          mesh.position.z += 2.5;

          for(let i = 0; i < BonusGenerator.hoops.length; i++) {
            if(mesh.intersectsMesh(BonusGenerator.hoops[i])) {
              console.log("BONUS! x100");
            }
          }

          if (Globals.map["a"] || Globals.map["A"]) {
            mesh.position.x -= 1.6;
            mesh.rotation = BABYLON.Vector3.Lerp(
              mesh.rotation,
              new BABYLON.Vector3(0, 0, 0.8),
              0.3
            );

            World.camera.camObj.rotation.z = BABYLON.Scalar.Lerp(
              World.camera.camObj.rotation.z,
              BABYLON.Tools.ToRadians(4),
              0.1
            );
          } else if (Globals.map["d"] || Globals.map["D"]) {
            mesh.position.x += 1.6;
            mesh.rotation = BABYLON.Vector3.Lerp(
              mesh.rotation,
              new BABYLON.Vector3(0, 0, -0.8),
              0.3
            );

            World.camera.camObj.rotation.z = BABYLON.Scalar.Lerp(
              World.camera.camObj.rotation.z,
              BABYLON.Tools.ToRadians(-4),
              0.1
            );
          } else {
            mesh.rotation = BABYLON.Vector3.Lerp(
              mesh.rotation,
              new BABYLON.Vector3(0, 0, 0),
              0.2
            );

            World.camera.camObj.rotation.z = BABYLON.Scalar.Lerp(
              World.camera.camObj.rotation.z,
              BABYLON.Tools.ToRadians(0),
              0.1
            );
          }

          World.camera.camObj.position.x = mesh.position.x;
        });
      };
      /////////////////////////////////////////////////////////////////////////
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
