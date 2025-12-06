import { twMerge } from "tailwind-merge";
import { usePathfinding } from "../context/hooks/usePathfinding";
import { MAX_ROWS, MAX_COLS } from "../context/utils/constants";
import { Tile } from "./Tile";
import {useState, type MutableRefObject} from "react";
import { checkIfStartOrEndTile } from "../context/utils/helpers";
import  { createNewGrid } from "../context/utils/helpers";

export function Grid({isVisualizationRunningRef}:{isVisualizationRunningRef:MutableRefObject<boolean>}) {
    const { grid ,setGrid} = usePathfinding();
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseDown=(row:number, col:number)=>{
        if(isVisualizationRunningRef.current || checkIfStartOrEndTile(row,col)){
            return;
        }
        setIsMouseDown(true);
        const newGrid=createNewGrid(grid, row, col);
        setGrid(newGrid);
    };
    const handleMouseUp=(row:number, col:number)=>{
        if(isVisualizationRunningRef.current || checkIfStartOrEndTile(row,col)){
            return;
        }
        setIsMouseDown(false);
    }
    const handleMouseEnter=(row:number,col:number)=>{
        if(isVisualizationRunningRef.current || checkIfStartOrEndTile(row,col)){
            return;
        }
        if(isMouseDown){
            const newGrid=createNewGrid(grid,row,col);
            setGrid(newGrid);
        }
    }

    return (
        <div
            className={twMerge(
                "flex items-center flex-col justify-center border border-sky-300 mt-10",
                `lg:min-h-[${MAX_ROWS * 27}px] md:min-h-[${MAX_ROWS * 15}px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,
                `lg:w-[${MAX_COLS * 27}px] md:w-[${MAX_COLS * 15}px] xs:w-[${MAX_COLS * 8}px]`
            )}
        >
            {/* ROWS */}
            {grid.map((r, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {/* COLUMNS */}
                    {r.map((tile, tileIndex) => {
                        const{row ,col,isStart, isEnd, isTraversed, isWall, isPath}=tile;
                        return(
                            <Tile
                            key={tileIndex}
                            row={tile.row}
                            col={tile.col}
                            isStart={isStart}
                            isPath={isPath}
                            isEnd={isEnd}
                            isTraversed={isTraversed}
                            isWall={isWall}
                            handleMouseDown={() => handleMouseDown(row,col)}
                            handleMouseUp={() => handleMouseUp(row,col)}
                            handleMouseEnter={() => handleMouseEnter(row,col)}
                            />
                        )
})}
                </div>
            ))}
        </div>
    );
};

