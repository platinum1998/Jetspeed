import { Scene } from "babylonjs";
import { Player } from "./Player";

class WorldChunk {
    public min: number;
    public max: number;

    constructor(towers_per_chunk: number, chunk_depth: number, max_height: number, start_point: number, scene: BABYLON.Scene) {
        this.min = start_point;
        this.max = chunk_depth;

        let tower = BABYLON.MeshBuilder.CreateBox(
            "tower", 
            {width: 5, height: 5, depth: 5},
            scene
        );
        tower.position.x = 0;
        tower.position.y = 0;
        tower.position.z = 100;
        tower.scaling.y = max_height;

        for(let i = 0; i < towers_per_chunk; i++) {
            let instance = tower.createInstance("tower" + i);

            instance.position.x = BABYLON.Scalar.RandomRange(start_point, 100);
            instance.position.z = BABYLON.Scalar.RandomRange(-100, chunk_depth);
            instance.scaling.y = BABYLON.Scalar.RandomRange(5, 50);
        }
    }
};

export class World 
{
    static _chunks: Array<WorldChunk> = new Array<WorldChunk>();

    static generate(scene: BABYLON.Scene): void {
        var music = new BABYLON.Sound("Soundtrack", "assets/SoundTrack.wav", scene, null, {
            loop: true,
            autoplay: true
        });
        
        scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
        scene.fogDensity = 0.03;
        scene.fogStart = 5.0; 
        scene.fogEnd = 150.0; 
        scene.fogColor = new BABYLON.Color3(1, 0.9, 0.8);

        this._chunks.push(new WorldChunk(
            200,  // towers per chunk
            1000, // chunk depth
            1000, // max height the towers can go up to
            -100, // chunks start point
            scene
        ));
    }
}