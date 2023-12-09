// ELEMENTOS
let form = document.getElementById('calculadora');
const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const METODO = document.getElementById('metodo');
const VOLUMEN = document.getElementById('volumen');
const VOLUMEN2 = document.getElementById('volumen2'); // para *2000 (metodo SC)

//EVENTOS
CALCULAR.addEventListener('click', ()=> {
    const DATO = document.getElementById('peso').valueAsNumber;

    //VALIDACION
    if (DATO <= 0){ // ERROR : menor o igual a 0
        ERROR.style.display = 'block';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
    }
    else { 
        ERROR.style.display = 'none';
        let vol = calcVolumen(DATO);
        let flujo = calcFlujo(vol);
        FLU.innerHTML = 'Mantenimiento: '+ flujo + ' cc/hr';
    
        if (DATO <= 30){ // menor o igual a 30 kg
            let mantenimiento = flujo * 1.5;
            METODO.innerHTML = 'Metodo de Holliday-Segar';
            VOLUMEN.innerHTML = 'Volumen diario: '+ vol + ' cc';
            MAN.innerHTML = 'm+m/2: ' + mantenimiento + ' cc/hr';
            MAN.style.display = 'block';
        }

        else { // mayor a 30 kg
            METODO.innerHTML = 'Metodo de Superficie Corporal';
            VOLUMEN.innerHTML = 'Volumen diario(*1500): '+ (Math.round(vol*1500)) + ' cc';
            VOLUMEN2.innerHTML = 'Volumen diario (*2000): '+ (Math.round(vol*2000)) +' cc';
            VOLUMEN2.style.display = 'block';
        }
        VOLUMEN.style.display = 'block';
        METODO.style.display = 'block';
        FLU.style.display = 'block';
        
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
   /* }
    else {
        return 1500*(Math.round(((peso * 4) + 7) / (peso + 90)))
    }*/
}

