import { fetchPokemons, fetchPokemonsById, fetchPokemonsEvolutions } from "../api/fetchPokemons";

export async function getPokemons(offset: number, limit: number) {
    try {
        const pokemons = await fetchPokemons(offset, limit);
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