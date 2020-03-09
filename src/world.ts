/**
 * Class Importations
 */
import * as BABYLON from "babylonjs";
import { generateSunlight, generateFog } from "./helper"
import { Player } from "./player"
import { Globals } from "./globals";

/**
 * This class handles creating the game world. Things like instantiating the player, NPC's and lighting
 */
export class World {


    private static _player: Player;

    /**
     * Initialise the game world
     */
    static Initialise() {
        // lighting & fog
        generateSunlight(
            1.5, 
            new BABYLON.Vector3(1, 1, 1), 
            new BABYLON.Vector3(0.3, 0.5, 1),
        );
        generateFog(0.05, new BABYLON.Vector3(0.65/2, 0.7/2, 0.8/2));

        // import the map
        var meshTask = Globals._asset_manager.addMeshTask(
            "jet rxtz",
            "",
            "content/maps/",
            "map.babylon"
        );
        meshTask.onSuccess = function(task) {
            console.log("Map Loaded Successfully!");

            task.loadedMeshes[1].position = new BABYLON.Vector3(0, 0, 0);
            task.loadedMeshes[1].scaling = new BABYLON.Vector3(300, 300, 300);
        };

        // instaniate the player
        this._player = new Player();
    }

    /**
     * Update the contents of the world
     * @param dT delta time
     */
    static update(dT) {
        this._player.update(dT);
    }
}