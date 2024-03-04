'use strict'

window.onload = init;

function init() {
    const searchBox = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', () => {
        getAuthor(searchBox.value);
    });
    
}

async function getAuthor(search) {
    try{
        const response = await fetch(`https://api.openalex.org/authors?search=${search}`);
        const data = await response.json();
        console.log(data.results[0].display_name);
        data.results.forEach(array => {
            console.log(array.display_name)
        });
    } catch(error) {
        console.log(error);
    }
}

function showConsole() {
    console.log(search.value)
}