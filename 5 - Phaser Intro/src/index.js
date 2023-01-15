const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {y: 300},
    }
  },
  scene: {
    preload,
    create,
    update,
  }
}

function preload(){
  this.load.image('bg', 'assets/background.png');
  this.load.image('square', 'assets/square.png');
}


let square = null;

const SPEED = 250;

function create(){
  this.add.image(0, 0, 'bg').setOrigin(0);
  square = this.physics.add.sprite(config.width/2, config.height/2, 'square').setOrigin(0);

  this.input.on('pointerdown', function(){square.body.velocity.y = -SPEED;})
  
}

function update(){

}


new Phaser.Game(config);