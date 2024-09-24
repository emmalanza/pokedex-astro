const totalNumOfPokemons: number = 1025;

export interface PokemonSmall {
    id: number,
    name: string,
    types: PokemonType[]
    image: string,
}

export interface PokemonBig {
    basicData: PokemonSmall,
    height: number,
    weight: number,
    evolutions?: PokemonSmall[]
}

export interface PokemonType {
    slot: number,
    type: {
        name: string,
        url: string
    }
}

export const TypeColors : { [clave: string]: string } = {
    "normal": "bg-pokemonTypes-normal",
    "fighting": "bg-pokemonTypes-fighting",
    "flying": "bg-pokemonTypes-flying",
    "poison": "bg-pokemonTypes-poison",
    "ground": "bg-pokemonTypes-ground",
    "rock": "bg-pokemonTypes-rock",
    "bug": "bg-pokemonTypes-bug",
    "ghost": "bg-pokemonTypes-ghost",
    "steel": "bg-pokemonTypes-steel",
    "fire": "bg-pokemonTypes-fire",
    "water": "bg-pokemonTypes-water",
    "grass": "bg-pokemonTypes-grass",
    "electric": "bg-pokemonTypes-electric",
    "psychic": "bg-pokemonTypes-psychic",
    "ice": "bg-pokemonTypes-ice",
    "dragon": "bg-pokemonTypes-dragon",
    "dark": "bg-pokemonTypes-dark",
    "fairy": "bg-pokemonTypes-fairy",
    "stellar": "bg-pokemonTypes-stellar",
    "unknown": "bg-pokemonTypes-unknown",
    "shadow": "bg-pokemonTypes-shadow",
}

export async function  fetchPokemons(limit : number) : Promise<PokemonSmall[]> {
    try {

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        
        // Verificamos si la respuesta es válida y si tiene el campo 'results'
        if (!response.ok) {
            throw new Error(`Error fetching Pokémon list: ${response.statusText}`);
        }

        const pokemonList = await response.json();
        
        // Verificamos si 'results' existe en la respuesta
        if (!pokemonList || !pokemonList.results || !Array.isArray(pokemonList.results)) {
            throw new Error('Invalid response format from PokeAPI');
        }

        const pokemons: PokemonSmall[] = await Promise.all(
            pokemonList.results.map(async (data: any, index: number) => {
               
                if (index + 1 > totalNumOfPokemons) return; 
                const typesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
                
                if (!typesResponse.ok) {
                    throw new Error(`Error fetching Pokémon details for ID ${index + 1}`);
                }

                const pokemonTypes = await typesResponse.json();

                if (!pokemonTypes || !pokemonTypes.types || !Array.isArray(pokemonTypes.types)) {
                    throw new Error('Invalid response format from PokeAPI');
                }
                
                // Obteniendo los tipos del Pokémon
                const types : PokemonType[] = await pokemonTypes.types.map((type: any) =>{
                    return {
                        slot: type.slot,
                        type: {
                            name: type.type.name,
                            url: type.type.url
                        }
                    };
                });
                
                return {
                    name: data.name,
                    id: index + 1,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                    types: types, 
                };
            })
        ).catch();

        return pokemons;

    } catch (error) {
        console.error("Error in getPokemons:", error);
        throw error; // Re-lanzamos el error para que pueda ser manejado por la parte que llama a la función
    }
}

export async function fetchPokemonsById(id : number) : Promise<PokemonBig> {

    
    const pokemonResponse: any  = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));



    const pokemon : PokemonBig = 
    {
        basicData: {
            id: pokemonResponse.id,
            name: pokemonResponse.name,
            types: pokemonResponse.types,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonResponse.id}.png`

        },
        height: pokemonResponse.height,
        weight: pokemonResponse.weight,
        evolutions: await getPokemonsEvolutions(pokemonResponse.id)
    }

    return pokemon;

}

export async function fetchPokemonsEvolutions(id: number) : Promise<PokemonSmall[]>{

    const pokemonResponse: any  = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));

    const evolutionChainURL = pokemonResponse.evolution_chain.url;

    const evolutionChainResponse: any  = await fetch(evolutionChainURL)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));
    
    const evolutionNames: string [] = [];
    //Añadimos el primer eslabon de la cadena de evolucion 
    evolutionNames.push(evolutionChainResponse.chain.species.name);
    //Y luego recorremos todas las evoluciones :)
    const evolutionChainData = evolutionChainResponse.chain.evolves_to;
    function extractEvolutions(chain: any) {
        if(chain.length > 0){
            chain.forEach((evolution : any) => {
                evolutionNames.push(evolution.species.name);
                if (evolution.evolves_to.length > 0) {
                    extractEvolutions(evolution.evolves_to);
                }
            });
        }
    }
    extractEvolutions(evolutionChainData);

    const pokemonEvolutionData: PokemonSmall[] = [];
    for (const name of evolutionNames) {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .catch(err => console.log(err));
        pokemonEvolutionData.push({
            id: data.id,
            name: data.name,
            types: data.types,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
        })
    }
    
    return pokemonEvolutionData;

}

export async function getPokemons(limit: number) {
    try {
        const pokemons = await fetchPokemons(limit);
        return pokemons;
    } catch (error) {
        console.error('Error fetching pokémons:', error);
    }
}

export async function getPokemonsById(id: number) {
    try {
        const pokemons = await fetchPokemonsById(id);
        return pokemons;
    } catch (error) {
        console.error('Error fetching pokemons by id:', error);
    }
}

export async function getPokemonsEvolutions(id: number){
    try {
        const evolutions = await fetchPokemonsEvolutions(id);
        return evolutions;
    }catch(error){
        console.log('Error fetching pokemons evolutions');
    }
}


//TODO: sacar estas funcion de aquiiiiii
export function capitalizeFirstLetter(string: string) {
    const [first, ...rest] = string;
    return first.toUpperCase() + rest.join('').toLowerCase();
  }

export function mapId (id : number) : string {
    let stringId = id.toString();
    switch (stringId.length) {
        case 1: return "000" + stringId;
        case 2: return "00" + stringId;
        case 3: return "0" + stringId;
    }
    return stringId;
}

//funcion para mapear la altura y el peso del pokemon 
export function mapWHPokemon (d : number) : string{
    const data = (d / 10).toFixed(1);
    return data;
}