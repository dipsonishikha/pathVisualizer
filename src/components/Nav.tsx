import { Select } from "./Select";
import { usePathfinding } from "../context/hooks/usePathfinding";
import { useTile } from "../context/hooks/useTile";
import  { MAZES } from "../context/utils/constants";
import type { MazeType } from "../context/utils/types";
import { resetGrid } from "../context/utils/resetGrid";

export function Nav(){
    const {maze,setMaze,grid}=usePathfinding();
    const {startTile,endTile}=useTile();
    const handleGenerateMaze=(maze :MazeType)=>{
        setMaze(maze);
        resetGrid({grid,startTile,endTile})
    };
    
    return (
        <div className="flex items-center justify-center min-h-[4.5rem] shadow-gray-600 sm:px-5 px-0;">
            <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
                <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">PathFinding Visualiser </h1>
                <div className='flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4'>
                    <Select
                        label="Maze"
                        value={maze}
                        options={MAZES}
                        onChange={(e)=>{
                            handleGenerateMaze(e.target.value as MazeType)
                        }}
                    />
                </div>
            </div>
        </div>
    );
}