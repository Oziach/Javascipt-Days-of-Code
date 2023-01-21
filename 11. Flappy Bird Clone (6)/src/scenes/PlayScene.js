    class PlayScene extends Phaser.Scene{

        constructor(config){
            super('PlayScene');
            this.config = config;

            this.bird = null;

            this.PIPES = 4;
                
            this.pipeSet = null;
            this.pipeGapRange = [100, 150];
            this.pipeDist = 0;
            this.PIPE_DIST_RANGE = [350, 400];
            this.FLAPVELOCITY = 250;

            this.score = 0;
            this.scoreText = '';
 
        }

        preload(){
            this.load.image('sky', 'assets/sky.png');
            this.load.image('bird', 'assets/bird.png');
            this.load.image('pipe', 'assets/pipe.png');
            this.load.image('pause', 'assets/pause.png')
        }

        create(){
            this.createBG();
            this.createBird();
            this.createPipes();
            this.createColliders();
            this.createScore();
            this.handleInput();
            this.createPause();
        }

        update(){           
            this.gameStatus();
            this.resetPipes();
            this.setBestScore();
        }
          
        createBG(){
            this.add.image(0, 0, 'sky').setOrigin(0);
        }

        createBird(){
            this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0);
            this.bird.body.gravity.y = 400;
            this.bird.setCollideWorldBounds(true);
        }

        createPipes(){
            this.pipeSet = this.physics.add.group();
            for(let i = 0; i < this.PIPES; i++){
                const upperPipe = this.pipeSet.create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0,1);
                const lowerPipe = this.pipeSet.create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0,0);
                this.pipeUp(upperPipe, lowerPipe);
              }
              this.pipeSet.setVelocityX(-200);             
        }

        createColliders(){
            this.physics.add.collider(this.bird, this.pipeSet, this.gameOver, null, this);
        }

        createScore(){
            this.score = 0;
            this.scoreText = this.add.text(16,16, 'Score: '+this.score, {fontSize: '32px', fill: '#000'});
            const bestScore = localStorage.getItem('bestScore');
            this.add.text(16,48, 'Best: '+ bestScore || 0, {fontSize: '16px', fill: '#000'});
        }

        createPause(){
           const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pause')
            .setScale(3)
            .setOrigin(1)
            .setInteractive();
            
            pauseButton.on('pointerdown', () => {
                this.physics.pause();
                this.scene.pause();
            });
        }

        handleInput(){ 
            this.input.on('pointerdown',this.flap, this);
            this.input.keyboard.on('keydown_SPACE', this.flap, this);
        }

        gameStatus(){
            if(this.bird.y <= 0 || this.bird.y + this.bird.height >= this.config.height){
                this.gameOver(); 
            }
        }
        
        //sets pipe position and features
        pipeUp(upper, lower){
        
        let rightMostX = this.getRightMostPipeX();
        let pipeGap = Phaser.Math.Between(...this.pipeGapRange);
        let pipeYPos = Phaser.Math.Between(15, this.config.height - 15 - pipeGap);
        let pipeDist = Phaser.Math.Between(...this.PIPE_DIST_RANGE);
    
        upper.x = pipeDist + rightMostX; upper.y = pipeYPos;
        lower.x = upper.x; lower.y = upper.y + pipeGap;

        }

        resetPipes(){            
            const tempPipes = [];
            this.pipeSet.getChildren().forEach(pipe =>{
            if(pipe.getBounds().right <= 0){
                tempPipes.push(pipe);
                if(tempPipes.length==2){
                    this.pipeUp(...tempPipes);
                    this.addToScore();
                }
            }
            })
        }           

  
         gameOver(){
            this.physics.pause();
            this.bird.setTint(0xff0000);
            
            this.setBestScore();

            this.time.addEvent({
                delay:1000,
                callback: () => {
                    this.scene.restart();
                },
                loop:false
            })
  }
  
    flap(){
        this.bird.body.velocity.y = -this.FLAPVELOCITY;
  }
    setBestScore(){
        
        let bestScoreText = localStorage.getItem('bestScore');
        let bestScore = bestScoreText && parseInt(bestScoreText, 10);
        if(this.score > bestScore || !bestScore) {
            localStorage.setItem('bestScore', this.score);
        }
    }

    addToScore(){
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
    }

    getRightMostPipeX(){
  
        let rightMostX=0;
        this.pipeSet.getChildren().forEach(function(pipe){
        rightMostX = Math.max(pipe.x, rightMostX);
        })
    return rightMostX;
  }
  

}

    export default PlayScene;