// Testing if file is being loaded
console.log('Hello World');

// Configuring our game object
let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#000000',
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}

let game = new Phaser.Game(config);

// Preload function
function preload() {
    console.log('Preload');
}

// Create function
function create() {
    console.log('Create');
    var rect = this.add.rectangle(300, 300, 100, 100, 0xff0000);
}

// Update function runs continuously
var updateCalled = false;
function update() {
    if (!updateCalled) {
        console.log('Update');
        updateCalled = true;
    }
}

