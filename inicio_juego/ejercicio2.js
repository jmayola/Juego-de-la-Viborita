let s;
let scl = 20;
let food;
let manzanas = 0; // Contador de manzanas
let posxS = 100;
let posyS = 100;
let width = 500;
let height = 500;
let lastMov = 1;
let thresshold = 35
let gameOver = false; // Variable para controlar si el juego ha terminado
let arboles = []; // Array para almacenar los árboles
let GeneArboles = false; // Variable para controlar si los árboles ya fueron generados
let randomFood = false;
let randomNum = 0;
let Frames = 5;
let colum = width / scl;
let filas = height / scl;
let foodPos;
let validPos = false;
let puntaje = 0; // Variable para el puntaje
let pausa = false; // Variable para pausa
let record = 0; // Variable para el récord

//CLASES
//CLASE VIBORITA
class Snake {
  constructor() {
    this.body = []; // Inicializa el cuerpo de la serpiente.
    this.body[0] = createVector(posxS, posyS);
  }

  Show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(66, 130, 44);
      rect(this.body[i].x, this.body[i].y, scl, scl);
    }
  }

  Movement(dir) {
    if (!gameOver) {
      // Asegura que la serpiente no se mueva si el juego ha terminado
      let head = this.body[this.body.length - 1].copy(); // Copia la posición de la cabeza.
      this.body.shift(); // Elimina el segmento de cola anterior.

      switch (dir) {
        case 0:
          head.y -= scl; // Arriba
          break;
        case 1:
          head.y += scl; // Abajo
          break;
        case 2:
          head.x -= scl; // Izquierda
          break;
        case 3:
          head.x += scl; // Derecha
          break;
      }

      this.body.push(head); // Agrega la nueva posición de la cabeza al cuerpo.

      // Comprueba si la serpiente choca contra la pared.
      if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
        gameOver = true; // Establece el estado del juego como "terminado".
      }

      // Comprueba si la serpiente choca consigo misma o con los árboles
      for (let i = 0; i < this.body.length - 1; i++) {
        if (head.equals(this.body[i])) {
          gameOver = true;
        }
      }

      for (let arbol of arboles) {
        if (head.equals(arbol.pos)) {
          gameOver = true;
          this.body.pop();
        }
      }
    }
  }

  Grow() {
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head); // Agrega una nueva posición de la cabeza al cuerpo, haciendo que la serpiente crezca.
  }
}

// CLASE ARBOL
class arbol {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }

  Show() {
    fill(83, 44, 28); // Color marrón para el árbol
    rect(this.pos.x, this.pos.y, scl, scl);
  }
}

//CLASE MANZANAS
class Apples {
  colocomida() {
    // Intentar encontrar una posición válida que no esté ocupada por un árbol
    while (!validPos) {
      foodPos = createVector(floor(random(colum)), floor(random(filas)));
      foodPos.mult(scl);
      validPos = true;
      for (let arbol of arboles) {
        if (foodPos.equals(arbol.pos)) {
          validPos = false;
          break;
        }
      }
    }
    food = foodPos; //se define otra variable para no stackear la memoria
  }
}
class SpecialApples extends Apples{
  counterVar = 0;
  counter(){
    this.counterVar += 1
  }
  foodX = 0;
  posVal = false
  foodColi(id){
    if(dist(s.body[s.body.length - 1].x,
      s.body[s.body.length - 1].y,this.foodX.x,this.foodX.y) < 1){
        manzanas++
        thresshold += 5
        this.counter()
      }
  }
  foodSpawn() {
    // Intentar encontrar una posición válida que no esté ocupada por un árbol
    while (!this.posVal) {
      this.foodX = createVector(floor(random(colum)), floor(random(filas)));
      this.foodX.mult(scl);
      this.posVal = true;
      for (let arbol of arboles) {
        if (this.foodX.equals(arbol.pos)) {
          this.posVal = false;
          break;
        }
      }
    }
  }
}

function lugararbol() {
  let colum = floor(width / scl);
  let filas = floor(height / scl);
  if (manzanas > 10) {
    let posarbol = createVector(floor(random(colum)), floor(random(filas)));
    posarbol.mult(scl);
    return arboles.push(new arbol(posarbol.x, posarbol.y));
  }
  for (let i = 0; i < manzanas; i++) {
    // Cambiamos la cantidad de árboles generados
    let posarbol = createVector(floor(random(colum)), floor(random(filas)));
    posarbol.mult(scl);
    arboles.push(new arbol(posarbol.x, posarbol.y));
  }
}

//INICIO DE P5
//INICIO DE P5
//INICIO DE P5

function setup() {
  createCanvas(width, height);
  s = new Snake();
  randomNum = floor(int(random(1, 10)));
  frameRate(Frames);
  roja = new Apples();
  roja.colocomida(); // Llama a esta función para colocar la comida en una ubicación inicial.
  amarilla = new SpecialApples(221,184,27)
}

//LOOP DE P5
//LOOP DE P5
//LOOP DE P5

function draw() {
  if(Frames < 20){
  frameRate(Frames);
}
  background(2, 7, 21);
  if(manzanas > 15 && manzanas % randomNum == 0){
    fill(221, 184, 27)
    rect(amarilla.foodX.x,amarilla.foodX.y,scl,scl)
    amarilla.foodSpawn()
    amarilla.foodColi()
  }
  else if(manzanas >= thresshold){
    location.href = "./paginas/win.html"
  }
  validPos = false; //INICIALIZAMOS SIEMPRE EN FALSO
  // Dibuja la comida.
  fill(152, 29, 29);
  rect(food.x, food.y, scl, scl);

  // Dibuja los árboles.
  for (let arbol of arboles) {
    arbol.Show();
  }

  s.Show();

  if (gameOver) {
    window.location.href = "gameover.html";
    // Actualizar el récord si el puntaje actual es mayor
    if (manzanas > record) {
      record = manzanas;
      localStorage.setItem('record', record);
    }
  } else if (pausa) { // Si el juego está en pausa
    fill(255, 255, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("PAUSA", width / 2, height / 2);
  } else {
    s.Movement(lastMov);

    // Si la serpiente come la comida.
    if (
      dist(
        s.body[s.body.length - 1].x,
        s.body[s.body.length - 1].y,
        food.x,
        food.y
      ) < 1
    ) {
      s.Grow(); // Hacer que la serpiente crezca.
      manzanas++; // Incrementa el contador de manzanas.
      GeneArboles = false; // Añadimos otro árbol

      roja.colocomida(); // Colocar la comida en una nueva ubicación.

      

      // Si se han comido al menos 10 manzanas y los árboles aún no han sido generados.
      if (!GeneArboles) {
        Frames += 1;
        lugararbol();
        GeneArboles = true; // Asegura que los árboles solo se generen una vez.
      }
    }
  }

  fill(221, 184, 27);
  textSize(15);
  textAlign(LEFT, LEFT);
  text("Manzanas: " + manzanas + "/" + thresshold, 10, 40);
  text("Record: " + record, 10, 60); // Dibuja el récord
  text("Manzanas Amarillas: " + amarilla.counterVar, 10, 80);
  //el score va a ir siempre por encima
} //===> fin del draw()

function keyPressed() {
  if (key === 'P' || key === 'p') {
    pausa = !pausa; // Alterna la pausa
  }

  if (key === 'R' || key === 'r') {
    location.reload()
  }

  if (!pausa) { // Solo se permite el movimiento si no está en pausa
    switch (keyCode) {
      case UP_ARROW:
      case 87: // Tecla W arriba
        if (lastMov !== 1)
          lastMov = 0;
        break;
      case DOWN_ARROW:
      case 83: // Tecla S abajo
        if (lastMov !== 0)
          lastMov = 1;
        break;
      case LEFT_ARROW:
      case 65: // Tecla A izquierda
        if (lastMov !== 3)
          lastMov = 2;
        break;
      case RIGHT_ARROW:
      case 68: // Tecla D derecha
        if (lastMov !== 2)
          lastMov = 3;
        break;
      case 37: // Flecha izquierda
        if (lastMov !== 3)
          lastMov = 2;
        break;
      case 39: // Flecha derecha
        if (lastMov !== 2)
          lastMov = 3;
        break;
      case 38: // Flecha arriba
        if (lastMov !== 1)
          lastMov = 0;
        break;
    }
  }
}
