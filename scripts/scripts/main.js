const keyMap = new Map();

var renderMenu = function() {
    canvas.clear();
    ui.renderHome();
}
var updateMenu = function() {
    if (keyMap.get("w") && ui.menuAnimation.dy + ui.menuAnimation.dh >= 200) {
        ui.menuAnimation.sp.setY(-10)
    }
    if (keyMap.get("a")) {
        ui.menuAnimation.sp.setX(-3)
    }
    if (keyMap.get("d")) {
        ui.menuAnimation.sp.setX(3)
    }
    ui.menuAnimation.sp.add(new Vector2(0, 0.53));
    ui.menuAnimation.sp.multiply(new Vector2(0.89, 0.96));
    ui.menuAnimation.dx += ui.menuAnimation.sp.getX;
    ui.menuAnimation.dy += ui.menuAnimation.sp.getY;

    // collusion

    if (ui.menuAnimation.dy + ui.menuAnimation.dh > 200) {
        ui.menuAnimation.dy = 200 - ui.menuAnimation.dh;
        ui.menuAnimation.sp.setY(0);
    }
    if (ui.menuAnimation.dx + ui.menuAnimation.dw >= canvas.canvas.width) {
        ui.menuAnimation.dx = canvas.canvas.width - ui.menuAnimation.dw;
        ui.menuAnimation.sp.setX(0);
    } else if (ui.menuAnimation.dx <= 0) {
        ui.menuAnimation.dx = 0;
        ui.menuAnimation.sp.setX(0);
    }
}

var init = function() {
    world.load();
    menuEngine.start();
}
var update = function() {
    player.update();
}
var render = function() {
    canvas.clear();
    world.render();
    player.render();
    ui.render();
    // canvas.debug();
}
var stopEngine = function() {
    engine.stop();
}

const canvas = new Canvas();
const engine = new Engine(1000/30, update, render);
const menuEngine = new Engine(1000/20, updateMenu, renderMenu);
const player = new Player();
const world = new World();
canvas.resize();
const ui = new Ui();

window.addEventListener('keydown', function(e) {
    keyMap.set(e.key, e.type === "keydown");
    if (world.currentUi == "game" && world.gameOver && (keyMap.get(" ") || keyMap.get("Enter"))) {
        world.restart();
    }
});
window.addEventListener('keyup', function(e) {
    keyMap.set(e.key, !(e.type === "keyup"));
});
// window.addEventListener('contextmenu', function(e) {
//     e.preventDefault()
//     return false;
// });
init();

// canvas.fillStyle("white");
// canvas.font("40px Comic Sans MS");
// canvas.fillText("Press any key to continue / play", canvas.canvas.width/2 - 290, 0);
// canvas.canvas.onclick = init;
// canvas.canvas.onkeydown = init;
// ui.image.addEventListener('load', ui.renderHome);