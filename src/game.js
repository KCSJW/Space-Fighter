//  Game + Player + Control
// =============================================================================

let hasListener = false;
let gameover = false;
let lives = 3;
let score = 0;
let downKeys = {
    up: false,
    down: false,
    left: false,
    right: false,
    fire: false
}

function Game(lives, score) {

    canvas = document.getElementById('game-canvas');
    crashed = false;
    ctx = canvas.getContext("2d");

    CVW = canvas.width;
    CVH = canvas.height;
    oldCounter = 0;
    nextCounter = 0;

    enemies = [];
    explosions = [];
    getImage();

    // PLAYER
    // =========================================================================

    PLAYER = {
        X: 50,
        Y: 280,
        W: 50,
        H: 50,
        SPEED: 4,
        SCORE: score,
        LIFES: lives,
        BULLETS: [],
        EXPLOSIONS: [],
        DURATION: 200,
        timeLeft: 1000,
        STARTTIME: Date.now(),

        update: function () {
            if (downKeys.up) {
                PLAYER.Y = PLAYER.Y - PLAYER.SPEED;
                if (PLAYER.Y <= 0) { PLAYER.Y = 0 };
            }
            if (downKeys.down) {
                PLAYER.Y = PLAYER.Y + PLAYER.SPEED;
                if (PLAYER.Y >= CVH - PLAYER.W) { PLAYER.Y = CVH - PLAYER.W };
            }
            if (downKeys.left) {
                PLAYER.X = PLAYER.X - PLAYER.SPEED;
                if (PLAYER.X <= 0) { PLAYER.X = 0 };
            }
            if (downKeys.right) {
                PLAYER.X = PLAYER.X + PLAYER.SPEED;
                if (PLAYER.X >= CVW - PLAYER.H) { PLAYER.X = CVW - PLAYER.H };
            }
            if (downKeys.fire) { this.fire(); }
        },

        draw: function () { ctx.drawImage(playerImage, PLAYER.X, PLAYER.Y, PLAYER.W, PLAYER.H) },

        fire: function () {
            const timePassed = Date.now() - this.STARTTIME;
            if (timePassed < this.timeLeft) {
                this.STARTTIME = Date.now();
                this.timeLeft = this.timeLeft - timePassed;
            } else {
                this.STARTTIME = Date.now();
                this.timeLeft = this.DURATION;
                if (nextCounter - oldCounter >= 1) {
                    let z = new PlayerBullet(this.X + (this.W) / 2, this.Y, 8);
                    this.BULLETS.push(z);
                    playSound(FIRE_SOUND);
                    oldCounter = nextCounter;
                }
            };
        }
    };

    // Control==================================================================

    function onkeydown(e) {
        if (!crashed) {
            if (e.key == ' ' || e.key == 'Enter') { downKeys.fire = true };
            if (e.key == 'w' || e.key == 'ArrowUp') { downKeys.up = true };
            if (e.key == 's' || e.key == 'ArrowDown') { downKeys.down = true };
            if (e.key == 'a' || e.key == 'ArrowLeft') { downKeys.left = true };
            if (e.key == 'd' || e.key == 'ArrowRight') { downKeys.right = true };
        }
    };

    function onkeyup(e) {
        if (e.key == ' ' || e.key == 'Enter') { downKeys.fire = false };
        if (e.key == 'w' || e.key == 'ArrowUp') { downKeys.up = false };
        if (e.key == 's' || e.key == 'ArrowDown') { downKeys.down = false };
        if (e.key == 'a' || e.key == 'ArrowLeft') { downKeys.left = false };
        if (e.key == 'd' || e.key == 'ArrowRight') { downKeys.right = false };
    };

    if (hasListener === false) {
        document.addEventListener('keydown', onkeydown);
        document.addEventListener('keyup', onkeyup);
        hasListener = true;
    }
};