import * as BABYLON from "babylonjs";


export interface SequenceDelegates {
    geometry: Node,
    position: BABYLON.Vector3,
    playOnce: boolean,
    onFinish: void;
}