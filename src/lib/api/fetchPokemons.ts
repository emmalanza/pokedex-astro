import { getPokemonDescription, getPokemonsEvolutions } from "../controllers/pokemonController";
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
                    image: pokemonById.id >= 650 
                    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonById.id}.png` 
                    : `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/dream-world/${pokemonById.id}.svg`,                    types: types, 
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

    console.log("hoolalala",idOrName);
    console.log(pokemonResponse.id);

    const pokemon : PokemonBig = 
    {
        basicData: {
            id: pokemonResponse.id,
            name: pokemonResponse.name,
            types: pokemonResponse.types,
            image: pokemonResponse.id >= 650 
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonResponse.id}.png` 
            : `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/dream-world/${pokemonResponse.id}.svg`,
        },
        height: pokemonResponse.height,
        weight: pokemonResponse.weight,
        evolutions: await getPokemonsEvolutions(pokemonResponse.id),
        description: (await getPokemonDescription(pokemonResponse.id)) ?? ''
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
    console.log(evolutionChainData, evolutionNames);
    function extractEvolutions(chain: any) {
        if(chain.length > 0){
            chain.forEach((evolution : any) => {
                if(evolution.species.name === "wormadam"){
                    evolution.species.name = "wormadam-plant"; 
                }
                if(evolution.species.name === "lycanroc"){
                    evolution.species.name = "lycanroc-midday"; 
                }
                if(evolution.species.name === "toxtricity"){
                    evolution.species.name = "toxtricity-amped"; 
                }
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
            image: data.id >= 650 
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png` 
            : `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/dream-world/${data.id}.svg`,})
    }
    
    return pokemonEvolutionData;

}

export async function fetchPokemonDescription(id: number): Promise<string> {
    try {
        // Fetch de la API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        
        // Verifica si la respuesta es correcta
        if (!response.ok) {
            throw new Error(`Error fetching Pokémon species: ${response.status}`);
        }

        const data = await response.json();

        // Verifica si hay flavor_text_entries disponibles
        if (!data.flavor_text_entries || data.flavor_text_entries.length === 0) {
            return "Descripción no disponible.";
        }

        // Filtra por idioma español (es)
        const descriptionEntry = data.flavor_text_entries.find(
            (entry: { language: { name: string } }) => entry.language.name === "es"
        );

        // Si encuentra una descripción en español, la devuelve, si no, devuelve la primera disponible
        const description = descriptionEntry 
            ? descriptionEntry.flavor_text 
            : data.flavor_text_entries[0].flavor_text;

        return description.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s+/g, " ").trim();


    } catch (error) {
        console.error("Error fetching Pokémon description:", error);
        return "Error al obtener la descripción.";
    }
}