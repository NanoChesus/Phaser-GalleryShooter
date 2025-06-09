class Victory extends Phaser.Scene {
    constructor() {
        super('victory');
    }

    create() {
        // Set black background
        this.cameras.main.setBackgroundColor('#000000');

        // Title text
        this.add.text(500, 100, 'Victory!', {
            fontSize: '64px',
            color: '#00FF99',
            fontFamily: 'Arial Black',
            stroke: '#ffffff',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Generate cow names list
        const cowNames = game.global.cows.map(cow => cow.name).join(', ');
        this.add.text(500, 250, `You saved: ${cowNames}`, {
            fontSize: '28px',
            color: '#ffffff',
            fontFamily: 'Arial',
            wordWrap: { width: 800, useAdvancedWrap: true },
            align: 'center'
        }).setOrigin(0.5);

        // "Press Any Key" prompt
        this.add.text(500, 400, 'Press R Key to replay', {
            fontSize: '28px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Credits block (bottom right)
        this.add.text(980, 570,
            'Credits:\n' +
            'Art: Kenny Assets (kenney.nl)\n' +
            'Code & Design: Jesus Barrios\n' +
            'Music & SFX: freesound.org, Kenny\n' +
            'Engine: Phaser 3\n' +
            'Special Thanks: UCSC Game Lab',
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
        

        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('level1'); // Or whatever your main scene key is
        });
    }
}