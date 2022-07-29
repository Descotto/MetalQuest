
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







const battleMaps = []
//=================================== BATTLEGROUND EVENTS and stuff ========================//

//======================================= END BATTLE =====================================//
function endBattle() {
    if (dalton.hp <= 0) {
        dalton.hp = 1;
        dalton.alive = false;
        let xp = dalton.xp / 8
        hero.xp += xp
        overlap.style.opacity = 1;
        setTimeout(battleStop, 6000);
        setTimeout(menuHide, 2000);

}}



//============================ START BATTLE ========================//
function battleStart() {
    if (detechHit(hero, dalton) && hero.moving) {
        if (dalton.alive) {
     // ====== TEST====external animations library== WORKS!
     //console.log('trigger');
     hero.moving = false
     gsap.to('#overlap', {
     opacity: 1,
     repeat: 4,
     yoyo: true,
     duration: 0.4
    })
    
    setTimeout(battleGo, 4000);
    setTimeout(attackloop, 6000);
    setTimeout(turnBased, 4000);
    setTimeout(menuShow, 6500);

}}}


//================Heal
function useHeal() {
    if (hero.heal && hero.battleGround) {
        if (hero.hp + 50 <= hero.maxHp) {
            hero.hp += 50;
        }else {
            hero.hp = hero.maxHp;
        }
    }
}


// =================================== ATTACKS ===================================//
function deBuffAtt(who) {
    who.att = who.att / 2;
}


function attackloop(){
    if (dalton.alive && hero.hp > 0) {
    setInterval(dalton.attack, 10000);
    }
}


function battleGo(){
    hero.battleGround = true;
    
}
function battleStop(){
    hero.battleGround = false;
    hero.moving = true;
}

function turnBased(){
    if (hero.battleGround) {
        hero.turn = true
    }
}

//==============================================Event Listeners for attacks ==========================//
healBtn.addEventListener('click', () => {
    console.log('heal');
    useHeal();
});

attBtn.addEventListener('click', () => {
    console.log('attack');
    hero.attack();
});

tpbtn.addEventListener('click', () => {
    console.log('tp');
    hero.TPmove();
});