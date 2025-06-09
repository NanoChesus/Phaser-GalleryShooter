class level3 extends baseLevel {

    constructor(){
        super('level3')
    }

    preload() {}


    create(){
        // this.waveData = [
        //     {//wave#1
        //         delay: 1000, 
        //         enemyPoints:[{X:200, Y:-100 },
        //                 {X:400, Y:-100 },
        //                 {X:600, Y:-100 },
        //                 {X:800, Y:-100 }
        //         ],
        //         type:"Beige" 
        //     },
        //        {//wave#1
        //         delay: 1000, 
        //         enemyPoints:[{X:200, Y:-100 },
        //                 {X:400, Y:-100 },
        //                 {X:600, Y:-100 },
        //         ],
        //         type:"yellow" 
        //     },
        //     {//wave#1
        //         delay: 2000, 
        //         enemyPoints:[{X:200, Y:-100 },
        //                 {X:400, Y:-100 },
        //                 {X:600, Y:-100 },
        //                 {X:800, Y:-100 }
        //         ],
        //         type:"Beige" 
        //     },
        //     {//wave#1
        //         delay: 4000, 
        //         enemyPoints:[{X:200, Y:-100 },
        //                 {X:400, Y:-100 },
        //                 {X:600, Y:-100 },
        //                 {X:800, Y:-100 }
        //         ],
        //         type:"yellow" 
        //     },
        //     //wave#1
        //     { delay: 1300, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
        //     { delay: 4300, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
        //     { delay: 7600, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
        //     { delay: 10600, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
        //     //wave#2
        //     { delay: 15000, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
        //     { delay: 15300, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
        //     { delay: 15600, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
        //     { delay: 15900, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
        //     { delay: 16200, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },
        //     { delay: 16500, enemyPoints: [{ X: 250, Y: -100 }], type:"pink" },

        // ]

        this.waveData = [
        // === Phase 1 ===
        //blue enemys
        { delay: 1500, enemyPoints: [{X:-100, Y:625}], type:"blue"},
        { delay: 7500, enemyPoints: [{X:-100, Y:625}], type:"blue"},
        { delay: 9500, enemyPoints: [{X:-100, Y:625}], type:"blue"},
        { delay: 13500, enemyPoints: [{X:-100, Y:625}], type:"blue"},
        { delay: 17500, enemyPoints: [{X:-100, Y:625}], type:"blue"},
        { delay: 19500, enemyPoints: [{X:-100, Y:625}], type:"blue"},




        {
            delay: 1000,
            enemyPoints: [
                {X: 250, Y: -100},
                {X: 500, Y: -100},
                {X: 750, Y: -100}
            ],
            type: "Beige"
        },
        {
            delay: 3000,
            enemyPoints: [
                {X: 250, Y: -100},
                {X: 500, Y: -100},
                {X: 750, Y: -100}
            ],
            type: "yellow"
        },
        {
            delay: 4500,
            enemyPoints: [
                {X: 300, Y: -100}
            ],
            type: "pink"
        },

        // === Phase 2 ===
        {
            delay: 7000,
            enemyPoints: [
                {X: 250, Y: -100},
                {X: 500, Y: -100}
            ],
            type: "yellow"
        },
        {
            delay: 7500,
            enemyPoints: [
                {X: 200, Y: -100},
                {X: 275, Y: -100},
                {X: 350, Y: -100}
            ],
            type: "Beige"
        },
        {
            delay: 7750,
            enemyPoints: [
                {X: 500, Y: -100},
                {X: 550, Y: -100},
                {X: 600, Y: -100}
            ],
            type: "Beige"
        },
        {
            delay: 7500,
            enemyPoints: [
                {X: 800, Y: -100},
                {X: 875, Y: -100},
                {X: 950, Y: -100}
            ],
            type: "Beige"
        },
        {
            delay: 7400,
            enemyPoints: [
                {X: 400, Y: -100}
            ],
            type: "pink"
        },
        {
            delay: 7600,
            enemyPoints: [
                {X: 600, Y: -100}
            ],
            type: "pink"
        },

        // === Phase 3: Chaos ===
        {
            delay: 10000,
            enemyPoints: [
                {X: 250, Y: -100},
                {X: 350, Y: -180},
            ],
            type: "pink"
        },
        {
            delay: 10200,
            enemyPoints: [
                {X: 300, Y: -100},
                {X: 500, Y: -100},
                {X: 700, Y: -100}
            ],
            type: "yellow"
        },
        {
            delay: 11000,
            enemyPoints: [
                {X: 100, Y: -100},
                {X: 250, Y: -100},
                {X: 400, Y: -100},
                {X: 550, Y: -100},
                {X: 700, Y: -100},
                {X: 850, Y: -100}
            ],
            type: "Beige"
        },
        {
            delay: 13000,
            enemyPoints: [
                {X: 300, Y: -100}
            ],
            type: "pink"
        },
        {
            delay: 13200,
            enemyPoints: [
                {X: 400, Y: -100}
            ],
            type: "pink"
        },
        {
            delay: 13400,
            enemyPoints: [
                {X: 500, Y: -100}
            ],
            type: "pink"
        },
        {
            delay: 13600,
            enemyPoints: [
                {X: 600, Y: -100}
            ],
            type: "pink"
        },
        {
            delay: 14000,
            enemyPoints: [
                {X: 200, Y: -100},
                {X: 800, Y: -100}
            ],
            type: "yellow"
        }
    ];

        this.createCommonObjects();
        //wave spawning over check
        this.wavesOver = false;
        this.time.delayedCall(17500,()=>{
            this.wavesOver = true;
            console.log('wavesOver')
        });
        
        this.input.keyboard.on('keydown-R', ()=>{
         this.scene.start("victory");
        });

        //debbug message
        console.log('level3')
    
    }


    update(){
        this.updateCommon();
        this.updateCommon();
        if (this.wavesOver && this.enemyGroup.countActive(true) === 0) {
            this.scene.start("victory")
        }
        
    }
}