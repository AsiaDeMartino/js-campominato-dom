//definisco le variabili
const grigliaWrapper = document.getElementById('griglia');
const bottone = document.getElementById('play');
const difficoltà = document.getElementById('difficoltà');
const bombe = [];
let punti = 0;
const titolo = document.getElementById("titolo");
const risultato = document.getElementById("risultato");
const replay = document.getElementById("replay")
let caselle = 0;


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

    caselle = numeroQuadrati;
    return quadrato;  
    
}


//genero griglia in base a difficoltà
bottone.addEventListener('click', function(){


    if (difficoltà.value == 1) {
        reset();
        griglia (100,10);
        creabomba(100);
        console.log(bombe);

    } else if (difficoltà.value == 2) {
        reset();
        griglia (81,9);
        creabomba(81);
        console.log(bombe);

    } else if (difficoltà.value == 3) { 
        reset();
        griglia (49,7);
        creabomba(49);
        console.log(bombe);

    }

} )   

console.log(caselle);

//reset html
function reset() { 
    grigliaWrapper.innerHTML = "";
    risultato.style.display = "none";
    punti = 0;
    bombe.length = 0;
}

//funzione colori caselle
function casellaSelezionata () {
    console.log(this);
    const element = this;

    element.addEventListener("click" , casellaSelezionata);

    const content = element.innerHTML;

    for (let i = 0; i < bombe.length; i++) {        
        if(bombe[i] == content)
        {
            element.classList.add("red");
            risultato.style.display = "block";
            titolo.innerHTML = `Game Over! <br>Il tuo punteggio è <br>${punti}`;
            break; 
        } 
    }
    
    if (element.classList.value.includes('red') === false){
        element.classList.add("blue");
        punti++;
        if (punti == caselle - 16) {
            risultato.style.display = "block";
            titolo.innerHTML = `Complimenti, hai vinto! Il tuo punteggio è <br>${punti}`;
        }
        console.log(punti);
    }
            
    element.removeEventListener("click" , casellaSelezionata);
} 

//generazione bombe
function getRandomIntInclusive (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1) + min);
}


function creabomba (numerocaselle) {
    do {
        const numeroRandom = getRandomIntInclusive(1 , numerocaselle);
        if (bombe.includes(numeroRandom) === false ) {
            bombe.push(numeroRandom);
        }  
    } while (bombe.length < 16);

    return bombe;
}

replay.addEventListener("click", reset);

//in caso di vittoria
