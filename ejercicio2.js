let s;
let scl = 20;
let food;
let flag = 0;
let posxS = 100;
let posyS = 100;
let width = 700;
let height = 700;
let lastMov = 1;
function setup() {
  createCanvas(width, height);
  s = new Snake();
  frameRate(10);
  //food = createVector(random(width), random(height));
  //pickLocation();
}
class Snake {
  Show() {
    fill(0, 255, 0);
    rect(posxS, posyS, scl, scl);
  }
  Movement(dir) {
    switch (dir) {
      case 0:
        this.Dir(0, -scl); //arriba
        break;
      case 1:
        this.Dir(0, scl); //abajo
        break;
      case 2:
        this.Dir(-scl, 0); //izquierda
        break;
      case 3:
        this.Dir(scl, 0); //derecha
        break;
    }
  }
  Dir(x, y) {
    posxS += x;
    posyS += y;
  }
}
//function to store snake's location on the grid
//floor calculates the closest int value that is less than or equal to the value of the parameter.
function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows))); //this ensure the food is in the grid aligned with snake
  food.mult(scl); //to expand it back out
}

function draw() {
  background(51);
  //if snake eat food, pick location
  //if (s.eat(food)) {
  //	pickLocation();
  //}
  //s.death();
  //s.update();
  //drawing snake food
  //fill(255, 0, 100);
  //rect(food.x, food.y, scl, scl);
  s.Show();
  if(posxS < 0 || posxS + scl > width || posyS < 0 || posyS + scl> height){
    fill(255,0,0)
    text("GAME OVER", height / 2, width / 2)
  }else{
    s.Movement(lastMov)
  }
}

function keyPressed(keyCode) {
  let s = new Snake();
  console.log(keyCode);
  switch (keyCode.key) {
    case "ArrowUp":
      lastMov = 0;
      break;
    case "ArrowDown":
      lastMov = 1;
      break;
    case "ArrowLeft":
      lastMov = 2;
      break;
    case "ArrowRight":
      lastMov = 3;
      break;
  }
}
