import * as BABYLON from "babylonjs";
import { PickupFX } from "./pickupFX";

// in-game events
export enum EVENTS {
    ON_PICKUP,
    ON_GAMEOVER,
    ON_BOOST
} 

// event subject: an event subject is able to fire events then needed
export interface IEventSubject {
    registerObserver?(x: IEventObserver);
    notifyEvent?(event);
    fireEvent?(event);
}

/**
 * the event observer is able to define events to use in-game
 */
export interface IEventObserver {
    onPickup();
    onBoost();
}

export class EventSubject implements IEventSubject {
    // list of observers for this subject
    private _observers: IEventObserver[] = [];

    /**
     * constructer | initialise any variables in here
     */
    constructor(){}

    /**
     * Register an observer 
     * @param x the observer to register/link with
     */
    registerObserver(x: IEventObserver) {
        this._observers.push(x);
    }

    /**
     * Notifies a certain event should be called
     * @param event event to notify and essensially fire
     */
    notifyEvent(event: any) {
        switch (event) {
            case EVENTS.ON_PICKUP:
                for (let s of this._observers)
                    if (s.onPickup)
                        s.onPickup();
                break;
            case EVENTS.ON_BOOST:
                for (let s of this._observers)
                    if (s.onBoost)
                        s.onBoost();
                break;
            default:
                break;
        }
    }

    /**
     * Fires an event that you specify
     * @param event the event to fire
     */
    fireEvent(event: any) {
        this.notifyEvent(event);
    }
}