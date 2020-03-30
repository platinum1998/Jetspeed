import * as BABYLON_UI from "babylonjs-gui";
import { Globals } from "./globals"
import { UserSettings } from "./data";

export class GUI {
  static tokens_txt: BABYLON_UI.TextBlock;
  static distance_travelled_txt: BABYLON_UI.TextBlock;
  static challenges_txt: BABYLON_UI.TextBlock;

  // TODO: Move into GameData class
  static distance: number = 0;
  static num_tokens: number = 0;
  //////////////////////////////////

  /**
   * Create the game GUI
   */
  public static create(): void 
  {
    this.distance_travelled_txt = new BABYLON_UI.TextBlock();
    this.distance_travelled_txt.text = "" + this.distance + "m";
    this.distance_travelled_txt.color = "white";
    this.distance_travelled_txt.fontSize = 65;
    this.distance_travelled_txt.fontFamily = "SquareFont";
    this.distance_travelled_txt.alpha = 0.5;
    this.distance_travelled_txt.top = -825;
    Globals.uiTexture.addControl(this.distance_travelled_txt);

    var token_icon = new BABYLON.GUI.Image("Token Icon", "assets/ui/token_icon.png");
    token_icon.width = "32px";
    token_icon.height = "64px";
    token_icon.top = -870;
    token_icon.left = 455;
    Globals.uiTexture.addControl(token_icon, 0, 0);

    this.tokens_txt = new BABYLON_UI.TextBlock();
    this.tokens_txt.text = "" + UserSettings.tokens;
    this.tokens_txt.color = "white";
    this.tokens_txt.fontSize = 45;
    this.tokens_txt.fontFamily = "SquareFont";
    this.tokens_txt.alpha = 0.5;
    this.tokens_txt.top = -870;
    this.tokens_txt.left = 410;
    Globals.uiTexture.addControl(this.tokens_txt);
  }
}
