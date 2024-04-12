//-- Elementos del DOM
const canvas = document.getElementById("ctiro");



//-- Acceder al angulo
const angle = document.getElementById("angle");
const angle_disp = document.getElementById("angle_disp");

//-- Acceder a la velocidad
var velocity = document.getElementById("velocity");
var velocity_disp = document.getElementById("velocity_disp");

//-- Acceder al botón de disparo
const btnLanzar = document.getElementById("btnLanzar");

//-- Acceder al botón de iniciar
const btnIniciar = document.getElementById("btnIniciar");

//-- Sonidos
//-- Crear los elementos de sonido
const rebote_sound = new Audio('rebote.mp3');

canvas.width = 800;
canvas.height = 400;

//-- Obtener el contexto del canvas 2d
const ctx = canvas.getContext("2d");

//-- Leer la imagen del documento html
//-- Esta deshabilitada
var bird = document.getElementById("pajaro");
var pig = document.getElementById("pig");

//-- Coordenadas iniciales del proyectil
let xop = 5;
let yop = 340;
let xp = xop;
let yp = yop;

//-- Cronometro
var display = document.getElementById("crono")

//-- Definir un objeto cronómetro
const crono = new Crono(display);



//-- Generar números aleatorios con un valor máximo
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//-- Coordenadas iniciales del objetivo
let xomin = 200;
let xomax = 770;
let xo = getRandomInt(430, 770); //getRandomXO(xomin,xomax);
let yo = getRandomInt(30, 370);


//-- Dibujar el proyectil
dibujarP(xop, yop, 50, 50, "green"); // Pintar el proyectil
//dibujarP(xop, yop, 50, 50); // Pintar el proyectil //Sin color

//-- Dibujbar el objetivo
dibujarO(xo,yo); // Pintar el objetivo


angle_disp.innerHTML = angle.value;
//-- Escribir ángulo
angle.onchange = () => {
    if (angle.value != "") {
      angle_disp.innerHTML = angle.value;
    }
}

velocity_disp.innerHTML = velocity.value;
//-- Velocidad inicial total
var v0 = parseFloat(velocity.value); // Obtener la velocidad inicial del input

//-- Escribir velocidad
velocity.onchange = () => {
    if (velocity.value != "") {
      velocity_disp.innerHTML = velocity.value;
      v0 = parseFloat(velocity.value);
    }

}


//-- Ángulo de lanzamiento (en radianes)
var theta = parseFloat(angle.value) * Math.PI / 180; // Convertir a radianes

//-- Velocidad del proyectil
let v0x = v0 * Math.cos(theta); // Velocidad inicial en x
let v0y = v0 * Math.sin(theta); // Velocidad inicial en y

//-- Función principal de actualización
//-- Gravedad
const g = 9.81; // Ajusta según sea necesario

//-- Tiempo inicial
let t = 0;

function lanzar() {
    //-- Calcular la posición en función del tiempo
    xp = xop + v0x * t;
    yp = yop - (v0y * t - 0.5 * g * t ** 2);

    //-- Incrementar el tiempo para el próximo cuadro
    t += 1;

    //-- Borrar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //-- Pintar los elementos en el canvas
    dibujarP(xp, yp, 50, 50, "red"); // Pintar el proyectil
    dibujarO(xo, yo); // Pintar el objetivo

    //-- Verificar colisión
    if (xp >= xo && xp <= xo + 50 && yp >= yo && yp <= yo + 50) {
        // Si el proyectil alcanza el objetivo, detener la animación
        return;
    }

    //-- Solicitar el próximo cuadro de animación
    requestAnimationFrame(lanzar);
}



function bound_sound() {

    rebote_sound.currentTime = 0;
    rebote_sound.play();
}

//-- función para pintar el proyectil
function dibujarP(x,y,lx,ly,color) {

    //-- Pintando el proyectil
    ctx.beginPath();
    //ctx.drawImage(bird, x,y,lx,ly);
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

//-- función para pintar el objetivo
function dibujarO(x,y) {

    //-- Pintando el objetivo
    ctx.beginPath();
    //ctx.drawImage(pig, x,y-30,50,50);
    //-- Dibujar un circulo: coordenadas x,y del centro
    //-- Radio, Angulo inicial y angulo final
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'red';

    //-- Dibujar el relleno
    ctx.fill()    

    //-- Dibujar el trazo
    ctx.stroke();

    ctx.closePath();
}

//-- Función de retrollamada del botón de disparo
btnLanzar.onclick = () => {
    lanzar();
    //-- Arranque del cronometro
    console.log("Start!!");
    crono.start();
}

//-- Función de retrollamada del botón de inicio
btnIniciar.onclick = () => {

    //-- Reinicio
    location.reload();

    //-- Dibujar el proyectil
    dibujarP(xop, yop, 50, 50, "green"); // Pintar el proyectil


}
