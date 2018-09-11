/**Note: using ES6    
 * 
 * This is the main program file
 * 
 * 
 * //ToDO
 * Better grass board (use color maybe?)
 * Rabit.love() MAybe add random chance for regrowth
 * 
*/

//var LifeObj = require("./lib/LifeObj.js");
var SunObj = require("./lib/Sun.js");
var GrassObj = require("./lib/Grass.js");
var RabitObj = require("./lib/Rabit.js");

var grassGrid = [];
var BoardWidth = 10;
var BoardHeight = 10;
var gameTurn = 0;

var Sun = new SunObj();
var Rabit = new RabitObj();


/***init vars***/

//lets init our grass grid
for(var x = 0; x < BoardWidth; x++){
    grassGrid[x] = [];//init nested array
    for(var y = 0; y < BoardHeight; y++){
        var grassObj = new GrassObj();
        grassGrid[x][y] = grassObj;
    }
}

//Rabit starting loc
Rabit.x = randWholeNum(BoardWidth);
Rabit.y = randWholeNum(BoardHeight);



/***Functions***/

function sleepy(secs) {
    secs = (+new Date) + secs * 1000;
    while ((+new Date) < secs);
  }

function randWholeNum(max){
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}


function draw(){
    //info on changeing color in term output: https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script

    var t='\033[30m';//black

    console.clear();
    
    for(var x = 0; x < BoardWidth; x++){
       
        for(var y = 0; y < BoardHeight; y++){
            
            //rabit
            if(Rabit.x-1 == x && Rabit.y-1 == y){
                //t = t + 'R';
                t = t + '\033[31m' + 'R' + '\033[30m'; //red R, then black after

            }else{//figure out what state of grass to draw in
                switch(grassGrid[x][y].health) {
                    case 1:
                        t = t + '*';
                        break;
                    case 2:
                        t = t + '#';
                        break;
                    case 3:
                        t = t + '@';
                        break;
                    default:
                        t = t + '.';
                } 

            }

        }
        console.log(t + '\n');
        t='';
    }

    console.log('Turn: ' + gameTurn + ' Rabit lives:' + Rabit.lukyFeet + '\n');

    sleepy(2)
}

function growGrass(){
   
    for(var x = 0; x < BoardWidth; x++){
       
        for(var y = 0; y < BoardHeight; y++){
            grassGrid[x][y].grow();//grow each cell
        }
 
    }
}

function moveRabit(){
   //Rabit moves 1 space in any valid direction. Outcomes: 1) if he has food he eats it and grass dies down 1 level. 2) Rabit looses a life

   newX = -1;
   newY = -1;

   //get valid x move... Not the most efficient, but it works...
   do{
        temp = randWholeNum(2);
        if (temp == 2) temp = -1;//quick flip because I'mm too lazy to fix random num genroator to include a neg option...

        newX = temp + Rabit.x;
    }while (newX > BoardWidth || newX < 1);

   //get valid y move... Not the most efficient, but it works...
   do{
    temp = randWholeNum(2);
    if (temp == 2) temp = -1;//quick flip because I'mm too lazy to fix random num genroator to include a neg option...

    newY = temp + Rabit.y;
    }while (newY > BoardHeight || newY < 1);

   //update obj to new location 
   //console.log('x: ' +  Rabit.x + ': ' + newX + '   y: ' +  Rabit.y + ': ' + newY + '\n');
   Rabit.x = newX;
   Rabit.y = newY;




   //Rabit must now eat or loose health
   if(grassGrid[newX-1][newY-1].health > 0){//yum yum
        grassGrid[newX-1][newY-1].health --;
   }else{ //Starving
        Rabit.lukyFeet --;
   }

}



/***Outputting to display...***/

draw(); //initial random grass grid


//lets check the weather on the Sun obj to see if we need to grow our grass
for(var x = 0; x < Sun.checkWeather(); x++){
    growGrass();
    draw();
}

//now let's move the rabit around and see how long he can survive on the grass until he runs out of lives.
do{
    gameTurn ++;
    moveRabit();
    draw();
}while (Rabit.lukyFeet > 0);
