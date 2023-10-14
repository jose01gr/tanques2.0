// se definen las variables a utilizar
const capacidad1 = 5000; // la capacidad de litros del tanque 1
const capacidad2 = 4000; // capacidad de litros del tanque 2
let contenido1 = 5000; // contenido que tiene el tanque 1
let contenido2 = 0; // cantidad de liquido que tiene el tanque 2
let interval1; // intervalo de tiempo para el llenado y vaciado del tanque 1
let interval2; // intervalo de tiempo para el llenado y vaciado del tanque 2
animacion = false; // booleano que nos dice si la animacion se esta realizando
let reloj; // variable para el reloj digital
let ejecucion = false; // valor booleano que nos dice si el sistema esta en ejecucion
let segundosTotales = 0; 


// se definen las funciones a utilizar
//funcion para actualizar el reloj cada segundo
    const actualizarTemporizador = () => {
            const horas = Math.floor(segundosTotales / 3600).toString().padStart(2, '0');
            const minutos = Math.floor((segundosTotales % 3600) / 60).toString().padStart(2, '0');
            const segundos = (segundosTotales % 60).toString().padStart(2, '0');
            document.getElementById('tiempo').textContent = `${horas}:${minutos}:${segundos}`;
        };

    //funcion para actualizar el porcentaje del tanque 1
    const actualizarTanque1 = () => {
      const porcentaje1 = (contenido1 / capacidad1) * 100;
      const litros1 = contenido1;
      document.getElementById('tanque1').textContent = `${porcentaje1.toFixed(2)}% (${litros1.toFixed(2)} litros)`;

      const alturaAgua1 = (contenido1 / capacidad1) * 100;
      document.getElementById('agua1').style.height = alturaAgua1 + "%";
};

    //funcion para actualizar el porcentaje del tanque 2
    const actualizarTanque2 = () => {
      const porcentaje2 = (contenido2 / capacidad2) * 100;
      const litros2 = contenido2;
      document.getElementById('tanque2').textContent = `${porcentaje2.toFixed(2)}% (${litros2.toFixed(2)} litros)`;

      const alturaAgua2 = (contenido2 / capacidad2) * 100;
      document.getElementById('agua2').style.height = alturaAgua2 + "%";
};

    //funcion para el llenado de los tanques
    const llenarTanque1 = () => {
      const llave1 = parseInt(document.getElementById('llave1').value);
      if(isNaN(llave1)){ //si no se ingresa ningun valor, entonces se toma como 0
        llave1 = 0;
      }
      const velocidadLlenado1 = Math.floor(Math.random() * llave1);
      contenido1 += velocidadLlenado1;
      


      if (contenido1 >= capacidad1 * 0.75) { //verifica que el agua no sobrepase el 75% de capacidad
        contenido1 = capacidad1 * 0.75;
        clearInterval(interval1);
        interval2 = setInterval(llenarTanque2, 1000);
        document.getElementById('llave1llenado').style.opacity = 0;
        document.getElementById('llave1vaciado').style.opacity = 1;
        document.getElementById('llave2llenado').style.opacity = 1;
        document.getElementById('llave2vaciado').style.opacity = 0;
        document.getElementById('llave3llenado').style.opacity = 0;
        document.getElementById('llave3vaciado').style.opacity = 1;
      }
      if (contenido1 >= capacidad1) {
        contenido1 = capacidad1;
        

        
      }

      actualizarTanque1();
      
    };

    const llenarTanque2 = () => {
      const llave2 = parseInt(document.getElementById('llave2').value);
      if(isNaN(llave2)){
        llave2 = 0;
      }
      const velocidadLlenado2 = Math.floor(Math.random() * llave2);
      contenido2 += velocidadLlenado2;
      contenido1 -= velocidadLlenado2;
      

      if (contenido2 >= capacidad2 * 0.75) {
        contenido2 = capacidad2 * 0.75;
        clearInterval(interval2);
        interval2 = setInterval(vaciarTanque2, 1000);
        document.getElementById('llave1llenado').style.opacity = 0;
        document.getElementById('llave1vaciado').style.opacity = 1;
        document.getElementById('llave2llenado').style.opacity = 0;
        document.getElementById('llave2vaciado').style.opacity = 1;
        document.getElementById('llave3llenado').style.opacity = 1;
        document.getElementById('llave3vaciado').style.opacity = 0;
      }
      if (contenido1 <= capacidad1 * 0.5) {
        contenido1 = capacidad1 * 0.5;
        clearInterval(interval2);
        interval1 = setInterval(llenarTanque1, 1000);
        document.getElementById('llave1llenado').style.opacity = 1;
        document.getElementById('llave1vaciado').style.opacity = 0;
        document.getElementById('llave2llenado').style.opacity = 0;
        document.getElementById('llave2vaciado').style.opacity = 1;
        document.getElementById('llave3llenado').style.opacity = 0;
        document.getElementById('llave3vaciado').style.opacity = 1;
      }
      if (contenido2 >= capacidad2) {
        contenido2 = capacidad2;
        
      }

      actualizarTanque2();
      actualizarTanque1();
      
      
    };

    const vaciarTanque2 = () => {
      const llave3 = parseInt(document.getElementById('llave3').value);
      if(isNaN(llave3)){
        llave3 = 0;
      }
      const velocidadVaciado2 = Math.floor(Math.random() * llave3);
      contenido2 -= velocidadVaciado2;

      if (contenido2 <= capacidad2 * 0.5) {
        contenido2 = capacidad2 * 0.5;
        clearInterval(interval2);
        interval1 = setInterval(llenarTanque1, 1000);
        document.getElementById('llave2llenado').style.opacity = 0;
        document.getElementById('llave2vaciado').style.opacity = 1;
        document.getElementById('llave1llenado').style.opacity = 1;
        document.getElementById('llave1vaciado').style.opacity = 0;
        document.getElementById('llave3llenado').style.opacity = 0;
        document.getElementById('llave3vaciado').style.opacity = 1;
      }

      actualizarTanque2();
      
    };

    //Boton para iniciar el sistema
    document.getElementById('iniciar').addEventListener('click', () => {
    
      const llave1 = parseInt(document.getElementById('llave1').value);
      const llave2 = parseInt(document.getElementById('llave2').value);
      const llave3 = parseInt(document.getElementById('llave3').value);
    
      
      if (llave1 >= 1 && llave1 <= 400 && llave2 >= 1 && llave2 <= 500 && llave3 >= 1 && llave3 <= 600) {
        
        interval1 = setInterval(llenarTanque1, 1000);
        animacion = true;
        if (!ejecucion) {
          ejecucion = true;
          reloj = setInterval(() => {
            segundosTotales++;
            actualizarTemporizador();
          }, 1000);
        }
      } else {
        
        alert('Por favor, ingrese valores validos para los campos de entrada.');
      }
    });


    //funcion para reiniciar el sistema
    document.getElementById('detener').addEventListener('click', () => {
      clearInterval(interval1);
      clearInterval(interval2);
      contenido1 = 5000;
      contenido2 = 0;
      actualizarTanque1();
      actualizarTanque2();
      document.getElementById('llave2llenado').style.opacity = 0;
      document.getElementById('llave2vaciado').style.opacity = 1;
      document.getElementById('llave1llenado').style.opacity = 0;
      document.getElementById('llave1vaciado').style.opacity = 1;
      document.getElementById('llave3llenado').style.opacity = 0;
      document.getElementById('llave3vaciado').style.opacity = 1;
      animacion = false; 
      if (ejecucion) {
                    ejecucion = false;
                    clearInterval(reloj);
                    segundosTotales = 0;
                    actualizarTemporizador();
                }
      

    });

    
