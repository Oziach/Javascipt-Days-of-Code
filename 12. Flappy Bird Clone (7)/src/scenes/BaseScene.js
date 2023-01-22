class BaseScene extends Phaser.Scene{
    constructor(key, config){
        super(key);
        this.config = config;
        this.screenCenter = [this.config.width/2, this.config.height/2];
    }

    preload(){
        this.load.image('sky', 'assets/sky.png');
    }

    create(){
        this.add.image(0, 0, 'sky').setOrigin(0);
    }

    createMenu(menu, setupMenuEvents) {
        let lastMenuY= 0;

        menu.forEach(menuItem => {
           let menuPos =  [this.screenCenter[0], this.screenCenter[1] + lastMenuY];
           menuItem.object =  this.add.text(...menuPos, menuItem.text, {fontSize: '32px', fill:'#FFFFFF'})
           .setOrigin(0.5, 1);
           lastMenuY += 64; 
           setupMenuEvents(menuItem);
        });
    }

}

export default BaseScene;