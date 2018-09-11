var LifeObj = require("./LifeObj.js");

class Rabit extends LifeObj{
    constructor(){
      super();
        this._age = 1;
        this._health = 1;
        this._food = 1;//== grass
        this._type = 2;//type 2 == rabit
        this._name = 'Rabit';
        this._lukyFeet = Math.floor(Math.random() * Math.floor(5));// expected output: 0,1,2,3 or 4
        }

  // Getters

  get lukyFeet() {
        return this._lukyFeet;
  }


  // Setters
  set lukyFeet(val){
    this._lukyFeet = val;
  }


  //class functions
  love() {
    //To do
  }


}

module.exports = Rabit