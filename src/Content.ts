import { Globals } from "./Globals";

export class Content {
  public static MeshList: BABYLON.MeshAssetTask;
  public static MatList: Map<String, BABYLON.StandardMaterial> = new Map<
    String, BABYLON.StandardMaterial
  >();

  static LoadContent(): void {
    // instigate a new asset manager
    const assetsManager = new BABYLON.AssetsManager(Globals._scene);

    // Meshes
    Content.MeshList = assetsManager.addMeshTask(
      "block_instance",
      "",
      "assets/geometry/",
      "jet_rxtz.babylon"
    );
    // load meshes in here to the MeshList...
    //

    // Materials
    Content.MatList.set("Hoop Material", new BABYLON.StandardMaterial(
        "hoopMat", 
        Globals._scene
    ));
    Content.MatList.set("Ship Material", new BABYLON.StandardMaterial(
        "shipMat", 
        Globals._scene
    ));

    Content.MatList.get("Hoop Material").diffuseColor = new BABYLON.Color3(1, 0, 1);
    Content.MatList.get("Hoop Material").emissiveColor = new BABYLON.Color3(1, 0, 1);
    Content.MatList.get("Ship Material").diffuseColor = new BABYLON.Color3(1.0, 0.98, 0.95);
    Content.MatList.get("Ship Material").specularColor = new BABYLON.Color3(0, 0, 0);
    //

    // load in the content
    assetsManager.load();
  }

  static GetMaterialByName(name: string): BABYLON.StandardMaterial {
    return Content.MatList.get(name);
  }
}
