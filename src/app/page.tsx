"use client";

import { useState } from "react";
import Characters from "@/components/Characters";
import Navigation from "@/components/navigation";
import EpisodeCharacters from "@/components/EpisodeCharacters";

export default function Home() {
  const [episodeSelected, setEpisodeSelected] = useState("");

  return (
    <>
      <h1 className="text-center text-3xl">Rick and Morty Characters</h1>
      <div className="flex flex-row items-start justify-between h-auto m-[5]">      
        <Navigation setEpisodeSelected={setEpisodeSelected} episodeSelected={episodeSelected} />
        {!episodeSelected ? <Characters /> : <EpisodeCharacters episodeSelected={episodeSelected} />}
      </div>
    </>
  );
}
