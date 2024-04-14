// ------------------------- Creación de la interfaz --------------------------
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

// -------------------------Inicialización del objetivo y del proyectil --------------------------
//-- Leer la imagen del documento html
//-- Esta deshabilitada
var bird = document.getElementById("pajaro");
var pig = document.getElementById("pig");
var restart = document.getElementById("restart");

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
let yo = getRandomInt(25, canvas.height - 50);

//-- Dibujar el proyectil
bird.onload = function () {
    //-- Dibujar el proyectil
    dibujarP(xop, yop, 50, 50); // Pintar el proyectil
};

//-- Dibujbar el objetivo
pig.onload = function () {
    dibujarO(xo, yo); // Pintar el objetivo
};


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

// ------------------------------------ Lanzamiento ------------------------------------
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
    dibujarP(xp, yp, 50, 50); // Pintar el proyectil
    dibujarO(xo, yo); // Pintar el objetivo

    //-------------------------------- Fallar tiro --------------------------------
    if (canvas.width - xp < 50 || canvas.height - yp < 50 || canvas.height - yp > canvas.height) {
        dibujarP(xp, yp, 50, 50); // Pintar el proyectil
        crono.stop();

        var cuadradoAncho = 500;
        var cuadradoAlto = 75;

        //-- Calcular las coordenadas x e y para centrar el cuadrado
        var x = (canvas.width - cuadradoAncho) / 2; // Centrado horizontalmente
        var y = (canvas.height - cuadradoAlto) / 2; // Centrado verticalmente

        ctx.beginPath();

        ctx.rect(x, 0, cuadradoAncho, canvas.height);

        //-- Dibujar
        ctx.fillStyle = 'black';

        //-- Cambiar el tamaño de la línea del trazo
        ctx.lineWidth = 4;

        //-- Rellenar
        ctx.fill();

        //-- Dibujar el trazo
        ctx.stroke()

        // Imagen Restart
        var imagenDimension = 100;
        var xImagen = (canvas.width - imagenDimension) / 2;
        var yImagen = (canvas.height - imagenDimension) / 2 + 200;
        ctx.drawImage(restart, xImagen, yImagen, imagenDimension, imagenDimension);

        // Imagen Cerdo
        var imagenDimension2 = 200;
        var xImagen2 = (canvas.width - imagenDimension2) / 2;
        var yImagen2 = (canvas.height - imagenDimension2) / 2 - 150;
        ctx.drawImage(pig, xImagen2, yImagen2, imagenDimension2, imagenDimension2);

        ctx.closePath()
        // Asignar un controlador de eventos de clic al canvas
        canvas.addEventListener("click", function (event) {
            const rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;


            // Verificar si las coordenadas del clic están dentro de la región de la imagen
            if (clickX > xImagen && clickX < xImagen + imagenDimension && clickY > yImagen && clickY < yImagen + imagenDimension) {

                // El clic ocurrió dentro de la imagen
                console.log("Botón de reinicio clicado");
                //-- Reinicio
                location.reload();

                //-- Dibujar el proyectil
                dibujarP(xop, yop, 50, 50, "green"); // Pintar el proyectil
                crono.reset();
            }
        });

        //-------- Mensaje Derrota ----------
        ctx.font = "50px Arial";
        ctx.fillStyle = 'white';
        var texto = "Level Failed!";

        //-- Calcular la anchura del texto
        var textoAncho = ctx.measureText(texto).width;
        var textoAlto = 45;

        //-- Calcular las coordenadas x e y para centrar el texto
        var x = (canvas.width - textoAncho) / 2; // Centrado horizontalmente
        var y = (canvas.height + textoAlto) / 2; // Centrado verticalmente

        //-- Dibujar el texto centrado
        ctx.fillText(texto, x, y);

        //-- Tiempo
        var texto2 = display.innerHTML;

        //-- Calcular la anchura del texto
        var textoAncho2 = ctx.measureText(texto2).width;

        //-- Calcular las coordenadas x e y para centrar el texto
        var x2 = (canvas.width - textoAncho2) / 2; // Centrado horizontalmente
        var y2 = (canvas.height + textoAlto) / 2; // Centrado verticalmente

        //-- Dibujar el texto centrado
        ctx.fillText(texto2, x2, y2 + 100);
        // Si el proyectil alcanza el objetivo, detener la animación
        return;
    }

    //-------------------------------- Acertar tiro --------------------------------
    if (xp - xo < 35 && xp - xo > -35 && yp - yo < 35 && yp - yo > -35) {
        dibujarP(xp, yp, 50, 50); // Pintar el proyectil
        crono.stop();

        var cuadradoAncho = 500;
        var cuadradoAlto = 75;

        //-- Calcular las coordenadas x e y para centrar el cuadrado
        var x = (canvas.width - cuadradoAncho) / 2; // Centrado horizontalmente
        var y = (canvas.height - cuadradoAlto) / 2; // Centrado verticalmente

        ctx.beginPath();

        ctx.rect(x, 0, cuadradoAncho, canvas.height);

        //-- Dibujar
        ctx.fillStyle = 'black';

        //-- Cambiar el tamaño de la línea del trazo
        ctx.lineWidth = 4;

        //-- Rellenar
        ctx.fill();

        //-- Dibujar el trazo
        ctx.stroke()

        var imagenDimension = 100;
        var xImagen = (canvas.width - imagenDimension) / 2;
        var yImagen = (canvas.height - imagenDimension) / 2 + 200;
        ctx.drawImage(restart, xImagen, yImagen, imagenDimension, imagenDimension);


        var imagenDimension2 = 200;
        var xImagen2 = (canvas.width - imagenDimension2) / 2;
        var yImagen2 = (canvas.height - imagenDimension2) / 2 - 150;
        ctx.drawImage(bird, xImagen2, yImagen2, imagenDimension2, imagenDimension2);
        ctx.closePath()
        // Asignar un controlador de eventos de clic al canvas
        canvas.addEventListener("click", function (event) {
            const rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;


            // Verificar si las coordenadas del clic están dentro de la región de la imagen
            if (clickX > xImagen && clickX < xImagen + imagenDimension && clickY > yImagen && clickY < yImagen + imagenDimension) {

                // El clic ocurrió dentro de la imagen
                console.log("Botón de reinicio clicado");
                //-- Reinicio
                location.reload();

                //-- Dibujar el proyectil
                dibujarP(xop, yop, 50, 50, "green"); // Pintar el proyectil
                crono.reset();
            }
        });

        //-------- Mensaje Victoria ----------
        ctx.font = "50px Arial";
        ctx.fillStyle = 'white';
        var texto = "You Win!";

        //-- Calcular la anchura del texto
        var textoAncho = ctx.measureText(texto).width;
        var textoAlto = 45;

        //-- Calcular las coordenadas x e y para centrar el texto
        var x = (canvas.width - textoAncho) / 2; // Centrado horizontalmente
        var y = (canvas.height + textoAlto) / 2; // Centrado verticalmente

        //-- Dibujar el texto centrado
        ctx.fillText(texto, x, y);

        //---------- Tiempo ------------
        var texto2 = display.innerHTML;

        //-- Calcular la anchura del texto
        var textoAncho2 = ctx.measureText(texto2).width;

        //-- Calcular las coordenadas x e y para centrar el texto
        var x2 = (canvas.width - textoAncho2) / 2; // Centrado horizontalmente
        var y2 = (canvas.height + textoAlto) / 2; // Centrado verticalmente

        //-- Dibujar el texto centrado
        ctx.fillText(texto2, x2, y2 + 100);
        // Si el proyectil alcanza el objetivo, detener la animación

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
function dibujarP(x, y, lx, ly) {

    //-- Pintando el proyectil
    ctx.beginPath();
    ctx.drawImage(bird, x, y, lx, ly);
    ctx.closePath();
}

//-- función para pintar el objetivo
function dibujarO(x, y) {

    //-- Pintando el objetivo
    ctx.beginPath();
    ctx.drawImage(pig, x, y, 50, 50);
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

restart.onclick = () => {
    console.log("Botón de reinicio clicado");
    //-- Reinicio
    location.reload();

    //-- Dibujar el proyectil
    dibujarP(xop, yop, 50, 50, "green"); // Pintar el proyectil
    crono.reset();
};
