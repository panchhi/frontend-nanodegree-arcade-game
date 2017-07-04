var left = 0;
var right = 4;
var top = 0;
var bottom = 4;
var maxSpeed = 6;
var minSpeed = 1;

var xdiff = 101;
var ydiff = 83;
// Enemies our player must avoid
var Enemy = function(pos) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = ydiff * pos;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) * minSpeed);
    if(this.x > right * xdiff)
        this.x = 0;

 //   this.x = this.x * dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

var Player = function(){

    this.x = ((left + right) / 2) * xdiff;
    this.y =  5 * ydiff;
    this.sprite = 'images/char-boy.png';
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.setToStart = function(){
    this.x = ((left + right) / 2) * xdiff;
    this.y = 5 * ydiff;
};


Player.prototype.update = function(){
    checkCollision();
    if(this.y <= 0 || this.y > 5 * ydiff || this.x < 0 || this.x > 4 * xdiff)
    {
        player.setToStart();
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir){
    if(dir === 'left')
        this.x -= xdiff;
    else if(dir === 'right')
        this.x += xdiff;
    else if(dir === 'up')
        this.y -= ydiff;
    else
        this.y += ydiff;
    this.update();
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for(var i = 1; i <= 3; i++)
{
    allEnemies.push(new Enemy(i));
}
// Place the player object in a variable called player

var player = new Player();

var checkCollision = function(){
    allEnemies.forEach(function(enemy){
        if(Math.abs(player.x - enemy.x) <= 50 && enemy.y === player.y){
            player.setToStart();
        }
    });
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
