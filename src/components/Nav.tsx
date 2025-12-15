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
import type { MutableRefObject } from "react";

export function Nav({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    maze,
    setMaze,
    grid,
    setGrid,
    isGraphVisualized,
    setIsGraphVisualized,
    algorithm,
    setAlgorithm,
  } = usePathfinding();
  const { startTile, endTile } = useTile();
  const { speed, setSpeed } = useSpeed();

  const handleGenerateMaze = (maze: MazeType) => {
    if (maze === "None") {
      setMaze(maze);
      resetGrid({ grid, startTile, endTile });
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
      resetGrid({ grid: grid.slice(), startTile, endTile });
      return;
    }

    const { traversedTiles, path } = runPathfindingAlgorithm({
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
    }, SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) + EXTENDED_SLEEP_TIME * (path.length + 60) * SPEEDS.find((s) => s.value === speed)!.value);
  };

  const handleClearGrid = () => {
    if (isDisabled) return;
    setIsGraphVisualized(false);
    resetGrid({ grid, startTile, endTile });
    setMaze("None");
  };

  return (
    <div className="w-full bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Single Row Layout */}
        <div className="flex items-center justify-between gap-6">
          {/* Left: Logo and Title */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-gray-800 leading-tight">
                Pathfinding Visualizer
              </h1>
              <p className="text-xs text-gray-600">
                Visualize algorithms in action
              </p>
            </div>
          </div>

          {/* Center: Controls */}
          <div className="flex items-center gap-3 flex-1 justify-center">
            <Select
              label="Maze"
              value={maze}
              options={MAZES}
              isDisabled={isDisabled}
              onChange={(e) => {
                handleGenerateMaze(e.target.value as MazeType);
              }}
            />
            <Select
              label="Algorithm"
              value={algorithm}
              isDisabled={isDisabled}
              options={PATHFINDING_ALGORITHMS}
              onChange={(e) => {
                setAlgorithm(e.target.value as AlgorithmType);
              }}
            />
            <Select
              label="Speed"
              value={speed}
              options={SPEEDS}
              isDisabled={isDisabled}
              onChange={(e) => {
                setSpeed(parseInt(e.target.value) as SpeedType);
              }}
            />
          </div>

          {/* Right: Actions and Legend */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Legend - Desktop Only */}
            <div className="hidden xl:flex items-center gap-3 text-sm bg-white/50 px-4 py-2 rounded-lg border border-gray-200">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-green-500 rounded shadow-sm"></div>
                <span className="text-gray-700 font-medium text-xs">Start</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded shadow-sm"></div>
                <span className="text-gray-700 font-medium text-xs">End</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleClearGrid}
                disabled={isDisabled}
                className="px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 font-semibold 
                           rounded-lg hover:border-red-400 hover:bg-red-50 hover:text-red-600
                           transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                           shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hidden sm:inline">Clear</span>
              </button>
              
              <Playbutton
                isDisabled={isDisabled}
                isGraphVisualized={isGraphVisualized}
                handlerRunVisualizer={handlerRunVisualizer}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}