function getImage() {

    playerImage = new Image();
    enemy01Image = new Image();
    enemy02Image = new Image();
    enemy03Image = new Image();
    enemy04Image = new Image();
    playerBulletImage = new Image();
    enemyBulletImage = new Image();

	playerImage.src = "image/player.png";
    enemy01Image.src = "image/enemy01.png";
    enemy02Image.src = "image/enemy02.png";
    enemy03Image.src = "image/enemy03.png";
    enemy04Image.src = "image/enemy04.png";
    playerBulletImage.src = "image/player_bullet.png";
    enemyBulletImage.src = "image/enemy_bullet04.png";

};

const downKeys = {
    up: false,
    down: false,
    left: false,
    right: false,
    fire: false
}

function game () {
    canvas = document.getElementById('game-canvas');
    gameover = false;
    ctx = canvas.getContext("2d");

    CH = canvas.width;
    CW = canvas.height;
    oldCounter = 0;
    nextCounter = 0;

    enemies = [];
    // let a = new enemy(700, 200, 0)
    // enemies.push(a)

    getImage();

    PLAYER = {
        X: 50,
        Y: 100,
        W: 50,
        H: 50,
        SPEED: 5,
        BULLETS: [],

        update: function() {
            if(downKeys.up){
                PLAYER.Y = PLAYER.Y - PLAYER.SPEED;
                if (PLAYER.Y <= 0) { PLAYER.Y = 0 };
            }
            
            if(downKeys.down){
                PLAYER.Y = PLAYER.Y + PLAYER.SPEED;
                if (PLAYER.Y >= CW - PLAYER.W) { PLAYER.Y = CW - PLAYER.W };
            }

            if (downKeys.left) {
                PLAYER.X = PLAYER.X - PLAYER.SPEED;
                if (PLAYER.X <= 0) { PLAYER.X = 0 };
            }

            if (downKeys.right) {
                PLAYER.X = PLAYER.X + PLAYER.SPEED;
                if (PLAYER.X >= CH - PLAYER.H) { PLAYER.X = CH - PLAYER.H };
            }
            
            if(downKeys.fire){
                this.fire();
            }
        },

        draw: function() {
            ctx.drawImage(playerImage, PLAYER.X, PLAYER.Y, PLAYER.W, PLAYER.H)
        },

        fire: function() {
            if (nextCounter - oldCounter >= 1 ) {
                let z = new PlayerBullet(this.X + (this.W)/2, this.Y, 5);
                this.BULLETS.push(z);
                oldCounter = nextCounter;
            }
        }
    }

    function onkeydown(e) {
        if (e.key == ' ' || e.key == 'Enter') { 
            downKeys.fire = true;
        };

        if (e.key == 'w' || e.key == 'ArrowUp') {
            downKeys.up = true;
            // PLAYER.Y = PLAYER.Y - PLAYER.SPEED;
            // if (PLAYER.Y <= 0){ PLAYER.Y = 0};
        }

        if (e.key == 's' || e.key == 'ArrowDown') {
            downKeys.down = true;
            // PLAYER.Y = PLAYER.Y + PLAYER.SPEED;
            // if (PLAYER.Y >= CW - PLAYER.W) { PLAYER.Y = CW - PLAYER.W };
        }

        if (e.key == 'a' || e.key == 'ArrowLeft') {
            downKeys.left = true;
            // PLAYER.X = PLAYER.X - PLAYER.SPEED;
            // if (PLAYER.X <= 0) { PLAYER.X = 0 };
        }
    
        if (e.key == 'd' || e.key == 'ArrowRight') {
            downKeys.right = true;
            // PLAYER.X = PLAYER.X + PLAYER.SPEED;
            // if (PLAYER.X >= CH - PLAYER.H) { PLAYER.X = CH - PLAYER.H };
        }
    };

    function onkeyup(e){
        if (e.key == ' ' || e.key == 'Enter') { 
            downKeys.fire = false;
        };

        if (e.key == 'w' || e.key == 'ArrowUp') {
            downKeys.up = false;
        }

        if (e.key == 's' || e.key == 'ArrowDown') {
            downKeys.down = false;
        }

        if (e.key == 'a' || e.key == 'ArrowLeft') {
            downKeys.left = false;
        }

        if (e.key == 'd' || e.key == 'ArrowRight') {
            downKeys.right = false;
        }
    }

    document.addEventListener('keydown', onkeydown);
    document.addEventListener('keyup', onkeyup);


};

function PlayerBullet(X, Y, SPEED) {
    this.X = X;
    this.Y = Y;
    this.W = 50;
    this.H = 50;
    this.SPEED = SPEED;
    this.state = 'active';

    this.draw = function() {
        ctx.drawImage(playerBulletImage, this.X, this.Y, this.W, this.H)
    };

    this.update = function() {
        this.X += this.SPEED;
        if (this.X <= 0 ) { this.sate = 'inactive'};
    };
};

// function enemyBullet(X, Y, SPEED) {
//     this.X = X;
//     this.Y = Y;
//     this.W = 5;
//     this.H = 15;
//     this.SPEED = SPEED;
//     this.state = 'active';

//     this.draw = function () {
//         ctx.drawImage(enemyBulletImage, this.X, this.Y, this.W, this.H)
//     };

//     this.update = function () {
//         this.Y -= this.SPEED;
//         if (this.Y <= 0 || this.X <= 0) { this.sate = 'inactive' };
//     };
// };

function enemy(X, Y, SPEED) {
    this.X = X;
    this.Y = Y;
    this.W = 20;
    this.H = 20;
    this.SPEED = SPEED;
    this.state = 'active';

    this.draw = function () {
        ctx.drawImage(enemy01Image, this.X, this.Y, this.W, this.H)
    };

    this.update = function () {
        this.Y = this.Y + this.SPEED;

        if (this.Y >= CW - this.W || this.Y <= 0) {
            this.SPEED *= -1;
        }
        this.X--;
        if (this.X >= 0) { this.state = 'inactive'}
    };
};

function draw() {
    ctx.clearRect(0, 0, CH, CW);

    PLAYER.draw();
    PLAYER.BULLETS.forEach((bullet) => {bullet.draw()});
    
    enemies.forEach((enemy) => {enemy.draw()});

};

function update(){

    PLAYER.update();
    PLAYER.BULLETS.forEach((bullet) => {bullet.update()});

    enemies.forEach((enemy) => {enemy.update()});
    for (let i = 0; i < enemies.length; i++) {
    // enemies.forEach(enemy => {
        PLAYER.BULLETS.forEach(z => {
            if (z.state === "active" && isAHit(z, enemies[i])) {
                z.state = 'inactive';
                enemies.splice(i, 1)
            }
        })
        
    };
    let num = Math.random();
    if ( num < 0.1 ) {
        let x = Math.floor(Math.random() * (CW - 50));
        let y = Math.floor(Math.random() * 600);
        let speed = Math.random() * 5 + 5;
        let neg = Math.random();
        if (neg < 0.5) { speed = -speed; };

        let a = new enemy(800, y, speed)
        enemies.push(a)
    }


    enemies.forEach( enemy => {
        if (isCrash(PLAYER, enemy)) {
            alert("Game over!");
            gameover = true;
        }
    });
};

function isCrash(o1, o2) {
    return Math.sqrt(Math.pow((o1.X + o1.W / 2) - (o2.X + o2.W / 2), 2) + Math.pow((o1.Y + o1.H / 2) - (o2.Y + o2.H / 2), 2)) < 20;
};

function isAHit(o1, o2) {
    if(o1 && o2){
        return Math.sqrt(Math.pow((o1.X + o1.W / 2) - (o2.X + o2.W / 2), 2) + Math.pow((o1.Y + o1.H / 2) - (o2.Y + o2.H / 2), 2)) < 20;
    }
    return false;
};

function render() {
    draw();
    update();
    nextCounter++;

    if (gameover === false) { 
        window.requestAnimationFrame(render);
    } else {
        start();
    };
};

function start(){
    game();
    render();
};

start();