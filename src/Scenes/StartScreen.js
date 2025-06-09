class StartScreen extends Phaser.Scene{

constructor(){

    super("StartScreen");
}

preload(){


}

create(){

    // Set background color
    this.cameras.main.setBackgroundColor('#000000'); // black

    // Title text at top
    this.add.text(500, 100, '!Graze Invaders!', {
        fontSize: '64px',
        color: '#00FF99',
        fontFamily: 'Arial Black',
        stroke: '#ffffff',
        strokeThickness: 4
    }).setOrigin(0.5);

    // "Press any to start" in center
    this.add.text(500, 325, 'Press Any Key to Start', {
        fontSize: '32px',
        color: '#ffffff',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Credits in bottom right
    this.add.text(980, 570, 
        'Credits:\n' +
        'Art: Kenny Assets (kenney.nl)\n' +
        'Code & Design: Jesus Barrios\n' +
        'Music & SFX: Kenny Assets\n' +
        'Engine: Phaser 3\n' +
        'Special Thanks: UCSC professor Jim Whitehead',
    {
        fontSize: '14px',
        color: '#cccccc',
        fontFamily: 'Arial',
        align: 'right'
    }).setOrigin(1); // aligns to bottom right


    //reset game.global.cows
    game.global.cows = [
        { X: 250, Y: 200, name: 'Mable' },
        { X: 500, Y: 200,  name: 'Edna'},
        { X: 750, Y: 200, name: 'Agnes' },
        { X: 350, Y: 300, name: 'Dolores' },
        { X: 650, Y: 300, name: 'Dottie' }
    ];

    // Listen for any input (keyboard or mouse)
    this.input.keyboard.once('keydown', () => {
        this.scene.start('level1');
    });

    this.input.once('pointerdown', () => {
        this.scene.start('level1');
    });

}


}