"use client";

import { useEffect, useState } from 'react';
import axios from "axios";
import NavigationItem from './navigationItem';
import type { Dispatch, SetStateAction } from "react";
import { episodesResponseType, episodesType } from '@/types/episodesTypes';

export default function Navigation(
        { episodeSelected, setEpisodeSelected }: 
        {episodeSelected: string, setEpisodeSelected: Dispatch<SetStateAction<string>>}) 
    {

    const [data, setData] = useState<episodesType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [next, setNext] = useState<null | string>(null);

    async function fetchData(url = "https://rickandmortyapi.com/api/episode") {
        if(data.length === 0) setLoading(true);
        let response;
        try{
            response = await axios.get<episodesResponseType>(url);
            if(response.status !== 200){
                setError("Data fetching failed");
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
        if(response) setData([...data, ...response.data.results]);
        if(response?.data.info.next === null || response?.data.info.next) setNext(response?.data.info.next);
    }

    useEffect(() => {     
        fetchData();   
    }
    , []);

    useEffect(() => {
        if(next) fetchData(next);
    }, [next]);

    if(loading) return <div>Loading...</div>
    if(error) return <div>{error}</div>

    return (
        <div className="w-[300] h-[620] bg-red border-2 border-black border-solid overflow-scroll">
            <h3 className='text-center'>Episodes</h3>
            {data.map(episode => <NavigationItem key={episode.id} name={episode.name} id={episode.id} setEpisodeSelected={setEpisodeSelected} episodeSelected={episodeSelected}></NavigationItem>)}
        </div>
    )
}