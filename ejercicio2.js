let s;
let scl = 20;
let food;
let posxS = 10
let posyS = 10
function setup() {
  createCanvas(700, 700);
  s = new Snake();
  frameRate(10); 
	food = createVector(random(width), random(height));
	pickLocation(); 
}
class Snake {
   Snake(){
    fill(0,255,0)
    rect(posxS, posyS, scl, scl)
  }
    eat() {
      if()
    }
}
//function to store snake's location on the grid
//floor calculates the closest int value that is less than or equal to the value of the parameter.
function pickLocation() {
  var cols = floor(width/scl);
	var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));//this ensure the food is in the grid aligned with snake
	food.mult(scl);//to expand it back out


}

function draw() {
  background(51);
  
  //if snake eat food, pick location
  if (s.eat(food)) {
  	pickLocation();
  }
  s.death();
  s.update();
  s.show();
	
  //drawing snake food
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
  
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1); //moves 0 along x and -1 (up) along y axis
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}


