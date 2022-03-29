class Player {
    constructor() {
        this.pos = new Vector2(canvas.canvas.width/2, 0);
        this.velocity = new Vector2();
        this.width = 30.182;
        this.height = 51.434;
        this.gravity = 0.53;
        this.friction = 0.89;
        this.drag = 0.96;
        this.jumpSpeed = 30;
        this.speed = 5;
        this.image = new Image();
        this.image.src = "assets/graphics/player.svg";
    }
    update() {
        if (this.pos.getY >= canvas.canvas.height/2 + 100) {
            world.gameOver = true;
            localStorage.setItem('highScore', String(world.highScore));
            world.money += Math.floor(world.worldCordinates.getY / 20);
            localStorage.setItem('money', String(world.money));
            setTimeout(stopEngine, 1);
        }
        if (keyMap.get("a") || keyMap.get("A") || keyMap.get("ArrowLeft")) {
            this.velocity.setX(-this.speed);
        }
        if (keyMap.get("d") || keyMap.get("D") || keyMap.get("ArrowRight")) {
            this.velocity.setX(this.speed);
        }
        this.velocity.add(new Vector2(0, this.gravity));
        this.velocity.multiply(new Vector2(this.friction, this.drag));
        if (this.pos.y <= 0 && this.velocity.getY < 0) {
            world.worldCordinates.minus(this.velocity);
            this.pos.setX(this.pos.getX + this.velocity.getX);
        } else {
            this.pos.add(this.velocity);
        }
        if (this.pos.getX > canvas.canvas.width) {
            this.pos.setX(0);
        }
        if (this.pos.getX < 0) {
            this.pos.setX(canvas.canvas.width - this.width);
        }
        if (world.highScore <= Math.floor(world.worldCordinates.getY)) {
            world.highScore = Math.floor(world.worldCordinates.getY);
        }
        this.collusion();
    }
    collusion() {
        for (let i = 0; i < world.platforms.length; i++) {
            const platform = world.platforms[i];
            const y = this.pos.getY - world.worldCordinates.getY;
            if ((y + this.height > platform.y && y + this.height - 10 < platform.y && this.pos.getX + this.width >= platform.x && this.pos.getX <= platform.x + platform.w) && this.velocity.getY > 0) {
                this.velocity.setY(-this.jumpSpeed);
            }
        }
    }
    render() {
        canvas.beginPath();
        canvas.drawImage(this.image, 0, 0, 10.182, 21.434, this.pos.getX, this.pos.getY, this.width, this.height);
    }
}