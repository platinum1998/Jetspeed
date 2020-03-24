/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";
import { Actor } from "./Actor";
import { Globals } from "./globals";
import { Input } from "./input";
import { World } from "./world";
import { GUI } from "./gui";
import { PickupFX } from "./pickupFX";
import { GameData } from "./data";

/**
 * This handles managing the player in game
 */
export class PlayerManager {
  /**
   *
   */
  static kill(player_components = []): void {
    var ps = new PickupFX(player_components[0].position);
    ps.particleSystem.start();

    for (let i = 0; i < player_components.length; i++) {
      player_components[i].dispose();
    }
  }
}

/**
 * The main player class for creating and updating the players movement
 */
export class Player extends Actor {
  /**
   * Variables and Objects
   */
  public speed: number;
  private delay: number;
  public meshTask: BABYLON.MeshAssetTask;
  private camera: BABYLON.FreeCamera;

  /**
   * Initialise variables and objects here
   */
  constructor() {
    super(new BABYLON.Vector3(0, 1, 0));

    this.camera = new BABYLON.FreeCamera(
      "player_camera",
      new BABYLON.Vector3(0, 5, -530),
      Globals._scene
    );
    this.camera.fov = -80;
    this.camera.inputs.clear();
    Globals._scene.activeCamera = this.camera;

    this.delay = 0;
    this.speed = 3;

    // if the mesh loads succesfully, perform the code below
    this.meshTask = Globals._asset_manager.addMeshTask(
      "jet rxtz",
      "",
      "assets/geometry/",
      "jet_rxtz.babylon"
    );

    var mesh;
    var world_coords;
    this.meshTask.onSuccess = task => {
      mesh = task.loadedMeshes[0];
      mesh.position = new BABYLON.Vector3(0, 0, -500);
      mesh.scaling = new BABYLON.Vector3(100, 100, 100);
      mesh.checkCollisions = true;

      Globals._scene.registerBeforeRender(function () {
        mesh.position.z += 3;

        for (let i = 0; i < GameData.collisions.length; i++) {
          if (mesh.intersectsMesh(GameData.collisions[i], true)) {
            mesh.dispose(); 
          }
        }

        // Loop through the pickups in the world
        for (let i = 0; i < World._pickup.length; i++) {
          // if the player meshs hits a pickup mesh..
          if (mesh.intersectsMesh(World._pickup[i].pickupMesh, true)) {
            // destroy the pickup and simulate the particles
            GUI.distance = GUI.distance + 10;
            GUI.distance_travelled_txt.text = String(GUI.distance);
            World._pickup[i].pickupMesh.dispose();

            var ps = new PickupFX(World._pickup[i].pickupMesh.position);
            ps.particleSystem.start();
          }
        }
        ///////////////////////////////////////////////////

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
    this.camera.position.z += this.speed;

    if (Input.a_key) {
      this.camera.position.x -= 0.08 * dT;
      this.meshTask.loadedMeshes[0].position.x -= 0.08 * dT;

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
      this.camera.position.x += 0.08 * dT;
      this.meshTask.loadedMeshes[0].position.x += 0.08 * dT;

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
