class World {
    constructor() {
        this.worldCordinates = new Vector2();
        this.height = canvas.canvas.height;
        this.width = canvas.canvas.width;
        this.platforms = [];
        this.gameOver = false;
        this.highScore = 0;
        this.image = new Image();
        this.image.src = "assets/platform.svg";
    }
    load() {
        if (localStorage.getItem("highScore") != null) {
            this.highScore = parseInt(localStorage.getItem("highScore"));
        }
        this.generate(15)
        this.platforms.push({x: this.width/2 - 69.999/3, y: this.height/3, w: 69.999, h: 30})
    }
    render() {
        this.del()
        canvas.beginPath();
        for (let i = 0; i < this.platforms.length; i++) {
            canvas.drawImage(this.image , 0, 0, 99.999, 50,this.platforms[i].x, this.platforms[i].y + this.worldCordinates.getY, this.platforms[i].w, this.platforms[i].h);
        }
    }
    generate(no) {
        for (let i = 0; i < no; i++) {
            this.platforms.push({x: random(0, this.width-player.width), y: random(this.height/2 - this.worldCordinates.getY, (-this.height/2 - this.worldCordinates.getY)), w: 69.999, h: 30})
        }
    }
    loadPlatforms() {
        this.platforms.push({x: random(0, this.width-player.width), y: -this.height/2 - this.worldCordinates.getY, w: 69.999, h: 30})
    }
    del() {
        for (let i = 0; i < this.platforms.length; i++) {
            if ((this.worldCordinates.getY + this.platforms[i].y - this.height/2) >= 0) {
                this.platforms.splice(i,1);
                if (random(0,50) != 1) {
                    this.loadPlatforms();
                }
            }
        }
    }
    restart() {
        canvas.clear();
        this.platforms = [];
        this.platforms.push({x: (this.width/2)- 69.999/3, y: (this.height/3), w: 69.999, h: 30});
        this.worldCordinates.reset();
        this.generate(15);
        player.pos.reset();
        player.pos.setX(canvas.canvas.width/2);
        player.velocity.reset();
        this.gameOver = false;
        engine.start();
    }
}