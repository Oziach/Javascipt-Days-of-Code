import BaseScene from './BaseScene.js'

class PauseScene extends BaseScene{
    constructor(config){
        super('PauseScene', config);

        this.menu = [
            {scene: 'PlayScene', text: 'Resume'},    
            {scene: 'MenuScene', text: 'Quit to Main Menu'}    

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
            if(menuItem.object.text === 'Resume'){
                this.scene.stop();
                this.scene.resume(menuItem.scene);
            }
            else{
                this.scene.stop('PlayScene');
                this.scene.start(menuItem.scene);
            }
        })
    }

}

export default PauseScene;