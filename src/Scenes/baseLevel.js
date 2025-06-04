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


    createCommonObjects() {
        //debug calls
        //console.log(this.textures.exists("kenny-particles")); // should be true
        //this.add.image(400, 300, "kenny-particles", "circle_01.png"); // test draw circle_01.png
        // this.load.once("complete", () => {
        //console.log(this.textures.get("kenny-particles").getFrameNames());
        // });

        //variables
        this.SPEED = 4;
        this.COW_SCALE = .25;
        this.PLAYER_START_X = 500;
        this.PLAYER_START_Y = 600;

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
        this.player.health = 5;
        this.player.score = 0;
        this.player.inv = false;
        this.player.healthBar = this.add.graphics();
        //key inputs
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //score
        this.scoreText = this.add.text(950, 10, 'Score: 0', {
            fontSize: '28px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(1, 0);  // Align text top-right corner
        //particles
        
        //names
            //circle
            let circleEffect = this.anims.generateFrameNames('kenny-particles', {
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

        
        //emitters
        this.bulletEffect = this.add.particles(0, 0, 'kenny-particles', {
            frame: circleEffect,
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

        this.sparkEffect = this.add.particles(0, 0, 'kenny-particles', {
            frame: sparkEffect,
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
        this.sparkEffect.flow(20,2,20)

        
      
        //groups
        this.lasers = this.add.group();
        this.enemyGroup = this.add.group();
        this.enemyLasers = this.add.group();

        // Setup functions
        this.setupLaserFire();
        this.createCows();
        this.scheduleWaves();
        this.engineNoise();
        //this.createEnemysPink(this.waveData.pink);
        
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
        // Player movement
        if (this.keyA.isDown && this.player.x > 30){
            this.player.x -= this.SPEED;
            this.sparkEffect.startFollow(this.player, 0, this.player.height/2);
            this.sparkEffect.start();
        } 
        if (this.keyD.isDown && this.player.x < 990){
            this.player.x += this.SPEED;
            this.sparkEffect.startFollow(this.player, 0, this.player.height/2);
            this.sparkEffect.start();
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
        if(this.player.health <= 0){
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(500, () => {
                this.scene.start("GameOver");
            });
        }

        // Engine sound
        if (this.enemyGroup.countActive(true) > 0 && !this.engineSound.isPlaying) {
            this.engineSound.play();
        } else if (this.enemyGroup.countActive(true) === 0 && this.engineSound.isPlaying) {
            this.engineSound.stop();
        } //next level code
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
                }
            });
        });
    }
    
    createCows() {
        this.cowPoints = [
            { X: 250, Y: 200 },
            { X: 500, Y: 200 },
            { X: 750, Y: 200 },
            { X: 333, Y: 320 },
            { X: 666, Y: 320 }
        ];

        this.cows = [];



        for (let cowp of this.cowPoints) {
            const cow = this.add.sprite(cowp.X, cowp.Y, 'animals', 'cow.png').setScale(this.COW_SCALE);
            this.physics.add.existing(cow);
            this.cows.push(cow);
        }
    }

    // createCows() {
    // this.cowGroup = this.add.group();  // Group to manage cow sprites

    //     // If this is the first level and cows haven't been created yet:
    //     if (game.global.cows.length === 0) {
    //         // Spawn cows fresh, for the first time
    //         for (let i = 0; i < 3; i++) {
    //             const x = 150 + i * 150;
    //             const y = 500;
    //             const cow = this.physics.add.sprite(x, y, 'cow');
    //             cow.alive = true;
    //             this.cowGroup.add(cow);

    //             // Save this cow’s data to the global array
    //             game.global.cows.push({ x, y, alive: true });
    //         }
    //     } else {
    //         // Rebuild surviving cows from saved global data
    //         game.global.cows.forEach((cowData, index) => {
    //             if (cowData.alive) {
    //                 const cow = this.physics.add.sprite(cowData.x, cowData.y, 'cow');
    //                 cow.alive = true;
    //                 cow.cowIndex = index;  // Track which entry it corresponds to
    //                 this.cowGroup.add(cow);
    //             }
    //         });
    //     }
    // }


    startAbduction(enemy) {
            if (!enemy.active) return;

            this.sound.play("abduct");
            let cowUnderneath = enemy.targetCow;

            this.tweens.add({
                targets: [enemy, cowUnderneath],
                y: -100,
                duration: 2000,
                ease: 'Power2',
                onComplete: () => {
                    enemy.destroy();
                    cowUnderneath.destroy();
                    const index = this.cows.indexOf(cowUnderneath);
                    if (index !== -1) {
                        this.cows.splice(index, 1);
                    }
                    //save current cows left in global variable array
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
            this.bulletEffect.explode(20, enemy.x, enemy.y);

            if (enemy.health <= 0) {
                this.sound.play("explode");
                this.killEnemy(enemy);
                this.sys.game.global.score += enemy.scoreCount;
                this.scoreText.setText('Score: ' + this.sys.game.global.score);
                
                
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
        }
        this.enemyGroup.remove(enemyObject, true, true);


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
        
                this.tweens.add({
                    targets: enemy,
                    y: 800,
                    duration: 8000,
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
                enemy.health = 4;
                enemy.scoreCount = 100;
                this.enemyGroup.add(enemy);
                enemy.healthBar = this.add.graphics();

                // Assign cow target
                let targetCow = Phaser.Utils.Array.GetRandom(availableCows);
                enemy.targetCow = targetCow;
                let index = availableCows.indexOf(targetCow);
                if (index !== -1) availableCows.splice(index, 1);

                // Tween to cow
                if(enemy.targetCow != null){
                    this.tweens.add({
                        targets: enemy,
                        y: enemy.targetCow.y - 70,
                        x: enemy.targetCow.x,
                        duration: 2000,
                        ease: 'Power2',
                        onComplete: () => {
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
    

    killEnemy(enemy) {
        enemy.alive = false;
        if (enemy.shootTimer) {
            enemy.shootTimer.remove();
        }
        enemy.healthBar.destroy();
        enemy.destroy();
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
