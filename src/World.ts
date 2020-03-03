import { Scene } from "babylonjs";

export class World 
{
    constructor() {}

    static generate(scene: BABYLON.Scene): void {
        const TOWERS_PER_CHUNK = 200;

        let tower = BABYLON.MeshBuilder.CreateBox(
            "tower", 
            {width: 5, height: 5, depth: 5},
            scene
        );
        tower.position.x = 0;
        tower.position.y = 0;
        tower.position.z = 100;
        tower.scaling.y = 1000;

        for(let i = 0; i < TOWERS_PER_CHUNK; i++) {
            let instance = tower.createInstance("tower" + i);
            instance.position.x = BABYLON.Scalar.RandomRange(-100, 100);
            instance.position.z = BABYLON.Scalar.RandomRange(-100, 1000);

            instance.scaling.y = 1000;
        }
    }
}