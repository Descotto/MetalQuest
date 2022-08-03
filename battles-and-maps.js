
//try to make maps and use them in an array, will start with singles.
const bgBattleFirstMap = new Image();
bgBattleFirstMap.src = './assets/map1.bmp'

//=====================================grab menu divs==========================//
let menuDiv = document.querySelector('#menu');
let attBtn = document.querySelector('#attack');
let tpbtn = document.querySelector('#tp');
let healBtn = document.querySelector('#heal');
let overlap = document.querySelector('#overlap');
let GOver = document.querySelector('#game-over');

//Function below hides menu when battleZone isn't active, or isnt your turn.
function menuHide() {
    menuDiv.style.display = 'none';
}
menuHide();
function menuShow() {
    menuDiv.style.display = 'block';
}






//========================================MAPS================================================================//



const battleMaps = []

//=====================================================DOOR MAP LINKS ======================================//
let bodyCount = 0;
function openDoor() {
    if (bodyCount >= 5) {
        door.open = true;
    }
}

//======================================BATTLE MAP 1 =======================================================//
function battle1() {
    if (stg === 1 && hero.battleGround) {
        //still record info.
        info.textContent = `Hp: ${hero.hp}  Att: ${hero.att}`;
        info2.textContent = `TP: ${hero.tp}     Xp: ${hero.xp}`;


        //DRAW BATTLE MAP
        ctx.drawImage(bgBattleFirstMap, - 0, - 750);
        hero.renderBattle();
        hero.target.renderBattle();
        hero.target.TPmove();
        hero.levelUp();
        endBattle();

        setInterval(() => {
            tpColor();
        }, 500);

    }
}
//
//========================================MAP 1 ================================================//
function stage1() {
    if (stg === 1) {
        //display x and y for hero
        movement.textContent = `x:${hero.x}\ny:${hero.y}`;
        info.textContent = `Hp: ${hero.hp} Att: ${hero.att}`;
        info2.textContent = `Lv: ${hero.lv} Xp: ${hero.xp}`;


        //render background
        ctx.drawImage(bg, 0, 0);

        //spawn chests
        chest1.put();
        chest2.put();
        chest3.put();
        chest4.put();

        door.put();
        //changes the sprite depending on the chest being open or closed
        chest1.switch();
        chest2.switch();
        chest3.switch();
        chest4.switch();

        //==door
        openDoor();

        //spawn hero
        hero.render();

        //little conditional for spawn
        foes.forEach(element => {
            if (element.alive) {
                element.draw();
            }
        });
        spawnMob();
        battleStart();
        hero.levelUp();
    }
}
//===========================================MAP 2 =========================================//
function stage2() {
//==============================collisions
//== make a new array every 50 items
const collisionMap2 = [];
// prepCollision(map2Collision, collisionMap2);

//============= for eeach "true" in the Json array make a new boundary   --- ask for help
const boundariesMap2 = [];
// prepBoundaries(collisionMap2, boundariesMap2);



}

//=====================================BATTLE MAP 2 =====================================//
function battle2(){}

//=================================== BATTLEGROUND EVENTS and stuff ========================//

//===================================ENEMY MOVES =======================================//
setInterval(() => {
    dalton.roamWE();
    foes.forEach(element => {
        element.roamWE();
        element.roamNS();
    })
}, 17000);
//=====Big Bad Move conditionals ==//
const BossMovements = ['up', 'down', 'right', 'left'];

//same principal as looting but for directionals

function bossWalk() {
    if (zombie.x < 10) {
        zombie.walk = 'right'
    } else if (zombie.y < 10) {
        zombie.walk = 'down'
    } else if (zombie.x + 10 + zombie.width > game.width) {
        zombie.walk = 'left'
    } else if (zombie.y + 10 + zombie.height > game.height) {
        zombie.walk = 'up'
    } else {
        let rnd = Math.floor(Math.random() * BossMovements.length);
        foes[2].walk = BossMovements[rnd];
    }
}



//==================== ANIMATE SPRITES ===============foreach to make em all move once and for all
setInterval(() => {
    foes.forEach(element => {
        if (element.frameX < element.maxFrame) {
            element.frameX++;
        } else { element.frameX = 0; }
    })
}, 400);

//==================== similar approach to the door

setInterval(() => {
    if (door.open) {
        door.frameY = 1;
        if (door.frameX < door.maxFrame) {
            door.frameX += 1
        } else { door.frameX = 0; }
    } else if (door.open == false) {
        door.frameY = 0;
        if (door.frameX < door.maxFrame) {
            door.frameX += 1;
        } else { door.frameX = 0; }
    }
}, 600);
//==========================================================================================//




//============================ START BATTLE ========================//
function battleStart() {
    for (i = 0; i < foes.length; i++) {
        if (detechHit(hero, foes[i]) && hero.moving && foes[i].alive) {
            // ====== TEST====external animations library== WORKS!

            hero.target = foes[i];
            hero.moving = false;
            gsap.to('#overlap', {
                opacity: 1,
                repeat: 4,
                yoyo: true,
                duration: 0.4
            })

            setTimeout(battleGo, 4000);
            setInterval(attackloop, 6000);
            setTimeout(turnBased, 4000);
            setTimeout(menuShow, 6500);

        }
    }
}


//================Heal
function useHeal() {
    if (hero.heal && hero.battleGround) {
        if (hero.hp + 50 <= hero.maxHp) {
            hero.heal = false;
            hero.hp += 50;
            playerLog('You recovered 50 HP!');
        } else {
            hero.heal = false;
            hero.hp = hero.maxHp;
            playerLog('You recovered 50 HP!');
        }
    } else { playerLog('Flask Empty.') }
}


// =================================== ATTACKS ===================================//


// Mob attack loop
function attackloop() {
    if (hero.battleGround && hero.hp > 0) {

        hero.target.attack();
    }
}

// called at 4 seconds after transcition begins, it stops outer worl from 
// displaying in the loop and starts the Battle ground loop as battleGround comes on.
function battleGo() {
    hero.battleGround = true;
    playBattleMusic();
    gsap.to('#overlap', {
        opacity: 0,
    })

}
//================ This is a timer for your turn that comes on 3 seconds after attacking
function turnBased() {
    if (hero.battleGround) {
        hero.turn = true
        menuDiv.style.color = 'black';
    }
}
//======================================= END BATTLE =====================================//

function endBattle() {
    if (hero.target.hp <= 0) {
        hero.target.hp = 1;
        hero.target.alive = false;
        let xp = hero.target.xp / 4
        bodyCount += 1;
        playerLog(`You get ${xp} experience.`)
        hero.xp += xp
        gsap.to('#overlap', {
            opacity: 1,
            repeat: 4,
            yoyo: true,
            duration: 0.4
        })
        setTimeout(battleStop, 6000);
        setTimeout(menuHide, 2000);
        

    }
}
//===================== ends the battle and allows player to move again.
function battleStop() {
    hero.battleGround = false;
    hero.moving = true;
    songCount = 1;
    gsap.to('#overlap', {
        opacity: 0,
    })

}

//==============================================Event Listeners for attacks ==========================//
healBtn.addEventListener('click', () => {
    useHeal();
});

attBtn.addEventListener('click', () => {
    hero.attack();
});

tpbtn.addEventListener('click', () => {
    hero.TPmove();
});



//===================================GAME OVER============================//
function gameOver() {
    if (hero.hp <= 0) {
        hero.hp = 'OVER';
        hero.alive = false;

        gsap.to('#overlap', {
            opacity: 1,
            repeat: 4,
            yoyo: true,
            duration: 0.4
        })
        GOver.style.color = 'white';
        setTimeout(menuHide, 2000);
    }
}


//====================================AUDIO TESTS =======================================//

const song1 = new Audio();
song1.src = './assets/Midi/EnterSandman.mp3';
const song2 = new Audio();
song2.src = './assets/Midi/here-i-go.mp3';
const song3 = new Audio();
song3.src = './assets/Midi/MrCrowley.mp3';
const song4 = new Audio();
song4.src = './assets/Midi/Crazy-Train.mp3';
const song5 = new Audio();
song5.src = './assets/Midi/trooper.mp3';
const song6 = new Audio();
song6.src = './assets/Midi/The-Final-Countdown.mp3';

const stageMusic = [song1, song2, song3];
const battleMusic = [song4, song5, song6];

function playMusic() {
    if (songCount < 2 && hero.battleGround == false) {
        songCount += 2;
    let rnd = Math.floor(Math.random() * stageMusic.length);
    stageMusic[rnd].play();
    stageMusic[rnd].volume = .1;
    
}}
//=====
function playBattleMusic() {
    if (battleSongCount < 2 && hero.battleGround) {
        battleSongCount += 2;
    let rnd = Math.floor(Math.random() * battleMusic.length);
    battleMusic[rnd].play();
    battleMusic[rnd].volume = .1;
    
}}
// ====
function stopMusic(array) {
    array.forEach(element => {element.pause();});
    

}
