const pokemonNames = [];
const fetchPromises = [];
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const maxPokeDex = 1008;
const pokeCardsSection = document.querySelector(".poke-cards");

//FUNCAO PRIMEIRA LETRA MAIUSCULA
function maiuscula(x) {
    if (!x) {
        return x;
    }

    return x.charAt(0).toUpperCase() + x.slice(1);
}

//FUNCAO SORTEAR NUMERO COM MINIMO E MAXIMO
function sorteador(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//SORTEADOR DE POKEMON PELO NUMERO POKEDEX
for (let i = 0; i < 3; i++) {
    const dexNum = sorteador(0, maxPokeDex);
    const fetchPromise = fetch(`https://pokeapi.co/api/v2/pokemon/${dexNum}`)
        .then(response => response.json())
        .then(data => pokemonNames.push(data.name))
        .catch(error => console.error(error));
    fetchPromises.push(fetchPromise);
}

// Use Promise.all to wait for all fetches to complete
Promise.all(fetchPromises)
    .then(() => {
        // After all fetches have completed, create and display the cards
        for (const pokemonName of pokemonNames) {
            fetchAndDisplayPokemon(pokemonName);
        }
    })
    .catch(error => console.error(error));


//FUNCAO PRA CRIAR CARTA COM ""DATA"" DOS POKEMONS
function createCard(data) {
    const card = document.createElement('div');
    const dano1 = sorteador(10, 90);
    const dano2 = sorteador(5, 30) + dano1; //SOMA COM DANO 1 PARA FICAR UM DANO MAIOR
    card.classList.add('poke-card');
    card.id = 'poke-card';

    card.innerHTML = `
    <div class="poke-card" id="poke-card">
    <div class="img-nome-pokemon" id="img-nome-pokemon">
        <div class="nome-vida">
            <div class="name-background" id="name-background">
                <h1 class="pokemonName" id="pokemonName">${maiuscula(data.name)}</h1>
            </div>
            <p class="vida" id="vida">hp240</p>
        </div>
        <div class="image-center"><img id="firstPokemonImage" src="${data.sprites.front_default}" alt=""></div>
    </div>
    <div class="scroll">
        <div class="centralizar-ataques">
            <div class="centralizar-items-ataque">
                <p class="energia-necessaria">${sorteador(1, 3)}</p>
                <p class="attackFonts" id="firstAttack">${maiuscula(data.moves[0].move.name)}</p>
                <p class="dano-ataque">${dano1}</p>
            </div>
        <div class="centralizar-items-ataque">
            <p class="energia-necessaria">${sorteador(3, 5)}</p>
            <p class="attackFonts" id="secondAttack">${maiuscula(data.moves[1].move.name)}</p>
            <p class="dano-ataque">${dano2}</p>
        </div>
            
            
        </div>
    </div>`;

    //PEGAR ELEMENTOS DAS CARTAS PARA ALTERAR O ESTILO
    const types = data.types.map((typeInfo) => typeInfo.type.name);
    const pokeBackground = card.querySelector(".img-nome-pokemon");
    const nameBackground = card.querySelector(".name-background");
    const pokeName = card.querySelector(".pokemonName");
    const vida = card.querySelector('.vida');
    let borderColor = '';

    //CONDICOES PARA ALTERAR O ESTILO DE ACORDO COM O TIPO
    if (types.includes("normal")) {
        borderColor = '#5b6057 solid 1vh';
        vida.style.textShadow = '0 0 2px #5b6057, 0 0 2px #5b6057, 0 0 3px #5b6057, 0 0 4px #5b6057, 0 0 5px #5b6057, 0 0 6px #5b6057, 0 0 7px #5b6057';
        vida.style.color = '#FFFFFF';
        pokeName.style.color = '#FFFFFF';
        nameBackground.style.backgroundColor = '#5b6057';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/normal.jpg)';
    } else if (types.includes("electric")) {
        borderColor = '#FDEE00 solid 1vh';
        vida.style.textShadow = '0 0 2px #FDEE00, 0 0 2px #FDEE00, 0 0 3px #FDEE00, 0 0 4px #FDEE00, 0 0 5px #FDEE00, 0 0 6px #FDEE00, 0 0 7px #FDEE00';
        vida.style.color = '#000000';
        pokeName.style.color = '#000000';
        nameBackground.style.backgroundColor = '#FDEE00';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/eletrico.jpeg)';
    } else if (types.includes("fire")) {
        borderColor = '#FF3800 solid 1vh';
        vida.style.textShadow = '0 0 2px #FF3800, 0 0 2px #FF3800, 0 0 3px #FF3800, 0 0 4px #FF3800, 0 0 5px #FF3800, 0 0 6px #FF3800, 0 0 7px #FF3800';
        vida.style.color = '#FFFFFF';
        pokeName.style.color = '#FFFFFF';
        nameBackground.style.backgroundColor = '#FF3800';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/fire.jpeg)';
    } else if (types.includes("water")) {
        borderColor = '#00B9E8 solid 1vh';
        vida.style.textShadow = '0 0 2px #00B9E8, 0 0 2px #00B9E8, 0 0 3px #00B9E8, 0 0 4px #00B9E8, 0 0 5px #00B9E8, 0 0 6px #00B9E8, 0 0 7px #00B9E8';
        vida.style.color = '#FFFFFF';
        nameBackground.style.backgroundColor = '#00B9E8';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/water.jpeg)';
    } else if (types.includes("grass")) {
        borderColor = '#8DB600 solid 1vh';
        vida.style.textShadow = '0 0 2px #8DB600, 0 0 2px #8DB600, 0 0 3px #8DB600, 0 0 4px #8DB600, 0 0 5px #8DB600, 0 0 6px #8DB600, 0 0 7px #8DB600';
        vida.style.color = '#FFFFFF';
        nameBackground.style.backgroundColor = '#8DB600';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/planta.jpeg)';
    } else if (types.includes("ice")) {
        borderColor = '#F0F8FF solid 1vh';
        vida.style.textShadow = '0 0 2px #F0F8FF, 0 0 2px #F0F8FF, 0 0 3px #F0F8FF, 0 0 4px #00B9E8, 0 0 5px #00B9E8, 0 0 6px #00B9E8, 0 0 7px #00B9E8';
        pokeName.style.color = '#000000';
        nameBackground.style.backgroundColor = '#F0F8FF';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/ice.jpeg)';
    } else if (types.includes("flying")) {
        borderColor = '#B87333 solid 1vh';
        vida.style.textShadow = '0 0 2px #B87333, 0 0 2px #B87333, 0 0 3px #B87333, 0 0 4px #B87333, 0 0 5px #B87333, 0 0 6px #B87333, 0 0 7px #B87333';
        vida.style.color = '#FFFFFF';
        pokeName.style.color = '#FFFFFF';
        nameBackground.style.backgroundColor = '#B87333';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/voador.jpeg)';
    } else if (types.includes("ghost")) {
        borderColor = '#7851A9 solid 1vh';
        vida.style.textShadow = '0 0 2px #7851A9, 0 0 2px #7851A9, 0 0 3px #7851A9, 0 0 4px #7851A9, 0 0 5px #7851A9, 0 0 6px #7851A9, 0 0 7px #7851A9';
        pokeName.style.color = '#000000';
        nameBackground.style.backgroundColor = '#7851A9';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/fantasma.jpeg)';
    } else if (types.includes("fighting")) {
        borderColor = '#DC143C solid 1vh';
        vida.style.textShadow = '0 0 2px #DC143C, 0 0 2px #DC143C, 0 0 3px #DC143C, 0 0 4px #DC143C, 0 0 5px #DC143C, 0 0 6px #DC143C, 0 0 7px #DC143C';
        vida.style.color = '#FFFFFF';
        pokeName.style.color = '#FFFFF';
        nameBackground.style.backgroundColor = '#DC143C';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/lutador.jpeg)';
    } else if (types.includes("bug")) {
        borderColor = '#50C878 solid 1vh';
        vida.style.textShadow = '0 0 2px #50C878, 0 0 2px #50C878, 0 0 3px #50C878, 0 0 4px #50C878, 0 0 5px #50C878, 0 0 6px #50C878, 0 0 7px #50C878';
        vida.style.color = '#FFFFFF';
        pokeName.style.color = '#FFFFF';
        nameBackground.style.backgroundColor = '#50C878';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/inseto.jpeg)';
    } else if (types.includes("psychic")) {
        borderColor = '#FE6F5E solid 1vh';
        vida.style.textShadow = '0 0 2px #FE6F5E, 0 0 2px #FE6F5E, 0 0 3px #FE6F5E, 0 0 4px #FE6F5E, 0 0 5px #FE6F5E, 0 0 6px #FE6F5E, 0 0 7px #FE6F5E';
        vida.style.color = '#FFFFFF';
        pokeName.style.color = '#FFFFF';
        nameBackground.style.backgroundColor = '#FE6F5E';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/psiquico.jpeg)';
    } else if (types.includes("dark")) {
        borderColor = '#242124 solid 1vh';
        vida.style.textShadow = '0 0 2px #242124, 0 0 2px #242124, 0 0 3px #242124, 0 0 4px #242124, 0 0 5px #242124, 0 0 6px #242124, 0 0 7px #242124';
        vida.style.color = '#FFFFFF';
        pokeName.style.color = '#FFFFF';
        nameBackground.style.backgroundColor = '#242124';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/sombrio.jpeg)';
    } else if (types.includes("dragon")) {
        borderColor = '#FF7900 solid 1vh';
        vida.style.textShadow = '0 0 2px #FF7900, 0 0 2px #FF7900, 0 0 3px #FF7900, 0 0 4px #FF7900, 0 0 5px #FF7900, 0 0 6px #FF7900, 0 0 7px #FF7900';
        vida.style.color = '#FFFFFF';
        pokeName.style.color = '#FFFFF';
        nameBackground.style.backgroundColor = '#FF7900';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/dragao.jpeg)';
    } else if (types.includes("poison")) {
        borderColor = '#228B22 solid 1vh';
        vida.style.textShadow = '0 0 2px #228B22, 0 0 2px #228B22, 0 0 3px #228B22, 0 0 4px #228B22, 0 0 5px #228B22, 0 0 6px #228B22, 0 0 7px #228B22';
        vida.style.color = '#FFFFFF';
        pokeName.style.color = '#FFFFF';
        nameBackground.style.backgroundColor = '#228B22';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/venenoso.jpeg)';
    } else if (types.includes("fairy")) {
        borderColor = '#F56FA1 solid 1vh';
        vida.style.textShadow = '0 0 2px #F56FA1, 0 0 2px #F56FA1, 0 0 3px #F56FA1, 0 0 4px #F56FA1, 0 0 5px #F56FA1, 0 0 6px #F56FA1, 0 0 7px #F56FA1';
        vida.style.color = '#FFFFFF';
        pokeName.style.color = '#FFFFF';
        nameBackground.style.backgroundColor = '#F56FA1';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/fada.jpeg)';
    } else if (types.includes("steel")) {
        borderColor = '#414A4C solid 1vh';
        vida.style.textShadow = '0 0 2px #414A4C, 0 0 2px #414A4C, 0 0 3px #414A4C, 0 0 4px #414A4C, 0 0 5px #414A4C, 0 0 6px #414A4C, 0 0 7px #414A4C';
        vida.style.color = '#FFFFFF';
        pokeName.style.color = '#FFFFF';
        nameBackground.style.backgroundColor = '#414A4C';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/aco.jpeg)';
    } else if (types.includes("rock")) {
        borderColor = '#708090 solid 1vh';
        vida.style.textShadow = '0 0 2px #708090, 0 0 2px #708090, 0 0 3px #708090, 0 0 4px #708090, 0 0 5px #708090, 0 0 6px #708090, 0 0 7px #708090';
        vida.style.color = '#FFFFFF';
        pokeName.style.color = '#FFFFF';
        nameBackground.style.backgroundColor = '#708090';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/pedra.jpeg)';
    } else if (types.includes("ground")) {
        borderColor = '#B87333 solid 1vh';
        vida.style.textShadow = '0 0 2px #B87333, 0 0 2px #B87333, 0 0 3px #B87333, 0 0 4px #B87333, 0 0 5px #B87333, 0 0 6px #B87333, 0 0 7px #B87333';
        vida.style.color = '#FFFFFF';
        pokeName.style.color = '#FFFFF';
        nameBackground.style.backgroundColor = '#B87333';
        pokeBackground.style.backgroundImage = 'url(assets/images/pokeBackgrounds/terra.jpeg)';
    }
    card.style.border = borderColor;

    return card;
}

// FUNCAO PRA CRIAR E ADICIONAR UMA CARTA PRA UM POKEMON
function fetchAndDisplayPokemon(pokemonName) {
    fetch(apiUrl + pokemonName)
        .then(response => response.json())
        .then(data => {
            const pokeCardElement = createCard(data);
            pokeCardsSection.appendChild(pokeCardElement);
        })
        .catch(error => console.error(error));
}

// Iterar sobre os nomes dos pokémons e criar um card para cada um
for (const pokemonName of pokemonNames) {
    fetchAndDisplayPokemon(pokemonName);
}
