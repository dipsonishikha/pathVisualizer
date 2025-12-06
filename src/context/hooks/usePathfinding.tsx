import { useContext } from "react";
import { Pathfindingcontext } from "../Pathfindingcontext";

export const usePathfinding=()=>{
    const context=useContext(Pathfindingcontext)

    if(!context){
        throw new Error("usePathfinding must be used within a PathfindingcontextProvider")
    }

    return context;
}