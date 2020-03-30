import { Globals } from "./globals";

/**
 * This class handles user input
 */
export class Input {
  // keys
  public static a_key: boolean;
  public static d_key: boolean;
  public static tap: boolean;

  // mouse 
  public static mouse_x: number;
  public static mouse_y: number;

  /**
   * Check for key input
   */
  public static UpdateInput() {
    /**
     * add a keyboard observable to check for input
    */
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

    /**
     * add a pointer observable to check for mouse  input
     */
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

    /**
     * Get the mouse x and y from an event listener
     */
    window.addEventListener("mousemove", function() {
      Input.mouse_x = Globals._scene.pointerX;
      Input.mouse_y = Globals._scene.pointerY;
    });
  }
}
