/**
 * ABOUT
 * This is a simple tinker in JavaScrip inheritance based around a game of life type exercise.
 * 
 * This is the main program file
 * 
 * 
 * //ToDo
 *
 * Introduce wolfs that eat rabbits!
 *  
 *  Maybe  check that Rabbits need food in order to multiply 
 * 
 *  
*/

//var LifeObj = require("./lib/LifeObj.js");
var SunObj = require("./lib/Sun.js");
var GrassObj = require("./lib/Grass.js");
var RabbitObj = require("./lib/Rabbit.js");

var Sun = new SunObj();
var grassGrid = [];
var Rabbits = [];
var gameTurn = 0;

var BoardWidth = 10;
var BoardHeight = 10;
var NumRabbits = 30;
var MaxRabbitPop = 50;



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
    for(var i = 0; i < Rabbits.length; i++){
        if (Rabbits[i].x == x && Rabbits[i].y == y)
        o.push(Rabbits[i]);
    }

    return o;
}

function CheckForRabbitLove(x,y){

    var m = false;
    var f = false;

    //Rabbits
    for(var i = 0; i < Rabbits.length; i++){//check for M and F
        if (Rabbits[i].x == x && Rabbits[i].y == y && Rabbits[i].gender == 1)
            m = true;
        if (Rabbits[i].x == x && Rabbits[i].y == y && Rabbits[i].gender == 2)
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



function draw(){
    //info on changeing color in term output: https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script

    var t='\033[32m';//black
    var ocs = [];

    console.clear();
    
    for(var x = 0; x < BoardWidth; x++){
       
        for(var y = 0; y < BoardHeight; y++){
            
            //look for any occupants on this cell
            ocs = getOccupants(x+1,y+1);
            temp = ""; //Use this to only write last creature in stack

            if (ocs.length > 0){//do we need to draw a creature
                for(var i = 0; i < ocs.length; i++){
                    //rabbit
                    if(ocs[i].type == 2){
                        temp = "R";
                    }
            }
                t = t + '\033[31m' + temp + '\033[32m'; //red R, then green after; 
            }else{//figure out what state of grass to draw
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
t2='\033[36m' +'Turn: ' + gameTurn + ' Rabbits:' + Rabbits.length + ':[ ';
    //loop over each rabbit health
    for(var j = 0; j < Rabbits.length; j++){
        t2 = t2 + Rabbits[j].lukyFeet + ' ';
    }
    t2 = t2 + ']';
    console.log(t2 + '\n');
    sleepy(2);
}

function growGrass(){
   
    for(var x = 0; x < BoardWidth; x++){
       
        for(var y = 0; y < BoardHeight; y++){
            grassGrid[x][y].grow();//grow each cell
        }
 
    }
}

function reGrowGrass(){
   
    for(var x = 0; x < BoardWidth; x++){
       
        for(var y = 0; y < BoardHeight; y++){

            if(Sun.checkWeather() > 1)
                grassGrid[x][y].grow();//33% chance to + grow a cell
        }
 
    }
}

function moveRabbits(){
    var newRabs = 0;
    for(var i = 0; i < Rabbits.length; i++){
    
        //Rabbit moves 1 space in any valid direction. Outcomes: 1) if he has food he eats it and grass dies down 1 level. ELSE 2) Rabbit looses a life.
        newX = -1;
        newY = -1;

        //get valid x move... Not the most efficient, but it works...
        do{
                temp = randWholeNum(2);
                if (temp == 2) temp = -1;//quick flip because I'mm too lazy to fix random num genroator to include a neg option...

                newX = temp + Rabbits[i].x;

            }while (newX > BoardWidth || newX < 1);

        //get valid y move... Not the most efficient, but it works...
        do{
            temp = randWholeNum(2);
            if (temp == 2) temp = -1;//quick flip because I'mm too lazy to fix random num genroator to include a neg option...

            newY = temp + Rabbits[i].y;

            }while (newY > BoardHeight || newY < 1);

        //update obj to new location 
        Rabbits[i].x = newX;
        Rabbits[i].y = newY;

        //Rabbit must now eat or loose health
        if(grassGrid[newX-1][newY-1].health > 0){//yum yum
                grassGrid[newX-1][newY-1].health --;

        }else{ //Starving        
                Rabbits[i].lukyFeet --;
                if(Rabbits[i].lukyFeet <1){
                    Rabbits.splice(i,1);//if dead remove from array
                    i--; //adjust loop size
                }
        }

        //check for rabbit love
        if(CheckForRabbitLove(newX-1,newY-1)){
            newRabs = newRabs + Rabbits[0].love();         
        }


    }

    //After all moves done, then add in new Rabbits

    if(Rabbits.length + newRabs > MaxRabbitPop)//since we are keeping it simple below in dumping out new kids, need a safty net...
        newRabs = MaxRabbitPop - Rabbits.length;

        for(var j = 0; j < newRabs; j++){
            Rabbits.push(new RabbitObj());
            //keep it simple and just randomly dump the new children out on the board...
            Rabbits[Rabbits.length-1].x = randWholeNum(BoardWidth);
            Rabbits[Rabbits.length-1].y = randWholeNum(BoardHeight);
        }


}

/***init vars***/

//Init grass grid
for(var x = 0; x < BoardWidth; x++){
    grassGrid[x] = [];//init nested array
    for(var y = 0; y < BoardHeight; y++){
        var grassObj = new GrassObj();
        grassGrid[x][y] = grassObj;
    }
}

//Init Rabbits
for(var i = 0; i < NumRabbits; i++){
    Rabbits[i] = new RabbitObj();

   //Rabbit starting loc
    Rabbits[i].x = randWholeNum(BoardWidth);
    Rabbits[i].y = randWholeNum(BoardHeight);
}



/***Outputting to display...***/

draw(); //initial random grass grid

//Check the weather on the Sun obj to see if we need to grow our grass as part of startup
for(var x = 0; x < Sun.checkWeather(); x++){
    growGrass();
    draw();
}

var jer = NumRabbits;
//Move the rabbits around and see how long they can survive on the grass until they all run out of lives.
do{
    gameTurn ++;
    moveRabbits();
 
    if(gameTurn % 3 == 0)
        reGrowGrass();//every 3rd turn let grass try to regrow

    draw();
}while (Rabbits.length > 0);