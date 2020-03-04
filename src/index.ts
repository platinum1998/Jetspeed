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

    // TEMP /////////////////////////////////////////////////////////////////////////////
    var hoop_mat = new BABYLON.StandardMaterial("hoop_material", this._scene);
    hoop_mat.diffuseColor = new BABYLON.Color3(1.0, 0, 1);
    hoop_mat.emissiveColor = new BABYLON.Color3(1.0, 0, 1);

    var hoop = BABYLON.MeshBuilder.CreateTorus(
      "hoop",
      { thickness: 0.05 },
      this._scene
    );
    hoop.position.z = 100;
    hoop.position.y = -2;
    hoop.scaling = new BABYLON.Vector3(20, 20, 20);
    hoop.rotation = new BABYLON.Vector3(1.5, 0, 0);
    hoop.material = hoop_mat;

    for (let i = 0; i < 3; i++) {
      let instance = hoop.createInstance("hoop" + i);
      instance.position.x = BABYLON.Scalar.RandomRange(-50, 50) + i;
      instance.position.y = 1;
      instance.position.z = BABYLON.Scalar.RandomRange(-50, 500) + i;
    }
    /////////////////////////////////////////////////////////////////////////////////////

    // TEMP
    var iteration_delay = 0;

    /* -------------------------------- UPDATE ------------------------------- */
    var update = () => {
      // Calc delta here
      this._delta = this._engine.getDeltaTime();

      World.update(this._delta);

      // UI Score
      iteration_delay++;
      if (iteration_delay >= 0.5 * this._delta) {
        GUI.distance++;
        iteration_delay = 0;
      }
      GUI.distance_travelled.text = "" + GUI.distance;

      var mesh;
      meshTask.onSuccess = task => {
        let material = new BABYLON.StandardMaterial("block_mat", this._scene);
        material.diffuseColor = new BABYLON.Color3(1.0, 0.98, 0.95);
        material.specularColor = new BABYLON.Color3(0, 0, 0);

        mesh = task.loadedMeshes[0];
        mesh.material = material;

        mesh.position.x = 0;
        mesh.position.y = -1;
        mesh.position.z = -14;

        mesh.scaling.x = 100;
        mesh.scaling.y = 100;
        mesh.scaling.z = 100;

        this._scene.registerBeforeRender(function() {
          mesh.position.z += 2.5;

          if (map["a"] || map["A"]) {
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
          } else if (map["d"] || map["D"]) {
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
