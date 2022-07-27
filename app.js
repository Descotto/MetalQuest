// Selectors and variables
const game = document.querySelector('#game');
game.width = 800;
game.height = 497;
const ctx = game.getContext('2d'); //2d canvas
const movement = document.querySelector('#movement');



const bg = new Image();
bg.src = './assets/map2.bmp'









let hero;
let dalton;
let chest1;
let chest2;
let chest3;
let chest4;
let chestArray = [];
let chestLoot = ['a Potion', 'nothing', 'a Damage Boost', 'nothing', 'a Low-Potion', 'a Hi-Potion'];
//=============================    computedStyles   ================================//
game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);


//=============================   Entities  ================================//
class Hero {
    constructor(x, y) {
        this.x = 30;
        this.y = 200;
        this.width = 21;
        this.height = 28;
        this.frameX = 1;
        this.frameY = 1;
        this.moving = false;
        this.alive = true;
        this.speed = 9;
        this.maxFrame = 3;
        this.minFrame = 0;

        this.hp = 100;
        this.str = 5;
        this.att = 10;
        this.def = 8;
        this.lv = 1;
        this.nextLv = 100
        this.image = "";

        this.drawSprite = function(img, sX, sY, sW, sH, dX, dY, dW, dH){
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }

        this.render = function() {
            ctx.strokeStyle = 'white'
            ctx.strokeRect(hero.x, hero.y, this.width, this.height);
            this.drawSprite(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
            
        }

        
        
    }
}

// ======== ENEMIES


class Mob{
    constructor(x, y){
        this.x = x
        this.y = y
        this.width = 16
        this.height = 32
        this.frameX = 2
        this.frameY = 1
        this.maxFrame = 3
        this.minFrame = 0
        this.speed = 6
        this.drawSprite = function(img, sX, sY, sW, sH, dX, dY, dW, dH){
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }
            this.draw = function() {
                ctx.strokeStyle = 'white'
                ctx.strokeRect(dalton.x, dalton.y, this.width, this.height);
                this.drawSprite(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
                
            
        }

        //stats
        this.alive = true
        }
}

//================================ CHESTS

class Loot{
    constructor(x, y){
        this.x = x
        this.y = y
        this.width = 31
        this.height = 21
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 1
        this.minFrame = 0
        this.speed = 6
        this.image = chestSprite
        this.switch = function() {
            if (this.open) {
                this.frameX = 1;
            }else {
                this.frameX = 0;
            }
        }
        this.drawSprite = function(img, sX, sY, sW, sH, dX, dY, dW, dH){
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }
            this.put = function() {
                ctx.strokeStyle = 'white'
                ctx.strokeRect(this.x, this.y, this.width, this.height);
                this.drawSprite(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
                
            
        }
    //stats
        this.open =false
        
    }
}
//================================ SPRITES ====================================//
const dalSprite = new Image();
dalSprite.src = './assets/npc.png'

const cronoSprite = new Image();
cronoSprite.src = "./assets/mat.png";

const chestSprite = new Image();
chestSprite.src = './assets/chest.png'


//================================ KEYBOARD INPUTS ============================//
//Event listener
window.addEventListener('DOMContentLoaded', function() {
    //cheate dalton
    dalton = new Mob(670,410);
    dalton.image = dalSprite;
    //create hero
    hero = new Hero(30, 200);
    hero.image = cronoSprite;
    //Generate and populate chests   "hopefully automatic when im done"

    chestArray[0] = chest1 = new Loot(60, 390);
    chestArray[1] = chest2 = new Loot(280, 30);
    chestArray[2] = chest3 = new Loot(750, 200);
    chestArray[3] = chest4 = new Loot(640, 20);
    
    const runGame = this.setInterval(gameLoop, 60);
})
document.addEventListener('keydown', moveChar);

// Moving functions
function moveChar(e) {
    console.log('movement', e.key);

    switch(e.key) {
        case 'ArrowUp':
            hero.y - hero.speed >= 0 ? (hero.y -= hero.speed) : null;
            hero.frameY = 1;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;
            }else { hero.frameX = hero.minFrame}
            break;
        case 'ArrowLeft':
            hero.x - hero.speed >= 0 ? (hero.x -= hero.speed) : null;
            hero.frameY = 2;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;
            }else { hero.frameX = hero.minFrame}
            break;
        case 'ArrowDown':
            hero.y + hero.speed <= game.height ? (hero.y += hero.speed) : null;
            hero.frameY = 0;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;
            }else { hero.frameX = hero.minFrame}
            break;
        case 'ArrowRight':
            hero.x + hero.speed <= game.width ? (hero.x += hero.speed) : null;
            hero.frameY = 3;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;

            }else { hero.frameX = hero.minFrame}
            break;

        // WASD Keybindings
        
        case 'w':
            hero.y - 10 >= 0 ? (hero.y -= 10) : null;
            hero.frameY = 1;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;
            }else { hero.frameX = hero.minFrame}
            break;
        case 'a':
            hero.x - 10 >= 0 ? (hero.x -= 10) : null;
            hero.frameY = 2;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;
            }else { hero.frameX = hero.minFrame}
            break;
        case 's':
            hero.y + 10 <= game.height ? (hero.y += 10) : null;
            hero.frameY = 0;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;
            }else { hero.frameX = hero.minFrame}
            break;
        case 'd':
            hero.x + 10 <= game.width ? (hero.x += 10) : null;
            hero.frameY = 3;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;
            }else { hero.frameX = hero.minFrame}
            break;
        //ADDITIONAL CONTROLS
        case 'e':
            openBox();
            break;
    }
}



//============================ GAME LOOP ===============================//

function gameLoop() {
    //clear canvas first
    ctx.clearRect(0, 0, game.width, game.height);
    //display x and y fo donkey
    movement.textContent = `x:${hero.x}\ny:${hero.y}`;
   //console.log(movement.textContent);


// draw image

//render background
ctx.drawImage(bg, 0, 0);
//spawn chests
chest1.put();
chest2.put();
chest3.put();
chest4.put();
//changes the sprite depending on the chest being open or closed
chest1.switch();
chest2.switch();
chest3.switch();
chest4.switch();

//spawn hero
hero.render();

//little conditional for spawn
let spawnMob = function() {
    if (dalton.alive) {
        dalton.draw();
    }
}
spawnMob();


   //hero.drawSprite(cronoSprite);
    //drawSprite(cronoSprite, hero.x, hero.y, hero.width * hero.frX, hero.height * hero.frY, hero.x, hero.y, hero.width, hero.height);

}




////test functions
//1
// if (dalton.x > 620) {
//     dalton.x -= 5;
// }else if(dalton.y < 340) {
//     dalton.y += 5;
// }else if(dalton.x < 615) {
//     dalton.x += 10
// }else if(dalton.y > 335) {
//     dalton.y +=10;
// }

//2 works (but not 100% as intended)
function test() {
    if (hero.x === chest2.x && hero.y === chest2.y) {
        chest2.open = true;
        console.log('chest opened!');
    }
}

//==================================COLLISIONS TESTING =======================//
function detechHit(obj1, obj2) {
    let hitBox = 
    obj1.y + obj1.height > obj2.y &&
    obj1.y < obj2.y + obj2.height &&
    obj1.x + obj1.width > obj2.x &&
    obj1.x < obj2.x + obj2.width;

    if (hitBox) {
        return true;
    }else {
        return false;
    }
}



///========FOR E   works perfect
let openBox = function() {
    for (let i = 0; i < chestArray.length; i++) {
    if (detechHit(hero, chestArray[i]) && chestArray[i].open === false) {
        
        chestArray[i].open = true
        looting();

        console.log('OPENED')
    }else {
        console.log('condition not met');
        }
    }
}


//==================LOOTING ===============//

// function for looting tests
function looting() {
    let rnd = Math.floor(Math.random() * chestLoot.length);
    console.log('You found '+chestLoot[rnd]+' in the chest.');
}