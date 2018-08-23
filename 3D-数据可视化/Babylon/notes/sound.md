
来自于 http://doc.babylonjs.com/how_to/playing_sounds_and_music
> The sound engine offers `ambient` sound, `spatialized` sound and `directional` sound.


```javascript
var music = new BABYLON.Sound("Music", "music.wav", scene, null, { loop: true, autoplay: true });
```
- 1st parameter: the name of your sound.
- 2nd parameter: URL of the sound to load.
- 3rd parameter: scene to attach the sound to.
- 4th parameter: function being called-back once the sound is ready to be played, we’ll see that later.
- 5th parameter: a JSON object providing various options we’ll see in details. But you can already understand the goal of the 2 options provided.


```javascript
var music = new BABYLON.Sound("Music", "music.wav", scene,
 function () {
  // Sound has been downloaded & decoded
  music.play();
 }
);
```

或者可以这样子
```javascript
var gunshot = new BABYLON.Sound("gunshot", "sounds/gunshot.wav", scene);

window.addEventListener("mousedown", function (evt) {
    // left click to fire
    if (evt.button === 0) {
        gunshot.play();
    }
});

window.addEventListener("keydown", function (evt) {
    // Press space key to fire
    if (evt.keyCode === 32) {
        gunshot.play();
    }
});
```

## 基础属性和方法
- play()
- pause()
- stop()
- setPositon()
- setVolume()
- isReady()
- dispose()
- onended
- loop
- isPlaying
- isPaused
- autoplay

- BABYLON.Engine.audioEngine.setGlobalVolume(0.5);


## 制造音轨
```javascript
var music1 = new BABYLON.Sound("Violons11", "sounds/violons11.wav", scene,
    soundReady, { loop: true });
var music2 = new BABYLON.Sound("Violons18", "sounds/violons18.wav", scene,
    soundReady, { loop: true });
var music3 = new BABYLON.Sound("Cellolong", "sounds/cellolong.wav", scene,
    soundReady, { loop: true });

var soundsReady = 0;

function soundReady() {
    soundsReady++;
    if (soundsReady === 3) {
        music1.play();
        music2.play();
        music3.play();
    }
}
```
