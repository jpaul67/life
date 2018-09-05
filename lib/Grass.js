var LifeObj = require("./LifeObj.js");

class Grass extends LifeObj{
    constructor(){
      super();
        this._age = 1;
        this._health = Math.floor(Math.random()*3) + parseFloat(0); // == init grass health to 0-3
        this._food = 0;//type 0 == sun/weather
        this._type = 1;//type 1 == grass
        this._name = 'grass';
        }

  // Getters
  

  // Setters
 

  //class functions
  grow() {
    this._health ++;
  }


}

module.exports = Grass