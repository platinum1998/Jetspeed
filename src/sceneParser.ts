import * as BABYLON from "babylonjs";
import { Node, TransformNode } from "babylonjs";
import { Globals } from "./globals";
import { GameData } from "./data";
import { Module } from "./module";

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

        this.processTransformNodes(rootNode);
        this.processModuleNodes(rootNode);
    }

    /**
     * 
     * @param rootMapNode 
     */
    private processTransformNodes(rootMapNode: Node) {
        this._player_start = (rootMapNode.getChildren(n => {
            return n.name == "player_start_loc";
        }, true)[0] as TransformNode).position;

        const namePrefix = this.module_name;
        rootMapNode.getChildren().forEach((node: Node) => {
            if(node.name == `${namePrefix}`) {             
                let sequences = node.getChildren(n => {
                    return n.name == "sequences";
                }, true)[0];

                let hoop_locators = (sequences.getChildren(n => {
                    return n.name == "hoops";
                }, true)[0] as BABYLON.Mesh);

                for(let i = 0; i < GameData.number_of_hoops_per_module; i++) {
                    this._hoop_locations.push(
                        (sequences.getChildren(n => {
                            if(n.name == `hoop_loc_${i}`) 
                                return n.name == `hoop_loc_${i}`;
                        }, true)[0] as BABYLON.TransformNode)
                    );
                }
            }
        });    
    }

    /**
     * 
     * @param rootMapNode 
     */
    public updateWorldCollision(rootMapNode: Node) {
        const namePrefix = this.module_name;

        let collision_geometry_group = Globals._scene.getNodeByName("wall_collision") as BABYLON.Mesh;
        collision_geometry_group.scaling.x = -500;
        collision_geometry_group.scaling.y =  500;
        collision_geometry_group.scaling.z = -500;

        rootMapNode.getChildren().forEach((node: Node) => {
            if(node.name == `${namePrefix}`) {             
                let collision_tree = node.getChildren(n => {
                    return n.name == "sequences";
                }, true)[0].getChildren(n => {
                    return n.name == "wall_collision";
                }, true)[0];
                
                collision_tree.getChildren().forEach((collider: Node) => {
                    let mat = new BABYLON.StandardMaterial("", Globals._scene);
                    mat.diffuseColor = new BABYLON.Color3(1, 1, 1);
                    mat.alpha = 0.0;

                    GameData.collisions.push(collider as BABYLON.Mesh);
                    GameData.collisions[GameData.collisions.length - 1].material = mat;
                    GameData.collisions[GameData.collisions.length - 1].checkCollisions = true;
                });
            }
        });     
    }

    /**
     * parse in the modules
     * @param rootMapNode 
     */
    private processModuleNodes(rootMapNode: Node) {
        const namePrefix = this.module_name;

        rootMapNode.getChildren().forEach((node: Node) => {
            if(node.name == `${namePrefix}`) {             
                let sequences = node.getChildren(n => {
                    return n.name == "sequences";
                }, true)[0];

                let geometry = (sequences.getChildren(n => {
                    return n.name == "main_geo";
                }, true)[0] as BABYLON.Mesh);

                GameData.modules.push(new Module(namePrefix, geometry));
            }
        });     
    }
}