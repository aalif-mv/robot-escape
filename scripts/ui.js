class Ui {
    constructor() {
        this.image = new Image();
        this.image.src = "assets/ui.svg";
        this.ui = [{sx: 0, sy: 0, sw: 200, sh: 100, dx: canvas.canvas.width/2 - 200/2, dy: 60, dw: 200, dh: 100},
            {sx: 200, sy: 0, sw: 854.884, sh: 200, dx: canvas.canvas.width/2 - (854 - canvas.canvas.width/4)/2, dy: -180, dw: 854 - canvas.canvas.width/4, dh: (854 - canvas.canvas.width/4)/4.27}];
        canvas.canvas.addEventListener('click', this.handleClick);
    }
    render() {
        if (world.gameOver) {
            for (let i = 0; i < this.ui.length; i++) {
                canvas.drawImage(this.image, this.ui[i].sx, this.ui[i].sy, this.ui[i].sw, this.ui[i].sh, this.ui[i].dx, this.ui[i].dy, this.ui[i].dw, this.ui[i].dh);
                // canvas.fillRect(this.ui[i].dx, this.ui[i].dy, this.ui[i].dw, this.ui[i].dh);
            }
        }
        canvas.fillStyle("white");
        canvas.font("30px Comic Sans MS");
        canvas.fillText("score: "+ Math.floor(world.worldCordinates.getY), 20, 40 - canvas.canvas.height/2);
        canvas.font("20px Comic Sans MS");
        canvas.fillText("hight score: "+ world.highScore, 20, 70 - canvas.canvas.height/2);

    }
    handleClick(e) {
        let x = e.clientX;
        let y = e.clientY - canvas.mid.y;
        if ((ui.ui[0].dx + ui.ui[0].dw >= x && ui.ui[0].dx <= x && ui.ui[0].dy + ui.ui[0].dh >= y && ui.ui[0].dy <= y) && world.gameOver) {
            world.restart();
        }
    }
}