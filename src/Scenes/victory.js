class Victory extends Phaser.Scene {
    constructor() {
        super('victory');
    }

    create() {
        this.add.text(500, 300, 'Victory!', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(500, 400, 'Press R to Replay', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(500, 200, 'Score: ' + this.sys.game.global.score, {
            fontSize: '32px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(.5, 0);
        

        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('level1'); // Or whatever your main scene key is
        });
    }
}