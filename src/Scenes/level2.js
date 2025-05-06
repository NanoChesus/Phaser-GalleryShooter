class level2 extends baseLevel {

    constructor(){
        super('level2')
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
        { //wave1
            delay: 1000, 
            enemyPoints:[
                    {X:200, Y:-100 },
                    {X:400, Y:-100 },
                    {X:600, Y:-100 },
                    {X:800, Y:-100 }
            ],
            type:"Beige" 
        },
        {//wave2
            delay: 3000,
            enemyPoints:[
                        {X:250, Y:-100},
                        {X:500,Y:-100},
                        {X:750,Y:-100},
            ],
            type:"Beige"
        },
        {//wave3
            delay:6000,
            enemyPoints:[
                    {X:50,Y:-100},
                    {X:200, Y:-100 },
                    {X:350, Y:-100 },
                    {X:500, Y:-100 },
                    {X:650, Y:-100 },
                    {X:800, Y:-100},
                    {X:950,Y:-100},
            ],
            type:"Beige"
        },
        { //wave1
            delay: 1000, 
            enemyPoints:[
                    {X:300, Y:-100 },
                    {X:900, Y:-100 }
            ],
            type:"yellow" 
        },
        {//wave2
            delay: 2000,
            enemyPoints:[
                        {X:300, Y:-100},
                        {X:600,Y:-100},
                        {X:900,Y:-100},
            ],
            type:"yellow"
        },
        {//wave3
            delay:10000,
            enemyPoints:[
                        {X:300,Y:-100},
                        {X:600,Y:-100},
                        {X:900,Y:-100},
                        {X:300,Y:-100},
                        {X:300,Y:-100}
            ],
            type:"yellow"
        },
        { //wave4
            delay: 10000, 
            enemyPoints:[
                    {X:200, Y:-100 },
                    {X:400, Y:-100 },
                    {X:600, Y:-100 },
                    {X:800, Y:-100 }
            ],
            type:"Beige" 
        },
        {//wave5
            delay: 13000,
            enemyPoints:[
                        {X:250, Y:-100},
                        {X:500,Y:-100},
                        {X:750,Y:-100},
            ],
            type:"Beige"
        },
        {//wave6
            delay:16000,
            enemyPoints:[
                    {X:200, Y:-100 },
                    {X:350, Y:-100 },
                    {X:500, Y:-100 },
                    {X:650, Y:-100 },
                    {X:800, Y:-100},
                    {X:950,Y:-100}
            ],
            type:"Beige"
        },
        { //wave4
            delay: 10000, 
            enemyPoints:[
                    {X:300, Y:-100 },
                    {X:900, Y:-100 }
            ],
            type:"yellow" 
        },
        {//wave5
            delay: 16000,
            enemyPoints:[
                        {X:300, Y:-100},
                        {X:600,Y:-100},
                        {X:900,Y:-100},
            ],
            type:"yellow"
        },
        {//wave6
            delay:19000,
            enemyPoints:[
                        {X:300,Y:-100},
                        {X:600,Y:-100},
                        {X:900,Y:-100},
                        {X:300,Y:-100},
                        {X:300,Y:-100}
            ],
            type:"yellow"
        },
    ]

    this.createCommonObjects();
    this.levelOver = false;
    this.time.delayedCall(17000,()=>{
        this.levelOver = true;
    });
}

update(){
    this.updateCommon();
    if(this.levelOver === true ){
        this.scene.start("level3");   
    }
    if(this.input.keyboard.on('keydown-R', ()=>{
         this.scene.start("level3");
    }));
}

}