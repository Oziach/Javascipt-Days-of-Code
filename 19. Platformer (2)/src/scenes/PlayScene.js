class PlayScene extends Phaser.Scene{

    constructor() {
        super('PlayScene');
    }

    create(){
       const map = this.createMap();
       const layers = this.createLayers(map);
       const player = this.createPlayer();

       this.physics.add.collider(player, layers.ground);
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