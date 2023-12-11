// ELEMENTOS
let form = document.getElementById('calculadora');
const INPUT = document.getElementById('peso');
const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const DETALLE = document.getElementById('detalle');
const SEAGAR = document.getElementById('seagar');
const SC = document.getElementById('sc');
// spans de los valores
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const METODO = document.getElementById('metodo');
const VOLUMEN = document.getElementById('volumen');
const TAG_VOL = document.getElementById('tag-vol'); // para cambiar a SC * 1500 
const VOLUMEN2 = document.getElementById('volumen2'); // para *2000 (metodo SC)
// parrafos
const PFLU = document.getElementById('p-flu');
const PMAN = document.getElementById('p-man');
const PVOLUMEN = document.getElementById('p-volumen');
const PVOLUMEN2 = document.getElementById('p-volumen2'); // para *2000 (metodo SC)

//EVENTOS
function mostrarError(){
    ERROR.style.display = 'block';
    PFLU.style.display = 'none';
    PMAN.style.display = 'none';
    PVOLUMEN.style.display = 'none';
    PVOLUMEN2.style.display = 'none';
    METODO.style.display = 'none';   
}

CALCULAR.addEventListener('click', ()=> {    
    if (INPUT.value.trim() === ''){
        mostrarError();
    }
    else {
        const DATO = INPUT.valueAsNumber;

        //VALIDACION
        if (DATO <= 0){ // ERROR : menor o igual a 0
           mostrarError();
        }
        else { 
            ERROR.style.display = 'none';
            let vol = calcVolumen(DATO);
            let flujo = calcFlujo(vol);
            FLU.innerHTML = flujo + ' cc/hr';
        
            if (DATO <= 30){ // menor o igual a 30 kg
                SC.open = false;
                SEAGAR.open = true; // desplegar detalles
                
                PVOLUMEN2.style.display = 'none';
                let mantenimiento = flujo * 1.5;
                METODO.innerHTML = 'Metodo de Holliday-Segar';
                TAG_VOL.innerHTML = 'Volumen: '
                VOLUMEN.innerHTML = vol + ' cc';
                MAN.innerHTML = mantenimiento + ' cc/hr';
                PMAN.style.display = 'block';
                PFLU.style.display = 'block'; 
            }

            else { // mayor a 30 kg
                SEAGAR.open = false;
                SC.open = true;
                
                PMAN.style.display = 'none';
                PFLU.style.display = 'none';
                METODO.innerHTML = 'Metodo de Superficie Corporal';
                TAG_VOL.innerHTML = 'SC * 1500: ';
                VOLUMEN.innerHTML = (Math.round(vol*1500)) + ' cc';
                VOLUMEN2.innerHTML = (Math.round(vol*2000)) +' cc';
                PVOLUMEN2.style.display = 'block';
                
            }
            PVOLUMEN.style.display = 'block';
            METODO.style.display = 'block';       
        } 
    }    
})

function calcVolumen(peso){
    let suma = 0;
    if (peso <= 30){
        if (peso <= 10){
            suma = peso * 100; 
            return suma;
        }
        else suma = 10 * 100;
        if (peso <= 20){
            suma = suma + (peso - 10) * 50;
            return suma;
        }
        else suma = suma + 10 * 50;
        if (peso > 20){
            suma = suma + (peso - 20) * 20; 
            return suma;
        }
    }
    else {
        return ((peso * 4) + 7) / (peso + 90);
    }
}

function calcFlujo(volumen){
        return Math.round(volumen / 24);
}

