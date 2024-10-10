export default class Player {
    constructor(scene, x, y, animations) {
        this.scene = scene;

        // Load animations for run, jump, and death
        this.createAnimations(animations);

        // Add player sprite
        this.sprite = this.scene.physics.add.sprite(x, y, animations.idleKey);
        this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setScale(2);

        // Start with running animation
        this.sprite.anims.play(animations.idleKey);

        // Set player health
        this.health = 30;

        // Adjust hitbox size and offset
        this.sprite.body.setSize(this.sprite.width * 0.2, this.sprite.height);
    }

    // Create player animations
    createAnimations(animations) {
        this.scene.anims.create({
            key: animations.idlekey,
            frames: this.scene.anims.generateFrameNumbers(animations.idlekey, { start: 0, end: 12 }),
            frameRate: 5,
            repeat: 0
        });

        // Run animation
        this.scene.anims.create({
            key: animations.runKey,
            frames: this.scene.anims.generateFrameNumbers(animations.runKey, { start: 0, end: 15 }),
            frameRate: 20,
            repeat: -1
        });

        // Jump animation
        this.scene.anims.create({
            key: animations.jumpKey,
            frames: this.scene.anims.generateFrameNumbers(animations.jumpKey, { start: 0, end: 14 }),
            frameRate: 20,
            repeat: 0
        });

        // Attack animation
        this.scene.anims.create({
            key: animations.attackKey,
            frames: this.scene.anims.generateFrameNumbers(animations.attackKey, { start: 0, end: 9 }),
            frameRate: 30,
            repeat: 0
        });

        // Death animation
        this.scene.anims.create({
            key: animations.deathKey,
            frames: this.scene.anims.generateFrameNumbers(animations.deathKey, { start: 0, end: 9 }),
            frameRate: 5,
            repeat: 0
        });
    }

    idle() {
        this.sprite.anims.play('idleWitch');
    }

    run() {
        this.sprite.anims.play('run');
    }

    // Handle jumping
    jump() {
        if (this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-400);
            this.sprite.anims.play('witchJump');
            this.sprite.on('animationcomplete', () => {
                this.sprite.anims.play('run');
            });
        }
    }

    attack() {
        this.sprite.anims.play('witchAttack');
        this.sprite.on('animationcomplete', () => {
            this.sprite.anims.play('run');
        }); 
    }

    // Handle taking damage
    takeDamage(amount) {
        this.health -= amount;

        if (this.health <= 0) {
            this.gameOver();
        }
    }

    // Trigger game over
    gameOver() {
        this.sprite.anims.play('witchDeath');
        this.sprite.on('animationcomplete', () => {
            this.sprite.setVisible(false);
            this.scene.physics.pause();
        });
    }
}