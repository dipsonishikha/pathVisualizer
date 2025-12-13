import type { GridType, TileType, AlgorithmType } from "./types";
import { bfs } from "../../library/algo/pathfinding/bfs";
import { dfs } from "../../library/algo/pathfinding/dfs";
export const runPathfindingAlgorithm = ({
    algorithm,
    grid,
    startTile,
    endTile,
}: {
    algorithm: AlgorithmType;
    grid: GridType;
    startTile: TileType;
    endTile: TileType;
}) => {
     switch(algorithm){
        case "BFS":
           return bfs(grid,startTile,endTile)
        case "DFS":
           return dfs(grid,startTile,endTile)
        default:
            return bfs(grid,startTile,endTile)
     }
};