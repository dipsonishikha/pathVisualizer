import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import { END_TILE_CONFIGURATION, START_TILE_CONFIGURATION } from "./utils/constants";
import type { AlgorithmType, MazeType, GridType } from "./utils/types";
import { createGrid } from "./utils/helpers";


interface PathfindingContextInterface {
  algorithm: AlgorithmType;
  setAlgorithm: (algorithm: AlgorithmType) => void;
  maze: MazeType;
  setMaze: (maze: MazeType) => void;
  grid: GridType;
  setGrid: (grid: GridType) => void;
  isGraphVisualized: boolean;
  setIsGraphVisualized: (isGraphVisualized: boolean) => void;
}

const PathfindingContext = createContext<PathfindingContextInterface | null>(null);

export const PathfindingContextProvider = ({ children }: { children: ReactNode }) => {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS");
  const [maze, setMaze] = useState<MazeType>("None");

  // lazy initialiser so createGrid runs only once
  const [grid, setGrid] = useState<GridType>(() =>
    createGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION)
  );

  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);

  return (
    <PathfindingContext.Provider
      value={{
        algorithm,
        setAlgorithm,
        maze,
        setMaze,
        grid,
        setGrid,
        isGraphVisualized,
        setIsGraphVisualized,
      }}
    >
      {children}
    </PathfindingContext.Provider>
  );
};

// custom hook to avoid repeating null checks in every consumer
export const usePathfindingContext = () => {
  const ctx = useContext(PathfindingContext);
  if (!ctx) {
    throw new Error("usePathfindingContext must be used within a PathfindingContextProvider");
  }
  return ctx;
};

// Backwards-compatible named aliases used elsewhere in the codebase
export const Pathfindingcontext = PathfindingContext; // legacy name (was used in older files)
export const PathfindingProvider = PathfindingContextProvider; // legacy provider name

export default PathfindingContext;
