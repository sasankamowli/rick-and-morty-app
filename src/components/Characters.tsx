"use client";

import {useState, useEffect} from "react";
import axios from "axios";
import Image from "next/image";
import { charactersType } from "@/types/characterTypes";

export default function Characters() {
    const [data, setData] = useState<charactersType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [next, setNext] = useState<null | string>(null);
    const [prev, setPrev] = useState<null | string>(null);

    async function fetchData(url: string) {
        setLoading(true);
        setData([]);
        let response;
        try{
            response = await axios.get(url);
            if(response.status !== 200){
                setError("Data fetching failed");
                return;
            }
        } catch(err) {
            if(err instanceof Error) {
                setError(err.message);
            } else {
                throw new Error("Unknown error");
            }            
        } finally {
            setLoading(false);
        }
        if(response) setData([...response.data.results]);
        setNext(response?.data.info.next);
        setPrev(response?.data.info.prev);
    }

    useEffect(() => {     
        fetchData("https://rickandmortyapi.com/api/character/");   
    }
    , []);

    if(loading) return <div>Loading...</div>
    if(error) return <div>{error}</div>

    return (
        <div className="w-[1200] m-[20]">
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
            <br />
            <div className="flex justify-center">
                {prev && <span className="p-[5]" onClick={() => fetchData(prev)}>prev</span>}
                {next && <span className="p-[5]" onClick={() => fetchData(next)}>next</span>}
            </div>
        </div>
    )
}