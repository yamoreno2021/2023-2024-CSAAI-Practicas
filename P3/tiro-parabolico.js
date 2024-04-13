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

canvas.width = 1500;
canvas.height = 750;

//-- Obtener el contexto del canvas 2d
const ctx = canvas.getContext("2d");

//-- Leer la imagen del documento html
//-- Esta deshabilitada
var bird = document.getElementById("pajaro");
var pig = document.getElementById("pig");

//-- Coordenadas iniciales del proyectil
let xop = 5;
let yop = canvas.height - 60;
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
let xo = getRandomInt(225, canvas.width - 25); //getRandomXO(xomin,xomax);
let yo = getRandomInt(25, canvas.height - 25);


//-- Dibujar el proyectil
dibujarP(xop, yop, 50, 50, "green"); // Pintar el proyectil
//dibujarP(xop, yop, 50, 50); // Pintar el proyectil //Sin color

//-- Dibujbar el objetivo
dibujarO(xo,yo); // Pintar el objetivo

// --------------------------------- Ángulo Proyectil ----------------------------------------
// ------------- Inicializacion --------------
//-- Ángulo de lanzamiento (en radianes)
var theta = parseFloat(angle.value) * Math.PI / 180; // Convertir a radianes

//-- Escritura ángulo inicial
angle_disp.innerHTML = angle.value;

// ------------- Actualizacion del ángulo -------------
angle.onchange = () => {
    if (angle.value != "") {
        angle_disp.innerHTML = angle.value;

        theta = parseFloat(angle.value) * Math.PI / 180;
        //-- Velocidad del proyectil
        v0x = v0 * Math.cos(theta); // Velocidad inicial en x
        v0y = v0 * Math.sin(theta); // Velocidad inicial en y
    }
}



// --------------------------------- Velocidad Proyectil ----------------------------------------
// ------------- Inicializacion --------------
//-- Velocidad inicial total
var v0 = parseFloat(velocity.value); // Obtener la velocidad inicial del input

//-- Velocidad del proyectil
let v0x = v0 * Math.cos(theta); // Velocidad inicial en x
let v0y = v0 * Math.sin(theta); // Velocidad inicial en y

//-- Escritura velocidad inicial
velocity_disp.innerHTML = velocity.value;

// ------------- Actualizacion de la velocidad -------------
velocity.onchange = () => {
    if (velocity.value != "") {
        velocity_disp.innerHTML = velocity.value;

        v0 = parseFloat(velocity.value);
        //-- Velocidad del proyectil
        v0x = v0 * Math.cos(theta); // Velocidad inicial en x
        v0y = v0 * Math.sin(theta); // Velocidad inicial en y

    }
}


//-- Función principal de actualización
//-- Gravedad
const g = 9.81;

//-- Tiempo inicial
let t = 0;

function lanzar() {
    //-- Calcular la posición en función del tiempo
    xp = xop + v0x * t;
    yp = yop - (v0y * t - 0.5 * g * t ** 2);


    //-- Incrementar el tiempo para el próximo cuadro
    t += 0.1;

    //-- Borrar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //-- Pintar los elementos en el canvas
    dibujarP(xp, yp, 50, 50, "red"); // Pintar el proyectil
    dibujarO(xo, yo); // Pintar el objetivo

    //-- Condición de rebote en extremos verticales del canvas
    //if (xp < 0 || xp > (canvas.width - 55) ) {
    if (canvas.width - xp < 50 || canvas.height  - yp < 50 || canvas.height  - yp > canvas.height) {
        dibujarP(xp, yp, 50, 50, "yellow"); // Pintar el proyectil
        crono.stop();
        // Si el proyectil alcanza el objetivo, detener la animación
        return;
    }

    //-- Verificar colisión
    if (xp - xo < 25 && xp - xo > -75 && yp - yo < 25 && yp - yo > -75) {
        dibujarP(xp, yp, 50, 50, "yellow"); // Pintar el proyectil
        crono.stop();
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
    //ctx.beginPath();
    ctx.drawImage(bird, x,y,lx,ly);
    //-- Definir un rectángulo de dimensiones lx x ly,
    //ctx.rect(x, y, lx, ly);

    //-- Color de relleno del rectángulo
    //ctx.fillStyle = color;

    //-- Mostrar el relleno
    //ctx.fill();

    //-- Mostrar el trazo del rectángulo
    //ctx.stroke();

    //ctx.closePath();
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
    crono.reset();

}
