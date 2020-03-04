import { ArrayTools } from "babylonjs/Misc/arrayTools";

// Store content data
export class ContentManager {
  public static materials: Array<BABYLON.StandardMaterial> = new Array();
  public static sounds: Array<BABYLON.Sound> = new Array();

  // Push back sound element from file
  public static loadSound(dir: string, s: BABYLON.Scene) {
    // Create sound from input
    let a = new BABYLON.Sound(`snd_${this.sounds.length}`, dir, s);

    // Assign data to array
    this.sounds.push(a);
  }
}
