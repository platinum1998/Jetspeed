/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";
import { Globals } from "./globals";

// CORE APPLICATION HELPER FUNCTIONS
/**
 * Sets up the engine and creates a babylon application
 * @param canvasElement the html canvas to render the game content to
 */
export function createApplication(canvasElement) {
  Globals._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
  Globals._engine = new BABYLON.Engine(Globals._canvas, true);
  Globals._scene = new BABYLON.Scene(Globals._engine);
}

// IO & CONTENT LOADING FUNCTIONS
/**
 * load in a mesh into the asset manager
 * @param name_in_content the name of the file being imported in the asset manager
 * @param file the actual .babylon file
 */
export function loadMesh(name_in_content, file, meshTask) {
  meshTask = Globals._asset_manager.addMeshTask(
    name_in_content,
    "",
    "assets/",
    file
  );
}

/**
 * Load in all the content that has been added into the asset manager
 */
export function loadAllContent() {
  Globals._asset_manager.load();
}

// LIGHTING HELPER FUNCTIONS
/**
 *
 * @param brightness the brightness of the light
 * @param colour the colour of the light
 * @param ground_colour the light colour coming from the bottom of the hemi-sphere
 */
export function generateSunlight(brightness, colour, ground_colour) {
  var light = new BABYLON.HemisphericLight(
    "HemiLight",
    new BABYLON.Vector3(0, 1, 0),
    Globals._scene
  );
  light.intensity = brightness;
  light.diffuse = colour;
  light.groundColor = ground_colour;
}

/**
 * Adds a point light into the world
 * @param brightness the intensity of the light source
 * @param pos the position of the light in the world
 * @param colour the colour of the point light
 */
export function addPointLight(brightness, pos, colour) {
  var plight = new BABYLON.PointLight("pointLight", pos, Globals._scene);
  plight.intensity = brightness;
  plight.diffuse = colour;
}
