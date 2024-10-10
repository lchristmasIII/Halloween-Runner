import Player from '../Player.js';

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene'); // Scene key
    }

    preload() {
        this.load.spritesheet('run', 'assets/player/RunAnimation.png', { frameWidth: 85, frameHeight: 56 });
        this.load.spritesheet('witchDeath', 'assets/player/deathAnimation.png', { frameWidth: 85, frameHeight: 56 });
        this.load.spritesheet('witchJump', 'assets/player/JumpAnimation.png', { frameWidth: 85, frameHeight: 56 });
        this.load.spritesheet('idleWitch', 'assets/player/IdleAnimation.png', { frameWidth: 85, frameHeight: 56 });

        this.load.image('titlelayer1', 'assets/backgrounds/green/1.png');
        this.load.image('titlelayer2', 'assets/backgrounds/green/2.png');
        this.load.image('titlelayer3', 'assets/backgrounds/green/3.png');
        this.load.image('titlelayer4', 'assets/backgrounds/green/4.png');
        this.load.image('titlelayer5', 'assets/backgrounds/green/5.png');
        this.load.image('titlelayer6', 'assets/backgrounds/green/6.png');
        this.load.image('titlelayer7', 'assets/backgrounds/green/7.png');
        this.load.image('ground', 'assets/backgrounds/spookyGround4.png');
    }

    create() {
        this.physics.world.bounds.width = 800;
        this.physics.world.bounds.height = 400;

        // Set up background
        this.titlelayer1 = this.add.tileSprite(0, 0, 800, 400, 'titlelayer1').setOrigin(0, 0);
        this.titlelayer2 = this.add.tileSprite(0, 0, 800, 400, 'titlelayer2').setOrigin(0, 0);
        this.titlelayer3 = this.add.tileSprite(0, 0, 800, 400, 'titlelayer3').setOrigin(0, 0);
        this.titlelayer4 = this.add.tileSprite(0, 0, 800, 400, 'titlelayer4').setOrigin(0, 0);
        this.titlelayer5 = this.add.tileSprite(0, 0, 800, 400, 'titlelayer5').setOrigin(0, 0);
        this.titlelayer6 = this.add.tileSprite(0, 0, 800, 400, 'titlelayer6').setOrigin(0, 0);
        this.titlelayer7 = this.add.tileSprite(0, 0, 800, 400, 'titlelayer7').setOrigin(0, 0);
        
        this.ground = this.add.tileSprite(400, 380, 800, 40, 'ground');
        this.physics.add.existing(this.ground, true);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        this.player = new Player(this, 100, 300, {
            idleKey: 'idleWitch',
            runKey: 'run'
        });

        this.player.idle(); 

        this.physics.add.collider(this.player.sprite, this.ground);


        // Add title text
        this.add.text(400, 150, 'Halloween Runner', {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Create Start button
        const startButton = this.add.text(400, 200, 'Start Game', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setOrigin(0.5);

        // Add interaction to Start button
        startButton.setInteractive();

        // When the button is clicked, transition to the MainScene
        startButton.on('pointerdown', () => {
            this.startGame(); 
        });
    }

    startGame() {
        this.player.run(); 
        
        this.tweens.add({
            targets: this.player.sprite,
            x: 800,  // Move to the right edge of the screen
            duration: 2000,  // Adjust speed
            ease: 'Power1',
            onComplete: () => {
                // Transition to the main game scene after the run finishes
                this.scene.start('MainScene');
            }
        });
    }

    update() {
        this.titlelayer1.tilePositionX += 0.5; 
        this.titlelayer2.tilePositionX += 0.8;
        this.titlelayer3.tilePositionX += 1.0;
        this.titlelayer4.tilePositionX += 1.2;
        this.titlelayer5.tilePositionX += 1.5;
        this.titlelayer6.tilePositionX += 1.3; 
        this.titlelayer7.tilePositionX += 2.0; 
    }
}