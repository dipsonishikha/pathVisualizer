import type {MazeType,GridType,SpeedType,TileType} from "./types";
import { binaryTree } from "../../library/algo/maze/binarytree";
import { constructBorder } from "./constructBorder";
export const runMazeAlgorithm=async({
    maze,
    grid,
    startTile,
    endTile,
    setIsDisabled,
    speed
}:{
    maze:MazeType;
    grid:GridType;
    startTile:TileType;
    endTile:TileType;
    setIsDisabled: (isDisabled:boolean)=>void;
    speed:SpeedType
}) =>{
    if(maze== 'Binary Tree'){
        await binaryTree(grid,startTile,endTile,setIsDisabled,speed)
    }
    else if(maze === "Recursive Division"){
        await constructBorder(grid,startTile,endTile)
    }
}