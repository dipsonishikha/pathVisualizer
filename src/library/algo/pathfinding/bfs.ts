import {isEqual} from "../../../context/utils/helpers";
import type { GridType,TileType } from "../../../context/utils/types";
import { getUntraversedNeighbors } from "../../../context/utils/getUntraversedNeighbors";
import { isInQueue } from "../../../context/utils/IsinQueue";


export const bfs=(grid:GridType,startTile:TileType,endTile:TileType)=>{
    const traversedTile:TileType[]=[];
    const base=grid[startTile.row][startTile.col];
    base.distance=0;
    base.isTraversed=true;
    const unTraversed=[base]

    while(unTraversed.length){
        const tile=unTraversed.shift()!;
        if(tile.isWall) continue;
        if(tile.distance === Infinity) break;
        tile.isTraversed=true;
        traversedTile.push(tile);
        if(isEqual(tile,endTile)) break;


        const neighbors=getUntraversedNeighbors(grid,tile);
        for(let i=0;i<neighbors.length;i+=1){
            if(!isInQueue(neighbors[i],unTraversed))
            {
                const nei=neighbors[i];
                nei.distance=tile.distance+1;
                nei.parent=tile;
                unTraversed.push(nei);
            }
        }
    }
    const path=[];
    let tile=grid[endTile.row][endTile.col];
    while(tile!==null){
        tile.isPath=true;
        path.unshift(tile);
        tile=tile.parent!;
    }
    return {traversedTile,path}
}