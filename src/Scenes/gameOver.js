class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        // Set background color
        this.cameras.main.setBackgroundColor('#000000'); // black

        // Title text
        this.add.text(500, 100, 'GameOver', {
            fontSize: '64px',
            color: '#00FF99',
            fontFamily: 'Arial Black',
            stroke: '#ffffff',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Score
        this.add.text(500, 250, 'Score: ' + this.sys.game.global.score, {
            fontSize: '32px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Restart instructions
        this.add.text(500, 350, 'Press R to Restart', {
            fontSize: '32px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Credits (bottom right)
        this.add.text(950, 600, 
        `Credits:
        Art: Kenney.nl (Public Domain)
        Code & Design: Jesus Barrios
        Music & SFX: freesound.org
        Made with Phaser 3`, {
            fontSize: '14px',
            color: '#aaaaaa',
            fontFamily: 'Courier',
            align: 'right'
        }).setOrigin(1, 1);

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
