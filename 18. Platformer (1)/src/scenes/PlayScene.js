class PlayScene extends Phaser.Scene{

    constructor() {
        super('PlayScene');
    }

    create(){
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('paleTileset', 'paleTileset');

        map.createLayer('background', tileset);
        map.createLayer('ground', tileset);

    }
}

export default PlayScene;