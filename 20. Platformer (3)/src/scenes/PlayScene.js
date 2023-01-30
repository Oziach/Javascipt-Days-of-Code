class PlayScene extends Phaser.Scene{

    constructor() {
        super('PlayScene');
    }

    create(){
       const map = this.createMap();
       const layers = this.createLayers(map);
       this.player = this.createPlayer();

       this.moveSpeed = 333;
       this.physics.add.collider(this.player, layers.ground);
       this.arrowKeys = this.input.keyboard.createCursorKeys();
    }

    update(){
        const {left, right} = this.arrowKeys;
        if(left.isDown){
            this.player.setVelocityX(-this.moveSpeed);
        }
        else if (right.isDown) {
            this.player.setVelocityX(this.moveSpeed);
        }
        else{
            this.player.setVelocityX(0);
        }
    }

    createMap(){
        const map = this.make.tilemap({key: 'map'});
        map.addTilesetImage('paleTileset', 'paleTileset');
        return map;
    }

    createLayers(map){
        const tileset = map.getTileset('paleTileset');
        const background = map.createLayer('background', tileset);
        const ground = map.createLayer('ground', tileset);

        ground.setCollisionByExclusion(-1, true);

        return({background, ground});
    }

    createPlayer(){
        const player = this.physics.add.sprite(96, 160, 'player');
        player.body.setGravityY(100);
        player.setCollideWorldBounds(true);
        return player;
    }
}

export default PlayScene;