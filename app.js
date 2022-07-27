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
    constructor(x, y) {
        this.x = 10;
        this.y = 10;
        this.width = 7;
        this.height = 20;
        this.frameX = 0;
        this.frameY = 0;
        this.moving = false;
        this.alive = true;
        this.speed = 10

        this.hp = 100;
        this.str = 5;
        this.att = 10;
        this.def = 8;
        this.lv = 1;
        this.nextLv = 100
        this.image = "";

        this.render = function() {
            ctx.drawImage(this.image, hero.x, hero.y, this.width, this.height, this.x, this.y, this.width * 3, this.height * 3);
            
        }

        
        
    }
    // drawSprite(){
    //     drawImage(this.image, this.x, this.y, this.width, this.height, this.x, this.y, this.width, this.height);
    // }
}
//================================ SPRITES ====================================//

const cronoSprite = new Image();
cronoSprite.src = "./sprites/crono-edit.png";


// function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
//     ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
// }

//================================ KEYBOARD INPUTS ============================//
//Event listener
window.addEventListener('DOMContentLoaded', function() {
    hero = new Hero(10, 10);
    hero.image = cronoSprite;

    const runGame = this.setInterval(gameLoop, 60);
})
document.addEventListener('keydown', moveChar);

// Moving functions
function moveChar(e) {
    console.log('movement', e.key);

    switch(e.key) {
        case 'ArrowUp':
            hero.y - hero.speed >= 0 ? (hero.y -= hero.speed) : null;
            break;
        case 'ArrowLeft':
            hero.x - hero.speed >= 0 ? (hero.x -= hero.speed) : null;

            break;
        case 'ArrowDown':
            hero.y + hero.speed <= game.height ? (hero.y += hero.speed) : null;
            break;
        case 'ArrowRight':
            hero.x + hero.speed <= game.width ? (hero.x += hero.speed) : null;
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


// draw image

hero.render();



   //hero.drawSprite(cronoSprite);
    //drawSprite(cronoSprite, hero.x, hero.y, hero.width * hero.frX, hero.height * hero.frY, hero.x, hero.y, hero.width, hero.height);

}

