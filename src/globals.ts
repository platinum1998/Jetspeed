/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui";

/**
 * Global variables that are being used throughout the project
 */
export class Globals {
    public static _scene: BABYLON.Scene;
    public static _engine: BABYLON.Engine;
    public static _canvas: HTMLCanvasElement;
    public static _asset_manager: BABYLON.AssetsManager;
    public static uiTexture;
}