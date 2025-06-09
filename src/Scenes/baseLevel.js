class baseLevel extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

        preload() {
            this.load.setPath("./assets/img/");  // Set default path for images

            // --- Atlases ---
            this.load.atlasXML("SpaceFighters", "sheet.png", "sheet.xml");
            this.load.atlasXML("animals", "roundOutline.png", "roundOutline.xml");
            this.load.atlasXML("aliens", "spritesheet_spaceships.png", "spritesheet_spaceships.xml");

            // --- Multiatlas ---
            this.load.multiatlas("kenny-particles", "kenny-particles.json", "./img");

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

    createShuffleBag(items) {
    let bag = [...items];
    return () => {
        if (bag.length === 0) bag = [...items];
        const index = Phaser.Math.Between(0, bag.length - 1);
        return bag.splice(index, 1)[0];
    };
    }

    createCyclicPicker(array) {
        let index = 0;
        return () => {
            const value = array[index];
            index = (index + 1) % array.length;
            return value;
        };
    }

    createCommonObjects() {
        //debug calls
        
        
        
        
 


        //variables
        this.SPEED = 4.5;
        this.COW_SCALE = .25;
        this.PLAYER_START_X = 500;
        this.PLAYER_START_Y = 600;
        this.levelOver = false;

          //tiles
        this.map = this.add.tilemap("map", 16, 16, 10, 10);
        this.tileset = this.map.addTilesetImage("grassLand-packed", "tiny_town_tiles");
        this.grassLayer = this.map.createLayer("ground", this.tileset, 0, 0);
        this.treeLayer = this.map.createLayer("trees-n-shrooms", this.tileset, 0, 0); 
        //this.grassLayer.setScale(1.0);
        //this.treeLayer.setScale(1.0);



        //player
        this.player = this.add.sprite(this.PLAYER_START_X, this.PLAYER_START_Y, 'SpaceFighters', "enemyBlue2.png").setAngle(180).setScale(.6);
        this.physics.add.existing(this.player);
        this.player.health = 50;
        this.player.score = 0;
        this.player.inv = false;
        this.player.healthBar = this.add.graphics();
        this.playerAlive = true;
        //key inputs
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //score
        this.scoreText = this.add.text(950, 10, 'Score: 0', {
            fontSize: '28px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(1, 0);  // Align text top-right corner

        //Create Grid / start position
        this.gridX = 10; //1-9
        this.gridY = 12; //1-3
        this.gridSize = 50; // tile height/width


        
        //particle frame names
        this.tints = [0xccf2ff, 0x0066cc, 0x000022 ];
        this.getCyclicTint = this.createCyclicPicker(this.tints);
            //circle
            this.circleEffect = this.anims.generateFrameNames('kenny-particles', {
                prefix: 'circle_',
                start: 1,
                end: 5,
                zeroPad: 2,
                suffix: '.png'
            }).map(f => f.frame);
            //spark
                let sparkEffect = this.anims.generateFrameNames('kenny-particles', {
                prefix: 'trace_',
                start: 1,
                end: 7,
                zeroPad: 2,
                suffix: '.png'
            }).map(f => f.frame);
            //half circle
                let abductEffect = this.anims.generateFrameNames('kenny-particles', {
                prefix: 'slash_',
                start: 1,
                end: 4,
                zeroPad: 2,
                suffix: '.png'
            }).map(f => f.frame);

        
        //emitters
        //death effect
        // this.deathEffect = this.add.particles(0, 0, 'kenny-particles',{
        //     frame: circleEffect,        // animated frame sequence
        //     angle: { min: 0, max: 360 },// emit in all directions
        //     speed: 200,                 // constant speed
        //     lifespan: 500,              // how long particles live
        //     quantity: 10,               // number of particles per burst
        //     scale: { start: 1, end: 0 },// shrink effect
        //     alpha: { start: 1, end: 0 },// fade out
        //     on: false                   // emitter is off until triggered
        // });

        //bullet effect
        this.bulletEffect = this.add.particles(0, 0, 'kenny-particles', {
            frame: this.circleEffect,
            lifespan: 300,
            speedY: { min: 20, max: 60 },
            x:0,
            y:0,
            angle: { min: 180, max: 360 },
            gravityY: 0,
            scale: { start: .2, end: 0.05 },
            alpha: { start: 0.8, end: 0 },
            tint: 0x66CCFF, // light blue color
            quantity: 1,
            frequency: 60,
            blendMode: 'ADD'
        });
        this.bulletEffect.stop(); 
        //phase effect
        this.phaseEffect = this.add.particles(0, 0, 'SpaceFighters', {
            frame: "enemyBlue2.png",
            lifespan: 300,
            speedx: {},
            x:0,
            y:0,
            rotate: 180,
            gravityY: 0,
            scale: { start: .85, end: 0.60 },
            alpha: { start: 1, end: 0 },
            tint: {
                onEmit: ()=> this.getCyclicTint()
            }, // light blue color
            quantity: 1,
            frequency: 30,
            blendMode: 'ADD'	
        });
        this.phaseEffect.stop();
        //this.phaseEffect.stop();
        //abduct effect
        // this.abductEffect = this.add.particles(0, 0, 'kenny-particles', {
        //     frame: "slash_01.png",
        //     lifespan: 3000,
        //     speedY: 20,
        //     x:0,
        //     y:0,
        //     angle: { min: 180, max: 360 },
        //     gravityY: 0,
        //     scaleX: {start:.03, end:.06 },
        //     scaleY: .1,
        //     scale: {start: .1, end: .3},
        //     alpha: { start: 0.8, end: 0 },
        //     tint: 0x66CCFF, // light blue color
        //     quantity: 2,
        //     frequency: 300,
        //     blendMode: 'ADD'
        // });
        //waveEffect
        
      
        //groups
        this.lasers = this.add.group();
        this.enemyGroup = this.add.group();
        this.enemyLasers = this.add.group();


        // Setup functions
        this.setupLaserFire();
        this.createCows();
        this.createCyclicPicker();
        this.scheduleWaves();
        this.engineNoise();
        this.moveToGrid();

        //collisions-------------
        //player laser hits enemy
        this.physics.add.overlap(
            this.lasers,
            this.enemyGroup,
            this.laserHitsEnemy,
            null,
            this
        );
        //enemy collides with player
        this.physics.add.overlap(
            this.enemyGroup,
            this.player,
            this.laserHitsPlayer,
            null,
            this
        );
        //lasers hit player
        this.physics.add.overlap(
            this.enemyLasers,
            this.player,
            this.laserHitsPlayer,
            null,
            this
        );

        // engineSound   
        this.engineSound = this.sound.add("Engine", { loop: true, volume: 0.3 });
    }
    
    updateCommon() {
        //debug messages
        // console.log('x: '+this.player.x);
        // console.log('y: ' +this.player.y);

        // Player movement
        if(this.playerAlive === true){
            if (Phaser.Input.Keyboard.JustDown(this.keyD)) {
                if(this.player.x <= 900){
                    this.gridX += 1;
                    this.moveToGrid();
                    this.phaseEffect.startFollow(this.player, 0, 0);
                    this.phaseEffect.start();   
                }

            }
            if (Phaser.Input.Keyboard.JustDown(this.keyA)) {
                if(this.player.x >= 100){
                    this.gridX -= 1;
                    this.moveToGrid();
                    this.phaseEffect.startFollow(this.player, 0, 0);
                    this.phaseEffect.start();                
                }

            }
            if (Phaser.Input.Keyboard.JustDown(this.keyW)) {
                if(this.player.y >= 450){
                    this.gridY -= 1;
                    this.moveToGrid();
                    this.phaseEffect.startFollow(this.player, 0, 0);
                    this.phaseEffect.start();
                }

            }
            if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
                if(this.player.y <= 550){
                    this.gridY += 1;
                    this.moveToGrid();
                    this.phaseEffect.startFollow(this.player, 0, 0);
                    this.phaseEffect.start();
                }

            }            
        }

        
        //enemy health bars
        this.enemyGroup.children.iterate(enemy => {
            if (enemy && enemy.healthBar) {
                enemy.healthBar.clear();
                enemy.healthBar.fillStyle(0x00ff00, 1);
                enemy.healthBar.fillRect(enemy.x, enemy.y - 20, 40 * enemy.health / 4, 6);
                enemy.healthBar.setDepth(2);
                enemy.setDepth(1);
            }
            if (!enemy?.active) return;

        });
        //player health bar
        if(this.player && this.player.healthBar){
            this.player.healthBar.clear();
            this.player.healthBar.fillStyle(0x00ff00, 1);
            this.player.healthBar.fillRect(this.player.x, this.player.y - 20, 40 * this.player.health / 5, 6);
            this.player.healthBar.setDepth(2);
            this.player.setDepth(1);
        }

        //game over sequences
        //enemy death => game over
        if(this.player.health <= 0){
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(1500, () => {
                this.scene.start("GameOver");
            });
        }
        //all cows gone => game over
        if(game.global.cows.length === 0){
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(1500, () => {
                this.scene.start("GameOver");
            });
        }
        //level end


        // Engine sound
        if (this.enemyGroup.countActive(true) > 0 && !this.engineSound.isPlaying) {
            this.engineSound.play();
        } else if (this.enemyGroup.countActive(true) === 0 && this.engineSound.isPlaying) {
            this.engineSound.stop();
        }
        if(this.playerAlive === false){
            this.engineSound.stop();
        }

    }

    moveToGrid() {
        this.tweens.add({
            targets: this.player,
            x: this.gridX * this.gridSize,
            y: this.gridY * this.gridSize,
            duration: 300, // how fast to move
            ease: 'Power2',
            onComplete:()=>{
                this.phaseEffect.stop();
            }
        });
    }

    checkEnemyCount() {
        let length = this.enemyGroup.length;
        if (length === 0) {
            return true;
        } else {
            return false;
        }
    }

    scheduleWaves() {
        this.waveData.forEach((wave) => {
            this.time.delayedCall(wave.delay, () => {
                if(wave.type === 'Beige'){
                    this.createEnemysBeige(wave.enemyPoints);
                }else if(wave.type === "yellow"){
                    this.createEnemysYellow(wave.enemyPoints);
                } else if(wave.type === "pink"){
                    this.createEnemysPink(wave.enemyPoints)
                } else if(wave.type === "blue"){
                    this.createEnemysBlue(wave.enemyPoints)
                }
            });
        });
    }
    
    createCows() {
        this.cows = [];

        for (let cowp of game.global.cows) {
            // Create cow sprite
            const cow = this.add.sprite(cowp.X, cowp.Y, 'animals', 'cow.png').setScale(this.COW_SCALE);
            this.physics.add.existing(cow);
            cow.name = cowp.name;
            this.cows.push(cow);

            // Create cow name text under the sprite
            cow.nameText = this.add.text(
                cowp.X, 
                cowp.Y + cow.displayHeight / 2 + 10, // position text slightly below the cow
                cowp.name, 
                {
                    fontFamily: 'Arial',
                    fontSize: '16px',
                    color: '#ffffff',
                    align: 'center'
                }
            ).setOrigin(0.5, 0); // center-align the text horizontally
        }
    }

    startAbduction(enemy) {// this is where I need to use the name of 'cow' to choose which one to destory/ How: 
            if (!enemy.active) return;

            this.sound.play("abduct");
            let cow = enemy.targetCow;  //
            enemy.abductEmitter.stop();
            enemy.abductEmitter.destroy();
            //reset global cow array without the targetCow
            game.global.cows = game.global.cows.filter(c => c.name !== cow.name);

            this.tweens.add({
                targets: [enemy, cow],
                y: -100,
                duration: 1500,
                ease: 'Power2',
                onComplete: () => { // solution:
                    enemy.destroy();
                    cow.nameText.destroy()
                    cow.destroy();

                }
            });
    }
    
    laserHitsEnemy(laser, enemy) {
            //lose health
            enemy.health -= 1;
            this.sound.play("hit");
            console.log('enemy hit');
            //hit tint
            enemy.setTint(0xffaaaa);
            this.time.delayedCall(100, () => {
                enemy.clearTint();
            });
            //explode effect
            this.bulletEffect.explode(6, enemy.x, enemy.y);

            if (enemy.health <= 0) {
                this.sound.play("explode");
                this.killEnemy(enemy);
                this.sys.game.global.score += enemy.scoreCount;
                this.scoreText.setText('Score: ' + this.sys.game.global.score);
                if(enemy.abductEmitter != null){
                    enemy.abductEmitter.destroy();  //emitter destory
                }                
            }

            laser.destroy();
    }

    laserHitsPlayer(enemyObject, player){


        if(!player.inv){
           
            player.health -= 1;
            this.sound.play("playerHit"); //still need "hitPlayer" audio file
            console.log(`you've been hit`);
           
            //player tint
            player.setTint(0xffaaaa);
            this.time.delayedCall(100, ()=>{
                player.clearTint();
            });  
            enemyObject.destroy();
        }
        //inv Flicker
        let flickerCount = 0;
        let maxFlicks = 10;
        let flickerInt = 50;
        let flickerEvent = this.time.addEvent({
            delay:flickerInt,
            repeat:maxFlicks -1,
            callback: ()=>{
                if(flickerCount % 2 === 0){
                    player.setTint(0xffaaaa);
                }else{
                    player.clearTint();
                }
                flickerCount++
            }
        });
        //player invulnerbility
        player.inv = true;
        this.time.delayedCall(1000, ()=>{

            player.inv = false;


        })
        
        //kill player -- still need a playerDead() sequence to go down
        if(player.health <= 0){
            this.sound.play("explode");
            player.destroy();
            this.playerAlive = false;
            this.phaseEffect.stop();
        }
        this.enemyGroup.remove(enemyObject, true, true);
        this.killEnemy(enemyObject);


    }

    setupLaserFire() {
        this.fireCooldown = 150;
        this.lastFireTime = 0;
        this.canFire = true;

        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.canFire && this.time.now - this.lastFireTime >= this.fireCooldown) {
                const laser = this.add.sprite(this.player.x, this.player.y - 60, 'SpaceFighters', 'laserBlue01.png');
                this.physics.add.existing(laser);
                this.lasers.add(laser);
                this.sound.play("lazer");

        

                this.tweens.add({
                    targets: laser,
                    y: laser.y - 1000,
                    duration: 2000,
                    ease: 'Power2',
                    onComplete: () => laser.destroy()
                });

                this.lastFireTime = this.time.now;
                this.canFire = false;
                this.time.delayedCall(this.fireCooldown, () => this.canFire = true);
            }
        });
    }

    shooterFire(shooter) {
        const enemyLaser = this.add.sprite(shooter.x, shooter.y, 'SpaceFighters', 'laserRed04.png')
        this.physics.add.existing(enemyLaser);
        this.enemyLasers.add(enemyLaser);
        //this.sound.play('enemyLazer');

        this.tweens.add({
            targets: enemyLaser,
            y:1000,
            duration: 3000,
            ease: 'power2',
            onComplete: ()=> enemyLaser.destroy()
        });
    }

    createEnemysBeige(enemyPoints) {
       // if(enemyPoints.type === 'Beige'){
            for (let point of enemyPoints) {
                const enemy = this.add.sprite(point.X, point.Y, 'aliens', 'shipBeige_manned.png').setScale(.7);
                this.physics.add.existing(enemy);
                enemy.health = 2;
                enemy.scoreCount = 25
                enemy.healthBar = this.add.graphics();
                console.log('spawned Beige');
        
                this.enemyGroup.add(enemy);

                //particle emmiters             
        
                this.tweens.add({
                    targets: enemy,
                    y: 800,
                    duration: 3000,
                    ease: 'Linear',
                    onComplete: () => {
                        enemy.destroy();
                        enemy.healthBar.destroy();
                    }
                });
            }
        //}
    }

    createEnemysYellow(enemyPoints) {
        let availableCows = this.cows.slice();
       // if(enemyPoints.type === "yellow"){
            for (let points of enemyPoints) {
                let enemy = this.add.sprite(points.X, points.Y, "aliens", "shipYellow_manned.png").setScale(.5);
                this.physics.add.existing(enemy);
                enemy.health = 3;
                enemy.scoreCount = 200;
                this.enemyGroup.add(enemy);
                enemy.healthBar = this.add.graphics();

                // Assign cow target
                let targetCow = Phaser.Utils.Array.GetRandom(availableCows);//between spawn and tween target cow is picked and added to enemy
                enemy.targetCow = targetCow;
                let index = availableCows.indexOf(targetCow);//im getting the index of the randomly picked availablecow and removing it, but while this cow is in the process of being abducted another UFO can pick the same target ie: index 2 and once that cow's first abductor takes himm that other UFO is still trying to abduct a cow in index 2 (now a different cow is shifted to postion 2 and we )
                if (index !== -1) availableCows.splice(index, 1);

                //assign particle emitters
                //abduct effect
                enemy.abductEmitter = this.add.particles(0,0, 'kenny-particles', {
                    frame: "slash_01.png",
                    lifespan: 3000,
                    speedY: 20,
                    x:0,
                    y:0,
                    angle: { min: 180, max: 360 },
                    gravityY: 0,
                    scaleX: {start:.03, end:.06 },
                    scaleY: .1,
                    scale: {start: .1, end: .3},
                    alpha: { start: 0.8, end: 0 },
                    tint: 0x66CCFF, // light blue color
                    quantity: 2,
                    frequency: 300,
                    blendMode: 'ADD'
                });
                enemy.abductEmitter.stop();

                // Tween to cow
                if(enemy.targetCow != null){
                    this.tweens.add({
                        targets: enemy,
                        y: enemy.targetCow.y - 70,
                        x: enemy.targetCow.x,
                        duration: 2000,
                        ease: 'Power2',
                        onComplete: () => {
                                enemy.abductEmitter.startFollow(enemy);
                                if (enemy && enemy.abductEmitter && enemy.abductEmitter.active) {
                                    enemy.abductEmitter.start();
                                }

                                //if(enemy.abductEmitter !== null)enemy.abductEmitter.start();
                                this.time.delayedCall(6000, () => {
                                this.startAbduction(enemy);

                                });

                        }
                    });
                }
                
            }
       // }
    }
    
    createEnemysPink(enemyPoints) {
        for (let point of enemyPoints) {

            const shooter = this.add.sprite(point.X, point.Y, 'aliens', 'shipPink_manned.png').setScale(.4);
            this.physics.add.existing(shooter);
            shooter.health = 2;
            shooter.scoreCount = 150;
            shooter.alive = true;
            shooter.healthBar = this.add.graphics();
            this.enemyGroup.add(shooter);
    
        // Timeline
            const timeline = this.add.timeline([ 
                    
                //shooting loop    
                {   //tween and shooting loop
                    tween:{
                        targets: shooter,
                        x:20,
                        y:200,
                        duration: 2000,
                        ease: 'Sine.easeInOut',
                        onComplete: ()=>{
                            shooter.timer = this.time.addEvent({
                                delay: 800,
                                callback: () => {
                                    if (shooter.alive) {
                                        this.shooterFire(shooter);
                                    }
                                    },
                                loop: true
                            });
                            
                        }//onComplete end
                    }//tween end
                },                
            ]);
            timeline.play();

            this.time.delayedCall(2000, ()=>{
                this.tweens.add({
                    targets: shooter,
                    x: { from: 20, to: 980 },
                    duration: 3000,
                    ease: 'Linear',
                    yoyo: true,         // go back to original position
                    repeat: -1,         // loop forever
                });
            });
                

        }
    
    }
    
    createEnemysBlue(enemyPoints) {
        for (let point of enemyPoints) {
            //create zoner enemy
            const zoner = this.add.sprite(point.X, point.Y, 'aliens', 'shipBlue_manned.png').setScale(.4);
            const zonerBeam = this.add.sprite(point.X, point.Y-76, 'beams', 'laserBlue1.png').setScale(1.1);
            this.physics.add.existing(zonerBeam);
            this.physics.add.existing(zoner);
            zoner.health = 2;
            zoner.scoreCount = 150;
            zoner.alive = true;
            zoner.healthBar = this.add.graphics();
            this.enemyGroup.add(zoner);
            this.enemyGroup.add(zonerBeam);
        

            //tweens
            this.tweens.add({
                targets: [zoner,zonerBeam],
                x: { from: -50, to: 1100 },
                duration: 3000,
                ease: 'Linear',
                yoyo: true,         // go back to original position
                repeat: 0,         // loop forever
                onComplete: ()=>{
                    this.killEnemy(zoner);
                    this.killEnemy(zonerBeam);
             

                }
            });
        }
    }

    killEnemy(enemy) {
        enemy.alive = false;
        if (enemy.shootTimer) {
            enemy.shootTimer.remove();
        }
        if(enemy.healthBar !== undefined){
            enemy.healthBar.destroy();
            enemy.destroy();           
        }
        this.enemyGroup.remove(enemy, true, true);

    }
    
    

    playLazer() {
        this.sound.play("lazer");
        console.log("lazer-Played");
    }

    

    engineNoise() {
        if (this.enemyGroup >= 1) {
            this.sound.play("Engine");
            console.log("engine-sound");
        }
    }




}
//schedualeWaves, /createEnemys, /createCows, /startAbduction, /laserHitsEnemy, /setupLaserFire, /playLazer, engineNoise
