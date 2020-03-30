/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";
import { Actor } from "./Actor";
import { Globals } from "./globals";
import { Input } from "./input";
import { GUI } from "./gui";
import { GameData, UserData, ChallengeTypes, UserSettings } from "./data";
import { Menu, MenuStates } from "./menu";
import { World } from "./world";
import { BoundingInfo } from "babylonjs";
import { PickupFX } from "./pickupFX";
import { EVENTS, IEventObserver } from "./eventDispatcher";
import { Content } from "./content";

/**
 * The main player class for creating and updating the players movement
 */
export class Player extends Actor implements IEventObserver {
  /**
   * Variables and Objects
   */
  public speed: number;
  private delay: number;
  public meshTask: BABYLON.MeshAssetTask;
  public camera: BABYLON.FreeCamera;

  // TODO: Move to a content manager class
  private pickup_snd: BABYLON.Sound;
  private boost_snd: BABYLON.Sound;
  /////////////////////////////////////

  /**
   * Initialise variables and objects here
   */
  constructor() {
    super(new BABYLON.Vector3(0, 1, 0));

    UserSettings.challenges.push("Collect 3 Pickups");
    UserSettings.challenges.push("Go through a hoop");

    // initialise the camera
    this.camera = new BABYLON.FreeCamera(
      "player_camera",
      new BABYLON.Vector3(0, 5, -530),
      Globals._scene
    );
    this.camera.fov = -80;
    this.camera.inputs.clear();
    Globals._scene.activeCamera = this.camera;

    // player variables
    this.delay = 0;
    this.speed = 3.2;

    // if the mesh loads succesfully, perform the code below
    this.meshTask = Globals._asset_manager.addMeshTask(
      "jet 0",
      "",
      "assets/scenes/",
      "jet_0.babylon"
    );

    // player material
    let player_mat = new BABYLON.StandardMaterial("Player_Material", Globals._scene);
    player_mat.diffuseColor = new BABYLON.Color3(1, 0, 0);

    var mesh;
    this.meshTask.onSuccess = task => {
      // initialise player mesh
      mesh = task.loadedMeshes[0];
      mesh.position = new BABYLON.Vector3(0, 0, -510);
      mesh.scaling = new BABYLON.Vector3(-120, 120, -120);
      mesh._boundingInfo = new BoundingInfo(
        new BABYLON.Vector3(-0.0125, -0.005, -0.01),
        new BABYLON.Vector3(0.0125, 0.005, 0.01
        ));
      mesh.material = player_mat;
      mesh.checkCollisions = true;

      Globals._scene.registerBeforeRender(function () {
        mesh.position.z += 3.2;

        // check for collisions
        for (let i = 0; i < GameData.collisions.length; i++) {
          if (mesh.intersectsMesh(GameData.collisions[i], true)) {
            let m = World._states[0] as Menu;
            m.menu_state = MenuStates.ORIGIN;
            m.fadeIn(0.0);
            
            mesh.position = new BABYLON.Vector3(0, 0, -522);
            UserSettings.tokens = 0;
            Globals._scene.activeCamera.position = new BABYLON.Vector3(0, 5, -530);
            Globals._scene.activeCamera.fov = -80;
            for (let module of GameData.modules) {
              module.resetPickups();
            }
          }
        }

        // check for intersect with pickups
        for (let j = 0; j < GameData._pickups.length; j++) {
          if (mesh.intersectsMesh(GameData._pickups[j].pickupMesh, true)) {
            GameData._pickups[j].pickupMesh.setEnabled(false);
            GameData._pickups[j].event_subject.fireEvent(EVENTS.ON_PICKUP);
          }
        }

        // check for booster intersection
        for (let j = 0; j < GameData._booster.length; j++) {
          if (mesh.intersectsMesh(GameData._booster[j].boosterMesh, true)) {
            GameData._booster[j].event_subject.fireEvent(EVENTS.ON_BOOST);
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

    GUI.distance_travelled_txt.text = String(GUI.distance) + "m";

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

  public setObserver(arg: any) {
    arg.registerObserver(this);
  }

  /**
   * Player Events 
   */
  onPickup(): void {
    Content.sounds.get("Pickup").play();
    UserData.IncreaseTokenCount(1);

    let ps = new PickupFX(this.meshTask.loadedMeshes[0].position);

    if (UserSettings.tokens >= 3) UserData.CheckForChallengeCompletion(ChallengeTypes.COLLECT_3_PICKUPS);
  }
  onBoost(): void {
    Content.sounds.get("Boost").play();

    UserData.CheckForChallengeCompletion(ChallengeTypes.GO_THROUGH_A_HOOP);
  }
  /***/
}
