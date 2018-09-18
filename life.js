/**
 * ABOUT
 * This is a simple tinker in JavaScrip inheritance based around a game of life type exercise;
 *          The Sun grows and can regrow Grass. Grass health (high to low) is: @, #, *, .  with . == to 0 health;  
 *          Rabbits eat grass (or starve) and can multiply;
 *          Wolfs eat rabbits (or starve);
 *          The game ends after all animals are dead. Final score is how many turns the little simulation was able to keep life...
 * 
 * By Jeremy Petersen jerpetersen@gmail.com
 * 
 * This is the main program file
 * 
 * //ToDo
 * Maybe add wolfs multiplying?
 * Maybe keep a log of score data to save trends?
 * 
 *  
*/



//var LifeObj = require("./lib/LifeObj.js");
var SunObj = require("./lib/Sun.js");
var GrassObj = require("./lib/Grass.js");
var RabbitObj = require("./lib/Rabbit.js");
var WolfObj = require("./lib/Wolf.js");

var BoardSize = 10;
var NumRabbits = 12;
var MaxRabbitPop = 12;
var NumWolfs = 4;

var Sun = new SunObj();
var grassGridAr = [];
var RabbitsAr = [];
var WolfsAr = [];
var gameTurn = 0;
var wolfKills = 0;



/***Functions***/

function sleepy(secs) {
    secs = (+new Date) + secs * 1000;
    while ((+new Date) < secs);
  }

function randWholeNum(max){
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function getOccupants(x,y){

    var o = [];

    //Rabbits
    for(var i = 0; i < RabbitsAr.length; i++){
        if (RabbitsAr[i].x == x && RabbitsAr[i].y == y)
        o.push(RabbitsAr[i]);
    }

    //Wolfs
    for(var i = 0; i < WolfsAr.length; i++){
        if (WolfsAr[i].x == x && WolfsAr[i].y == y)
        o.push(WolfsAr[i]);
    }

    return o;
}

function CheckForRabbitLove(x,y){

    var m = false;
    var f = false;

    //Rabbits
    for(var i = 0; i < RabbitsAr.length; i++){//check for M and F
        if (RabbitsAr[i].x == x && RabbitsAr[i].y == y && RabbitsAr[i].gender == 1)
            m = true;
        if (RabbitsAr[i].x == x && RabbitsAr[i].y == y && RabbitsAr[i].gender == 2)
            f = true;

        //effeceicy gain    
        if (m==true && f==true)
            break;
    }

    if (m==true && f==true){
        return true;
    }else{     

        return false; 
    }   
}

function CheckForRabbitToEat(x,y){

    var rabbitIndex = -1;

    //loop over Rabbits to see if on is on this spot
    for(var i = 0; i < RabbitsAr.length; i++){
        if (RabbitsAr[i].x == x && RabbitsAr[i].y == y){
            rabbitIndex = i;
            break;
        }
    }

    return rabbitIndex;
}

function growGrass(){
   
    for(var x = 0; x < BoardSize; x++){
       
        for(var y = 0; y < BoardSize; y++){
            grassGridAr[x][y].grow();//grow each cell
        }
 
    }
}

function reGrowGrass(){
   
    for(var x = 0; x < BoardSize; x++){
       
        for(var y = 0; y < BoardSize; y++){

            if(Sun.checkWeather() > 1)
                grassGridAr[x][y].grow();//33% chance to + grow a cell
        }
 
    }
}

function moveWolfs(){
    for(var i = 0; i < WolfsAr.length; i++){
        //Wolf moves 1 space in any valid direction. Outcomes: 1) if lands on rabbit checks his hunger against eating the rabbit
        newX = -1;
        newY = -1;

        //get valid x move... Not the most efficient, but it works...
        do{
                temp = randWholeNum(2);
                if (temp == 2) temp = -1;//quick flip because I'mm too lazy to fix random num genroator to include a neg option...

                newX = temp + WolfsAr[i].x;

            }while (newX > BoardSize || newX < 1);

        //get valid y move... Not the most efficient, but it works...
        do{
            temp = randWholeNum(2);
            if (temp == 2) temp = -1;//quick flip because I'mm too lazy to fix random num genroator to include a neg option...

            newY = temp + WolfsAr[i].y;

            }while (newY > BoardSize || newY < 1);

        //update obj to new location 
        WolfsAr[i].x = newX;
        WolfsAr[i].y = newY;

        //Every move makes wolf more hungry
        WolfsAr[i].hangry++;

        //see if wolf is hangry enough to eat a rabbit (>3 hunger)
        if(WolfsAr[i].hangry > 3){
            tempIndex = CheckForRabbitToEat(newX-1,newY-1);
            if( tempIndex > -1){//if a victom exists, CheckForRabbitsToEat() function will have return its RabbitsAr index
                RabbitsAr.splice(tempIndex,1);//dead rabbit, so remove from array
                WolfsAr[i].eat();
                wolfKills ++;
            }
        }
            
        //see if wolf is hangry enough to die (>10 hunger)
        if(WolfsAr[i].hangry > 10){
            WolfsAr.splice(i,1);//if dead remove from array
            i--; //adjust loop size
        }

    }
}

function moveRabbits(){
    var newRabs = 0;
    for(var i = 0; i < RabbitsAr.length; i++){
    
        //Rabbit moves 1 space in any valid direction. Outcomes: 1) if he has food he eats it and grass dies down 1 level. ELSE 2) Rabbit looses a life.
        newX = -1;
        newY = -1;

        //get valid x move... Not the most efficient, but it works...
        do{
                temp = randWholeNum(2);
                if (temp == 2) temp = -1;//quick flip because I'mm too lazy to fix random num genroator to include a neg option...

                newX = temp + RabbitsAr[i].x;

            }while (newX > BoardSize || newX < 1);

        //get valid y move... Not the most efficient, but it works...
        do{
            temp = randWholeNum(2);
            if (temp == 2) temp = -1;//quick flip because I'mm too lazy to fix random num genroator to include a neg option...

            newY = temp + RabbitsAr[i].y;

            }while (newY > BoardSize || newY < 1);

        //update obj to new location 
        RabbitsAr[i].x = newX;
        RabbitsAr[i].y = newY;

        //Rabbit must now eat or loose health
        if(grassGridAr[newX-1][newY-1].health > 0){//yum yum
                grassGridAr[newX-1][newY-1].health --;

        }else{ //Starving        
                RabbitsAr[i].lukyFeet --;
                if(RabbitsAr[i].lukyFeet <1){
                    RabbitsAr.splice(i,1);//if dead remove from array
                    i--; //adjust loop size
                }
        }

        //check for rabbit love
        if(CheckForRabbitLove(newX-1,newY-1)){
            newRabs = newRabs + RabbitsAr[0].love();         
        }


    }

    //After all moves done, then add in new Rabbits

    if(RabbitsAr.length + newRabs > MaxRabbitPop)//since we are keeping it simple below in dumping out new kids, need a safty net...
        newRabs = MaxRabbitPop - RabbitsAr.length;

        for(var j = 0; j < newRabs; j++){
            RabbitsAr.push(new RabbitObj());
            //keep it simple and just randomly dump the new children out on the board...
            RabbitsAr[RabbitsAr.length-1].x = randWholeNum(BoardSize);
            RabbitsAr[RabbitsAr.length-1].y = randWholeNum(BoardSize);
        }


}


function draw(){
    //info on changeing color in term output: https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script

    var t='\033[32m';//black
    var ocs = [];

    console.clear();
    
    for(var x = 0; x < BoardSize; x++){
       
        for(var y = 0; y < BoardSize; y++){
            
            //look for any occupants on this cell
            ocs = getOccupants(x+1,y+1);
            temp = ""; //Use this to only write last creature in stack

            if (ocs.length > 0){//do we need to draw a creature
                for(var i = 0; i < ocs.length; i++){
                    //rabbit
                    if(ocs[i].type == 2){
                        temp ='\033[33m' + "R";//Yellow
                    }
                    //Wolf
                    if(ocs[i].type == 3){
                        temp ='\033[31m' + "W";//Red
                    }

            }
                t = t + temp + '\033[32m'; //add in critter then green after; 
            }else{//figure out what state of grass to draw
                switch(grassGridAr[x][y].health) {
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
t2='\033[36m' +'Turn: ' + gameTurn + ' Rabbits:' + RabbitsAr.length + ':[ ';
    //loop over each rabbit health
    for(var j = 0; j < RabbitsAr.length; j++){
        t2 = t2 + RabbitsAr[j].lukyFeet + ' ';
    }
    t2 = t2 + '] wolfs:' + WolfsAr.length + ' Wolfkills:{' + wolfKills + '}[ ';

    //loop over each Wolf hunger
    for(var j = 0; j < WolfsAr.length; j++){
        t2 = t2 + WolfsAr[j].hangry + ' ';
    }
    t2 = t2 + ']';
    console.log(t2 + '\n');
    sleepy(2);
}




/***init vars***/

//Init grass grid
for(var x = 0; x < BoardSize; x++){
    grassGridAr[x] = [];//init nested array
    for(var y = 0; y < BoardSize; y++){
        var grassObj = new GrassObj();
        grassGridAr[x][y] = grassObj;
    }
}

//Init Rabbits
for(var i = 0; i < NumRabbits; i++){
    RabbitsAr[i] = new RabbitObj();

   //Rabbit starting loc
    RabbitsAr[i].x = randWholeNum(BoardSize);
    RabbitsAr[i].y = randWholeNum(BoardSize);
}

//Init Wolfs
for(var i = 0; i < NumWolfs; i++){
    WolfsAr[i] = new WolfObj();

   //Rabbit starting loc
   WolfsAr[i].x = randWholeNum(BoardSize);
   WolfsAr[i].y = randWholeNum(BoardSize);
}


/***Outputting to display...***/

draw(); //initial random grass grid

//Check the weather on the Sun obj to see if we need to grow our grass as part of startup
for(var x = 0; x < Sun.checkWeather(); x++){
    growGrass();
    draw();
}

//Move life around on the grass until they all run out of lives.
do{
    gameTurn ++;
    moveRabbits();
    moveWolfs();
 
    if(gameTurn % 3 == 0)
        reGrowGrass();//every 3rd turn let grass try to regrow

    draw();
}while (RabbitsAr.length > 0 || WolfsAr.length > 0);