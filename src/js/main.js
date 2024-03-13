'use strict'

window.onload = init;

function init() {
    const searchBox = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', () => {
        fetchOne(searchBox.value);
    });
    
}

// Visa och göm loading div
function showLoader() {
    const loadDiv = document.getElementById('loader');
    loadDiv.classList.add('show');
};
function hideLoader() {
    const loadDiv = document.getElementById('loader');
    loadDiv.classList.remove('show');
};



// Hämta data
async function fetchOne(search) {
    showLoader();
    
    // Parametrar
    const url = 'https://api.api-ninjas.com/v1/dogs?name=' + search
    const options = {
        method: 'GET',
        headers: { 'X-Api-Key': 'DKwpL0bB0BpTtamB5Dhngg==U1EwoHS63hfiS92Z'}
        };
    
    // Fetch-anrop 1 / Från API-Ninjas
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        showDogs(result);
    } catch {
        console.log('Något gick fel')
    }
};

// Visa hundar vid sökning
async function showDogs(array) {

    hideLoader();
    // Hämta och rensa main-div innan utskrift
    const mainDiv = document.getElementById('dogs');
    mainDiv.innerHTML = '';

    // Loopa igenom och skapa article för varje hund
    array.forEach(dog => {
        // Skapa article
        let newArticleEl = document.createElement('article');
        // Skapa och hämta bild
        let newImgEl = document.createElement('img');
        newImgEl.src = dog.image_link;
        // Skapa och hämta hundras
        let newH2El = document.createElement('h2');
        let newH2Text = document.createTextNode(dog.name);
        newH2El.appendChild(newH2Text);
        
        // Lägg till i HTML
        mainDiv.appendChild(newArticleEl);
        newArticleEl.appendChild(newImgEl);
        newArticleEl.appendChild(newH2El);

        // Klick-funktion
        newArticleEl.addEventListener('click', function() {
            fetchTwo(dog);
            toggleShowInfo();
        });
    });

};


async function fetchTwo(dog) {
    const breed = dog.name;
    // Parametrar
    const url = 'https://dog-breeds2.p.rapidapi.com/dog_breeds/breed/' + breed;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '611904410bmsh3966ebf451c005ep1902a4jsn5f36d0fc16ba',
            'X-RapidAPI-Host': 'dog-breeds2.p.rapidapi.com'
        }
    };
    
    //Fetch-anrop 2 / Från RapidAPI
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const array = result[0];

        const newArray = {
            name: dog.name,
            image: dog.image_link,
            coat: array.meta.coat,
            origin: array.origin,
            drooling: dog.drooling,
            energy: dog.energy
        };

        showDogsInfo(newArray);
        
    } catch (error) {
        console.error(error);
    }
}

function showDogsInfo(dog) {
    // Hämta div
    const infoDiv = document.getElementById('dogsInfo');

    infoDiv.innerHTML = '';

    let drooling;
    switch(dog.drooling) {
        case 1:
            drooling = 'Pretty much nothing.';
            break;
        case 2:
            drooling = 'Just a little.';
            break;
        case 3:
            drooling = 'Some puddles here and there.';
            break;
        case 4:
            drooling = 'Swimming pool warning.';
            break;
        case 5:
            drooling = 'Who left the bath tub tap running? God dammit!';
            break;
        default:
            drooling = 'We have no idea.';
    };
    let energy;
    switch(dog.energy) {
        case 1:
            energy = 'You will probably think the dog is dead.';
            break;
        case 2:
            energy = 'Moving between the couch and food bowl.';
            break;
        case 3:
            energy = 'Will jump if excited.';
            break;
        case 4:
            energy = 'Pretty high maintenance.';
            break;
        case 5:
            energy = 'You will have to run a marathon every other day.';
            break;
        default:
            energy = 'We have no idea.';
    };

    // Skapa article med innehåll
    infoDiv.innerHTML += 
        `<article>
            <button id="close"><i class="fa-solid fa-xmark fa-2xl"></i></button>
            <h1>${dog.name}</h1>
            <img src=${dog.image}>
            <div id='infoBox'>
                <h2>Information</h2>
                <p>Origin: ${dog.origin}</p>
                <p>Type of coat: ${dog.coat}</p>
                <p>Amount of drooling: ${drooling}</p>
                <p>Average energy level: ${energy}</p>
            </div>
        </article>`

    // Stäng-knapp
    let closeBtn = document.getElementById('close');
    closeBtn.addEventListener('click', function() {
        infoDiv.innerHTML = ''
        toggleShowInfo();
    });
};
// Visa och dölj Info
function toggleShowInfo() {
    const infoDiv = document.getElementById('dogsInfo');

    if(infoDiv.style.display === "none") {
        infoDiv.style.display = "block"
    } else {
        infoDiv.style.display = "none"
    }
}