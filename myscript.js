//definisco le variabili
const grigliaWrapper = document.getElementById('griglia');
const bottone = document.getElementById('play');
const difficoltà = document.getElementById('difficoltà');


//creo una funzione griglia
function griglia (numeroQuadrati , colonne) {
    
    for (let i = 1; i <= numeroQuadrati; i++) {
        const quadrato = document.createElement('div');
        quadrato.classList.add('quadrato');
        console.log(quadrato);
        
        quadrato.append(i);
        quadrato.style.height = `calc(100% / ${colonne})`;
        quadrato.style.width = `calc(100% / ${colonne})`;
        grigliaWrapper.appendChild(quadrato);
        
        quadrato.addEventListener("click" , casellaSelezionata);
    }

}

//genero griglia in base a difficoltà
bottone.addEventListener('click', function(){

    if (difficoltà.value == 1) {
        reset();
        griglia (100,10);

    } else if (difficoltà.value == 2) {
        reset();
        griglia (81,9);

    } else if (difficoltà.value == 3) { 
        reset();
        griglia (49,7);

    }

} )    

function reset() { 
    grigliaWrapper.innerHTML = "";
}

function casellaSelezionata () {
    console.log(this);
    this.classList.add("blue");
}