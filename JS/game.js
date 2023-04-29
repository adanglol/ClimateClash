// Scene 1 - displays "Scene 1" text for 3 seconds, then switches to Scene 2
class Scene1 extends Phaser.Scene {
    constructor() {
        super('Scene1');
    }
    preload() {
        // preload assets
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        
    }
    create() {
       WebFont.load({
            google: {
                families: ['Sigmar']
            },
            active: () => {
                const centerX = this.game.config.width / 2;
                const centerY = this.game.config.height / 2;
                this.add.text(centerX, centerY - 100, 'Made By', { fontFamily: 'Sigmar', fontSize: 72, color: '#ffffff' }).setOrigin(0.5);
                this.add.text(centerX, centerY , 'AD', { fontFamily: 'Sigmar', fontSize: 72, color: '#ffffff' }).setOrigin(0.5);

            }
        });
        // this.time.delayedCall(10000, () => {
        //     this.scene.start('Scene2');
        // });


    }
}

// Scene 2 - displays "Scene 2" text for 3 seconds, then switches to Scene 3
class Scene2 extends Phaser.Scene {
    constructor() {
        super('Scene2');
    }
    preload() {
        // preload assets
    }
    create() {
        this.add.text(300, 250, 'Scene 2', { fill: '#ffffff' });
        this.time.delayedCall(3000, () => {
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
    }
    create() {
        this.add.text(300, 250, 'Scene 3', { fill: '#ffffff' });
        this.time.delayedCall(3000, () => {
            this.scene.start('Game');
        });
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
    scene: [Scene1, Scene2, Scene3, GameScene]
};

// Create the Phaser game instance
const game = new Phaser.Game(config);
