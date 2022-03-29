class Ui {
    constructor() {
        this.ui = [{sx: 0, sy: 0, sw: 199, sh: 100, dx: canvas.canvas.width/1.5 - 200/2, dy: 60, dw: 200, dh: 100}, // restart btn
            {sx: 0, sy: 100, sw: 198, sh: 99, dx: canvas.canvas.width/3 - 200/2, dy: 60, dw: 200, dh: 100}, //menu btn
            {sx: 200, sy: 0, sw: 854.884, sh: 199, dx: canvas.canvas.width/2 - (854 - canvas.canvas.width/4)/2, dy: -180, dw: 854 - canvas.canvas.width/4, dh: (854 - canvas.canvas.width/4)/4.27}]; // game over text
        this.menu = [{sx: 0, sy: 200.5, sw: 300.000, sh: 44.1, dx: canvas.canvas.width - 320, dy: -180, dw: 300, dh: 45, ofs: 20}, // play game btn
            {sx: 0, sy: 245.001, sw: 300.000, sh: 44.6, dx: canvas.canvas.width - 330, dy: -120, dw: 300, dh: 45, ofs: 30}, // difficulty btn
            {sx: 0, sy: 290.001, sw: 300.000, sh: 44.6, dx: canvas.canvas.width - 340, dy: -60, dw: 300, dh: 45, ofs: 40}, // settings btn
            {sx: 0, sy: 335.001, sw: 300.000, sh: 44.6, dx: canvas.canvas.width - 350, dy: 0, dw: 300, dh: 45, ofs: 50}, // about us btn
            {sx: 0, sy: 380.001, sw: 300.000, sh: 44.6, dx: canvas.canvas.width - 370, dy: 120, dw: 300, dh: 45, ofs: 70}, // exit btn
            {sx: 300, sy: 200.001, sw: 69.719, sh: 69.719, dx: 40, dy: canvas.canvas.height/2 - 100, dw: 69.719, dh: 69.719, ofs: null}, // shop btn
            {sx: 300, sy: 269.720, sw: 69.719, sh: 69.719, dx: 130, dy: canvas.canvas.height/2 - 100, dw: 69.719, dh: 69.719, ofs: null}]; // score / achivements btn
        this.menuAnimation = {sx: 371, sy: 200.5, sw: 75, sh: 117.109, dx: 200, dy: 100, dw: 75, dh: 117, sp: new Vector2()}; // interective robot
        this.difficulty = [{sx: 654.557, sy: 250, sw: 350.726, sh: 413.726, dx: canvas.canvas.width/2 - 350/2, dy: 0 - 413/2, dw: 350, dh: 413}, // difficulty ui background image
            {sx: 447.000, sy: 200.001, sw: 264.250, sh: 47.5, dx: canvas.canvas.width/2 - 264/2, dy: 413/4, dw: 264, dh: 48, id: 4}, // difficulty continue/confirm
            {sx: 447.000, sy: 249.000, sw: 207, sh: 48.000, dx: canvas.canvas.width/2 - 207/2, dy: -48*3-20, dw: 207, dh: 48, active: false, id: 0}, // difficulty easy
            {sx: 447.000, sy: 298.000, sw: 207, sh: 48.000, dx: canvas.canvas.width/2 - 207/2, dy: -48*2-10, dw: 207, dh: 48, active: false, id: 1}, // difficulty medium
            {sx: 447.000, sy: 347.000, sw: 207, sh: 48.000, dx: canvas.canvas.width/2 - 207/2, dy: -48, dw: 207, dh: 48, active: false, id: 2}, // difficulty hard
            {sx: 447.000, sy: 396.000, sw: 207, sh: 48.000, dx: canvas.canvas.width/2 - 207/2, dy: 10, dw: 207, dh: 48, active: true, id: 3}, // difficulty progresive
            {sx: 447.000, sy: 445.000, sw: 200.471, sh: 40.685, dx: canvas.canvas.width/2 - 200/2, dy: 0, dw: 200, dh: 40}]; // difficulty active highlighter
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
        if (world.currentUi == "difficulty") {
            canvas.fillStyle("rgba(0, 0, 0, 0.5)");
            canvas.fillRect(0, canvas.start.y, canvas.canvas.width, canvas.canvas.height);
            for (let i = 0; i < this.difficulty.length-1; i++) {
                canvas.drawImage(this.image, this.difficulty[i].sx, this.difficulty[i].sy, this.difficulty[i].sw, this.difficulty[i].sh, this.difficulty[i].dx, this.difficulty[i].dy, this.difficulty[i].dw, this.difficulty[i].dh);
                if (this.difficulty[i].active == true) {
                    canvas.drawImage(this.image, this.difficulty[this.difficulty.length - 1].sx, this.difficulty[this.difficulty.length - 1].sy, this.difficulty[this.difficulty.length - 1].sw, this.difficulty[this.difficulty.length - 1].sh, this.difficulty[this.difficulty.length - 1].dx, this.difficulty[i].dy+4, this.difficulty[this.difficulty.length - 1].dw, this.difficulty[this.difficulty.length - 1].dh);
                }
            }
            // canvas.fillStyle("rgb(200, 255, 255)");
            // canvas.fillRect(canvas.canvas.width / 3, canvas.start.y + canvas.canvas.height/10, canvas.canvas.width / 3, canvas.canvas.height - canvas.canvas.height/5);
        }
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
        if (world.currentUi == "menu") {
            for (let i = 0; i < ui.menu.length; i++) {
                if ((ui.menu[i].dx + ui.menu[i].dw >= x && ui.menu[i].dx <= x && ui.menu[i].dy + ui.menu[i].dh >= y && ui.menu[i].dy <= y) && world.currentUi == "menu") {
                    switch (i) {
                        case 0:
                            menuEngine.stop();
                            world.restart();
                            break;
                        case 1:
                            world.currentUi = "difficulty";
                            break;
                        case 4:
                            window.close();
                            window.location = "https://softdev00.github.io/";
                        default:
                            break;
                    }
                }
            }
        }
        if (world.currentUi == "difficulty") {
            for (let i = 1; i < ui.difficulty.length; i++) {
                if ((ui.difficulty[i].dx + ui.difficulty[i].dw >= x && ui.difficulty[i].dx <= x && ui.difficulty[i].dy + ui.difficulty[i].dh >= y && ui.difficulty[i].dy <= y)) {
                    switch (ui.difficulty[i].id) {
                        case 0:
                            ui.difficulty[2].active = true;
                            ui.difficulty[3].active = false;
                            ui.difficulty[4].active = false;
                            ui.difficulty[5].active = false;
                            break;
                        case 1:
                            ui.difficulty[2].active = false;
                            ui.difficulty[3].active = true;
                            ui.difficulty[4].active = false;
                            ui.difficulty[5].active = false;
                            break;
                        case 2:
                            ui.difficulty[2].active = false;
                            ui.difficulty[3].active = false;
                            ui.difficulty[4].active = true;
                            ui.difficulty[5].active = false;
                            break;
                        case 3:
                            ui.difficulty[2].active = false;
                            ui.difficulty[3].active = false;
                            ui.difficulty[4].active = false;
                            ui.difficulty[5].active = true;
                            break;
                        case 4:
                            world.currentUi = "menu";
                            break;
                        default:
                            break;
                    }
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