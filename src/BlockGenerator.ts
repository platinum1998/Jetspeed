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
      const shipMesh = task.loadedMeshes[0];

      shipMesh.applyFog = true;
      shipMesh.setPivotPoint(new BABYLON.Vector3(0, -0.005, 0));
      shipMesh.scaling = new BABYLON.Vector3(3000, 3000, 3000);

      // Do something with the mesh here
      shipMesh.position.x = -20;
      shipMesh.position.y = -50;
      shipMesh.position.z = 100;

      //   instances = pianoMesh.instantiateHierarchy();
      //   instances.position.x = 10;

      let i_array = [];

      for (let i = 0; i < MAX_ROWS; i++) {
        for (let j = 0; j < MAX_COLUMNS; j++) {
          i_array[i] = shipMesh.instantiateHierarchy();
          i_array[i].position.x = i * 30 - (MAX_ROWS / 2) * 30;
          i_array[i].position.z = j * 30;
          if (!this.probability(0.97)) i_array[i].scaling.y = 80000;
          else i_array[i].scaling.y = BABYLON.Scalar.RandomRange(10, 2000);
        }
      }

      let last_z_index = i_array[i_array.length - 1]; // Get last z block index for position update

      scene.registerBeforeRender(function() {
        // Level regeneration in realtime here...
        //if (last_z_index.position.z)
      });
    };
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
