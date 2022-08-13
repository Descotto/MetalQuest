Metal Quest



Nothing but some old school rpg game play and some climb the tower mashed in one game. The game will prove challenging while serenating you to the ssweet sound of METAL!

Technologies:
HTML5, CSS, JavaScript.

Description:
the project runs on a loop for every setInterval(project, 60).
we can then insert scenarios into the loop using variables.
triggers listen for the variables to switch and either execute a function or stop a function from excecution.

How does it work:

window.addEventListener('DOMContentLoaded', function....
on load this function creates arrays containing enemies and chests and sets an interval for 60.

gameLoop();
contains all functions related to stages and battlezones each dependant on a changing variable.

moveChar();
listens for keystrokes and moves the hero accordingly.

stage1();
Loads if the variable stg = 1.
contains the "cave" map and battle zones as well as monsters positions, sprites and behaiviours.

detectHit();
this function takes 2 parameters and returns true is theres contact in between them.

battleStart();
this one has a couple of requirements. First it runs detectHit(hero, enemiesArray); every time the game loops, it also checks that the aparameter hero.moving is true. Checks is the parameter hero.battleGround is false and lastly it checks that the aparameter enemy.alive is true.

if all of these conditions are met, the functions will set hero.moving to false and hero.battleGround to true which will trigger another listener for...

battle1();
battle 1 will stop the stage1() from running in the loop and will assing a new sprite and positions to the enemie and the hero.
it will also "yoyo" the opacity of the html DIV on top of the canvas for dramatic effect.
shortly after the battle starts a second div will become .'block'.
this new Div called 'menu' will contain 3 buttons:

Attack: it will execute the hero.attack() function which will perform the math calculation for the 'damage' in adition it will Math.random between 1 and 15 and add it to the damage. it will also execute turnBased(); which will make the button unavailable for 3 seconds.

Heavy Metal: it will execute the hero.TPmove() function when used.
hero.TPmove adds 20 to the hero.str which is used in calculating the damage.
Heavy Metal: can only be used when the hero.tp >= 100 and a trigger will make the color of the div alternate between 3 colors in an array for every loop.

Flask: at the moment flask 'heals' you by adding a define 100 to the hero.hp attribute. after this is used the hero.heal becomes false and it will not let you use it again. opening a chest will turn hero.heal back to true.

attackLoop();
it runs when the battle starts and it makes the enemi attack you in a loop.
this one has a few conditions: when the battle is first loaded by detectHit(); it also makes the value hero.target = to whatever monster collided with the hero.and then I can say hero.target.attack(); reffering to the monster.attack();
changing the interval will dramatically impact difficulty.

endBattle();
this is a trigger constantly running in the loop saying if hero.target.hp < 0 then it will hero.target.hp = 1 and cancel itself out and then it will run 2 more functions:
    menuHide();
this one will turn the menu Div back to display = 'none'.
    bettleStop();
this one will set hero.battleGround to false thus ending the loop and allowing stage1() to run again. it also sets hero.moving to true allowing the hero to move again.
    endBattle(); will also reward hero.xp += (a set math).

gameOver();
on this one I had to be a bit redundant to avoid a bug I was getting if the hero.hp went to negative numbers. I have a trigger condition that will make hero.hp = 'OVER' in a string.
gameOver(); listens for that change and if hero.hp = 'OVER' it yoyos the opacity of the div on top of the canavas and changes it's text to 'GAME OVER'


The Future:
the way the game is structured adding new maps with it's own customized conditions would be very simple by just using the stg variable.
stage2(); isn't ready yet, but it listens for stg = 2 and then it triggers.
at the same time stage1(); only runs when stg = 1.
which brings me to my next function:

openDoor();
this one is running a enemies.forEach.. 
it checks every enemy.alive = true and if it's false it adds 1 to the enemyDead count.
next it says ignore that enemy the next time you check.
when the count reaches 5 it will switch door.open to true.

LOGS:
the way I invisioned the game using the console.log gave me an idea to make a console.log inside the game.
first I made a <Div> with 6 <p> 3 on each side.
then I made a loop that makes line 3 copy line 2, line 2 copy line 1 and line1.textContent = '' thus giving it the illusion of a scrolling log.

stopMusic();
is a trigger running in each loop and it take one parameter:
hero.battleGround:
                true: it will stop the music in the stageMusic array.
                false: it will stop the music in the battleMusic array.

playMusic();
is trigger by pressing WASD keys and if hero.battleGround = false.
it generates a random number between 0 2 and it uses that number to pick a song from an array.

playBattleMusic();
the same as playMusic() but it selects from a battleMusic array instead.


MAPS AND BOUNDARIES.
the maps were created using the Tile app and selecting from spritesheets.
i created the maps using layers which could be turned on and off.
I used a layer with a single 16x16 tile containing a red block to mark the boundaries.
after marking all the boundaries I hid the layer and exported the map as an image, then with the layers on I imported the map as a JSON file.

the JSON file contained arrays of tiles and selections which I later processed with javascript to draw the invisible barriers in the spot they where meant to be.





BUGS:
The way detectHit() works is a bit odd and sometimes it let's you break through boundaries.
