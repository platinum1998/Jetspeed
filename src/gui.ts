import * as BABYLON_UI from "babylonjs-gui";
import { Globals } from "./globals"
import { UserData } from "./data";

export class GUI {
  static tokens_txt: BABYLON_UI.TextBlock;
  static distance_travelled_txt: BABYLON_UI.TextBlock;

  // TODO: Move into GameData class
  static distance: number = 0;
  static num_tokens: number = 0;
  //////////////////////////////////

  public static create(): void {

    this.distance_travelled_txt = new BABYLON_UI.TextBlock();
    this.distance_travelled_txt.text = "" + this.distance;
    this.distance_travelled_txt.color = "white";
    this.distance_travelled_txt.fontSize = 54;
    this.distance_travelled_txt.fontFamily = "SquareFont";
    this.distance_travelled_txt.alpha = 0.5;
    this.distance_travelled_txt.top = -800;
    Globals.uiTexture.addControl(this.distance_travelled_txt);

    this.tokens_txt = new BABYLON_UI.TextBlock();
    this.tokens_txt.text = "Tokens: " + UserData.tokens;
    this.tokens_txt.color = "white";
    this.tokens_txt.fontSize = 54;
    this.tokens_txt.fontFamily = "SquareFont";
    this.tokens_txt.alpha = 0.5;
    this.tokens_txt.top = -900;
    Globals.uiTexture.addControl(this.tokens_txt);
   
  }
}
