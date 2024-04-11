////////////-- Declaración de variables y objetos
//-- Coordenadas iniciales del proyectil
let xop = 5;
let yop = 345;
let xp = xop;
let yp = yop;

//-- Obtención del canvas y de los elementos HTML a usar

//-- Función principal de actualización
function update() 
{
  //-- Implementación del algoritmo de animación:

  //-- 1) Actualizar posición de los elementos

  //-- 2) Borrar el canvas

  //-- 3) Pintar los elementos en el canvas
  //-- Dibujar el proyectil
  dibujarP(xop, yop, 50, 50, "green"); // Pintar el proyectil
  //-- 4) Repetir
  requestAnimationFrame(update);
}

////////////////-- Otras funciones....
//-- función para pintar el proyectil
function dibujarP(x,y,lx,ly,color) {

  //-- Pintando el proyectil
  ctx.beginPath();

  //-- Definir un rectángulo de dimensiones lx x ly,
  ctx.rect(x, y, lx, ly);

  //-- Color de relleno del rectángulo
  ctx.fillStyle = color;

  //-- Mostrar el relleno
  ctx.fill();

  //-- Mostrar el trazo del rectángulo
  ctx.stroke();

  ctx.closePath();
}




//-- Hay que llamar a update la primera vez
update();