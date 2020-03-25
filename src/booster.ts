import * as BABYLON from "babylonjs";
import { Actor } from "./Actor";
import { Globals } from "./globals";
import { ISubject } from "./observer";

export interface IBooster extends ISubject {
    registerObserver(x: IBoosterDelegates): void; 
    notifyOnBooster(): void;
}

export interface IBoosterDelegates {
    onBoost(): void;
}

export class Booster extends Actor implements IBooster {
    private _delegates: IBoosterDelegates[] = [];
    public boosterMesh: BABYLON.Mesh;

    constructor(pos: BABYLON.Vector3) {
        super(new BABYLON.Vector3(0, 0, 0));

        this.boosterMesh = BABYLON.MeshBuilder.CreateTorus("torus", { thickness: 0.1 }, Globals._scene);
        this.boosterMesh.position = pos;
        this.boosterMesh.scaling = new BABYLON.Vector3(15, 15, 15);
        this.boosterMesh.rotate(new BABYLON.Vector3(1, 0, 0), BABYLON.Tools.ToRadians(90), BABYLON.Space.LOCAL);
    }

    registerObserver(x: IBoosterDelegates): void {
        this._delegates.push(x);
    }

    notifyOnBooster(): void {
        for(let x of this._delegates) {
            if(x.onBoost) x.onBoost();
        }
    }

    fireOnBoosterEvent() {
        console.log("Boost event fired!");
        this.notifyOnBooster();
    }

    update(dT: number): void {}
}