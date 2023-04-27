// Testing if file is being loaded
console.log('Hello World');

// Creating a empty game scene
class ClimateGame extends Phaser.Scene {
    constructor() {
        super('ClimateGame');
    }

    preload() {
        // Loading images
        this.load.path = './assets/';
        this.load.image('sectionimage', 'sectionimage.jpg');
    }

    create() {
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xff0000, 1);
        this.graphics.fillCircle(400, 300, 100);
        this.graphics.fillTriangle(400, 300, 400, 400, 500, 300);
        this.graphics.fillEllipse(400, 300, 100, 50);
        // add gradiant shapes
        // topleftcolor, toprightcolor, bottomleftcolor, bottomrightcolor, topleftopacity, toprightopacity, bottomleftopacity, bottomrightopacity 
        this.graphics.fillGradientStyle(0xff0000, 0xffff00, 0xffff00, 0xffff00, 1, 1, 0.1, 0.1);
        this.graphics.fillRect(600, 50, 150, 100); //x1,y1, width, height

        // creating a text object 
        this.textObject = this.add.text(200, 100, 'Hello World', { color: '#00ff00', fontSize: 40 });
        // adding tween animation allows text object to fade out 
        this.tweens.add({
            targets: this.textObject,
            alpha: 0,
            duration: 2000,
            ease: 'Linear',
            repeat: -1,
        });

        // creating a image object
        this.imageObject = this.add.image(100, 100, 'sectionimage');
        this.imageObject.setScale(0.5);

        // adding tweena nimation allow image object to move in create function
        this.tweens.add({
            targets: this.textObject,
            alphat: 0,
            duration: 5000,
            ease: 'Linear',
            repeat: -1,
        });
        // adding image object to move
        this.tweens.add({
            targets: this.imageObject,
            x: 700,
            duration: 5000,
            ease: 'Linear',
            repeat: -1,
            
        })
    };

    update() {
        // update loop
    }
}

// creating config of the game and a game object
config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0x00ffff,
    scene: [ClimateGame],

    // implement physics here tbd
};

game = new Phaser.Game(config);

