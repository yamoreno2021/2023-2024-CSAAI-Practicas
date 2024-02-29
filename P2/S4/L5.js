console.log("Ejecutando js...")
//-- Leer el display del botón 1
const disp1= document.getElementById("disp1")

//-- Leer el boton identificado como bt1
const btn1 = document.getElementById('bt1')

//-- Leer el boton identificado como bt2
const btn2 = document.getElementById('bt2')

//-- Configurar el manejador para el evento de
//-- pulsación de botón 1
btn1.onclick = () => {
  console.log("Click sobre el botón 1...")

  //-- disp1.innerHTML ="Click sobre el botón 1..."
  disp1.innerHTML +="1"
  //--disp1.style.backgroundColor = "yellow"

  if (disp1.style.backgroundColor==""){
    disp1.style.backgroundColor="yellow";
  }

  else{
    disp1.style.backgroundColor="";
  }
}


//-- pulsación de botón 2
btn2.onclick = () => {
    console.log("Click sobre el botón 2...")
  
    //-- disp1.innerHTML ="Click sobre el botón 1..."
    disp1.innerHTML +="2"

  
  }