// Enemies our player must avoid
class Enemy{
    constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.hortMove = 101;
    this.x = x;
    this.y = y + 65;  // align enemy in row
    this.speed = speed;
    this.screenEdge = this.hortMove * 5;
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x < this.screenEdge) {
            this.x+= this.speed * dt;
        }
        //handle enemy rolling off screen
        else {
            this.x = -this.hortMove + 5;
        }
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class
class PlayerOne {
    // Constructor
    constructor () {
        //// Properties
            // Sprite Image
            this.sprite = 'images/char-boy.png';
            //movement spacing
            this.vertMove = 83;
            this.hortMove = 101;
            // x start pos and x pos variable
            this.startX = this.hortMove * 2;
            this.x = this.startX;
            // y start pos and y pos variable
            this.startY = (this.vertMove * 4) + 65;
            this.y = this.startY;
    }
        //// Methods
        // update position of the player and check first is they hit the
        // enemy then check if the have won the game
        update() {
            for (let enemy of allEnemies) {
                if (this.y === enemy.y && (this.x < enemy.x + enemy.hortMove/1.5 && this.x + this.hortMove/1.5 > enemy.x)) {
                this.resetPlayer();
                }
            }
         //check if the player won here
            if (this.y === -18) {
                alert('Congrats! You won the game.');
                this.resetPlayer();
            }

        }
            // Render
                // Draw player sprit on current x and y coord position
        render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
            // handle keyboard input
        handleInput(keyPressed) {
            //check if out-of-bounds
            // Update player's x and y property according to input
                switch (keyPressed) {
                    case 'left':
                        if (this.x > 0) {
                            this.x -= this.hortMove;
                        }
                        break;
                    case 'right':
                        if (this.x < 402) {
                            this.x += this.hortMove;
                        }
                        break;
                    case 'up':
                        if (this.y > 0) {
                            this.y -= this.vertMove;
                        }
                        break;
                    case 'down':
                        if (this.y < 397) {
                            this.y += this.vertMove;
                        }
                }
        }
            // reset hero
        resetPlayer() {
            // set x and y to starting x and y
            this.x = this.startX;
            this.y = this.startY;
        }
}


// Now instantiate your objects.
// create random starting position for X and Speed of Enemy
function randX() {
    let enStartX = Math.floor((Math.random() * 3) + 1) * (-101);
    return enStartX;
}

function randSpeed() {
    let enStartSpeed = Math.floor((Math.random() * 300) + 100);
    return enStartSpeed;
}

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
let enStartY = 0;

//loop to create the enemies
for (let i = 1; i <= 3; i++) {
    let enemy = new Enemy(randX(),enStartY,randSpeed());
    allEnemies.push(enemy);
    enStartY += 83;
}

// Place the player object in a variable called player
const player = new PlayerOne();


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
