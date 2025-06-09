class level1 extends Phaser.Scene {
    graphics;
    curve;
    path;

    constructor() {
        super("level0");
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.atlasXML("SpaceFighters", "/img/sheet.png", "/img/sheet.xml");
        this.load.atlasXML("animals", "/img/roundOutline.png", "/img/roundOutline.xml");
        this.load.atlasXML("aliens", "/img/spritesheet_spaceships.png", "/img/spritesheet_spaceships.xml");
        this.load.image("tiny_town_tiles", "/img/kenny-tiny-town-tilemap-packed.png");
        this.load.tilemapTiledJSON("map", "grassLandTiled.json");
        this.load.audio("Engine", "/Audio/spaceEngineLow_003.ogg");
        this.load.audio("lazer", "/Audio/laserSmall_000.ogg");
        this.load.audio("explode", "/Audio/explosionCrunch_000.ogg");
        this.load.audio("hit", "/Audio/impactMetal_003.ogg");
        this.load.audio("abduct", "/Audio/forceField_000.ogg");
    }

    create() {
        // Constants
        this.SPEED = 5;
        this.COW_SCALE = 0.25;
        this.PLAYER_START_X = 500;
        this.PLAYER_START_Y = 600;
        //tiles
        this.map = this.add.tilemap("map", 16, 16, 10, 10);
        this.tileset = this.map.addTilesetImage("grassLand-packed", "tiny_town_tiles");
        this.grassLayer = this.map.createLayer("ground", this.tileset, 0, 0);
        this.treeLayer = this.map.createLayer("trees-n-shrooms", this.tileset, 0, 0);
       
        this.grassLayer.setScale(1.0);
        this.treeLayer.setScale(1.0);
        

        
        // Wave data
        this.waveData = [
            { delay: 300, enemyPoints: [{ X: 250, Y: -100 }] },
            { delay: 4000, enemyPoints: [{ X: 250, Y: -100 }, { X: 500, Y: -100 }] },
            { delay: 8000, enemyPoints: [{ X: 250, Y: -100 }, { X: 500, Y: -100 }, { X: 750, Y: -100 }, { X: 250, Y: -100 }, { X: 500, Y: -100 }] },
            { delay: 17000, enemyPoints: [{ X: 250, Y: -100 }, { X: 500, Y: -100 }, { X: 750, Y: -100 }, { X: 250, Y: -100 }, { X: 500, Y: -100 }] }
        ];

        // Sounds
        

        // Player setup
        this.player = this.add.sprite(this.PLAYER_START_X, this.PLAYER_START_Y, 'SpaceFighters', "enemyBlue2.png")
                          .setAngle(180).setScale(.7);
        this.physics.add.existing(this.player);
        this.player.health = 5;

        // Input setup
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        

        // Groups
        this.lasers = this.add.group();
        this.enemyGroup = this.add.group();

        // Setup functions
        this.setupLaserFire();
        this.createCows();
        this.scheduleWaves();
        this.engineNoise();

        // Collisions
        
        this.physics.add.overlap(this.lasers, this.enemyGroup, this.laserHitsEnemy, null, this);
        
        this.levelOver = false;
        this.time.delayedCall(17000,()=>{
            this.levelOver = true;
        });

        this.engineSound = this.sound.add("Engine", { loop: true, volume: 0.3 });
    }

    update() {
        // Player movement
        if (this.keyA.isDown && this.player.x > 30) this.player.x -= this.SPEED;
        if (this.keyD.isDown && this.player.x < 990) this.player.x += this.SPEED;

        // Update enemy health bars
        this.enemyGroup.children.iterate(enemy => {
            if (enemy && enemy.healthBar) {
                enemy.healthBar.clear();
                enemy.healthBar.fillStyle(0x00ff00, 1);
                enemy.healthBar.fillRect(enemy.x, enemy.y - 20, 40 * enemy.health / 4, 6);
                enemy.healthBar.setDepth(2);
                enemy.setDepth(1);
            }
        });

        // Engine sound logic
        if (this.enemyGroup.countActive(true) > 0) {
            if (!this.engineSound.isPlaying) {
                this.engineSound.play();
                console.log("Engine started");
            }
        } else {
            if (this.engineSound.isPlaying) {
                this.engineSound.stop();
                console.log("Engine stopped");
            }
            if(this.levelOver === true ){
             this.scene.start("level2");   
            }
            if(this.input.keyboard.on('keydown-keyR', ()=>{
                this.scene.start("level2"); 
            }));
        }
    }

    // --- Helper Functions ---

    scheduleWaves() {
        this.waveData.forEach((wave) => {
            this.time.delayedCall(wave.delay, () => {
                this.createEnemys(wave.enemyPoints);
            });
        });
    }

    createEnemys(enemyPoints) {
        let availableCows = this.cows.slice();

        for (let points of enemyPoints) {
            let enemy = this.add.sprite(points.X, points.Y, "aliens", "shipYellow_manned.png").setScale(.5);
            this.physics.add.existing(enemy);
            enemy.health = 4;
            this.enemyGroup.add(enemy);
            enemy.healthBar = this.add.graphics();

            // Assign cow target
            let targetCow = Phaser.Utils.Array.GetRandom(availableCows);
            enemy.targetCow = targetCow;
            let index = availableCows.indexOf(targetCow);
            if (index !== -1) availableCows.splice(index, 1);

            // Tween to cow
            this.tweens.add({
                targets: enemy,
                y: targetCow.y - 70,
                x: targetCow.x,
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
            }
        });
    }

    laserHitsEnemy(laser, enemy) {
        enemy.health -= 1;
        this.sound.play("hit");
        console.log('enemy hit');

        enemy.setTint(0xffaaaa);
        this.time.delayedCall(100, () => {
            enemy.clearTint();
        });

        if (enemy.health <= 0) {
            this.sound.play("explode");
            enemy.healthBar.destroy();
            enemy.destroy();
            this.points += 50
        }

        laser.destroy();
    }

    setupLaserFire() {
        this.fireCooldown = 180;
        this.lastFireTime = 0;
        this.canFire = true;

        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.canFire) {
                const currentTime = this.time.now;
                if (currentTime - this.lastFireTime >= this.fireCooldown) {
                    const laser = this.add.sprite(this.player.x, this.player.y - 60, 'SpaceFighters', 'laserBlue01.png');
                    this.physics.add.existing(laser);
                    this.lasers.add(laser);
                    this.playLazer();

                    this.tweens.add({
                        targets: laser,
                        y: laser.y - 1000,
                        duration: 2000,
                        ease: 'Power2',
                        onComplete: () => laser.destroy()
                    });

                    this.lastFireTime = currentTime;
                    this.canFire = false;
                    this.time.delayedCall(this.fireCooldown, () => {
                        this.canFire = true;
                    });
                }
            }
        });
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
//schedualeWaves, createEnemys, createCows, startAbduction, laserHitsEnemy, setupLaserFire, playLazer, engineNoise

// to do:  make number of cows carry over levels. make shooter enemies, create high score counter (make it last over differnt bootups), add restart buttons along with death screen.
// add a buttons menu, score counter, score text popup, and log of interactions on the right side (enemy hit, biege/yellow UFO spawn, fired, enemy hit, etc).