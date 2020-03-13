import * as BABYLON from "babylonjs";
import { Globals } from "./globals";

/**
 * This class
 */
export class CollisionHierachy {
  /**
   * the array of bounding boxes
   */
  private static num_colliders_in_world: number = 0;
  static show: number = 0.3;
  static bounding_boxes: Map<String, BABYLON.Mesh | BABYLON.InstancedMesh> = new Map<String, BABYLON.Mesh | BABYLON.InstancedMesh>();

  /**
   *
   * @param name name of the bounding box
   * @param dimensions the width, height & depth of the bounding box
   * @param show is the bounding box visible in the world? (DEBUGGING)
   */
  static Generate(num_colliders) {
    /**
     * Material
     */
    let mat = new BABYLON.StandardMaterial("mat", Globals._scene);
    mat.diffuseColor = new BABYLON.Color3(1, 1, 1);
    mat.alpha = this.show;

    /**
     * Create the bounding box mesh
     */
    let bounding_box = BABYLON.MeshBuilder.CreateBox(
      "col", // name
      { width: 25, height: 45, depth: 50 }, // dimensions
      Globals._scene // the scene
    );

    /**
     * Bounding box position
     */
    bounding_box.position.x = -5;
    bounding_box.position.y = -10;
    bounding_box.position.z = 250;
    bounding_box.material = mat;

    /**
     * Show the bounding box
     */
    bounding_box.showBoundingBox = false;

    this.bounding_boxes.set("root", bounding_box);
  }

  /**
   * addes a instance of the root collider into the world 
   * @param name name of the collider being added into the world
   */
  static addCollider(name) 
  {
    this.num_colliders_in_world++;
    let instance_collider = this.bounding_boxes["root"].createInstance(
      "col" + this.num_colliders_in_world);
    this.bounding_boxes.set(name, instance_collider);
  }

  /**
   * Get a collider in the world using its name
   * @param name the name of the collider in the Hash-Map
   */
  static getColliderByName(name) 
  {
    return this.bounding_boxes.get(name); 
  }

  static DestroyHierachy() {
    this.bounding_boxes.clear();
  }
}