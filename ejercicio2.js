let s;
let scl = 20;
let food;
let flag = 0
let posxS = 100
let posyS = 100
let width = 700
let height = 700
function setup() {
  createCanvas(width, height);
  s = new Snake();
  frameRate(10); 
	//food = createVector(random(width), random(height));
	//pickLocation(); 
}
class Snake {
  Show(){
    fill(0,255,0)
    rect(posxS, posyS, scl, scl)
  }
  Dir(x,y){
        posxS +=x
        posyS +=y
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
  //if (s.eat(food)) {
  //	pickLocation();
  //}
  //s.death();
  //s.update();
  //drawing snake food
  //fill(255, 0, 100);
  //rect(food.x, food.y, scl, scl);
  s.Show();
}

function keyPressed(keyCode) {
  let s = new Snake()
  console.log(keyCode)
  switch(keyCode.key){
    case 'ArrowUp':
    s.Dir(0, -scl); //moves 0 along x and -1 (up) along y axis
    break
    case 'ArrowDown':
    s.Dir(0, scl); //moves 0 along x and -1 (up) along y axis
    break
    case 'ArrowLeft':
    s.Dir(-scl, 0); //moves 0 along x and -1 (up) along y axis
    break
    case 'ArrowRight':
    s.Dir(scl, 0); //moves 0 along x and -1 (up) along y axis
    break
  }
}


