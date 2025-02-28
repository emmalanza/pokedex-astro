export const totalNumOfPokemons: number = 1025;

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
    evolutions?: PokemonSmall[],
    description: string,
}

export interface PokemonType {
    slot: number,
    type: {
        name: string,
        url: string
    }
}


