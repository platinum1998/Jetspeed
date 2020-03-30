import * as BABYLON from "babylonjs";
import { Globals } from "./globals"

/**
 * Loads in the game content
 */
export class Content {
    /**
     * The game content
     */
    static scene_material: BABYLON.StandardMaterial;
    static sounds: Map<String, BABYLON.Sound> = new Map<string, BABYLON.Sound>();

    /**
     * This function handles loading in the game content 
     */
    static Load() {
        /**
         * The scene material
         */
        Content.scene_material = new BABYLON.StandardMaterial("scene_mat", Globals._scene);
        Content.scene_material.diffuseTexture = new BABYLON.Texture("assets/scenes/scene.png", Globals._scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
        Content.scene_material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        Content.scene_material.specularColor = new BABYLON.Color3(0, 0, 0);
        Content.scene_material.fogEnabled = true;
        /***/

        /**
         * Sounds
         */
        Content.sounds.set("Pickup", new BABYLON.Sound("pickup", "assets/sfx/pickup.wav", Globals._scene));
        Content.sounds.get("Pickup").loop = false;
        Content.sounds.get("Pickup").setVolume(0.2);

        Content.sounds.set("Boost", new BABYLON.Sound("pickup", "assets/sfx/boost.wav", Globals._scene));
        Content.sounds.get("Boost").loop = false;
        Content.sounds.get("Boost").setVolume(0.2);
        /***/
    }
}