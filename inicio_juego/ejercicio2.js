let s;
let scl = 20;
let food;
let manzanas = 0; // Contador de manzanas
let posxS = 100;
let posyS = 100;
let width = 700;
let height = 700;
let lastMov = 1;
let gameOver = false; // Variable para controlar si el juego ha terminado
let arboles = []; // Array para almacenar los árboles
let GeneArboles = false; // Variable para controlar si los árboles ya fueron generados
let randomFood = false
let randomNum = 0
let frames = 10
function setup() {
  createCanvas(width, height);
  s = new Snake();
  randomNum = floor(int(random(1,10)))
  frameRate(frames);
  colocomida(); // Llama a esta función para colocar la comida en una ubicación inicial.
}

class Snake {
  constructor() {
    this.body = []; // Inicializa el cuerpo de la serpiente.
    this.body[0] = createVector(posxS, posyS);
  }

  Show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0, 255, 0);
      rect(this.body[i].x, this.body[i].y, scl, scl);
    }
  }

  Movement(dir) {
    if (!gameOver) { // Asegura que la serpiente no se mueva si el juego ha terminado
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
        }
      }
    }
  }

  Grow() {
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head); // Agrega una nueva posición de la cabeza al cuerpo, haciendo que la serpiente crezca.
  }
}

class arbol {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }

  Show() {
    fill(139, 69, 19); // Color marrón para el árbol
    rect(this.pos.x, this.pos.y, scl, scl);
  }
}

// Función para colocar la comida en una ubicación aleatoria.
function colocomida() {
  var colum = floor(width / scl);
  var filas = floor(height / scl);
  let foodPos;
  let validPos = false;

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
  food = foodPos;
}

function lugararbol() {
  var colum = floor(width / scl);
  var filas = floor(height / scl);
  for (let i = 0; i < 20; i++) { // Cambiamos la cantidad de árboles generados a 30
    let posarbol = createVector(floor(random(colum)), floor(random(filas)));
    posarbol.mult(scl);
    arboles.push(new arbol(posarbol.x, posarbol.y));
  }
}

function draw() {
  background(51);

  // Dibuja el contador de manzanas.
  fill(255);
  textSize(15);
  textAlign(LEFT,LEFT)
  text("Manzanas: " + manzanas, 10, 40);
  // Dibuja la comida.
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);

  // Dibuja los árboles.
  for (let arbol of arboles) {
    arbol.Show();
  }

  s.Show();
  if (gameOver) {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
  } else {
    s.Movement(lastMov);

    // Si la serpiente come la comida.
    if (dist(s.body[s.body.length - 1].x, s.body[s.body.length - 1].y, food.x, food.y) < 1) {
      s.Grow(); // Hacer que la serpiente crezca.
      manzanas++; // Incrementa el contador de manzanas.
      frames += 5
      colocomida(); // Colocar la comida en una nueva ubicación.

      // Si se han comido al menos 10 manzanas y los árboles aún no han sido generados.
      if (manzanas >= 10 && !GeneArboles) {
        lugararbol();
        GeneArboles = true; // Asegura que los árboles solo se generen una vez.
      }
    }
  }
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      if (lastMov !== 1) // Evita que la serpiente se mueva hacia arriba si ya se está moviendo hacia abajo
        lastMov = 0;
      break;
    case DOWN_ARROW:
      if (lastMov !== 0) // Evita que la serpiente se mueva hacia abajo si ya se está moviendo hacia arriba
        lastMov = 1;
      break;
    case LEFT_ARROW:
      if (lastMov !== 3) // Evita que la serpiente se mueva hacia la izquierda si ya se está moviendo hacia la derecha
        lastMov = 2;
      break;
    case RIGHT_ARROW:
      if (lastMov !== 2) // Evita que la serpiente se mueva hacia la derecha si ya se está moviendo hacia la izquierda
        lastMov = 3;
      break;
  }
}

