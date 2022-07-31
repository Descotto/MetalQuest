
//try to make maps and use them in an array, will start with singles.
const bgBattleFirstMap = new Image();
bgBattleFirstMap.src = './assets/map1.bmp'

//=====================================grab menu divs==========================//
let menuDiv = document.querySelector('#menu');
let attBtn = document.querySelector('#attack');
let tpbtn = document.querySelector('#tp');
let healBtn = document.querySelector('#heal');
let overlap = document.querySelector('#overlap');

//Function below hides menu when battleZone isn't active, or isnt your turn.
function menuHide() {
    menuDiv.style.display = 'none';
}
menuHide();
function menuShow() {
    menuDiv.style.display = 'block';
}






//========================================MAPS=============================//
let stg = 1


const battleMaps = []

//======================================BATTLE MAP 1 =====================//
function battle1(){
    if (stg === 1) {
//still record info, delete console.log then delete this =============================//
info.textContent = `Hp: ${hero.hp}  Att: ${hero.att}    \nTP: ${hero.tp}     Xp: ${hero.xp}`;
   

//DRAW BATTLE MAP
ctx.drawImage(bgBattleFirstMap, - 0, - 750);
hero.renderBattle();
hero.target.renderBattle();
hero.target.TPmove();
hero.levelUp();
endBattle();
}}
//
//========================================MAP 1 =========================//
function stage1(){
    if (stg === 1) {
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
   foes.forEach(element => {
    if (element.alive) {
        element.draw();
    }
   });
   spawnMob();
   battleStart();
   hero.levelUp();
}}

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
const BossMovements =['up', 'down', 'right', 'left'];

//same principal as looting but for directionals

function bossWalk() {
    if (zombie.x < 10){
        zombie.walk = 'right'
    }else if(zombie.y < 10) {
        zombie.walk = 'down'
    }else if(zombie.x + 10 + zombie.width > game.width) {
        zombie.walk = 'left'
    }else if(zombie.y + 10 + zombie.height > game.height) {
        zombie.walk = 'up'
    }else{
    let rnd = Math.floor(Math.random() * BossMovements.length);
    foes[2].walk = BossMovements[rnd];
}}

//============== animate bad guys sprites function for recall -- doesn't work propertly
// function moveSprite() {
//     console.log(this.frameX+'framex');
//     if (this.frameX < this.maxFrame) {
//     this.frameX ++;
//     console.log('moved if');

// }else { 
//     this.frameX = this.minFrame
//     console.log('moved else');
// }};
//======================== for declare function in individual characters
// function moveSprite(character) {
//     console.log('current frameX'+character.frameX);
//     if (character.frameX < character.maxFrame) {
//     character.frameX++;
//     console.log('moved if');

// }else { 
//     character.frameX = 0;
//     console.log('moved else');
// }};

//============== foreach to make em all move once and for all
setInterval(() =>{
    foes.forEach(element => {
        if (element.frameX < element.maxFrame) {
            element.frameX++;
        }else{element.frameX = 0;}
    })
}, 800);
//==========================================================================================//




//============================ START BATTLE ========================//
function battleStart() {
    for (i = 0; i < foes.length; i++) {
    if (detechHit(hero, foes[i]) && hero.moving && foes[i].alive) {
     // ====== TEST====external animations library== WORKS!
     //console.log('trigger');
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

}}}


//================Heal
function useHeal() {
    if (hero.heal && hero.battleGround) {
        if (hero.hp + 50 <= hero.maxHp) {
            hero.heal = false;
            hero.hp += 50;
            console.log('You recovered 50 HP!');
        }else {
            hero.heal = false;
            hero.hp = hero.maxHp;
            console.log('You recovered 50 HP!');
        }
    }else{console.log('Flask Empty.')}
}


// =================================== ATTACKS ===================================//


// Mob attack loop
function attackloop(){
    if (hero.battleGround && hero.hp > 0) {
        console.log('condition met');
    hero.target.attack();
    }
}

// called at 4 seconds after transcition begins, it stops outer worl from 
// displaying in the loop and starts the Battle ground loop as battleGround comes on.
function battleGo(){
    hero.battleGround = true;
    gsap.to('#overlap', {
        opacity: 0,
       })
    
}
//================ This is a timer for your turn that comes on 3 seconds after attacking
function turnBased(){
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
        hero.xp += xp
        gsap.to('#overlap', {
            opacity: 1,
            repeat: 4,
            yoyo: true,
            duration: 0.4
           })
        setTimeout(battleStop, 6000);
        setTimeout(menuHide, 2000);

}}
//===================== ends the battle and allows player to move again.
function battleStop(){
    hero.battleGround = false;
    hero.moving = true;
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




