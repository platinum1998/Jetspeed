/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";
import { Actor } from "./Actor";
import { Globals } from "./globals";
import { Input } from "./input";

/**
 * The main player class for creating and updating the player
 */
export class Player extends Actor {
  /**
   * Variables and Objects
   */
  public meshTask: BABYLON.MeshAssetTask;
  private camera: BABYLON.FreeCamera;

  /**
   * Initialise variables and objects here
   */
  constructor() {
    super(new BABYLON.Vector3(0, 1, 0));

    this.camera = new BABYLON.FreeCamera(
      "player_camera",
      new BABYLON.Vector3(0, 8, -31),
      Globals._scene
    );
    this.camera.setTarget(new BABYLON.Vector3(0, 1, 0));
    this.camera.inputs.clear();
    this.camera.fov = -80;

    // if the mesh loads succesfully, perform the code below
    this.meshTask = Globals._asset_manager.addMeshTask(
      "jet rxtz",
      "",
      "content/",
      "jet_rxtz.babylon"
    );

    this.meshTask.onSuccess = function(task) {
      console.log("Player Mesh Loaded Successfully!");

      task.loadedMeshes[0].position = new BABYLON.Vector3(0, -1, -17);
      task.loadedMeshes[0].scaling = new BABYLON.Vector3(100, 100, 100);
    };
  }

  /**
   * Update the players movement
   */
  update(dT: number): void {
    //this.camera.position.x = this.meshTask.loadedMeshes[0].position.x;

    if (Input.a_key) {
      this.meshTask.loadedMeshes[0].position.x -= 0.01 * dT;

      this.meshTask.loadedMeshes[0].rotation = BABYLON.Vector3.Lerp(
        this.meshTask.loadedMeshes[0].rotation,
        new BABYLON.Vector3(0, 0, 0.8),
        0.01 * dT
      );
    }
    if (Input.d_key) {
      this.meshTask.loadedMeshes[0].position.x += 0.01 * dT;
      
      this.meshTask.loadedMeshes[0].rotation = BABYLON.Vector3.Lerp(
        this.meshTask.loadedMeshes[0].rotation,
        new BABYLON.Vector3(0, 0, -0.8),
        0.01 * dT
      );
    } 
  }
}
