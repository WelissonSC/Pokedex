const pokemonName = document.querySelector('.pokemon__name');
const pokemonId = document.querySelector('.pokemon__number');
const pokemonImage  = document.querySelector('.pokemon__img');

const form  = document.querySelector('.form');
const input = document.querySelector('.input__search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let serachPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
    
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonId.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; 
        input.value = '';
        serachPokemon = data.id;
    }

    else{
        pokemonId.innerHTML = '';
        pokemonName.innerHTML = 'Not Found';
        pokemonImage.style.display = 'none';
        input.value = '';
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnNext.addEventListener('click', () => {
    serachPokemon ++;
    renderPokemon(serachPokemon);
})

btnPrev.addEventListener('click', () => {
    if (serachPokemon > 1) {
        serachPokemon --;
        renderPokemon(serachPokemon);
    }

})

renderPokemon(serachPokemon);

