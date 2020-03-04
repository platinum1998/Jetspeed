import { Entity } from "./Entity";
import { Vector3 } from "babylonjs";

export class Player extends Entity {
  private speed: number;
  public playerCharacter: BABYLON.Mesh;

  constructor(scene: BABYLON.Scene, spd: number) {
    super(new BABYLON.Vector3(0, -1, 10));

    this.speed = spd;
    this.playerCharacter = this.mesh;

    // this.playerCharacter = BABYLON.MeshBuilder.CreateBox(
    //     "player", 
    //     {width: 3, height: 1, depth: 10}, 
    //     scene
    //     );

    // this.playerCharacter.position.x = 0;
    // this.playerCharacter.position.y = -1;
    // this.playerCharacter.position.z = -1000

    // const assetsManager = new BABYLON.AssetsManager(scene);
    // const meshTask = assetsManager.addMeshTask(
    //     'block_instance', 
    //     '', 
    //     'assets/geometry/', 
    //     'jet_rxtz.babylon'
    // );

    // let _this = this;
    // meshTask.onSuccess = (task) => 
    // {
    //     _this.playerMesh = task.loadedMeshes[0];
    //     _this.playerMesh.position.x = 0;
    //     _this.playerMesh.position.y = -1;
    //     _this.playerMesh.position.z = 10;

    //     _this.playerMesh.scaling.x = 100;
    //     _this.playerMesh.scaling.y = 100;
    //     _this.playerMesh.scaling.z = 100;
      
        
    //     scene.registerBeforeRender(function() 
    //     {
    //         _this.playerMesh.position.z += 0.1;
    //         console.log(this.currentDirection);

    //         if (this.currentDirection == -1) 
    //         {
    //             _this.playerMesh.position.x -= 0.1;
    //             _this.playerMesh.rotation = BABYLON.Vector3.Lerp(
    //                 _this.playerMesh.rotation,
    //                 new BABYLON.Vector3(0, 0, 0.5),
    //                 0.1
    //             );
    //         }
    //     });
    // }
    // assetsManager.load();
  }

  update(dT: number): void {
    // this.playerCharacter.position.z += 0.08 * dT;
    
    // if (this.currentDirection == -1) {
    //   this.playerCharacter.position.x -= this.speed * dT;
    //   this.playerCharacter.rotation = BABYLON.Vector3.Lerp(
    //     this.playerCharacter.rotation,
    //     new BABYLON.Vector3(0, 0, 0.5),
    //     0.01 * dT
    //   );
    // }
    // if (this.currentDirection == 1) {
    //   this.playerCharacter.position.x += this.speed * dT;
    //   this.playerCharacter.rotation = BABYLON.Vector3.Lerp(
    //     this.playerCharacter.rotation,
    //     new BABYLON.Vector3(0, 0, -0.5),
    //     0.015 * dT
    //   );
    // } else if (this.currentDirection == 0) {
    //   this.playerCharacter.rotation = BABYLON.Vector3.Lerp(
    //     this.playerCharacter.rotation,
    //     new BABYLON.Vector3(0, 0, 0),
    //     0.01 * dT
    //   );
    // }
  }
}
