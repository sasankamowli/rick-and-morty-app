type characterInfoType = {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export type charactersType = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {};
    location: {};
    image: string;
    episodes: [string];
    url: string;
    created: string;
}

export type charactersResponseType = {
    info: characterInfoType;
    results: [charactersType];
}