import * as BABLYLON from "babylonjs";
import { PerspCamera } from "./Camera";
import { Player } from "./Player";
import { Block } from "./Block";
import { BlockGenerator } from "./BlockGenerator";
import { Entity } from "./Entity";
import { BonusGenerator } from "./BonusGenerator";
import { Scene } from "babylonjs";

// World functionality
export class World {
  // public static player: Player;
  public static camera: PerspCamera;
  public static blocks: Array<Block>;

  static initialise(scene: BABYLON.Scene, canvas: HTMLCanvasElement): void {
    // TEMP
    const assetsManager = new BABYLON.AssetsManager(scene);

    // Camera object
    this.camera = new PerspCamera(
      new BABYLON.Vector3(0, 8, -31),
      scene,
      canvas
    );

    // Skylight
    var light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0.25, 0.75, -0.25),
      scene
    );
    light.intensity = 1;

    // Player object
    //this.player = new Player(scene, 0.03);

    // Blocks
    BlockGenerator.Initialise(scene, assetsManager, World.blocks);
    
    // Bonuses
    BonusGenerator.Initialise(2, -50, 500, scene);

    // Audio
    // var music = new BABYLON.Sound(
    //   "Soundtrack",
    //   "assets/audio/SoundTrack.wav",
    //   scene,
    //   null,
    //   {
    //     loop: true,
    //     autoplay: true
    //   }
    // );

    assetsManager.load();

    // Post effects
    scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    scene.fogDensity = 0.03;
    scene.fogStart = 5.0;
    scene.fogEnd = 900.0;
    scene.fogColor = new BABYLON.Color3(1, 0.9, 0.8);
  }

  static update(delta: number) {
    //this.player.update(delta);
    this.camera.camObj.position.z += 2.5;
  }
}
