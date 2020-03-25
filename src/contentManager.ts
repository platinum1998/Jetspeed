import * as BABYLON from "babylonjs";
import { Globals } from "./globals"

export class Content {
    static scene_material: BABYLON.StandardMaterial;

    static Load() {
        Content.scene_material = new BABYLON.StandardMaterial("scene_mat", Globals._scene);
        Content.scene_material.diffuseTexture = new BABYLON.Texture("assets/scenes/scene.png", Globals._scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
        Content.scene_material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        Content.scene_material.specularColor = new BABYLON.Color3(0, 0, 0);
        Content.scene_material.fogEnabled = true;
    }
}