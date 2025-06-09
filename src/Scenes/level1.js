class level1 extends baseLevel {
    graphics;
    curve;
    path;

    constructor() {
        super("level1");
    }

    preload(){}

    create(){     
        //debug messages

        // Wave data
        this.waveData = [
            { delay: 300, enemyPoints: [{ X: 400, Y: -100 }], type:"yellow" },
            { delay: 4000, enemyPoints: [{ X: 250, Y: -100 }, { X: 500, Y: -100 }], type:"yellow"},
            { delay: 8000, enemyPoints: [{ X: 250, Y: -100 }, { X: 500, Y: -100 }, { X: 750, Y: -100 }, { X: 250, Y: -100 }, { X: 500, Y: -100 }], type:"yellow" },
            { delay: 17000, enemyPoints: [{ X: 250, Y: -100 }, { X: 500, Y: -100 }, { X: 750, Y: -100 }, { X: 250, Y: -100 }, { X: 500, Y: -100 }], type:"yellow"},
            { delay: 4000, enemyPoints: [{X:-100, Y:625}], type:"blue"},
        ];

        this.createCommonObjects();

        //wave spawning over check
        this.wavesOver = false;
        this.time.delayedCall(17500,()=>{
            this.wavesOver = true;
            console.log('wavesOver')
        });
        

        
        
        this.input.keyboard.on('keydown-R', ()=>{
             this.scene.start("level2");
        });
        //debbug message
        console.log('level1')
    } 
       



    update(){
        //adds all update() methods common to the whole game to Level
        this.updateCommon();
        // Check if all enemies are dead
        if (this.wavesOver && this.enemyGroup.countActive(true) === 0) {
            this.scene.start("level2")
        }
    }

}
//schedualeWaves, createEnemys, createCows, startAbduction, laserHitsEnemy, setupLaserFire, playLazer, engineNoise

// to do:  make number of cows carry over levels. make shooter enemies, create high score counter (make it last over differnt bootups), add restart buttons along with death screen.
// add a buttons menu, score counter, score text popup, and log of interactions on the right side (enemy hit, biege/yellow UFO spawn, fired, enemy hit, etc).