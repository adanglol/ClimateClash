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
                        text
                        .on('pointerup', () => {
                            music.stop();
                            this.scene.start('Scene2');
                        })
                        .on('pointerover', () => {
                            text.setColor('#000000');
                        })
                        .on('pointerout', () => {
                            text.setColor('#ffffff');
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
            duration: 1000,
            yoyo : true,
            onComplete: () => {
                console.log('complete');
            }
        })

        this.tweens.add({
            targets: background,
            y: centerY - 50,
            ease: 'Sine.easeInOut',
            duration: 8000,
            yoyo : true,
            onComplete: () => {
                console.log('complete');
            }
        })





        const gameDialouge = this.add.text(centerX + 270, centerY, '', {fontFamily: 'Sigmar', fontSize: 30, color: '#ffffff',padding : {x:10,y:5}, align : 'right' ,wordWrap : {width : centerX *.7}}).setOrigin(0.5);

        // set up animation for gameDialouge
        // how can i make this text appear letter by letter?

        const textToType ='In a world where we all in some form rely on AI for our Daily lives...'
        gameDialouge.setVisible(false);
        let index = 0;
        this.time.addEvent({
            delay: 80,
            repeat: textToType.length - 1,
            callback: () => {
                gameDialouge.text += textToType[index];
                index++;
            }
        })
        this.tweens.add({
            targets: gameDialouge,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            delay : 1000,
            onComplete: () => {
                console.log('complete');
                gameDialouge.setVisible(true);
            }
        })


        const continueText = this.add.text(centerX + 280, centerY + 200, 'Next ->', {
            fontFamily: 'Sigmar',
            fontSize: 30,
            color: '#ffffff',
            padding: {x: 10, y: 5},
            align: 'right',
            wordWrap: {width: centerX * 0.7}
        }).setOrigin(0.5);


        continueText.alpha = 0;
        this.tweens.add({
            targets: continueText,
            alpha: 1,
            duration: 3000,
            ease: 'Power2',
            delay: 3000,
            onComplete: () => {
                console.log('complete');
            }
        })

        // hovertext
        // continueText.setInteractive({useHandCursor: true})
        // .on('pointerover', () => {
        //     this.tweens.add({
        //         targets: continueText,
        //     continueText.setColor('#ff0000');
        // })
        // .on('pointerout', () => {
        //     continueText.setColor('#ffffff');
        // });
        const moveDistance = 30; // adjust this value to change the distance the text moves
        const originalX = continueText.x;

        continueText.setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            continueText.setColor('#ff0000');
            this.tweens.add({
            targets: continueText,
            x: originalX + moveDistance,
            duration: 500,
            ease: 'Power2'
            });
        })
        .on('pointerout', () => {
            continueText.setColor('#ffffff');
            this.tweens.add({
            targets: continueText,
            x: originalX,
            duration: 500,
            ease: 'Power2'
            });
        });


        // set up click event for continueText
        continueText.setInteractive({useHandCursor: true}).on('pointerdown', () => {
            // music.stop();
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
        this.load.image('weld', 'lib/Assets/Weld.jpg');

    }
    create() {        
        const centerX = this.game.config.width / 2;
        const centerY = this.game.config.height / 2;
        const background = this.add.image(centerX +130,centerY,'weld');
       
        background.setScale(.25);
        background.setDisplaySize(centerX + 260, centerY + 100); // set the image to fit half the game container
        
        // animation for our weld image
        this.tweens.add({
            targets: background,
            scale : 5,
            duration: 1000,
            yoyo : true,
            onComplete: () => {
                console.log('complete');
                const textToType ='As an AI engineer it is your mission to maintain AI and Machines to ensure effencieny and world sustainability';
                const roleText = this.add.text(centerX -400,centerY-200, textToType, {fontFamily: 'Sigmar', fontSize: 30, color: '#ffffff',padding : {x:10,y:5}, align : 'right' ,wordWrap : {width : centerX *.5}});
                roleText.alpha = 0;
                this.tweens.add({
                    targets: roleText,
                    alpha: 1,
                    duration: 1000,
                    ease: 'Power2',
                    delay : 1000,
                    onComplete: () => {
                        console.log('complete');
                        this.time.delayedCall(3000, () => {
                            this.scene.start('GameScene');
                        }, [], this);
                        
                    }
                })
            }
        }) 
    }
}




// Main game scene - displays "Game" text
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    preload() {
        // preload assets
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('bg-grey','lib/Assets/sprites/Night/1.png');
        this.load.image('bg-1','lib/Assets/sprites/Night/2.png');
        this.load.image('bg-2','lib/Assets/sprites/Night/3.png');
        this.load.image('bg-3','lib/Assets/sprites/Night/4.png');
        this.load.image('bg-4','lib/Assets/sprites/Night/5.png');
        

    }
    create() {
        // this.sound.stopAll();

        const centerX = this.game.config.width / 2;
        const centerY = this.game.config.height / 2;

        const bg = this.add.image(0,0,'bg-grey').setOrigin(0);
        bg.displayWidth = this.game.canvas.width;
        bg.displayHeight = this.game.canvas.height;


        const bg1 = this.add.image(0,0,'bg-1').setOrigin(0);
        bg1.displayWidth = this.game.canvas.width;
        bg1.displayHeight = this.game.canvas.height;

        this.tweens.add({
            targets: bg1,
            x : bg1.x + 200,
            duration : 2000,
        })


        const bg2 = this.add.image(0,0,'bg-2').setOrigin(0);
        bg2.displayWidth = this.game.canvas.width;
        bg2.displayHeight = this.game.canvas.height;

        this.tweens.add({
            targets: bg2,
            x : bg2.x - 300,
            // 5000
            duration : 5000,
            onComplete: () => {
                this.add.text(centerX -200, centerY -250, 'Climate Clash', { fontFamily: 'Sigmar' ,fontSize :50})
                const spacing = 150;
                const spacingX = -50;
                this.add.text(centerX + spacingX, centerY -spacing, 'Start', { fontFamily: 'Sigmar' ,fontSize :40})
                this.add.text(centerX + spacingX, centerY , 'Options', { fontFamily: 'Sigmar' ,fontSize :40})
                this.add.text(centerX + spacingX, centerY +spacing, 'Credits', { fontFamily: 'Sigmar' ,fontSize :40})

            }
        });
           
        

        const bg3 = this.add.image(0,0,'bg-3').setOrigin(0);
        bg3.displayWidth = this.game.canvas.width;
        bg3.displayHeight = this.game.canvas.height;

        this.tweens.add({
            targets: bg3,
            x : bg3.x + 30,
            duration : 5000,
        })

        const bg4 = this.add.image(0,0,'bg-4').setOrigin(0);
        bg4.displayWidth = this.game.canvas.width;
        bg4.displayHeight = this.game.canvas.height;

        this.tweens.add({
            targets: bg4,
            x : bg4.x + 200,
            duration : 5000,
        })


    }
}

// Configuration object for the Phaser game
const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#000000',
    scene: [Scene1,Scene2,Scene3,GameScene],
    
};

// Create the Phaser game instance
const game = new Phaser.Game(config);
