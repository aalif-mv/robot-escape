class Canvas {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.events = {};
        this.mid = {
            y: this.canvas.height / 2
        };
        this.start = {
            y: -(this.canvas.height / 2)
        };
        this.end = {
            y: (this.canvas.height / 2)
        };
        document.body.appendChild(this.canvas);
    }
    resize(width, height) {
        this.clear();
        this.canvas.width = width || document.documentElement.clientWidth;
        this.canvas.height = height || document.documentElement.clientHeight;
        this.mid = {
            y: this.canvas.height / 2
        };
        this.start = {
            y: -(this.canvas.height / 2)
        };
        this.end = {
            y: (this.canvas.height / 2)
        };
        player.pos.setX(this.canvas.width/2);
        world.height = this.canvas.height;
        world.width = this.canvas.width;
    }
    debug() {
        // 
    }
    clear() {
        this.ctx.clearRect(0, this.mid.y + this.start.y, this.canvas.width, this.canvas.height)
    }
    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy + canvas.mid.y, dWidth, dHeight);
    }
    fillRect(x, y, width, height) {
        this.ctx.fillRect(x, y + this.mid.y, width, height);
    }
    strokeRect(x, y, width, height) {
        this.ctx.strokeRect(x, y + this.mid.y, width, height);
    }
    rect(x, y, width, height) {
        this.ctx.rect(x, y + this.mid.y, width, height);
    }
    arc(x, y, radius, startAngle = 0, endAngle = Math.PI * 2, counterclockwise = false) {
        this.ctx.arc(x, y + this.mid.y, radius, startAngle, endAngle, counterclockwise);
    }
    moveTo(x, y) {
        this.ctx.moveTo(x, y + this.mid.y);
    }
    lineTo(x, y) {
        this.ctx.lineTo(x, y + this.mid.y);
    }
    stroke() {
        this.ctx.stroke();
    }
    fill(color) {
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
    fillText(text, x, y, mxw) {
        this.ctx.fillText(text, x, y + this.mid.y, mxw)
    }
    beginPath() {
        this.ctx.beginPath();
    }
    closePath() {
        this.ctx.closePath();
    }
    setLineDash(ld) {
        this.ctx.setLineDash(ld);
    }
    fillStyle(color) {
        this.ctx.fillStyle = color;
    }
    setLineWidth(width) {
        this.ctx.lineWidth = width;
    }
    font(font) {
        this.ctx.font = font;
    }
    /** 
     * 
     * events
     * 
     * 
    **/
    addEvent(event, _function) {
        this.events[event] = this.canvas.addEventListener(event, _function);
    }
    addEvents(events, _functions) {
        for (let i = 0; i < events.length; i++) {
            this.events[events[i]] = this.canvas.addEventListener(events[i], _functions[i]);
        }
    }
}