// Display ----- creates a canvas and initializes 2d tool to draw on the canvas
function Display(width,height) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
};

//clears display for each new frame
Display.prototype.clear = function() {
    this.ctx.clearRect(0,0,this.width,this.height);
}

// drawSprite takes sprite, sprite x position and sprite y position
Display.prototype.drawSprite = function(sp,x,y){
        // takes sprite image, sprite x and y position, width and height (on teh sprite sheet(png)), x, y postion of sprite and w,h of sprite on the canavs)
        this.ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h, x, y, sp.w, sp.h);
};

Display.prototype.drawBullets = function (bullet) {
    this.ctx.fillStyle = bullet.color;
    this.ctx.fillRect(bullet.x, bullet.y, bullet.w, bullet.h);

};

// Sprites ---- Sprite constructor takes image, image x position, image y position, image width and image height as parameters
function Sprite(img, x, y, w, h) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
};

// Bullet constructor with x,y position, speed, width, height and color parameters

function Bullets(x,y,vely,w,h, color) {
    this.x = x;
    this.y = y;
    this.vely = vely;
    this.w = w;
    this.h = h; 
    this.color = color;
}

Bullets.prototype.update = function() {
this.y += this.vely;
}

// Handler ------ keyevents functions

function Handler(){
        this.down = {};
        this.pressed = {};

        var _this = this;

        document.addEventListener("keydown", function(e){
            _this.down[e.keyCode] = true;
        });

        document.addEventListener("keyup", function(e){
           delete _this.down[e.keyCode];
           delete _this.pressed[e.keyCode];
        });
};

Handler.prototype.isDown = function(code) {
        return this.down[code];
};

Handler.prototype.isPressed = function(code) {
        if (this.pressed[code]) {
            return false;
        } else if (this.down[code]) {
            return this.pressed[code] = true;
        }
        return false;
};

// Collision detection 

function AABBIntersect (ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx+bw && bx < ax+aw && ay < by+bh && by < ay+ah;
}
