import PlayScene from './scenes/PlayScene.js';

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITOIN = {x: WIDTH * 0.1, y: HEIGHT/2};

const COMMON_CONFIG ={
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITOIN
}

 const config = {
  type: Phaser.AUTO,
  ...COMMON_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: [new PlayScene(COMMON_CONFIG)]
}

new Phaser.Game(config);