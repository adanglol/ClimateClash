// Testing if file is being loaded
console.log('Hello World');

// Configuring our game object
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}

var game = new Phaser.Game(config);

// Preload function
function preload() {
    console.log('Preload');
}

// Create function
function create() {
    console.log('Create');
}

// Update function runs continuously
var updateCalled = false;
function update() {
    if (!updateCalled) {
        console.log('Update');
        updateCalled = true;
    }
}
