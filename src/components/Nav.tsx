import { Select } from "./Select";
import { usePathfinding } from "../context/hooks/usePathfinding";
import { useTile } from "../context/hooks/useTile";
import { EXTENDED_SLEEP_TIME, MAZES, PATHFINDING_ALGORITHMS, SLEEP_TIME, SPEEDS } from "../context/utils/constants";
import type { AlgorithmType, MazeType } from "../context/utils/types";
import { resetGrid } from "../context/utils/resetGrid";
import { useSpeed } from "../context/hooks/useSpeed";
import { runMazeAlgorithm } from "../context/utils/runmazealgo";
import { useState } from "react";
import { Playbutton } from "./Playbutton";
import { runPathfindingAlgorithm } from "../context/utils/runPathfindingAlgorithm";
import { animatePath } from "../context/utils/animatePath";
import type { SpeedType } from "../context/utils/types";
export function Nav({
    isVisualizationRunningRef
}: {
    isVisualizationRunningRef: React.MutableRefObject<boolean>;
}) {
    const [isDisabled, setIsDisabled] = useState(false);
    const {maze, setMaze, grid, setGrid, isGraphVisualized, setIsGraphVisualized, algorithm, setAlgorithm} = usePathfinding();
    const {startTile, endTile} = useTile();
    const {speed,setSpeed} = useSpeed();
    
    const handleGenerateMaze = (maze: MazeType) => { 
        if (maze === "None") {
            setMaze(maze);
            resetGrid({grid, startTile, endTile});
            return;
        }
        setMaze(maze);
        setIsDisabled(true);
        runMazeAlgorithm({
            maze,
            grid,
            startTile,
            endTile,
            setIsDisabled,
            speed,
        });
        const newGrid = grid.slice();
        setGrid(newGrid);
        setIsGraphVisualized(false);
    };
    
    const handlerRunVisualizer = () => {
        if (isGraphVisualized) {
            setIsGraphVisualized(false);
            resetGrid({grid: grid.slice(), startTile, endTile});
            return;
        }
        
        const {traversedTiles, path} = runPathfindingAlgorithm({
            algorithm,
            grid,
            startTile,
            endTile,
        });

        animatePath(traversedTiles, path, startTile, endTile, speed);
        setIsDisabled(true);
        isVisualizationRunningRef.current = true;
        setTimeout(() => {
            const newGrid = grid.slice();
            setGrid(newGrid);
            setIsGraphVisualized(true);
            setIsDisabled(false);
            isVisualizationRunningRef.current = false;
        }, (SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) + EXTENDED_SLEEP_TIME * (path.length + 60)) * SPEEDS.find((s) => s.value === speed)!.value);
    };
    
    return (
        <div className="flex items-center justify-center min-h-[4.5rem] shadow-gray-600 sm:px-5 px-0">
            <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
                <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">PathFinding Visualiser </h1>
                <div className='flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4'>
                    <Select
                        label="Maze"
                        value={maze}
                        options={MAZES}
                        onChange={(e) => {
                            handleGenerateMaze(e.target.value as MazeType);
                        }}
                    />
                    <Select
                        label='Graph'
                        value={algorithm}
                        options={PATHFINDING_ALGORITHMS}
                        onChange={(e) => {
                            setAlgorithm(e.target.value as AlgorithmType);
                        }}
                    />
                    <Select
                    label="SPEED"
                    value={speed}
                    options={SPEEDS}
                    isDisabled={isDisabled}
                    onChange={(e) =>{
                        setSpeed(parseInt(e.target.value) as SpeedType);
                    }}
                    />
                    <Playbutton
                        isDisabled={isDisabled}
                        isGraphVisualized={isGraphVisualized}
                        handlerRunVisualizer={handlerRunVisualizer}
                    />
                </div>
            </div>
        </div>
    );
}