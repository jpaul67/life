var LifeObj = require("./LifeObj.js");

class Wolf extends LifeObj{
    constructor(){
      super();
        this._age = 1;
        this._health = 3;
        this._food = 2;//== Rabbit
        this._type = 3;//type 2 == Wolf
        this._gender = Math.floor(Math.random() * Math.floor(2)) + 1;// expected output: 1 (male) or 2 (female)
        this._name = 'Wolf';
        this._hangry = Math.floor(Math.random() * Math.floor(4)) + 1;// expected output: 1,2,3
        }

  // Getters

  get hangry() {
        return this._hangry;
  }


  // Setters
  set hangry(val){
    this._hangry = val;
  }


  //class functions
  eat(){
    this._hangry = 0;
  }


}

module.exports = Wolf