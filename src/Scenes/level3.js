class level3 extends baseLevel {

    constructor(){
        super('level3')
    }

        preload() {
            this.load.setPath("./assets/img/");  // Set default path for images

            // --- Atlases ---
            this.load.atlasXML("SpaceFighters", "sheet.png", "sheet.xml");
            this.load.atlasXML("animals", "roundOutline.png", "roundOutline.xml");
            this.load.atlasXML("aliens", "spritesheet_spaceships.png", "spritesheet_spaceships.xml");

            // --- Multiatlas ---
            this.load.multiatlas("kenny-particles", "kenny-particles.json", "./assets/img");

            // --- Images ---
            this.load.image("tiny_town_tiles", "kenny-tiny-town-tilemap-packed.png");
            this.load.image("lazerRed", "laserRed01.png");

            // --- Tilemap ---
            this.load.setPath("./assets/tiled/");
            this.load.tilemapTiledJSON("map", "grassLandTiled.json");

            // --- Audio ---
            this.load.setPath("./assets/audio/");
            this.load.audio("Engine", "spaceEngineLow_003.ogg");
            this.load.audio("lazer", "laserSmall_000.ogg");
            this.load.audio("explode", "explosionCrunch_000.ogg");
            this.load.audio("hit", "impactMetal_003.ogg");
            this.load.audio("playerHit", "explosionCrunch_000.ogg");
            this.load.audio("abduct", "forceField_000.ogg");
        }


    create(){
        this.waveData = [
            {//wave#1
                delay: 1000, 
                enemyPoints:[{X:200, Y:-100 },
                        {X:400, Y:-100 },
                        {X:600, Y:-100 },
                        {X:800, Y:-100 }
                ],
                type:"Beige" 
            },
               {//wave#1
                delay: 1000, 
                enemyPoints:[{X:200, Y:-100 },
                        {X:400, Y:-100 },
                        {X:600, Y:-100 },
                ],
                type:"yellow" 
            },
            {//wave#1
                delay: 2000, 
                enemyPoints:[{X:200, Y:-100 },
                        {X:400, Y:-100 },
                        {X:600, Y:-100 },
                        {X:800, Y:-100 }
                ],
                type:"Beige" 
            },
            {//wave#1
                delay: 4000, 
                enemyPoints:[{X:200, Y:-100 },
                        {X:400, Y:-100 },
                        {X:600, Y:-100 },
                        {X:800, Y:-100 }
                ],
                type:"yellow" 
            },
            //wave#1
            { delay: 1300, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
            { delay: 4300, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
            { delay: 7600, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
            { delay: 10600, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
            //wave#2
            { delay: 15000, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
            { delay: 15300, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
            { delay: 15600, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
            { delay: 15900, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
            { delay: 16200, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
            { delay: 16500, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },

        ]
    

        this.createCommonObjects();
        this.levelOver = false;
        this.time.delayedCall(19000,()=>{
            this.levelOver = true;
        });
        
        this.input.keyboard.on('keydown-R', ()=>{
         this.scene.start("victory");
        });
    
    }


    update(){
    this.updateCommon();
    if(this.levelOver === true ){
        this.scene.start("victory");   
    }
    
    }
}