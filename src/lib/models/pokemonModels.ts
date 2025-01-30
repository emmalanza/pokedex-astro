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

