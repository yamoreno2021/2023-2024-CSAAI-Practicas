console.log("Ejecutando JS...");


//-- Elementos de la interfaz de la calculadora
display = document.getElementById("display")
boton1 = document.getElementById("boton1")
boton2 = document.getElementById("boton2")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

//-- Funciones de retrollamada de los botones
//-- Cada vez que se aprieta un botón se actúa
//-- sobre la cadena: añadiendo dígito, operador +
//-- poniendo a cero o evaluando la expresión

// -- Digito 1
boton1.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}
  
//-- Digito 2
boton2.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}
  
//-- Simbolo de sumar
suma.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}

//-- Evaluar la expresión
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

//-- Poner a cero la expresión
clear.onclick = () => {
  display.innerHTML = "0";
}