import { Globals } from "./globals";

export class Input {
  public static a_key: boolean;
  public static d_key: boolean;

  public static UpdateInput() {
    Globals._scene.onKeyboardObservable.add(kbInfo => {
      switch (kbInfo.type) {
        case BABYLON.KeyboardEventTypes.KEYDOWN:
          if (kbInfo.event.key == "a") Input.a_key = true;
          if (kbInfo.event.key == "d") Input.d_key = true;
          break;
        case BABYLON.KeyboardEventTypes.KEYUP:
          Input.a_key = false;
          Input.d_key = false;
          break;
      }
    });
  }
}
