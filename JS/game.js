// Scene 1 - displays "Scene 1" text for 3 seconds, then switches to Scene 2
class Scene1 extends Phaser.Scene {
    constructor() {
        super('Scene1');
    }
    preload() {
        // preload assets
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.audio('bgm', 'lib/Assets/audio/bgm.mp3');
        console.log('preloaded assets')
        
    }
    create() {
       WebFont.load({
            google: {
                families: ['Sigmar']
            },
            active: () => {
                const centerX = this.game.config.width / 2;
                const centerY = this.game.config.height / 2;
                const madeByText = this.add.text(centerX, centerY - 1000, 'Made By', { fontFamily: 'Sigmar', fontSize: 72, color: '#ffffff' }).setOrigin(0.5);

                this.tweens.add({
                    targets: madeByText,
                    y: centerY - 100,
                    duration: 2000,
                    ease: 'Power2',
                    onComplete: () => {
                        console.log('complete');
                    }
                })

                const AD = this.add.text(-500, centerY , 'AD', { fontFamily: 'Sigmar', fontSize: 72, color: '#ffffff' }).setOrigin(0.5);
                this.tweens.add({
                    targets: AD,
                    x: centerX,
                    duration: 2000,
                    ease: 'Power2',
                    delay : 1000,
                    onComplete: () => {
                        console.log('complete');
                        const bg = this.add.rectangle(centerX, centerY, this.game.config.width, this.game.config.height, 0xFF0000, 0.5).setOrigin(0.5);
                        const text = this.add.text(centerX, centerY + 100, 'Click to start!', { fontFamily: 'Sigmar', fontSize: 72, color: '#ffffff' }).setOrigin(0.5);
                        text.setInteractive();
                        text.on('pointerup', () => {
                            music.stop();
                            this.scene.start('Scene2');
                        });
                        
                        const music = this.sound.add('bgm');
                        music.play();
                    }
                })


            }
        });
    }
}

// Scene 2 - displays "Scene 2" text for 3 seconds, then switches to Scene 3

// Credit to author for music works
// Goddess Of Fate by Makai Symphony | https://soundcloud.com/makai-symphony
// Music promoted by https://www.chosic.com/free-music/all/
// Creative Commons CC BY-SA 3.0
// https://creativecommons.org/licenses/by-sa/3.0/
  


class Scene2 extends Phaser.Scene {
    constructor() {
        super('Scene2');
    }
    preload() {
        // preload assets
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        // images 
        this.load.image('background', 'lib/Assets/Robot1.jpg');
        // music time
        this.load.audio('boss', 'lib/Assets/audio/BossBattle.mp3');
      
    }
    create() {
        const music = this.sound.add('boss');
        music.play();
        const centerX = this.game.config.width / 2;
        const centerY = this.game.config.height / 2;
        const background = this.add.image(centerX - 155,centerY,'background');
       
        background.setScale(.25);
        background.setDisplaySize(centerX + 150, centerY + 100); // set the image to fit half the game container

        // animation
        this.tweens.add({
            targets: background,
            scale : 5,
            duration: 800,
            yoyo : true,
            onComplete: () => {
                console.log('complete');
            }
        })




        const gameDialouge = this.add.text(centerX + 270, centerY, 'In a world where we all in some form rely on AI for our Daily Lives...', {fontFamily: 'Sigmar', fontSize: 30, color: '#ffffff',padding : {x:10,y:5}, align : 'right' ,wordWrap : {width : centerX *.7}}).setOrigin(0.5);

        const continueText = this.add.text(centerX + 260, centerY + 200, 'Next ->', {
            fontFamily: 'Sigmar',
            fontSize: 30,
            color: '#ffffff',
            padding: {x: 10, y: 5},
            align: 'right',
            wordWrap: {width: centerX * 0.7}
        }).setOrigin(0.5);
    
        // set up click event for continueText
        continueText.setInteractive({useHandCursor: true}).on('pointerdown', () => {
            music.stop();
            this.scene.start('Scene3');
        });

    
        
        
    }
}

// Scene 3 - displays "Scene 3" text for 3 seconds, then switches to the main game scene
class Scene3 extends Phaser.Scene {
    constructor() {
        super('Scene3');
    }
    preload() {
        // preload assets
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        // images
        this.load.image('background', 'lib/Assets/Weld.jpg');

    }
    create() {
        
        const centerX = this.game.config.width / 2;
        const centerY = this.game.config.height / 2;
        const background = this.add.image(centerX +130,centerY,'background');
       
        background.setScale(.25);
        background.setDisplaySize(centerX + 150, centerY + 100); // set the image to fit half the game container
        
       
        this.add.text(centerX -400,centerY-100, 'JELLO', {fontFamily: 'Sigmar', fontSize: 30, color: '#ffffff',padding : {x:10,y:5}, align : 'right' ,wordWrap : {width : centerX *.7}});
        // const gameDialouge = this.add.text(centerX + 270, centerY, 'In a world where we all in some form rely on AI for our Daily Lives...', {fontFamily: 'Sigmar', fontSize: 30, color: '#ffffff',padding : {x:10,y:5}, align : 'right' ,wordWrap : {width : centerX *.7}}).setOrigin(0.5);

        // this.time.delayedCall(3000, () => {
        //     this.scene.start('Game');
        // });
    }
}

// Main game scene - displays "Game" text
class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    preload() {
        // preload assets
    }
    create() {
        this.add.text(300, 250, 'Game', { fill: '#ffffff' });
    }
}

// Configuration object for the Phaser game
const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#000000',
    scene: [Scene3, Scene2, Scene1, GameScene]
    
};

// Create the Phaser game instance
const game = new Phaser.Game(config);
