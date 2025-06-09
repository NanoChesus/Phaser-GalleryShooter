class level2 extends baseLevel {

    constructor(){
        super('level2')
    }

    preload(){}


create(){
        this.waveData = [
            { //wave1
                delay: 1000, 
                enemyPoints:[
                        {X:200, Y:-100 },
                        {X:275, Y:-100 },
                        {X:350, Y:-100 },
                        {X:425, Y:-100 }
                ],
                type:"Beige" 
            },
            {//wave2
                delay: 4000,
                enemyPoints:[
                            {X:250, Y:-100},
                            {X:500,Y:-100},
                            {X:750,Y:-100},
                ],
                type:"Beige"
            },
            { //wave3
                delay: 7000, 
                enemyPoints:[
                        {X:575, Y:-100 },
                        {X:650, Y:-100 },
                        {X:725, Y:-100 },
                        {X:800, Y:-100 }
                ],
                type:"Beige" 
            },
            {//wave4
                delay:11000,
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
            },  //blue enemys
            // { delay: 7500, enemyPoints: [{X:-100, Y:625}], type:"blue"},
            // { delay: 8500, enemyPoints: [{X:-100, Y:625}], type:"blue"},
            // { delay: 17500, enemyPoints: [{X:-100, Y:625}], type:"blue"},


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
            //{ delay: 17500, enemyPoints: [{X:-100, Y:625}], type:"blue"},
            {//wave6
                delay:17000,
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

        //wave spawning over check
        this.wavesOver = false;
        this.time.delayedCall(19500,()=>{
            this.wavesOver = true;
            console.log('wavesOver')
        });
    
        this.input.keyboard.on('keydown-R', ()=>{
            this.scene.start("level3");
        });

        //debbug message
        console.log('level2')
}

update(){
    this.updateCommon();
    if (this.wavesOver && this.enemyGroup.countActive(true) === 0) {
        this.scene.start("level3")
    }
}

}