import * as BABYLON from "babylonjs";
import { Node } from "babylonjs";
import { Globals } from "./globals";
import { GameData } from "./data";
import { Module } from "./module";
import { World } from "./world";
import { Content } from "./content"
import { Game } from "./game";

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
        // TEMP
        this.module_name = "module_0";
        let mesh = Globals._scene.getNodeByName("module_0_geo") as BABYLON.Mesh;
        mesh.scaling.x = -500;
        mesh.scaling.y = 500;
        mesh.scaling.z = -500;
        mesh.material = Content.scene_material;

        this.processTransformNodes(rootNode);
        this.processModuleNodes(rootNode);
        this.processSequenceNodes(Globals._scene.getNodeByName("module_0_sequences"));
    }

    /**
     * 
     * @param rootMapNode 
     */
    private processTransformNodes(rootMapNode: Node) {
        // this._player_start = (rootMapNode.getChildren(n => {
        //     return n.name == "player_start_loc";
        // }, true)[0] as TransformNode).position;

        let hoops_node = Globals._scene.getNodeByName("module_0_hoops");
        hoops_node.getChildren().forEach((node: Node) => {
            this._hoop_locations.push(node as BABYLON.TransformNode);
        });

        let pickups_node = Globals._scene.getNodeByName("module_0_pickups");
        pickups_node.getChildren().forEach((node: Node) => {
            this._pickup_locations.push(node as BABYLON.TransformNode);
        });
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

        let collision_geometry_group = Globals._scene.getNodeByName("module_0_wall_collision") as BABYLON.Mesh;
        collision_geometry_group.scaling.x = -500;
        collision_geometry_group.scaling.y = 500;
        collision_geometry_group.scaling.z = -500;
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

        let p = World._states[1] as Game;

        for (let j = 0; j < GameData._pickups.length; j++) 
            p._player.setObserver(GameData._pickups[j].event_subject);

        for (let j = 0; j < GameData._booster.length; j++) 
            p._player.setObserver(GameData._booster[j].event_subject);
    }

    /**
     * parse in the modules
     * @param rootMapNode 
     */
    private processModuleNodes(rootMapNode: Node) {
        const namePrefix = this.module_name;

        rootMapNode.getChildren().forEach((node: Node) => 
        {
            if (node.name == `${namePrefix}`) {
                let geometry = (node.getChildren(n => {
                    return n.name == "module_0_geo";
                }, true)[0] as BABYLON.Mesh);

                GameData.modules.push(new Module(namePrefix, geometry));
                GameData.modules[GameData.modules.length - 1].instanitateHoops(this._hoop_locations);
                GameData.modules[GameData.modules.length - 1].instanitatePickups(this.pickup_locations);
            }
        });

        this.registerObserverPattern();
    }

    /**
     * Process sequence nodes that will animate as player gets close
     * @param rootNode The main root node for each anim child
     */
    private processSequenceNodes(rootNode: Node) {
        let seq = Globals._scene.getNodeByName("module_0_sequences") as BABYLON.Mesh;
        seq.scaling = new BABYLON.Vector3(-GameData.world_scale, GameData.world_scale, -GameData.world_scale);  // Scale up all nodes

        for (let i = 0; i < seq.getChildren().length; i++) {
            let node_0 = Globals._scene.getNodeByName(`module_0_seq_${i}_geo_0`) as BABYLON.Mesh;
            let node_1 = Globals._scene.getNodeByName(`module_0_seq_${i}_geo_1`) as BABYLON.Mesh;

            node_0.material = Content.scene_material;
            node_1.material = Content.scene_material;
        }
    }
}