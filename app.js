// Selectors and variables
const game = document.querySelector('#game');
const ctx = game.getContext('2d'); //2d canvas
const movement = document.querySelector('#movement');



let hero;







//=============================    computedStyles   ================================//
game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);


//=============================   Entities  ================================//
class Hero {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function() {
            ctx.fillStyle = this.color;
            ctx. fillRect(this.x, this.y, this.width, this. height);
        }
    }
}

//================================ KEYBOARD INPUTS ============================//
//Event listener
window.addEventListener('DOMContentLoaded', function() {
    hero = new Hero(10, 10, 20, 20);

    const runGame = this.setInterval(gameLoop, 60);
})
document.addEventListener('keydown', moveChar);
// Moving functions
function moveChar(e) {
    console.log('movement', e.key);

    switch(e.key) {
        case 'ArrowUp':
            hero.y - 10 >= 0 ? (hero.y -= 10) : null;
            break;
        case 'ArrowLeft':
            hero.x - 10 >= 0 ? (hero.x -= 10) : null;
            break;
        case 'ArrowDown':
            hero.y + 10 <= game.height ? (hero.y += 10) : null;
            break;
        case 'ArrowRight':
            hero.x + 10 <= game.width ? (hero.x += 10) : null;
            break;

        // WASD Keybindings
        
        case 'w':
            hero.y - 10 >= 0 ? (hero.y -= 10) : null;
            break;
        case 'a':
            hero.x - 10 >= 0 ? (hero.x -= 10) : null;
            break;
        case 's':
            hero.y + 10 <= game.height ? (hero.y += 10) : null;
            break;
        case 'd':
            hero.x + 10 <= game.width ? (hero.x += 10) : null;
            break;
    }
}



//============================ GAME LOOP ===============================//

function gameLoop() {
    //clear canvas first
    ctx.clearRect(0, 0, game.width, game.height);
    //display x and y fo donkey
    movement.textContent = `x:${hero.x}\ny:${hero.y}`;
   console.log(movement.textContent);

    
    hero.render();
    

}