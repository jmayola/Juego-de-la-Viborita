let rectX;
let rectY;
let ellX = 10;
let ellY = 10;
let nz = 5;
let xz = 5;
function setup() {
  createCanvas(700,600)
}
function draw() {
  background(200,200,200)
  fill(255)
  ellipse(ellX,ellY, 40,40)
  rect(rectX,rectY,60,60)
  if(ellX < 0 || ellX > 700){
   nz = nz * (-1);
  }
  if(ellY < 0 || ellY > 600){
   xz = xz * (-1);
  }
  ellX = ellX + nz
  ellY = ellY + xz
  text(ellY, 450,200)
  text(ellX, 250,200)
  text(rectX, 450,400)
  text(rectY, 250,400)
  
  if(ellX > rectX && ellX < rectX + 60){
        if(ellY > rectY && ellY < rectY + 60){
              xz = xz * (-1);
              nz = nz * (-1);
        }
      }
}
function mouseMoved(){
  rectX= mouseX-30;
  rectY= mouseY-30;
}
