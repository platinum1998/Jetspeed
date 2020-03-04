import { Entity } from "./Entity";

// Ortho camera
export class PerspCamera {
  public camObj: BABYLON.FreeCamera;

  constructor(
    pos: BABYLON.Vector3,
    scene: BABYLON.Scene,
    canvas: HTMLCanvasElement
  ) {
    this.camObj = new BABYLON.FreeCamera(
      "cam1", 
      pos,
      scene
    );

    this.camObj.setTarget(new BABYLON.Vector3(0, 6, 0));
    this.camObj.attachControl(canvas, true);
    this.camObj.inputs.clear();
    this.camObj.fov = -80;
  }

  update(dT: number): void {}
}

// test two