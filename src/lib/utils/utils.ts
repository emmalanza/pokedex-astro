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
    "normal": "/src/assets/svg/pokeTypes/normal.svg",
    "fighting": "/src/assets/svg/pokeTypes/fighting.svg",
    "flying": "/src/assets/svg/pokeTypes/flying.svg",
    "poison": "/src/assets/svg/pokeTypes/poison.svg",
    "ground": "/src/assets/svg/pokeTypes/ground.svg",
    "rock": "/src/assets/svg/pokeTypes/rock.svg",
    "bug": "/src/assets/svg/pokeTypes/bug.svg",
    "ghost": "/src/assets/svg/pokeTypes/ghost.svg",
    "steel": "/src/assets/svg/pokeTypes/steel.svg",
    "fire": "/src/assets/svg/pokeTypes/fire.svg",
    "water": "/src/assets/svg/pokeTypes/water.svg",
    "grass": "/src/assets/svg/pokeTypes/grass.svg",
    "electric": "/src/assets/svg/pokeTypes/electric.svg",
    "psychic": "/src/assets/svg/pokeTypes/psychic.svg",
    "ice": "/src/assets/svg/pokeTypes/ice.svg",
    "dragon": "/src/assets/svg/pokeTypes/dragon.svg",
    "dark": "/src/assets/svg/pokeTypes/dark.svg",
    "fairy": "/src/assets/svg/pokeTypes/fairy.svg",
 
}
