import PlayScene from './scenes/PlayScene.js';
import PreloadScene from './scenes/PreloadScene.js';


const WIDTH = 640;
const HEIGHT = 480;

const COMMON_CONFIG ={
  width: WIDTH,
  height: HEIGHT,
}

const Scenes = [PreloadScene, PlayScene];
const initScenes = () => Scenes.map((Scene) => new Scene(COMMON_CONFIG));

 const config = {
  type: Phaser.AUTO,
  ...COMMON_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true, 
    }
  },
  scene: initScenes()
}

new Phaser.Game(config);