import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { charactersType } from "@/types/characterTypes";

export default function EpisodeCharacters({ episodeSelected }: {episodeSelected: string}) {
    const [data, setData] = useState<charactersType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [episodeName, setEpisodeName] = useState<string>("");

        
    useEffect(() => {
        fetchData();
    }, [episodeSelected]);

        
    useEffect(() => {
        fetchData();
    }, []);

    
    async function fetchData() {
        setLoading(true);
        setData([]);
        let episodeResponse;
        let allCharactersInEpisodeResponse;
        let charactersUrl;
        try{
            episodeResponse = await axios.get("https://rickandmortyapi.com/api/episode/"+episodeSelected);
            if(episodeResponse.status !== 200) {
                setError("Data fetching failed");
                return;
            }
            setEpisodeName(episodeResponse.data.name);
            charactersUrl = "https://rickandmortyapi.com/api/character/";
            for(let i = 0; i < episodeResponse.data.characters.length; i++){
                let urlArray = episodeResponse.data.characters[i].split("/");
                charactersUrl = charactersUrl.concat(urlArray[urlArray.length - 1]);
                if(i !== episodeResponse.data.characters.length - 1){
                    charactersUrl = charactersUrl.concat(",");
                }
            }
            allCharactersInEpisodeResponse = await axios.get(charactersUrl);
            if(allCharactersInEpisodeResponse.status !== 200) {
                setError("Data fetching failed");
                return;
            }
            setData(allCharactersInEpisodeResponse.data);
        } catch (err) {
            if(err instanceof Error) {
                setError(err.message);
            } else {
                throw new Error("Unknown error");
            }
        } finally {
            setLoading(false);
        }
    }    

    if(loading) return <h3>Loading...</h3>;
    if(error) return <h3>{error}</h3>;
    return (
        <div className="w-[1200] m-[20]">
                <h3>{data.length} characters in episode {episodeName}</h3>
                <div className="grid grid-cols-5 gap-4">
              {data.map((character: charactersType) => (
                <div key={character.id}>
                    <Image 
                        src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`} 
                        width="100" 
                        height="100" 
                        alt={character.name} 
                    />
                    <p>{character.name}</p>
                </div>
              ))}
              </div>
            </div>
    )
}