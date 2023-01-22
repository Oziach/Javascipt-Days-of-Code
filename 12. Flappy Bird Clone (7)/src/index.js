import PlayScene from './scenes/PlayScene.js';
import MenuScene from './scenes/MenuScene.js';


const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITOIN = {x: WIDTH * 0.1, y: HEIGHT/2};

const COMMON_CONFIG ={
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITOIN
}

const Scenes = [MenuScene, PlayScene];
const initScenes = () => Scenes.map((Scene) => new Scene(COMMON_CONFIG));

 const config = {
  type: Phaser.AUTO,
  ...COMMON_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: initScenes()
}

new Phaser.Game(config);