import { Entity } from "./Entity";

export class Player extends Entity 
{
    private speed: number;
    private currentDirection: number;

    public playerCharacter: BABYLON.Mesh;

    constructor(scene: BABYLON.Scene, spd: number) 
    {
        super(new BABYLON.Vector3(0, -1, 10));

        this.speed = spd;
        this.currentDirection = 0;

        this.playerCharacter = this.mesh;        
        this.playerCharacter = BABYLON.MeshBuilder.CreateBox
        (
            "player", 
            { width: 2.25, height:0.8, depth:9 }, 
            scene
        );
        this.playerCharacter.position.x = 0;
        this.playerCharacter.position.y = -1;
        this.playerCharacter.position.z = 10;
    }

    setCurrentDirection(currentDir: number): void {
        this.currentDirection = currentDir;
    }

    update(dT: number): void 
    {
        this.playerCharacter.position.z += 0.08 * dT;

        if(this.currentDirection == -1) {
            this.playerCharacter.position.x -= this.speed * dT;
            this.playerCharacter.rotation = BABYLON.Vector3.Lerp(this.playerCharacter.rotation, new BABYLON.Vector3(0, 0, 0.5), 0.01 * dT);
        }        
        if(this.currentDirection == 1) {
            this.playerCharacter.position.x += this.speed * dT;
            this.playerCharacter.rotation = BABYLON.Vector3.Lerp(this.playerCharacter.rotation, new BABYLON.Vector3(0, 0, -0.5), 0.015 * dT);
        }
        else if(this.currentDirection == 0) {
            this.playerCharacter.rotation = BABYLON.Vector3.Lerp(this.playerCharacter.rotation, new BABYLON.Vector3(0, 0, 0), 0.01 * dT);
        }
    }
}