import * as BABYLON_UI from "babylonjs-gui";
import { World } from "./world";
import { Globals } from "./globals"

export class GUI {
  static distance_travelled_txt: BABYLON_UI.TextBlock;
  static distance: number = 0;

  public static create(): void {

    this.distance_travelled_txt = new BABYLON_UI.TextBlock();
    this.distance_travelled_txt.text = "" + this.distance;
    this.distance_travelled_txt.color = "white";
    this.distance_travelled_txt.fontSize = 54;
    this.distance_travelled_txt.fontFamily = "SquareFont";
    this.distance_travelled_txt.alpha = 0.5;
    this.distance_travelled_txt.top = -800;

    Globals.uiTexture.addControl(this.distance_travelled_txt);
  }
}
