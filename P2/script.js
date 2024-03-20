const gui = {
    zero : document.getElementById("0"),
    one : document.getElementById("1"),
    two : document.getElementById("2"),
    three : document.getElementById("3"),
    four : document.getElementById("4"),
    five : document.getElementById("5"),
    six : document.getElementById("6"),
    seven : document.getElementById("7"),
    eight : document.getElementById("8"),
    nine : document.getElementById("9"),
    start : document.getElementById("Start"),
    stop : document.getElementById("Stop"),
    reset : document.getElementById("Reset"),
    display : document.getElementById("crono"),
    first : document.getElementById("first"),
    second : document.getElementById("second"),
    third : document.getElementById("third"),
    fourth : document.getElementById("fourth")
}

//-- Array que almacena números secretos
const secretkey = [];

//-- Generar números aleatorios con un valor máximo
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//-- Generamos números secretos y los almacenamos en un array
for (let i = 0; i < 4; i++) {
    let rnum = getRandomInt(9);
    secretkey.push(rnum.toString());
}

//-- Mostramos el contenido del array de números secretos en la consola
for (let j = 0; j < secretkey.length; j++) {
    console.log( j + ' Secret Key ' + secretkey[j]);
}

function success(number){
    if (secretkey[0] == number){
        gui.first.innerHTML = secretkey[0]
        gui.first.style.color = "rgb(26, 240, 26)"
    }
    if (secretkey[1] == number){
        gui.second.innerHTML = secretkey[1]
        gui.second.style.color = "rgb(26, 240, 26)"  
      }

    if (secretkey[2] == number){
        gui.third.innerHTML = secretkey[2]
        gui.third.style.color = "rgb(26, 240, 26)" 
    }

    if (secretkey[3] == number){
        gui.fourth.innerHTML = secretkey[3]
        gui.fourth.style.color = "rgb(26, 240, 26)"    
    }
    else{
        console.log("Fallo")
    }
}



console.log("Ejecutando JS...");

//-- Definir un objeto cronómetro
const crono = new Crono(gui.display);

//---- Configurar las funciones de retrollamada

//-- Arranque del cronometro
gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
}
  
//-- Detener el cronómetro
gui.stop.onclick = () => {
    console.log("Stop!");
    crono.stop();
}

//-- Reset del cronómetro
gui.reset.onclick = () => {
    console.log("Reset!");
    crono.reset();

    //-- Generamos números secretos y los almacenamos en un array
    for (let i = 0; i < 4; i++) {
    let rnum = getRandomInt(9);
    secretkey.push(rnum.toString());
    }   

//-- Mostramos el contenido del array de números secretos en la consola
        for (let j = 0; j < secretkey.length; j++) {
    console.log( j + ' Secret Key ' + secretkey[j]);
}
}

gui.zero.onclick = () => {
    crono.start();
    success(0);
}

gui.one.onclick = () => {
    crono.start();
    success(1);
}

gui.two.onclick = () => {
    crono.start();
    success(2);
}

gui.three.onclick = () => {
    crono.start();
    success(3);
}

gui.four.onclick = () => {
    crono.start();
    success(4);
}

gui.five.onclick = () => {
    crono.start();
    success(5);
}

gui.six.onclick = () => {
    crono.start();
    success(6);
}

gui.seven.onclick = () => {
    crono.start();
    success(7);
}

gui.eight.onclick = () => {
    crono.start();
    success(8);
}

gui.nine.onclick = () => {
    crono.start();
    success(9);
}