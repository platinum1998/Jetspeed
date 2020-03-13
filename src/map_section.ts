/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";
import { Globals } from "./globals";

/**
 * This class handles a section/module of the map. This class 
 * will be useful for level generation
 */
export class MapSection 
{
    /**
     * 
     * @param name name of the map module
     * @param file the file itself
     */
    constructor(name, file, pos) 
    {
        // Load in the mesh
        let meshAssetTask = Globals._asset_manager.addMeshTask(
            name,
            "",
            "assets/",
            file
        );

        // When it succesfully loads the mesh
        meshAssetTask.onSuccess = task => {
            task.loadedMeshes[0].position = pos;
            task.loadedMeshes[0].scaling = new BABYLON.Vector3(1400, 1400, 1400);
            task.loadedMeshes[0].applyFog = true;
        }




    }

    update(dT): void {}
}