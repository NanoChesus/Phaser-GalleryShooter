class level1 extends baseLevel {
    graphics;
    curve;
    path;

    constructor() {
        super("level1");
    }

    preload() {
        // this.load.setPath("./assets/");                               //path
        // this.load.atlasXML("SpaceFighters", "/img/sheet.png", "/img/sheet.xml");   //atlas
        // this.load.atlasXML("animals", "/img/roundOutline.png", "/img/roundOutline.xml");   // atlas
        // this.load.atlasXML("aliens", "/img/spritesheet_spaceships.png", "/img/spritesheet_spaceships.xml");//spaceships atlas
        // //particle
        // this.load.multiatlas("kenny-particles", "kenny-particles.json", "./assets/img");//particle multi atlas

        // this.load.image("tiny_town_tiles", "/img/kenny-tiny-town-tilemap-packed.png");//tilemap img 
        // this.load.image("lazerRed", "/img/laserRed01.png");// lazer red
        // this.load.tilemapTiledJSON("map", "grassLandTiled.json"); //grassbackground
        // this.load.audio("Engine", "/Audio/spaceEngineLow_003.ogg"); //engine audio
        // this.load.audio("lazer", "/Audio/laserSmall_000.ogg");      //lasermslal audio
        // this.load.audio("explode", "/Audio/explosionCrunch_000.ogg");//explosion audio
        // this.load.audio("hit", "/Audio/impactMetal_003.ogg");       //metal impact audio
        // this.load.audio("playerHit", "/Audio/explosionCrunch_000.ogg");//explosion crunch
        // this.load.audio("abduct", "/Audio/forceField_000.ogg");        //forceField   
    }

    create(){     
        // Wave data
        this.waveData = [
            { delay: 300, enemyPoints: [{ X: 250, Y: -100 }], type:"yellow" },
            { delay: 4000, enemyPoints: [{ X: 250, Y: -100 }, { X: 500, Y: -100 }], type:"yellow"},
            { delay: 8000, enemyPoints: [{ X: 250, Y: -100 }, { X: 500, Y: -100 }, { X: 750, Y: -100 }, { X: 250, Y: -100 }, { X: 500, Y: -100 }], type:"yellow" },
            { delay: 17000, enemyPoints: [{ X: 250, Y: -100 }, { X: 500, Y: -100 }, { X: 750, Y: -100 }, { X: 250, Y: -100 }, { X: 500, Y: -100 }], type:"yellow"}
        ];

    
        this.levelOver = false;
        this.time.delayedCall(17000,()=>{
            this.levelOver = true;
        });
        

        this.createCommonObjects();
        
        this.input.keyboard.on('keydown-R', ()=>{
             this.scene.start("level2");
        });
    } 
       



    update(){
       this.updateCommon();

        if(this.levelOver === true ){
            this.scene.start("level2");   
        }
      
    
    }

}
//schedualeWaves, createEnemys, createCows, startAbduction, laserHitsEnemy, setupLaserFire, playLazer, engineNoise

// to do:  make number of cows carry over levels. make shooter enemies, create high score counter (make it last over differnt bootups), add restart buttons along with death screen.
// add a buttons menu, score counter, score text popup, and log of interactions on the right side (enemy hit, biege/yellow UFO spawn, fired, enemy hit, etc).