import { Entity } from "./Entity";
import { Content } from "./Content";

export class BonusGenerator {
  // array list of hoops
  public static hoops: Array<BABYLON.InstancedMesh> = new Array<
    BABYLON.InstancedMesh
  >();

  static Initialise(
    num_rings: number, // of rungs to generate
    start: number, // start of the area in which the rings will be generated
    depth: number, // depth of the patch in which the rings will be generated
    scene: BABYLON.Scene // babylon scene
  ) {
    // create the ring mesh
    var mesh = BABYLON.MeshBuilder.CreateTorus(
      "ring", // name of the ring
      { thickness: 0.05 }, // the thickness of the ring
      scene // the scene
    );

    // the root ring transformation
    mesh.position = new BABYLON.Vector3(0, -2, 100);
    mesh.scaling = new BABYLON.Vector3(20, 20, 20);
    mesh.rotation = new BABYLON.Vector3(1.5, 0, 0);
    mesh.checkCollisions = true;

    // set the hoops material
    mesh.material = Content.GetMaterialByName("Hoop Material");

    // generate rings
    for (let i = 0; i < num_rings; i++) {
      let instance = mesh.createInstance("hoop" + i);
      instance.position.x = BABYLON.Scalar.RandomRange(start, 50) + i;
      instance.position.y = 1;
      instance.position.z = BABYLON.Scalar.RandomRange(-50, depth) + i;
      instance.checkCollisions = true;
      this.hoops.push(instance);
    }
  }
}
