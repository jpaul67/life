/**Note: using ES6    
 * 
 * This is the main program file
 * 
*/

//var LifeObj = require("./lib/LifeObj.js");
var SunObj = require("./lib/Sun.js");
var GrassObj = require("./lib/Grass.js");
var RabitObj = require("./lib/Rabit.js");

var grassGrid = [];
var BoardWidth = 3;
var BoardHeight = 3;


/*
//var foo = new LifeObj();

var g1 = new GrassObj();
var g2 = new GrassObj();
var g3 = new GrassObj();
var g4 = new GrassObj();

var r1 = new RabitObj();


//console.log(foo.age); 
//foo.age = 5;
//console.log(foo.age); 


console.log(g1._health); 
g1.grow();
console.log(g1._health);

console.log(g2._health);

console.log(r1._lukyFeet);

*/

function draw(){

    var t='';

    console.clear();
    
    for(var x = 0; x < BoardWidth; x++){
       
        for(var y = 0; y < BoardHeight; y++){
            

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
        console.log(t + '\n');
        t='';
    }


}

function sleepy(secs) {
    secs = (+new Date) + secs * 1000;
    while ((+new Date) < secs);
  }


//lets create our grass grid
for(var x = 0; x < BoardWidth; x++){
    grassGrid[x] = [];//init nested array
    for(var y = 0; y < BoardHeight; y++){
        var grassObj = new GrassObj();
        grassGrid[x][y] = grassObj;
    }
}

//console.log(grassGrid);
//console.log(grassGrid[1][1].health);
//grassGrid[1][1].grow();
//console.log(grassGrid[1][1].health);
//console.log(grassGrid[1][1]);


//lets draw the new grass
draw();
sleepy(2);
grassGrid[0][0].grow();
draw();
sleepy(2);
grassGrid[0][0].grow();
draw();
