import BaseScene from './BaseScene.js'

class MenuScene extends BaseScene{
    constructor(config){
        super('MenuScene', config);

        this.menu = [
            {scene: 'PlayScene', text: 'Start'},    
            {scene: null, text: 'Quit'}    

        ]
    
    }

    preload(){
        super.preload();
    }

    create(){
        super.create();
        this.createMenu(this.menu, this.setupMenuEvents.bind(this))
    }

    setupMenuEvents(menuItem) {
        menuItem.object.setInteractive();

        menuItem.object.on('pointerover', () => {
            menuItem.object.setStyle({fill:'#ffff00'});
        })
        menuItem.object.on('pointerout', () => {
            menuItem.object.setStyle({fill:'#ffffff'});
        })
        menuItem.object.on('pointerdown', () => {
            this.scene.start(menuItem.scene);
        })
    }

}

export default MenuScene;