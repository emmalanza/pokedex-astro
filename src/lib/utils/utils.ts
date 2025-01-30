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