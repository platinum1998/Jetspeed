import { Entity } from "./Entity";
import { Vector3, AbstractMesh } from "babylonjs";
import { Globals } from "./Globals";
import { GUI } from "./GUI";
import { BonusGenerator } from "./BonusGenerator";
import { Input } from "./Input";
import { World } from "./World";
import { Content } from "./Content";

export class Player extends Entity {
  private speed: number;
  public distance: number;
  public currentDirection: number;
  public meshTask: BABYLON.MeshAssetTask;

  constructor(scene: BABYLON.Scene, spd: number) {
    super(new BABYLON.Vector3(0, -1, 10));

    this.distance = 0;
    this.speed = spd;
    this.currentDirection = 0;
  }

  update(dT: number): void 
  {  
    var mesh;
    Content.MeshList.onSuccess = task => 
    {
      mesh = task.loadedMeshes[0];
      mesh.material = Content.GetMaterialByName("Ship Material");

      mesh.position.x = 0;
      mesh.position.y = -1;
      mesh.position.z = -14;

      mesh.scaling.x = 100;
      mesh.scaling.y = 100;
      mesh.scaling.z = 100;

      Globals._scene.registerBeforeRender(function() 
      {
        mesh.position.z += 7.0;

        for (let i = 0; i < BonusGenerator.hoops.length; i++) 
        {
          if (mesh.intersectsMesh(BonusGenerator.hoops[i])) 
          {
            console.log("BONUS! x100");
          }
        }
        
        if (Input.a_key) {
          mesh.position.x -= 2.5;
          mesh.rotation = BABYLON.Vector3.Lerp(
            mesh.rotation,
            new BABYLON.Vector3(0, 0, 0.8),
            0.3
          );

          World.camera.camObj.rotation.z = BABYLON.Scalar.Lerp(
            World.camera.camObj.rotation.z,
            BABYLON.Tools.ToRadians(4),
            0.1
          );
        }
        if (Input.d_key) {
          mesh.position.x += 2.5;
          mesh.rotation = BABYLON.Vector3.Lerp(
            mesh.rotation,
            new BABYLON.Vector3(0, 0, -0.8),
            0.3
          );

          World.camera.camObj.rotation.z = BABYLON.Scalar.Lerp(
            World.camera.camObj.rotation.z,
            BABYLON.Tools.ToRadians(-4),
            0.1
          );
        } else {
          mesh.rotation = BABYLON.Vector3.Lerp(
            mesh.rotation,
            new BABYLON.Vector3(0, 0, 0),
            0.2
          );

          World.camera.camObj.rotation.z = BABYLON.Scalar.Lerp(
            World.camera.camObj.rotation.z,
            BABYLON.Tools.ToRadians(0),
            0.1
          );
        }

        World.camera.camObj.position.x = mesh.position.x;
      });
    };
  }
}
