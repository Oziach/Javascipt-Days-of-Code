const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {

      debug: true,
    }
  },
  scene: {
    preload,
    create,
    update,
  }
}

let bird= null;
const FLAPVELOCITY = 250;
const initialBirdPosition = {x:config.width * 0.1, y: config.height/2}

let pipeSet = null;
const pipeGapRange = [100, 150];
let pipeDist = 0;
const PIPES = 4;

function preload(){
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

function create(){
  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 400;

  pipeSet = this.physics.add.group();

  for(let i = 0; i < PIPES; i++){
    const upperPipe = pipeSet.create(0, 0, 'pipe').setOrigin(0,1);
    const lowerPipe = pipeSet.create(0, 0, 'pipe').setOrigin(0,0);
    pipeUp(upperPipe, lowerPipe);
  }
  pipeSet.setVelocityX(-200); 

  this.input.on('pointerdown',flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

function update(time, delta){

  if(bird.y < 0 || bird.y + bird.height > config.height){
    restartBirdPosition(); 
  }

}

//sets pipe position and features
function pipeUp(upper, lower){
  pipeDist += 400;

  let pipeGap = Phaser.Math.Between(...pipeGapRange);
  let pipeYPos = Phaser.Math.Between(15, config.height - 15 - pipeGap);

  upper.x = pipeDist; upper.y = pipeYPos;
  lower.x = upper.x; lower.y = upper.y + pipeGap;

}

function restartBirdPosition(){
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
}

function flap(){
  bird.body.velocity.y = -FLAPVELOCITY;
}

new Phaser.Game(config);