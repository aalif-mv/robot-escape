const keyMap = new Map();

// var home = function() {
    
// }

var init = function() {
    canvas.canvas.onclick = null;
    canvas.canvas.onkeydown = null;
    world.load();
    engine.start();
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
const player = new Player();
const world = new World();
canvas.resize();
const ui = new Ui();

window.addEventListener('keydown', function(e) {
    keyMap.set(e.key, e.type === "keydown");
    if (world.gameOver && (keyMap.get(" ") || keyMap.get("Enter"))) {
        world.restart();
    }
});
window.addEventListener('keyup', function(e) {
    keyMap.set(e.key, !(e.type === "keyup"));
});

canvas.fillStyle("white");
canvas.font("40px Comic Sans MS");
canvas.fillText("Press any key to continue / play", canvas.canvas.width/2 - 290, 0);
canvas.canvas.onclick = init;
canvas.canvas.onkeydown = init;