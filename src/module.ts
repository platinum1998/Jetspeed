import * as BABYLON from "babylonjs";
import { Globals } from "./globals";

export class Module {
    public _name      : string;
    public  _geometry : BABYLON.Mesh;

    constructor(name: string, geometry: BABYLON.Mesh) {
        this._name = name;
        this._geometry = geometry;
    }
}