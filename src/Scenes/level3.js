class level3 extends baseLevel {

    constructor(){
        super('level3')
    }

    preload(){
        this.load.setPath("./assets/");
        this.load.atlasXML("SpaceFighters", "/img/sheet.png", "/img/sheet.xml");
        this.load.atlasXML("animals", "/img/roundOutline.png", "/img/roundOutline.xml");
        this.load.atlasXML("aliens", "/img/spritesheet_spaceships.png", "/img/spritesheet_spaceships.xml");
        this.load.image("tiny_town_tiles", "/img/kenny-tiny-town-tilemap-packed.png");
        this.load.tilemapTiledJSON("map", "grassLandTiled.json");
        this.load.audio("Engine", "/Audio/spaceEngineLow_003.ogg");
        this.load.audio("lazer", "/Audio/laserSmall_000.ogg");
        this.load.audio("lazerRed", "/img/laserRed01.png");
        this.load.audio("explode", "/Audio/explosionCrunch_000.ogg");
        this.load.audio("hit", "/Audio/impactMetal_003.ogg");
        this.load.audio("playerHit", "/Audio/explosionCrunch_000.ogg");
        this.load.audio("abduct", "/Audio/forceField_000.ogg");
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
    }


    update(){
    this.updateCommon();
    
    }
}