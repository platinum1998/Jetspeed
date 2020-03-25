import * as BABYLON from "babylonjs";
import { Node, TransformNode } from "babylonjs";
import { Globals } from "./globals";
import { GameData } from "./data";
import { Module } from "./module";
import { World } from "./world";

export class SceneParser {
    /**
     * Transform nodes from Scene Graph
     */
    // player start
    public module_name: string;
    private _player_start: BABYLON.Vector3;
    public get player_start(): BABYLON.Vector3 {
        return this.player_start;
    }

    // hoop locations
    private _hoop_locations: Array<BABYLON.TransformNode> = new Array<BABYLON.TransformNode>();
    public get hoop_locations(): Array<BABYLON.TransformNode> {
        return this._hoop_locations;
    }

    // pickup locations
    private _pickup_locations: Array<BABYLON.TransformNode> = new Array<BABYLON.TransformNode>();
    public get pickup_locations(): Array<BABYLON.TransformNode> {
        return this._pickup_locations;
    }

    /**
     * Initialise variables and grab the root node from the scene graph
     * @param rootNode the scene graphs root node
     */
    constructor(rootNode: Node) {
        this.module_name = "module_0";

        let mesh = Globals._scene.getNodeByName("module_geo_0") as BABYLON.Mesh;
        mesh.scaling.x = -500;
        mesh.scaling.y = 500;
        mesh.scaling.z = 500;
        mesh.applyFog = true;

        this.processTransformNodes(rootNode);
        this.processModuleNodes(rootNode);
    }

    /**
     * 
     * @param rootMapNode 
     */
    private processTransformNodes(rootMapNode: Node) {
        // this._player_start = (rootMapNode.getChildren(n => {
        //     return n.name == "player_start_loc";
        // }, true)[0] as TransformNode).position;

        let hoops_node = Globals._scene.getNodeByName("hoops");
        hoops_node.getChildren().forEach((node: Node) => {
            this._hoop_locations.push(node as BABYLON.TransformNode);
        });

        let pickups_node = Globals._scene.getNodeByName("pickups");
        pickups_node.getChildren().forEach((node: Node) => {
            this._pickup_locations.push(node as BABYLON.TransformNode);
        });

        console.log(this._pickup_locations.length);
    }

    /**
     * 
     * @param rootMapNode 
     */
    public updateWorldCollision(rootMapNode: Node) {
        const namePrefix = this.module_name;
        
        let mat = new BABYLON.StandardMaterial("", Globals._scene);
        mat.diffuseColor = new BABYLON.Color3(1, 1, 1);
        mat.alpha = 0.0;

        let collision_geometry_group = Globals._scene.getNodeByName("wall_collision") as BABYLON.Mesh;
        collision_geometry_group.scaling.x = -500;
        collision_geometry_group.scaling.y = 500;
        collision_geometry_group.scaling.z = 500;
        collision_geometry_group.material = mat;

        collision_geometry_group.getChildren().forEach((collider: Node) => {
            GameData.collisions.push(collider as BABYLON.Mesh);
            GameData.collisions[GameData.collisions.length - 1].material = mat;
            GameData.collisions[GameData.collisions.length - 1].checkCollisions = true;
        });
    }

    /**
     * Register all the observers in the observer pattern
     */
    private registerObserverPattern() {
        console.log("registering observers...");

        for (let j = 0; j < GameData._pickups.length; j++)
            World._player.setObserver(GameData._pickups[j]);

        for (let j = 0; j < GameData._booster.length; j++)
            World._player.setObserver(GameData._booster[j]);
    }

    /**
     * parse in the modules
     * @param rootMapNode 
     */
    private processModuleNodes(rootMapNode: Node) {
        const namePrefix = this.module_name;

        rootMapNode.getChildren().forEach((node: Node) => {
            if (node.name == `${namePrefix}`) {
                let geometry = (node.getChildren(n => {
                    return n.name == "module_geo_0";
                }, true)[0] as BABYLON.Mesh);

                GameData.modules.push(new Module(namePrefix, geometry));
                GameData.modules[GameData.modules.length - 1].instanitateHoops(this._hoop_locations);
                GameData.modules[GameData.modules.length - 1].instanitatePickups(this.pickup_locations);
            }
        });

        this.registerObserverPattern();
    }
}