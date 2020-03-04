// This class will instanciate the basic block element
export class Block {
    public id: number;
    public static: boolean;
    public mesh: BABYLON.InstancedMesh;

    constructor(pos: BABYLON.Vector2, scale_z: number, isStatic: boolean, mesh_ref: BABYLON.Mesh, instance_id?: number) {
        this.id = instance_id;
        this.static = isStatic;
        this.mesh = mesh_ref.createInstance(`block_instance_${instance_id}`);

        // Initial position + scale
        this.mesh.position = new BABYLON.Vector3(pos.x, -3, pos.y);
        this.mesh.scaling.z = scale_z;
    }
}