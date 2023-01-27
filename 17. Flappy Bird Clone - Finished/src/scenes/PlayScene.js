    import BaseScene from './BaseScene.js'
    class PlayScene extends BaseScene{

        constructor(config){
            super('PlayScene', config);

            this.bird = null;
            this.isPaused = false;
            this.PIPES = 4;
                
            this.pipeSet = null;
            this.pipeGapRange = [100, 150];
            this.pipeDist = 0;
            this.PIPE_DIST_RANGE = [350, 400];
            this.FLAPVELOCITY = 250;

            this.score = 0;
            this.scoreText = '';

            this.currentDifficulty = 'easy';
            this.difficulties = {
                'easy': {
                    PIPE_DIST_RANGE: [350, 400],
                    pipeGapRange: [130, 175]
                },
                'medium': {
                    PIPE_DIST_RANGE: [325, 375],
                    pipeGapRange: [125, 150]
                },
                'hard': {
                    PIPE_DIST_RANGE: [250, 300],
                    pipeGapRange: [100, 125]
                },
                'ukmd': {
                    PIPE_DIST_RANGE: [175, 200],
                    pipeGapRange: [75, 100]
                }
            }
 
        }
        
        preload(){
            super.preload();
            this.load.spritesheet('bird', 'assets/birdSheet.png', {frameWidth: 16, frameHeight: 16});
            this.load.image('pipe', 'assets/pipe.png');
            this.load.image('pause', 'assets/pause.png')
        }

        create(){
            this.currentDifficulty = 'easy';    
            super.create();
            this.createBird();
            this.createPipes();
            this.createColliders();
            this.createScore();
            this.handleInput();
            this.createPause();
            this.listenToEvents();

            this.anims.create({
                key: 'flyAnim',
                frames: this.anims.generateFrameNumbers('bird', {start: 0, end:1}),
                frameRate: 4,
                repeat: -1
            })
            this.bird.play('flyAnim');
        }

        update(){           
            this.gameStatus();
            this.resetPipes();
            this.setBestScore();
            this.handleDifficulty();
        }
        
        listenToEvents(){
            if(this.cdEvent) {return;}
            this.cdEvent = this.events.on('resume', () => {
                this.initialTime = 3;
                this.countDownText = this.add.text(...this.screenCenter, 'Resume in: ' + this.initialTime, {fontSize: '32px', fill: '#fff'})
                .setOrigin(0.5);
                this.timedEvent = this.time.addEvent({
                    delay: 1000,
                    callback: this.countdown,
                    callbackScope: this, 
                    loop: true
                })
            })
        }

        countdown(){
            this.initialTime--;
            this.countDownText.setText('Resume in: ' + this.initialTime);
            if(this.initialTime <= 0) {
                this.isPaused = false;
                this.countDownText.setText('');
                this.physics.resume();
                this.timedEvent.remove();
            }
        }

        createBG(){
            this.add.image(0, 0, 'sky').setOrigin(0);
        }

        createBird(){
            this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird')
            .setScale(3)
            .setOrigin(0);

            this.bird.setBodySize(this.bird.width - 4, this.bird.height - 6);
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
            this.isPaused = false;
           const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pause')
            .setScale(3)
            .setOrigin(1)
            .setInteractive();
            
            pauseButton.on('pointerdown', () => {
                this.physics.pause();
                this.isPaused = true;
                this.scene.pause();
                this.scene.launch('PauseScene');
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

        handleDifficulty() {
            if(this.score === 7) {
                this.currentDifficulty = 'medium';
            }
            else if(this.score === 15) {
                this.currentDifficulty = 'hard';
            }
        }
        
        //sets pipe position and features
        pipeUp(upper, lower){
        const difficulty = this.difficulties[this.currentDifficulty];
        let rightMostX = this.getRightMostPipeX();
        let pipeGap = Phaser.Math.Between(...difficulty.pipeGapRange);
        let pipeYPos = Phaser.Math.Between(15, this.config.height - 15 - pipeGap);
        let pipeDist = Phaser.Math.Between(...difficulty.PIPE_DIST_RANGE);
    
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
        if(this.isPaused) {return;}
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