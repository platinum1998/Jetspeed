/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";
import { Actor } from "./actor";
import { Globals } from "./globals";
import { Input } from "./input";
import { World } from "./world";
import { GUI } from "./gui";
import { PlayerCrashFX } from "./playerCrashFX";

/**
 * The main player class for creating and updating the player
 */
export class Player extends Actor {
  /**
   * Variables and Objects
   */
  private delay: number;
  public meshTask: BABYLON.MeshAssetTask;
  private camera: BABYLON.FollowCamera;

  /**
   * Initialise variables and objects here
   */
  constructor() {
    super(new BABYLON.Vector3(0, 1, 0));

    this.delay = 0;
    this.camera = new BABYLON.FollowCamera(
      "player_camera",
      new BABYLON.Vector3(0, 8, -95),
      Globals._scene
    );
    this.camera.radius = 35;
    this.camera.heightOffset = 20;
    this.camera.cameraAcceleration = 0.005;
    this.camera.maxCameraSpeed = 20;

    // if the mesh loads succesfully, perform the code below
    this.meshTask = Globals._asset_manager.addMeshTask(
      "jet rxtz",
      "",
      "content/",
      "jet_rxtz.babylon"
    );

    var mesh;
    this.meshTask.onSuccess = task => {
      mesh = task.loadedMeshes[0];
      mesh.position = new BABYLON.Vector3(0, -1, -50);
      mesh.scaling = new BABYLON.Vector3(100, 100, 100);
      mesh.checkCollisions = true;
      mesh.computeWorldMatrix(true);

      var trail = new BABYLON.TrailMesh(
        "new",
        mesh,
        Globals._scene,
        0.0075,
        10,
        true
      );
      var sourceMat = new BABYLON.StandardMaterial("sourceMat", Globals._scene);
      sourceMat.diffuseColor = new BABYLON.Color3(0.4, 0.7, 1.0);
      sourceMat.emissiveColor = new BABYLON.Color3(0.4, 0.7, 1.0);
      sourceMat.alpha = 0.75;
      trail.material = sourceMat;

      Globals._scene.registerBeforeRender(function() {
        mesh.position.z += 2;

        for (let i = 0; i < World._pickup.length; i++) {
          if (mesh.intersectsMesh(World._pickup[i].pickupMesh, true)) {
            GUI.distance = GUI.distance + 10;
            GUI.distance_travelled_txt.text = String(GUI.distance);
            World._pickup[i].pickupMesh.dispose();

            var ps = new PlayerCrashFX(World._pickup[i].pickupMesh.position);
            ps.particleSystem.start();
          }
        }

        if (!Input.a_key && !Input.d_key) {
          mesh.rotation = BABYLON.Vector3.Lerp(
            mesh.rotation,
            new BABYLON.Vector3(0, 0, 0),
            0.2
          );
        }
      });
    };
  }

  /**
   * Update the players movement
   */
  update(dT: number): void {
    this.delay++;
    if (this.delay >= 35) {
      GUI.distance++;
      this.delay = 0;
    }
    GUI.distance_travelled_txt.text = String(GUI.distance);

    this.camera.position.z += 2;

    if (Input.a_key) {
      this.camera.position.x -= 0.06 * dT;
      this.meshTask.loadedMeshes[0].position.x -= 0.06 * dT;

      this.meshTask.loadedMeshes[0].rotation = BABYLON.Vector3.Lerp(
        this.meshTask.loadedMeshes[0].rotation,
        new BABYLON.Vector3(0, 0, 0.8),
        0.01 * dT
      );

      this.camera.rotation.z = BABYLON.Scalar.Lerp(
        this.camera.rotation.z,
        BABYLON.Tools.ToRadians(4),
        0.01 * dT
      );
    }
    if (Input.d_key) {
      this.camera.position.x += 0.06 * dT;
      this.meshTask.loadedMeshes[0].position.x += 0.06 * dT;

      this.meshTask.loadedMeshes[0].rotation = BABYLON.Vector3.Lerp(
        this.meshTask.loadedMeshes[0].rotation,
        new BABYLON.Vector3(0, 0, -0.8),
        0.01 * dT
      );

      this.camera.rotation.z = BABYLON.Scalar.Lerp(
        this.camera.rotation.z,
        BABYLON.Tools.ToRadians(-4),
        0.01 * dT
      );
    } else {
      this.camera.rotation.z = BABYLON.Scalar.Lerp(
        this.camera.rotation.z,
        BABYLON.Tools.ToRadians(0),
        0.1
      );
    }
  }
}
