class StartScreen extends Phaser.Scene{

constructor(){

    super("StartScreen");
}

preload(){


}

create(){

    // Set background color (optional)
    this.cameras.main.setBackgroundColor('#000000'); // black background

    // Add some text to tell the player to press anything
    this.add.text(500, 325, 'Press Any to Start', {
        fontSize: '32px',
        color: '#ffffff',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Listen for any input (keyboard or mouse)
    this.input.keyboard.once('keydown', () => {
        this.scene.start('level1');
    });

    this.input.once('pointerdown', () => {
        this.scene.start('level1');
    });

}


}