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
const foes = []
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
        this.heal = true;
        this.target = '';
        //==================STATS
        this.maxHp = 100;
        this.hp = 100;
        this.str = 5;
        this.att = 10;
        this.def = 8;
        this.lv = 1;
        this.xp = 0
        this.tp = 0
        this.nextLv = 100
        this.image = "";

        this.drawSprite = function(img, sX, sY, sW, sH, dX, dY, dW, dH){
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }

        this.render = function() {
            // ctx.strokeStyle = 'white'
            // ctx.strokeRect(hero.x, hero.y, this.width, this.height);
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
            if (hero.battleGround && hero.turn) {
                // crit = random from 1 to 10
                let crit = Math.floor(Math.random() * 10)
                //dmg = the att plus the str minus target's def plus crit - same formula for mobs
                let dmg = (this.att + this.str) - (this.target.def);
                dmg += crit
                this.target.hp -= dmg;
                console.log(`You deal ${dmg} damage.`);
                hero.turn = false;
                hero.tp += 14;
                hero.target.tp += 7;
                menuDiv.style.color = 'gray';
                
                setTimeout(turnBased, 3000);
            }
        }
        this.TPmove = function() {
            if (this.tp >= 100 && hero.battleGround) {
                console.log(`You use "Heavy Metal"`);
                console.log('Your power grows!');
                this.att = this.att * 2;
                this.attack();
                this.tp = 0;
                setTimeout(() => {this.att = this.att / 2}, 3000);
                setTimeout(console.log('Heavy Metal fades...'), 3000);
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
    constructor(x, y, walk){
        this.x = x
        this.y = y
        this.width = 16
        this.height = 32
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 3
        this.minFrame = 0
        this.speed = 6
        this.walk = walk
        this.drawSprite = function(img, sX, sY, sW, sH, dX, dY, dW, dH){
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }
            this.draw = function() {
                // ctx.strokeStyle = 'white'
                // ctx.strokeRect(this.x, this.y, this.width, this.height);
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
//============================================ Make npc move -( moving works, sprite doesn't).
        this.roamWE = function() {
                if (this.walk === 'left') {
                    //move the character around
                    let walkLeft = setInterval(() => { this.x -=2}, 800);
                    walkLeft;
                    // animate sprite
                    this.frameY = 0

                    setTimeout(() => {clearInterval(walkLeft)}, 15000);
                    setTimeout(() => {this.walk = 'right'}, 16000);
                    
                    }else if (this.walk === 'right') {
                    let walkRight = setInterval(() => {this.x +=2}, 800);
                    walkRight;
                    this.frameY = 1;
                    
                    setTimeout(() => {clearInterval(walkRight)}, 15000)
                    setTimeout(() => {this.walk = 'left'}, 16000);
                    
                    
            }}
            this.roamNS = function() {
                if (this.walk === 'up') {
            
                    let walkUp = setInterval(() => {this.y -=2}, 800);
                    walkUp;
                    
                    setTimeout(() => {clearInterval(walkUp)}, 15000);
                    setTimeout(() => {this.walk = 'down'}, 16000);
                    
                    }else if (this.walk === 'down') {
                    let walkDown = setInterval(() => {this.y +=2}, 800);
                    walkDown;
                    
                    setTimeout(() => {clearInterval(walkDown)}, 15000)
                    setTimeout(() => {this.walk = 'up'}, 16000);
                    
            }}
            //===================== Move sprite
        //     this.character;
        //     this.moveSprite = function(character){
        //         console.log('current frameX'+character.frameX);
        //     if (this.character.frameX < this.character.maxFrame) {
        //     this.character.frameX++;
        //     console.log('moved if');
        
        // }else { 
        //     character.frameX = 0;
        //     console.log('moved else');
        // }};
            // this.moveSprite = function() {
            //     console.log('current frameX'+this.frameX);
            //     if (this.frameX < this.maxFrame) {
            //     this.frameX++;
            //     console.log('moved if');
            
            // }else { 
            //     this.frameX = 0;
            //     console.log('moved else');
            // }};

        //=======================================stats ==========================//
        this.alive = true
        this.hp = 40
        this.att = 9
        this.def = 7
        this.str = 3
        this.lv = 1
        this.tp = 0
        this.xp = 100
        this.attack = function() {
            if (hero.battleGround && this.alive) {
                let crit = Math.floor(Math.random() * 10)
                console.log(crit);
                let dmg = hero.target.att + hero.target.str - hero.def;
                console.log('check 1:   '+dmg);
                dmg += crit;
                console.log('check 2:  '+dmg);
                let totalDmg = Math.round(dmg);
                console.log(totalDmg);
                hero.hp -= totalDmg;
                hero.tp += 5;
                this.tp += 14;
                console.log(`SLASH!`);
                console.log(`You take ${totalDmg} damage.`)
            }
        }
        this.TPmove = function() {
            if (this.tp >= 100 && hero.battleGround) {
                this.att = this.att * 2;
                this.attack();
                this.tp = 0;
                console.log(`CRITICAL HIT!`)
                setTimeout(() => {this.att = this.att / 2}, 3000);
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
                // ctx.strokeStyle = 'white'
                // ctx.strokeRect(this.x, this.y, this.width, this.height);
                this.drawSprite(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
                
            
        }
    //stats
        this.open =false
        
    }
}
//================================ SPRITES ====================================//

//================================gotta find better way to make these, maybe an array.



const dalAttack = new Image();
dalAttack.src = './assets/dalton-attack.png';

const bad0 = new Image();
const bad1 = new Image();
const bad2 = new Image();
const bad3 = new Image();
const bad4 = new Image();
const bad5 = new Image();
const bad6 = new Image();
const bad7 = new Image();
const bad8 = new Image();
const bad9 = new Image();
const bad10 = new Image();
const bad11 = new Image();
const bad12 = new Image();
const bad13 = new Image();


bad0.src = './assets/bad-guys/leo-sprite.png';
bad1.src = './assets/bad-guys/devouerer.png';
bad2.src = './assets/bad-guys/spirit-best.png';
bad3.src = './assets/bad-guys/kerka-sprite.png';
bad4.src = './assets/bad-guys/lobo.png';
bad5.src = './assets/bad-guys/scorpion.png';
bad6.src = './assets/bad-guys/sploomy-sprite.png';
bad7.src = './assets/bad-guys/tucan-sprite.png';
bad8.src = './assets/bad-guys/twig.png';
bad9.src = './assets/bad-guys/mario.png';
bad10.src = './assets/bad-guys/enemies-chrono-trigger.png';
bad11.src = './assets/bad-guys/enemies-chrono-trigger.png';
bad12.src = './assets/bad-guys/enemies-chrono-trigger.png';
bad13.src = './assets/bad-guys/npc.png';
//=============================================================================//

const cronoSprite = new Image();
cronoSprite.src = './assets/mat.png';

const battleSpriteHero = new Image();
battleSpriteHero.src = './assets/mat-attack.png';

const chestSprite = new Image();
chestSprite.src = './assets/chest.png';


//================================ START GAME ============================//
//Event listener
window.addEventListener('DOMContentLoaded', function() {
    
//=============================Created openents and place them in map 1
    
    
    //
    foes[0] = spike = new Mob(185, 205, 'right');
    foes[0].image = bad0;
    // adjustments
    foes[0].width = 65;
    foes[0].height = 70;
    foes[0].maxFrame = 3;
    
    //
    foes[1] = ghost = new Mob(425, 245, 'left');
    foes[1].image = bad1;
    // adjustments
    foes[1].width = 30;
    foes[1].height = 35;
    foes[1].frameX = 0;
    foes[1].frameY = 0;
    foes[1].maxFrame = 2;
    //
    foes[3] = wolf = new Mob(145, 425, 'up');
    foes[3].image = bad3;
    // adjustments
    foes[3].width = 45;
    foes[3].height = 55;
    foes[3].frameX = 0;
    foes[3].frameY = 0;
    foes[3].maxFrame = 2;
    //
    foes[4] = grunt = new Mob(45, 345);
    foes[4].image = bad4;
    // adjustments
    foes[4].width = 50;
    foes[4].height = 50;
    foes[4].frameX = 0;
    foes[4].frameY = 0;
    foes[4].maxFrame = 2;   //=== come back to this, sprite needs work ====================//
    //
    foes[5] = wilder = new Mob(585, 345, 'down');
    foes[5].image = bad5;
    // adjustments
    foes[5].width = 32;
    foes[5].height = 30;
    foes[5].frameX = 0;
    foes[5].frameY = 0;
    foes[5].maxFrame = 2;
    //
    foes[6] = crook = new Mob(665, 125, 'down');
    foes[6].image = bad6;
    // adjustments
    foes[6].width = 35;
    foes[6].height = 35;
    foes[6].frameX = 0;
    foes[6].frameY = 0;
    foes[6].maxFrame = 2;
    //
    foes[7] = witch = new Mob(505, 85, 'up');
    foes[7].image = bad7;
    // adjustments
    foes[7].width = 45;
    foes[7].height = 45;
    foes[7].frameX = 0;
    foes[7].frameY = 0;
    foes[7].maxFrame = 2;
    //
    foes[8] = vampire = new Mob(245, 45, 'right');
    foes[8].image = bad8;
    // adjustments
    foes[8].width = 32;
    foes[8].height = 35;
    foes[8].frameX = 0;
    foes[8].frameY = 0;
    foes[8].maxFrame = 2;
    //
    foes[9] = blade = new Mob(710, 260, 'down');
    foes[9].image = bad9;
    // adjustments
    foes[9].width = 30;
    foes[9].height = 30;
    foes[9].frameX = 0;
    foes[9].frameY = 0;
    foes[9].maxFrame = 1;
    //
    foes[10] = specter = new Mob(170, 340);
    foes[10].image = bad10;
    // adjustments
    foes[10].width = 40;
    foes[10].height = 40;
    foes[10].frameX = 0;
    foes[10].frameY = 0;
    foes[10].maxFrame = 2;
    //
    foes[11] = phantom = new Mob(305, 445);
    foes[11].image = bad11;
    // adjustments
    foes[11].width = 50;
    foes[11].height = 50;
    foes[11].frameX = 0;
    foes[11].frameY = 0;
    foes[11].maxFrame = 2;
    //
    foes[12] = dusk = new Mob(510, 300);
    foes[12].image = bad12;
    // adjustments
    foes[12].width = 50;
    foes[12].height = 50;
    foes[12].frameX = 0;
    foes[12].frameY = 0;
    foes[12].maxFrame = 2;
    //
    foes[13] = dalton = new Mob(670, 410, 'up');
    foes[13].image = bad13;
        //=====================================Big BAD GUY=========================//
        foes[2] = zombie = new Mob(0, 0, 'right');
        foes[2].image = bad2;
        foes[2].width = 125;
        foes[2].height = 37;
        foes[2].frameX = 5;
        foes[2].frameY = 0;
        foes[2].maxFrame = 5;
        foes[2].hp += 60;
        foes[2].str += 10;
        foes[2].def += 4;
        foes[2].roamWE = function() {
            if (this.walk === 'left') {
        
                let walkLeft = setInterval(() => { this.x -= 2}, 200);
                walkLeft;
            //======== animate sprite
                this.tp += 1 // gain tp while walking because why not
                this.frameY = 1;
                

                setTimeout(() => {clearInterval(walkLeft)}, 15000);
                setTimeout(bossWalk, 16000);
                
                }else if (this.walk === 'right') {
                let walkRight = setInterval(() => {this.x += 3}, 200);
                walkRight;
            //========== animate sprite
                this.frameY = 0;
                
                setTimeout(() => {clearInterval(walkRight)}, 15000);
                setTimeout(bossWalk, 16000);
                
                
        }}
        foes[2].roamNS = function() {
            if (this.walk === 'up') {
        
                let walkUp = setInterval(() => { this.y -= 2}, 200);
                walkUp;
                //======== animate sprite
                this.frameY = 1;
                
                setTimeout(() => {clearInterval(walkUp)}, 15000);
                setTimeout(bossWalk, 16000);
                
                }else if (this.walk === 'down') {
                let walkDown = setInterval(() => {this.y += 3}, 200);
                walkDown;
                //======== animate sprite
                this.tp += 1; // gain tp while walking because why not
                this.frameY = 0;
                
                setTimeout(() => {clearInterval(walkDown)}, 15000)
                setTimeout(bossWalk, 16000);
                
        }}
        //====================================================================//
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

    
if (hero.battleGround) {
   battle1();
   
//===================================Battleground switch =================================//
}else {
    stage1();

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



