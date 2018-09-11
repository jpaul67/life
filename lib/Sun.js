var LifeObj = require("./LifeObj.js");

class Sun extends LifeObj{
    constructor(){
      super();
        this._age = 1;
        this._health = 100;
        this._food = -1;//== na
        this._type = 0;//type 0 == sun
        this._name = 'Sun';
        }

  // Getters


  // Setters
 

  //class functions
  checkWeather() {
    //the sun is always on, but this gives us a way to randomize 'weather'/ thus a varaible if needed
    return Math.floor(Math.random() * Math.floor(3));// expected output: 0, 1 or 2
  }


}

module.exports = Sun