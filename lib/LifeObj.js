/**  
 * 
 * Base object for all life types
 * 
*/

class LifeObj{
    constructor(){
        this._x = -1;
        this._y = -1;
        this._age = -1;
        this._health = -1;
        this._food = -1;
        this._id = -1;
        this._type = -1;
        this._name = '';
        this._timeStamp = Date.now();
        }

  // Getters
  get loc(){
    return this._x + ',' + this._y ;
  }
  
  get x(){
    return this._x;
  }

  get y(){
    return this._y;
  }

  get age() {
    return this._age;
  }

  get health() {
    return this._health;
  }

  get food() {
    return this.food;
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  get name() {
    return this._name;
  }


 // Setters
  set x(val){
    this._x = val;
  }

  set y(val){
    this._y = val;
  }

  set age(val) {
    this._age = val;
  }

  set health(val) {
    this._health = val;
  }

  set food(val) {
    this._food = val;
  }

  set id(val) {
    this.id = val;
  }

  set type(val) {
    this._type = val;
  }

  set name(val) {
    this._name = val;
  }


}

module.exports = LifeObj