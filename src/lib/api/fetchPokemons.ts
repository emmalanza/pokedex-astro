import { getPokemonsEvolutions } from "../controllers/pokemonController";
import { type PokemonSmall, type PokemonType, type PokemonBig } from "../models/pokemonModels";

export async function  fetchPokemons(offset: number, limit: number) : Promise<PokemonSmall[]> {
    try {

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        
        // Verificamos si la respuesta es válida y si tiene el campo 'results'
        if (!response.ok) {
            throw new Error(`Error fetching Pokémon list: ${response.statusText}`);
        }

        const pokemonResponse = await response.json();
        
        // Verificamos si 'results' existe en la respuesta
        if (!pokemonResponse || !pokemonResponse.results || !Array.isArray(pokemonResponse.results)) {
            throw new Error('Invalid response format from PokeAPI');
        }

        const pokemons: PokemonSmall[] = await Promise.all(
            pokemonResponse.results.map(async (data: any) => {

                const typesResponse = await fetch(data.url);
                
                if (!typesResponse.ok) {
                    throw new Error(`Error fetching Pokémon details for ${data.url}`);
                }

                const pokemonById = await typesResponse.json();

                if (!pokemonById || !pokemonById.types || !Array.isArray(pokemonById.types)) {
                    throw new Error('Invalid response format from PokeAPI');
                }
                
                // Obteniendo los tipos del Pokémon
                const types : PokemonType[] = await pokemonById.types.map((type: any) =>{
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
                    id: pokemonById.id,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/dream-world/${pokemonById.id}.svg`,
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

export async function fetchPokemonsByIdOrName(idOrName : string) : Promise<PokemonBig> {

    
    const pokemonResponse: any  = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));



    const pokemon : PokemonBig = 
    {
        basicData: {
            id: pokemonResponse.id,
            name: pokemonResponse.name,
            types: pokemonResponse.types,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/dream-world/${pokemonResponse.id}.svg`,

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
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/dream-world/${data.id}.svg`,
        })
    }
    
    return pokemonEvolutionData;

}