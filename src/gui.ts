import * as BABYLON_UI from "babylonjs-gui";
import { World } from "./world";

export class GUI {
  static distance_travelled_txt: BABYLON_UI.TextBlock;
  static distance: number = 0;

  public static create(): void {
    let ui_interface = BABYLON_UI.AdvancedDynamicTexture.CreateFullscreenUI(
      "UI"
    );

    this.distance_travelled_txt = new BABYLON_UI.TextBlock();
    this.distance_travelled_txt.text = String(this.distance);
    this.distance_travelled_txt.color = "white";
    this.distance_travelled_txt.fontSize = 20;
    this.distance_travelled_txt.fontFamily = "Nova Square";
    this.distance_travelled_txt.alpha = 0.5;
    this.distance_travelled_txt.top = -200;

    ui_interface.addControl(this.distance_travelled_txt);
  }
}
