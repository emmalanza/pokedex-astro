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

export const TypeColors : { [clave: string]: string } = {
    "normal": "border-pokemonTypes-normal",
    "fighting": "border-pokemonTypes-fighting",
    "flying": "border-pokemonTypes-flying",
    "poison": "border-pokemonTypes-poison",
    "ground": "border-pokemonTypes-ground",
    "rock": "border-pokemonTypes-rock",
    "bug": "border-pokemonTypes-bug",
    "ghost": "border-pokemonTypes-ghost",
    "steel": "border-pokemonTypes-steel",
    "fire": "border-pokemonTypes-fire",
    "water": "border-pokemonTypes-water",
    "grass": "border-pokemonTypes-grass",
    "electric": "border-pokemonTypes-electric",
    "psychic": "border-pokemonTypes-psychic",
    "ice": "border-pokemonTypes-ice",
    "dragon": "border-pokemonTypes-dragon",
    "dark": "border-pokemonTypes-dark",
    "fairy": "border-pokemonTypes-fairy",

}

export const Typesvg : { [clave: string]: string } = {
    "normal": "/svg/pokeTypes/normal.svg",
    "fighting": "/svg/pokeTypes/fighting.svg",
    "flying": "/svg/pokeTypes/flying.svg",
    "poison": "/svg/pokeTypes/poison.svg",
    "ground": "/svg/pokeTypes/ground.svg",
    "rock": "/svg/pokeTypes/rock.svg",
    "bug": "/svg/pokeTypes/bug.svg",
    "ghost": "/svg/pokeTypes/ghost.svg",
    "steel": "/svg/pokeTypes/steel.svg",
    "fire": "/svg/pokeTypes/fire.svg",
    "water": "/svg/pokeTypes/water.svg",
    "grass": "/svg/pokeTypes/grass.svg",
    "electric": "/svg/pokeTypes/electric.svg",
    "psychic": "/svg/pokeTypes/psychic.svg",
    "ice": "/svg/pokeTypes/ice.svg",
    "dragon": "/svg/pokeTypes/dragon.svg",
    "dark": "/svg/pokeTypes/dark.svg",
    "fairy": "/svg/pokeTypes/fairy.svg",
 
}

export const TypesEs : { [clave: string]: string } = {
    "normal": "Normal",
    "fighting": "Lucha",
    "flying": "Volador",
    "poison": "Veneno",
    "ground": "Tierra",
    "rock": "Roca",
    "bug": "Bicho",
    "ghost": "Fantasma",
    "steel": "Acero",
    "fire": "Fuego",
    "water": "Agua",
    "grass": "Planta",
    "electric": "Eléctrico",
    "psychic": "Psíquico",
    "ice": "Hielo",
    "dragon": "Dragón",
    "dark": "Siniestro",
    "fairy": "Hada",
};
