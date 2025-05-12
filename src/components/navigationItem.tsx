import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

export default function NavigationItem(
        {name, id, setEpisodeSelected, episodeSelected} : 
        {name: string, id: number, setEpisodeSelected: Dispatch<SetStateAction<string>>, episodeSelected: string}) 
    {

    const [selected, setSelected] = useState<boolean>(false);

    const isActive = id.toString() === episodeSelected;

    return (
        <div className = 
            {isActive ? 
                "p-[5] border-5 border-solid border-black m-[10]" : 
                "p-[5] border-2 border-solid border-black m-[10]"} 
            onClick={() => {
                if(!selected) {
                    setSelected(true);
                    setEpisodeSelected(id.toString());                    
                } else if(isActive){
                    setSelected(false);
                    setEpisodeSelected("");
                } else {
                    setEpisodeSelected(id.toString());
                }
            }
        }>{name}</div>
    )
}