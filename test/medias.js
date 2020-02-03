// Image
// =============================================================================

getImage = function() {

    playerImage = new Image();
    enemy01Image = new Image();
    enemy02Image = new Image();
    enemy03Image = new Image();
    enemy04Image = new Image();
    playerBulletImage = new Image();
    enemyBulletImage = new Image();
    explosionImage = new Image();
    blockImage = new Image();

    playerImage.src = "../images/player.png";
    enemy01Image.src = "../images/enemy01.png";
    enemy02Image.src = "../images/enemy02.png";
    enemy03Image.src = "../images/enemy03.png";
    enemy04Image.src = "../images/enemy04.png";
    playerBulletImage.src = "../images/player_bullet.png";
    enemyBulletImage.src = "../images/enemy_bullet04.png";
    explosionImage.src = "../images/explosion1.png";
    blockImage.src = "../images/block.png";

};

// Sounds
// =============================================================================

const FIRE_SOUND = new Audio('../sound/bullet/bullet.ogg');
const EXPLOSION_SOUND = new Audio('../sound/explosion/explosion.mp3');

playSound = function(sound) {
    sound.currentTime = 0;
    sound.play().then(() => { }).catch(() => { });
};

playLowSound = function(sound) {
    sound.volume = 0.2
    sound.currentTime = 0;
    sound.play().then(() => { }).catch(() => { });
};
