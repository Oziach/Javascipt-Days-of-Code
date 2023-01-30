class PreloadScene extends Phaser.Scene{

    constructor() {
        super('PreloadScene');
    }

    preload(){
        this.load.tilemapTiledJSON('map', 'assets/testTilemap.json');
        this.load.image('paleTileset', 'assets/paleTileset.png');
        this.load.image('player', 'assets/knightIdle1.png');
    }

    create(){
        this.scene.start('PlayScene');
    }
}

export default PreloadScene;