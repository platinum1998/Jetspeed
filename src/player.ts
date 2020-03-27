/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";
import { Actor } from "./Actor";
import { Globals } from "./globals";
import { Input } from "./input";
import { GUI } from "./gui";
import { GameData, UserData, ChallengeTypes, UserSettings } from "./data";
import { IPickupDelegates } from "./pickup";
import { IBoosterDelegates } from "./booster";
import { Menu, MenuStates } from "./menu";
import { World } from "./world";
import { BoundingInfo, BabylonFileLoaderConfiguration } from "babylonjs";
import { PickupFX } from "./pickupFX";

/**
 * The main player class for creating and updating the players movement
 */
export class Player extends Actor implements IPickupDelegates, IBoosterDelegates {
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

    // TODO: Move to a content manager class
    this.pickup_snd = new BABYLON.Sound("pickup", "assets/sfx/pickup.wav", Globals._scene);
    this.pickup_snd.loop = false;
    this.pickup_snd.setVolume(0.2);

    this.boost_snd = new BABYLON.Sound("boost", "assets/sfx/boost.wav", Globals._scene);
    this.boost_snd.loop = false;
    this.boost_snd.setVolume(0.25);
    ////////////////////////////////////////////////////////////////////////////////////////

    this.camera = new BABYLON.FreeCamera(
      "player_camera",
      new BABYLON.Vector3(0, 5, -530),
      Globals._scene
    );
    this.camera.fov = -80;
    this.camera.inputs.clear();
    Globals._scene.activeCamera = this.camera;

    this.delay = 0;
    this.speed = 3.2;

    // if the mesh loads succesfully, perform the code below
    this.meshTask = Globals._asset_manager.addMeshTask(
      "jet 0",
      "",
      "assets/scenes/",
      "jet_0.babylon"
    );

    let player_mat = new BABYLON.StandardMaterial("Player_Material", Globals._scene);
    player_mat.diffuseColor = new BABYLON.Color3(1, 0, 0);

    var mesh;
    this.meshTask.onSuccess = task => {
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

        var gameOver = () => {
          let m = World._states[0] as Menu;
          m.menu_state = MenuStates.ORIGIN;
          m.fadeIn(0.0);
        }

        var resetGame = () => {
          UserSettings.tokens = 0;
          mesh.position = new BABYLON.Vector3(0, 0, -522);

          Globals._scene.activeCamera.position.x = 0;
          Globals._scene.activeCamera.position.y = 5;
          Globals._scene.activeCamera.position.z = -530;
          Globals._scene.activeCamera.fov = -80;

          GameData.modules[0].resetPickups(); // only 1 module currently 
        }

        for (let i = 0; i < GameData.collisions.length; i++) {
          if (mesh.intersectsMesh(GameData.collisions[i], true)) {
            gameOver();
            resetGame();

            UserData.WriteUserDataToLocalStorage();
          }
        }

        for (let j = 0; j < GameData._pickups.length; j++) {
          if (mesh.intersectsMesh(GameData._pickups[j].pickupMesh, true)) {
            GameData._pickups[j].pickupMesh.setEnabled(false);
            GameData._pickups[j].firePickupEvent();
          }
        }

        for (let j = 0; j < GameData._booster.length; j++) {
          if (mesh.intersectsMesh(GameData._booster[j].boosterMesh, true)) {
            GameData._booster[j].fireOnBoosterEvent();
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
   * Events 
   */
  onPickup(): void {
    this.pickup_snd.play();
    UserData.IncreaseTokenCount(1);

    let ps = new PickupFX(this.meshTask.loadedMeshes[0].position);

    if (UserSettings.tokens >= 3) UserData.CheckForChallengeCompletion(ChallengeTypes.COLLECT_3_PICKUPS);
  }
  onBoost(): void {
    this.boost_snd.play();

    UserData.CheckForChallengeCompletion(ChallengeTypes.GO_THROUGH_A_HOOP);
  }
  /***/
}
