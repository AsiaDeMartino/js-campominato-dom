//definisco le variabili
const grigliaWrapper = document.getElementById('griglia');
const bottone = document.getElementById('play');
const difficoltà = document.getElementById('difficoltà');


//creo una funzione griglia
function griglia (numeroQuadrati , colonne) {
    const quadrato = "";
    for (let i = 1; i <= numeroQuadrati; i++) {
        const quadrato = document.createElement('div');
        quadrato.classList.add('quadrato');
        
        
        quadrato.append(i);
        quadrato.style.height = `calc(100% / ${colonne})`;
        quadrato.style.width = `calc(100% / ${colonne})`;
        grigliaWrapper.appendChild(quadrato);
        quadrato.addEventListener("click" , casellaSelezionata);

    }
    return quadrato;  
    
}

//genero griglia in base a difficoltà
bottone.addEventListener('click', function(){

    if (difficoltà.value == 1) {
        reset();
        griglia (100,10);
        const bombe = creabomba(100);
        console.log(bombe);

    } else if (difficoltà.value == 2) {
        reset();
        griglia (81,9);
        const bombe = creabomba(81);
        console.log(bombe);

    } else if (difficoltà.value == 3) { 
        reset();
        griglia (49,7);
        const bombe = creabomba(49);
        console.log(bombe);
        
    }

} )   

function reset() { 
    grigliaWrapper.innerHTML = "";
}

function casellaSelezionata () {
    console.log(this);
    const element = this;

    element.addEventListener("click" , casellaSelezionata);
    element.classList.add("blue");

    element.removeEventListener("click" , casellaSelezionata);
}

//generazione bombe
function getRandomIntInclusive (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1) + min);
}




function creabomba (numerocaselle) {
   
    const bombe = [];

    do {
        const numeroRandom = getRandomIntInclusive(1 , numerocaselle);
        if (bombe.includes(numeroRandom) === false ) {
            bombe.push(numeroRandom);
        }  
    } while (bombe.length < 16);

    return bombe;
}
