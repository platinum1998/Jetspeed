import * as BABLYLON from "babylonjs";
import { Block } from "./Block";

/* Constants */
const MAX_BLOCK_HEIGHT = 1;
const MAX_COLUMNS = 50;
const MAX_ROWS = 100;
const MIN_BLOCK_HEIGHT = 0.1;
const BACK_BLOCK = 0;
const LEFT_BLOCK = 1;
const RIGHT_BLOCK = 2;

// Global functions for block generation
export class BlockGenerator {
  public static finished_gen: boolean[];

  // Randomises the probability between 0 - 1
  public static probability(n): boolean {
    return !!n && Math.random() <= n;
  }

  // Checks if last row is within visible range between camera view and fog threshold far distance
  public static BlockWithinRangeZ(
    player_pos_z: number,
    last_block_back: number,
    threshold: number
  ): boolean {
    return Math.floor(Math.abs(last_block_back - player_pos_z)) <= threshold;
  }

  // Initialise block patch (for start of game)
  public static Initialise(
    scene: BABYLON.Scene,
    assetsManager: BABYLON.AssetsManager,
    block_list: Block[]
  ): void {
    const meshTask = assetsManager.addMeshTask(
      "piano task",
      "",
      "assets/geometry/",
      "block.babylon"
    );
    meshTask.onSuccess = task => {
      const pianoMesh = task.loadedMeshes[0];
      // Do something with the mesh here
      pianoMesh.position.x = -20;
      pianoMesh.position.y = 0;
      pianoMesh.position.z = 100;

      pianoMesh.setPivotPoint(new BABYLON.Vector3(0, -0.005, 0));
      pianoMesh.scaling.x = 500;
      pianoMesh.scaling.y = 500;
      pianoMesh.scaling.z = 500;

      let instances = pianoMesh.instantiateHierarchy();
      instances.position.x = instances.position.x + 10;

      scene.registerBeforeRender(function() {
        pianoMesh.scaling.y += 10;
      });
    };

    //for (let i = 0; i < 3; i++)
    // BlockGenerator.finished_gen[i] = false;

    // for (let z = 0; z < MAX_COLUMNS; z++) {
    //     for (let x = 0; x < MAX_ROWS; x++) {
    //         block_list.push(new Block(new BABYLON.Vector2(x, z), Math.random() * MIN_BLOCK_HEIGHT * MAX_BLOCK_HEIGHT, false, ));
    //     }
    // }
  }

  // Generate rows and columns of level in realtime
  public static GenerateBlocksRealtime(
    fog_start: number,
    player_pos_x: number,
    player_pos_z: number,
    num_rows: number,
    num_columns: number,
    last_block_left: number,
    last_block_right: number,
    last_block_back: number,
    block_list: Block[]
  ) {
    // First check if last block is within visibility (z)
    if (
      BlockGenerator.BlockWithinRangeZ(player_pos_z, last_block_back, fog_start)
    ) {
      for (let rows = 0; rows < num_rows; rows++) {
        // Iterate through each row of blocks
      }
    }
  }
}
