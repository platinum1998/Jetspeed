import * as BABYLON_UI from 'babylonjs-gui'

/*
*
* This class handles creating the User Interface
*
*/

export class GUI 
{
    static distance_travelled: BABYLON.GUI.TextBlock;

    public static create(): void {
        let ui_interface = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.distance_travelled = new BABYLON.GUI.TextBlock();
        this.distance_travelled.text = "0m";
        this.distance_travelled.color = "black";
        this.distance_travelled.fontSize = 50;
        this.distance_travelled.alpha = 0.5;
        this.distance_travelled.top = -350;

        ui_interface.addControl(this.distance_travelled);
    } 
}