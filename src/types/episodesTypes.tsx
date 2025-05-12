type episodesInfoType = {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export type episodesType = {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: [string];
    url: string;
    created: string;
}

export type episodesResponseType = {
    info: episodesInfoType;
    results: [episodesType];
}