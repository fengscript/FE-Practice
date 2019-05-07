# Ovservable
## methods
https://doc.babylonjs.com/api/classes/babylon.observable#constructor
- add
    - `add(callback: function, mask?: number, insertFirst?: boolean, scope?: any, unregisterOnFirstCall?: boolean): Nullable<Observer<T>>`

    **Parameters**

    - callback: function
    the callback that will be executed for that Observer

        (eventData: T, eventState: EventState): void
    **Parameters**
        - eventData: T
        - eventState: EventState
        - Returns void
    Optional mask: number
    the mask used to filter observers

    Optional insertFirst: boolean

    if true the callback will be inserted at the first position, hence executed before the others ones. If false (default behavior) the callback will be inserted at the last   position, executed after all the others already present.

    Optional scope: any
    optional scope for the callback to be called from

    Optional unregisterOnFirstCall: boolean
    defines if the observer as to be unregistered after the next notification
    ```
    
- addOnce
- clear
- clone
- hasObservers
- hasSpecificMask
- notifyObserver
- notifyObservers
- notifyObserversWithPromise
- remove
- removeCallback