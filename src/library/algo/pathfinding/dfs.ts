import { getUntraversedNeighbors } from "../../../context/utils/getUntraversedNeighbors";
import { isEqual, } from "../../../context/utils/helpers";
import type { GridType,TileType } from "../../../context/utils/types";
import { checkStack } from "../../../context/utils/helpers";


export const dfs=(grid:GridType,startTile:TileType,endTile:TileType)=>{
    const traversedTiles=[];
    const base=grid[startTile.row][startTile.col];
    base.distance=0;
    base.isTraversed=true;
    const unTraversedTiles=[base];


    while(unTraversedTiles.length >0){
        const currentTile=unTraversedTiles.pop();
        if(currentTile){
            if(currentTile.isWall) continue;
            if(currentTile.distance === Infinity) break;
            currentTile.isTraversed=true;
            traversedTiles.push(currentTile);
            if(isEqual(currentTile,endTile)) break;
            const neighbors=getUntraversedNeighbors(grid,currentTile);
            for(let i=0;i<neighbors.length;i +=1){
                if(!checkStack(neighbors[i],unTraversedTiles)){
                    neighbors[i].distance=currentTile.distance+1;
                    neighbors[i].parent=currentTile;
                    unTraversedTiles.push(neighbors[i]);
                }
            }
        }
    }
    const path=[]
    let current=grid[endTile.row][endTile.col]
    while(current!==null){
        current.isPath=true;
        path.unshift(current);
        current=current.parent!
    }
    return {traversedTiles,path}
}