// Selectors and variables
const game = document.querySelector('#game');
game.width = 800;
game.height = 497;
const ctx = game.getContext('2d'); //2d canvas
const movement = document.querySelector('#movement');
const info = document.querySelector('#innerinfo');


const bg = new Image();
bg.src = './assets/map2.bmp'

//=========================================== BOUNDARIES
const collisionMap = [];
for (let z = 0; z < collisions.length; z  += 50) {
    collisionMap.push(collisions.slice(z, 50 + z));
}
class Boundary {
    static width = 16
    static height = 16
    constructor(position) {
        this.x = position.x
        this.y = position.y
        this.position = position
        this.width = 16
        this.height = 16
    }
    draw() {
        
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
const boundaries = [];

collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1441)
        boundaries.push(
            new Boundary({
                x : j * Boundary.width,
                y : i * Boundary.height
        }))
        
    })
})
//========================================== LOOT ITEMS ===============================//
let lootNothing = function() {
    console.log('The chest is empty');
}
let lootPotion = function() {
    if (hero.hp + 30 < hero.maxHp) {
        hero.hp += 30;
        console.log('Sick! You found a Potion!  HP + 30');
    }else {
        hero.hp = hero.maxHp;
        console.log('Sick! You found a Potion!  HP + 30');
    }
}
let lootLowPotion = function() {
    if (hero.hp + 20 < hero.maxHp) {
        hero.hp += 20;
        console.log('Sick! You found a Low-Potion!  HP + 20');
    }else {
        hero.hp = hero.maxHp;
        console.log('Sick! You found a Low-Potion!  HP + 20');
    }
}
let lootHiPotion = function() {
    if (hero.hp + 50 < hero.maxHp) {
        hero.hp += 50;
        console.log('Sick! You found a Hi-Potion!  HP + 50');
    }else {
        hero.hp = hero.maxHp;
        console.log('Sick! You found a Hi-Potion!  HP + 50');
    }
}
let lootdmg = function() {
    hero.att += 7;
    console.log('Sick! Your Attack grew by 7!');
    setTimeout(deBuff, 60000);
}
let deBuff = function() {
    hero.att -= 7;
    console.log('Your Attack went back to normal');
}
//=================================CHARACTERS AND CHESTS========================================//
//a few bad guys
const badGuys = []
let dalton;
let spike;
let ghost;
let zombie;
let wolf;
let grunt;
let wilder;
let crook;
let witch;
let vampire;
let blade;
let specter;
let phantom;
let dusk;


let hero;

let chest1;
let chest2;
let chest3;
let chest4;
let chestArray = [];
let chestLoot = [lootPotion, lootNothing, lootdmg, lootNothing, lootLowPotion, lootHiPotion];
//=============================    computedStyles   ================================//
game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);


//=============================   HERO  ================================//
class Hero {
    constructor(x, y) {
        this.x = 30;
        this.y = 200;
        this.width = 22;
        this.height = 28;
        this.frameX = 1;
        this.frameY = 1;
        this.moving = true;
        this.alive = true;
        this.speed = 5;
        this.maxFrame = 3;
        this.minFrame = 0;
        this.battleGround = false;
        this.turn = false;
        this.heal = false;

        this.maxHp = 100;
        this.hp = 100;
        this.str = 5;
        this.att = 10;
        this.def = 8;
        this.lv = 1;
        this.xp = 0
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
        this.renderBattle = function() {
            //ctx.drawImage(battleSpriteHero, 280, 250);
            let battleWidth = 85
            let battleHeight = 110

            ctx.strokeStyle = 'white'
                ctx.strokeRect(280, 250, battleWidth, battleHeight);
                this.drawSprite(battleSpriteHero, battleWidth * 0, battleHeight * 0, battleWidth, battleHeight, 280, 250, battleWidth, battleHeight);
                
        }
        this.attack = function() {
            if (hero.battleGround) {
                // crit = random from 1 to 10
                let crit = Math.floor(Math.random() * 10)
                //dmg = the att plus the str minus target's def plus crit - same formula for mobs
                let dmg = (this.att + this.str) - (dalton.def);
                dmg += crit
                
                dalton.hp -= dmg;
                console.log(`You deal ${dmg} damage.`);
                hero.turn = false;
                setTimeout(turnBased, 8000);
            }
        }
        this.TPmove = function() {
            if (this.tp <= 100 && hero.battleGround) {
                this.att = this.att * 2;
                this.attack();
                this.tp = 0;
                console.log(`You use "Heavy Metal"`);
                setTimeout(deBuffAtt(this), 3000);
                setTimeout(console.log('time-out'), 8000);
            }
        }
        // =================================== LV up test ================================//
            this.levelUp = function() {
                if (this.xp > this.nextLv) {
                this.lv += 1
                console.log(`Level up! LV:${this.lv}`);
                // MAX HP
                this.maxHp += (this.maxHp + this.lv) / 3;
                this.maxHp = Math.round(this.maxHp);
                this.hp = this.maxHp;
                console.log(`Max HP: ${this.maxHp}`);
                
                //ATT
                this.att += (this.att + this.lv) / 3;
                this.att = Math.round(this.att);
                console.log(`Attack: ${this.att}`);
                //DEF
                this.def += (this.def + this.lv) / 3;
                this.def = Math.round(this.def);
                console.log(`Defense: ${this.def}`);
                //str
                this.str += (this.str + this.lv) / 3;
                this.str = Math.round(this.str);
                console.log(`Streght: ${this.str}`);
                //for next level
                this.nextLv += (this.nextLv + (this.lv * 10)) / 2;
                this.nextLv = Math.round(this.nextLv);
                //reset xp
                this.xp = 0;
        }}
        
        
    }
}

// ================================================================== ENEMIES


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
        this.renderBattle = function() {
            //ctx.drawImage(battleSpriteHero, 280, 250);
            let battleWidth = 55
            let battleHeight = 110

            ctx.strokeStyle = 'white'
                ctx.strokeRect(290, 70, battleWidth, battleHeight);
                this.drawSprite(dalAttack, battleWidth * 0, battleHeight * 0, battleWidth, battleHeight, 290, 70, battleWidth, battleHeight);
                
        }

        //=======================================stats ==========================//
        this.alive = true
        this.hp = 100
        this.att = 9
        this.def = 7
        this.str = 3
        this.lv = 1
        this.tp = 0
        this.xp = 100
        this.attack = function() {
            if (hero.battleGround) {
                let crit = Math.floor(Math.random() * 10)
                let dmg = (dalton.att + dalton.str) - (hero.def / 2);
                dmg += crit;
                dmg = Math.round(dmg);
                
                hero.hp -= dmg;
                this.tp += 14;
                console.log(`SLASH!`);
                console.log(`You take ${dmg} damage.`)
            }
        }
        this.TPmove = function() {
            if (this.tp >= 100 && hero.battleGround) {
                this.att = this.att * 2;
                this.attack();
                this.tp = 0;
                console.log(`CRITICAL HIT!`)
                setTimeout(deBuffAtt(this), 3000);
            }
        }
        //================= level UP
        this.levelUp = function() {
            if (this.xp > this.nextLv) {
            this.lv += 1
            // HP
            this.hp += (this.hp + this.lv) / 3;
            this.hp = Math.round(this.hp);
            //ATT
            this.att += (this.att + this.lv) / 3;
            this.att = Math.round(this.att);
            //DEF
            this.def += (this.def + this.lv) / 3;
            this.def = Math.round(this.def);
            //str
            this.str += (this.str + this.lv) / 3;
            this.str = Math.round(this.str);
            //XP
            this.xp += (this.xp + this.lv) / 2;
            this.xp = Math.round(this.xp);
    }}
        

    }
}
//function to spawn
let spawnMob = function() {
    if (dalton.alive) {
        dalton.draw();
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

const dalAttack = new Image();
dalAttack.src = './assets/dalton-attack.png'

const cronoSprite = new Image();
cronoSprite.src = './assets/mat.png';

const battleSpriteHero = new Image();
battleSpriteHero.src = './assets/mat-attack.png'

const chestSprite = new Image();
chestSprite.src = './assets/chest.png'


//================================ START GAME ============================//
//Event listener
window.addEventListener('DOMContentLoaded', function() {
    
    //cheate enemies
    dalton = new Mob(670,410);
    dalton.image = dalSprite;
    //
    badGuys[0] = spike = new Mob(0, 0);

    //
    badGuys[1] = ghost = new Mob(10, 0);

    //
    badGuys[2] = zombie = new Mob(20, 0);

    //
    badGuys[3] = wolf = new Mob(30, 0);

    //
    badGuys[4] = grunt = new Mob(40, 0);

    //
    badGuys[5] = wilder = new Mob(50, 0);

    //
    badGuys[6] = crook = new Mob(40, 0);

    //
    badGuys[7] = witch = new Mob(50, 0);

    //
    badGuys[8] = vampire = new Mob(0, 20);

    //
    badGuys[9] = blade = new Mob(10, 20);

    //
    badGuys[10] = specter = new Mob(20, 20);

    //
    badGuys[11] = phantom = new Mob(30, 20);

    //
    badGuys[12] = dusk = new Mob(40, 20);
    //create hero
    hero = new Hero(30, 200);
    hero.image = cronoSprite;
    //Generate and populate chests   "hopefully automatic when im done"

    chestArray[0] = chest1 = new Loot(60, 390);
    chestArray[1] = chest2 = new Loot(280, 30);
    chestArray[2] = chest3 = new Loot(750, 200);
    chestArray[3] = chest4 = new Loot(640, 20);
    
    //Populate enemies   (only 1 at the moment)
    
    const runGame = this.setInterval(gameLoop, 60);
})

document.addEventListener('keydown', moveChar);

//========================================= MOVEMENTS AND INPUTS ======================//
function moveChar(e) {
    

    switch(e.key) {
        case 'ArrowUp':
            hero.y - 20 >= 0  ? (hero.y -= 20) : null;
            hero.frameY = 1;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;
            }else { hero.frameX = hero.minFrame}
            break;
        case 'ArrowLeft':
            hero.x - 20 >= 0 ? (hero.x -= 20) : null;
            hero.frameY = 2;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;
            }else { hero.frameX = hero.minFrame}
            break;
        case 'ArrowDown':
            hero.y + 20 <= game.height ? (hero.y += 20) : null;
            hero.frameY = 0;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;
            }else { hero.frameX = hero.minFrame}
            break;
        case 'ArrowRight':
            hero.x + 20 <= game.width ? (hero.x += 20) : null;
            hero.frameY = 3;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;

            }else { hero.frameX = hero.minFrame}
            break;

        // WASD Keybindings
        
        case 'w':
            //can I stop all cases with one "if" conditional? ===== nope, one per case.
            if(hero.moving)
            hero.y - hero.speed >= 0 && outBound() == false ? (hero.y -= hero.speed) : (hero.y += 10);
            hero.frameY = 1;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;
            }else { hero.frameX = hero.minFrame}
            break;
        case 'a':
            if(hero.moving)
            hero.x - hero.speed >= 0 && outBound() == false  ? (hero.x -= hero.speed) : (hero.x += 10);
            hero.frameY = 2;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;
            }else { hero.frameX = hero.minFrame}
            break;
        case 's':
            if(hero.moving)
            hero.y + hero.speed <= game.height && outBound() == false ? (hero.y += hero.speed) : (hero.y -= 10);
            hero.frameY = 0;
            if (hero.frameX < hero.maxFrame) {
                hero.frameX ++;
            }else { hero.frameX = hero.minFrame}
            break;
        case 'd':
            if(hero.moving)
            hero.x + hero.speed <= game.width && outBound() == false ? (hero.x += hero.speed) : (hero.x -= 10);
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
//======================================================================//
//======================================================================//

function gameLoop() {
    
    //clear canvas first
    ctx.clearRect(0, 0, game.width, game.height);

    //test argument for transcitions
if (hero.battleGround) {
    //show the screen again
    // gsap.to('#overlap', {
    //     opacity: 0,
    //    })
    //still record info, delete console.log then delete this =============================//
    info.textContent = `Hp: ${hero.hp} Att: ${hero.att}\nLv: ${hero.lv} Xp: ${hero.xp}`;
   

   //DRAW BATTLE MAP
   ctx.drawImage(bgBattleFirstMap, - 0, - 750);
   hero.renderBattle();
   dalton.renderBattle();
   dalton.TPmove();
   hero.levelUp();
   endBattle();
   
//===================================Battleground switch =================================//
}else {
    //show screen
    

       //display x and y for hero
       movement.textContent = `x:${hero.x}\ny:${hero.y}`;
       info.textContent = `Hp: ${hero.hp} Att: ${hero.att}\nLv: ${hero.lv} Xp: ${hero.xp}`;
      //console.log(movement.textContent);
   
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
   
   spawnMob();
   battleStart();
   hero.levelUp();

}};

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
//boundaries collisions
let outBound = function() {
    let output = false;
    boundaries.forEach(element => {
       // console.log(element.x, element.y)
        if (detechHit(hero, element)){
            output = true
        }
    });
    return output;
}


///=============FOR E   works perfect ===move it somewhere better and delete this
let openBox = function() {
    for (let i = 0; i < chestArray.length; i++) {
        //if theres a collision between hero and the chest and the chests is closed, open it.
    if (detechHit(hero, chestArray[i]) && chestArray[i].open === false) {
        
        chestArray[i].open = true
        looting();

        
    }
    }
}


//==================LOOTING ===============//

// function for looting tests  ===  works as intended
function looting() {
    //picks a rasndom string out of the chestLoot array
    let rnd = Math.floor(Math.random() * chestLoot.length);
    chestLoot[rnd]();
    
}



