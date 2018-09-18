var LifeObj = require("./LifeObj.js");

class Rabbit extends LifeObj{
    constructor(){
      super();
        this._age = 1;
        this._health = 1;
        this._food = 1;//== grass
        this._type = 2;//type 2 == rabbit
        this._gender = Math.floor(Math.random() * Math.floor(2)) + 1;// expected output: 1 (male) or 2 (female)
        this._name = 'Rabbit';
        this._lukyFeet = Math.floor(Math.random() * Math.floor(5)) + 1;// expected output: 1,2,3 or 4
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
    var foo = Math.floor(Math.random() * Math.floor(5)); + 1// expected output: 1,2,3 or 4

     return foo;

  }


}

module.exports = Rabbit