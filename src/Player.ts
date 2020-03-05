import { Entity } from "./Entity";
import { Vector3 } from "babylonjs";
import { Globals } from "./Globals";
import { GUI } from "./GUI";

export class Player extends Entity {
  private speed: number;
  private distance_travelled: number;
  private iteration_delay: number;
  public currentDirection: number;
  public meshTask: BABYLON.MeshAssetTask;

  constructor(scene: BABYLON.Scene, spd: number) {
    super(new BABYLON.Vector3(0, -1, 10));

    this.iteration_delay = 0;
    this.speed = spd;
    this.currentDirection = 0;
    this.distance_travelled = 0;
  }

  update(dT: number): void {
    this.iteration_delay++;
    if (this.iteration_delay >= 0.5 * dT) {
      GUI.distance++;
      this.iteration_delay = 0;
    }
    GUI.distance_travelled.text = "" + GUI.distance;

    this.distance_travelled++;
  }
}
