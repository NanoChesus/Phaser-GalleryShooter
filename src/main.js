// Jim Whitehead
// Created: 4/14/2024
// Phaser: 3.70.0
//
// Cubey
//
// An example of putting sprites on the screen using Phaser
// 
// Art assets from Kenny Assets "Shape Characters" set:
// https://kenney.nl/assets/shape-characters

// debug with extreme prejudice
"use strict"

// game config
const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 650,
    backgroundColor: '#1A001A',
    scene: [Load, StartScreen, level1, level2, level3, GameOver, Victory],  
    physics: {
        default: 'arcade',  
        arcade: {
            gravity: { y: 0 },  
            debug: false  
        }
    },
    scale:{
        mode: Phaser.Scale.FIT,           
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent:'phaser-game'
};

const game = new Phaser.Game(config);

game.global = {
    score: 0,
    cows: [],
};

