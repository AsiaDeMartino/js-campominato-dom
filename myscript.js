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
    let quadrato = "";
    for (let i = 1; i <= numeroQuadrati; i++) {
        quadrato = document.createElement('div');
        quadrato.classList.add('quadrato');
        
        quadrato.append(i);
        quadrato.style.height = `calc(100% / ${colonne})`;
        quadrato.style.width = `calc(100% / ${colonne})`;
        grigliaWrapper.appendChild(quadrato);
        quadrato.addEventListener("click" , casellaSelezionata);

    }
    
    caselle = numeroQuadrati;
     
}


//genero griglia in base a difficoltà
bottone.addEventListener('click', function(){

    reset();

    if (difficoltà.value == 1) {
        griglia (100,10);
        creaBomba(100);
        console.log(bombe);

    } else if (difficoltà.value == 2) {
        griglia (81,9);
        creaBomba(81);
        console.log(bombe);

    } else if (difficoltà.value == 3) { 
        griglia (49,7);
        creaBomba(49);
        console.log(bombe);

    }

} );


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

    const content = parseInt(element.innerHTML);

    if(bombe.includes(content)) {
        element.classList.add("red");
        risultato.style.display = "block";
        titolo.innerHTML = `Game Over! <br>Il tuo punteggio è <br>${punti}`;
        rimuoviClick(caselle);
        mostraBombe(caselle);
    } else {
        element.classList.add("blue");
        punti++
        console.log(punti);
        if (punti == caselle - 16) {
            risultato.style.display = "block";
            titolo.innerHTML = `Complimenti, hai vinto! Il tuo punteggio è <br>${punti}`;
            rimuoviClick(caselle);
            mostraBombe(caselle);
        }    
    }
             
    element.removeEventListener("click" , casellaSelezionata);
} 

//generazione bombe
function getRandomIntInclusive (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1) + min);
}


function creaBomba (numerocaselle) {
    do {
        const numeroRandom = getRandomIntInclusive(1 , numerocaselle);
        if (bombe.includes(numeroRandom) === false ) {
            bombe.push(numeroRandom);
        }  
    } while (bombe.length < 16);

    return bombe;
}

function rimuoviClick(numerocaselle){
    const quadratiDiv = document.getElementsByClassName("quadrato");

    for (let i = 0; i < numerocaselle; i++) {
        
        quadratiDiv[i].removeEventListener("click",casellaSelezionata)  
    }
}

function mostraBombe (numerocaselle) {
    const quadratiDiv = document.getElementsByClassName("quadrato");
    let i=0;
// prendo tutti i div che sono bombe e gli do la classe red

   do {
        if(bombe.includes(parseInt(quadratiDiv[i].innerHTML))){
            quadratiDiv[i].classList.add("red");
            quadratiDiv[i].innerHTML = `&#127804;`;
        }
        i++;
   } while (i<numerocaselle);
}

replay.addEventListener("click", reset);


