class Ui {
    constructor() {
        this.ui = [{sx: 0, sy: 0, sw: 200, sh: 100, dx: canvas.canvas.width/1.5 - 200/2, dy: 60, dw: 200, dh: 100},
            {sx: 0, sy: 100, sw: 200, sh: 100, dx: canvas.canvas.width/3 - 200/2, dy: 60, dw: 200, dh: 100},
            {sx: 200, sy: 0, sw: 854.884, sh: 200, dx: canvas.canvas.width/2 - (854 - canvas.canvas.width/4)/2, dy: -180, dw: 854 - canvas.canvas.width/4, dh: (854 - canvas.canvas.width/4)/4.27}];
        this.menu = [{sx: 0, sy: 200.5, sw: 300.000, sh: 44.1, dx: canvas.canvas.width - 320, dy: -180, dw: 300, dh: 45, ofs: 20},
            {sx: 0, sy: 245.001, sw: 300.000, sh: 44.6, dx: canvas.canvas.width - 330, dy: -120, dw: 300, dh: 45, ofs: 30},
            {sx: 0, sy: 290.001, sw: 300.000, sh: 44.6, dx: canvas.canvas.width - 340, dy: -60, dw: 300, dh: 45, ofs: 40},
            {sx: 0, sy: 335.001, sw: 300.000, sh: 44.6, dx: canvas.canvas.width - 350, dy: 0, dw: 300, dh: 45, ofs: 50},
            {sx: 0, sy: 380.001, sw: 300.000, sh: 44.6, dx: canvas.canvas.width - 370, dy: 120, dw: 300, dh: 45, ofs: 70},
            {sx: 300, sy: 200.001, sw: 69.719, sh: 69.719, dx: 40, dy: canvas.canvas.height/2 - 100, dw: 69.719, dh: 69.719, ofs: null},
            {sx: 300, sy: 269.720, sw: 69.719, sh: 69.719, dx: 130, dy: canvas.canvas.height/2 - 100, dw: 69.719, dh: 69.719, ofs: null}];
        this.menuAnimation = {sx: 371, sy: 200.5, sw: 76.669, sh: 117.109, dx: 200, dy: 100, dw: 75, dh: 117, sp: new Vector2()};
        canvas.canvas.addEventListener('click', this.handleClick);
        canvas.canvas.addEventListener('mousemove', this.animateMenuButton);
        this.image = new Image();
        this.image.src = "assets/graphics/ui.svg";
    }
    render() {
        if (world.gameOver) {
            for (let i = 0; i < this.ui.length; i++) {
                canvas.drawImage(this.image, this.ui[i].sx, this.ui[i].sy, this.ui[i].sw, this.ui[i].sh, this.ui[i].dx, this.ui[i].dy, this.ui[i].dw, this.ui[i].dh);
                // canvas.fillRect(this.ui[i].dx, this.ui[i].dy, this.ui[i].dw, this.ui[i].dh);
            }
            canvas.fillStyle("white");
            canvas.font("30px AgencyFB");
            canvas.fillText("$ " + (world.money), canvas.canvas.width - 200 , - world.height/2 + 50);
            canvas.fillText("+$ " + Math.floor(world.worldCordinates.getY/20), canvas.canvas.width/2 - ("+$ " + Math.floor(world.worldCordinates.getY/4)).length*5 , 20);
        }
        canvas.fillStyle("white");
        canvas.font("30px Comic Sans MS");
        canvas.fillText("score: "+ Math.floor(world.worldCordinates.getY), 20, 40 - canvas.canvas.height/2);
        canvas.font("20px Comic Sans MS");
        canvas.fillText("hight score: "+ world.highScore, 20, 70 - canvas.canvas.height/2);
        canvas.fillStyle("white");
        canvas.font("30px AgencyFB");
        if (!world.gameOver) {
            canvas.fillText("$ " + (world.money + Math.floor(world.worldCordinates.getY/20)), canvas.canvas.width - 200 , - world.height/2 + 50);
        }
    }
    renderHome() {
        canvas.drawImage(this.image, this.menuAnimation.sx, this.menuAnimation.sy, this.menuAnimation.sw, this.menuAnimation.sh, this.menuAnimation.dx, this.menuAnimation.dy, this.menuAnimation.dw, this.menuAnimation.dh);
        for (let i = 0; i < this.menu.length; i++) {
            canvas.drawImage(this.image, this.menu[i].sx, this.menu[i].sy, this.menu[i].sw, this.menu[i].sh, this.menu[i].dx, this.menu[i].dy, this.menu[i].dw, this.menu[i].dh);
        }
        canvas.fillStyle("white");
        canvas.font("30px AgencyFB");
        canvas.fillText("$ " + world.money, canvas.canvas.width - 200 , - world.height/2 + 50);
        canvas.fillStyle("white");
        canvas.font("100px AgencyFB");
        canvas.fillText("Robot Escape", canvas.canvas.width/10 , - world.height/6);
    }
    handleClick(e) {
        let x = e.clientX;
        let y = e.clientY - canvas.mid.y;
        if ((ui.ui[0].dx + ui.ui[0].dw >= x && ui.ui[0].dx <= x && ui.ui[0].dy + ui.ui[0].dh >= y && ui.ui[0].dy <= y) && world.gameOver && world.currentUi == "game") {
            world.restart();
        }
        if ((ui.ui[1].dx + ui.ui[1].dw >= x && ui.ui[1].dx <= x && ui.ui[1].dy + ui.ui[1].dh >= y && ui.ui[1].dy <= y) && world.gameOver && world.currentUi == "game") {
            menuEngine.start();
            world.currentUi = "menu";
        }
        for (let i = 0; i < ui.menu.length; i++) {
            if ((ui.menu[i].dx + ui.menu[i].dw >= x && ui.menu[i].dx <= x && ui.menu[i].dy + ui.menu[i].dh >= y && ui.menu[i].dy <= y) && world.currentUi == "menu") {
                switch (i) {
                    case 0:
                        menuEngine.stop();
                        world.restart();
                        break;
                    case 4:
                        window.location = "https://softdev00.github.io/";
                    default:
                        break;
                }
            }
        }
    }
    animateMenuButton(e) {
        if (world.currentUi == "menu") {
            let x = e.clientX;
            let y = e.clientY - canvas.mid.y;
            for (let i = 0; i < ui.menu.length; i++) {
                if (ui.menu[i].ofs != null) {
                    if (ui.menu[i].dx === canvas.canvas.width - ui.menu[i].dw - ui.menu[i].ofs - 10) {
                        if (! (ui.menu[i].dx + ui.menu[i].dw >= x && ui.menu[i].dx <= x && ui.menu[i].dy + ui.menu[i].dh >= y && ui.menu[i].dy <= y)) {
                            ui.menu[i].dx = canvas.canvas.width - ui.menu[i].dw - ui.menu[i].ofs;
                        }
                    } else if ((ui.menu[i].dx + ui.menu[i].dw >= x && ui.menu[i].dx <= x && ui.menu[i].dy + ui.menu[i].dh >= y && ui.menu[i].dy <= y) && (ui.menu[i].dx == canvas.canvas.width - ui.menu[i].dw - ui.menu[i].ofs)) {
                        ui.menu[i].dx = ui.menu[i].dx - 10;
                    } else {
                        ui.menu[i].dx = canvas.canvas.width - ui.menu[i].dw - ui.menu[i].ofs;
                    }
                }
            }
        }
    }
}