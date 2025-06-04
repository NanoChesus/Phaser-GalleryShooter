class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
       
        this.load.setPath("./assets/");                               //path
        this.load.atlasXML("SpaceFighters", "/img/sheet.png", "/img/sheet.xml");   //atlas
        this.load.atlasXML("animals", "/img/roundOutline.png", "/img/roundOutline.xml");   // atlas
        this.load.atlasXML("aliens", "/img/spritesheet_spaceships.png", "/img/spritesheet_spaceships.xml");//spaceships atlas
        //particle
        this.load.multiatlas("kenny-particles", "kenny-particles.json");//particle multi atlas

        this.load.image("tiny_town_tiles", "/img/kenny-tiny-town-tilemap-packed.png");//tilemap img 
        this.load.image("lazerRed", "/img/laserRed01.png");// lazer red
        this.load.tilemapTiledJSON("map", "grassLandTiled.json"); //grassbackground
        this.load.audio("Engine", "/Audio/spaceEngineLow_003.ogg"); //engine audio
        this.load.audio("lazer", "/Audio/laserSmall_000.ogg");      //lasermslal audio
        this.load.audio("explode", "/Audio/explosionCrunch_000.ogg");//explosion audio
        this.load.audio("hit", "/Audio/impactMetal_003.ogg");       //metal impact audio
        this.load.audio("playerHit", "/Audio/explosionCrunch_000.ogg");//explosion crunch
        this.load.audio("abduct", "/Audio/forceField_000.ogg");        //forceField   
    }

    create() {

         // next scene
         this.scene.start("StartScreen");
    }
    update() {
    }
}