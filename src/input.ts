import { Globals } from "./globals";

export class Input {
  public static a_key: boolean;
  public static d_key: boolean;
  public static tap: boolean;

  public static mouse_x: number;
  public static mouse_y: number;

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

    Globals._scene.onPointerObservable.add(pointerInfo => {
      switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERDOWN:
          Input.tap = true;
          break;
        case BABYLON.PointerEventTypes.POINTERUP:
          Input.tap = false;
          break;
      }
    });

    window.addEventListener("mousemove", function() {
      Globals._scene.pointerX = Input.mouse_x;
      Globals._scene.pointerY = Input.mouse_y;
      console.log(Input.mouse_x + " " + Input.mouse_y);
    });
  }
}
