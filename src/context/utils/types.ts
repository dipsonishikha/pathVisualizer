export type AlgorithmType="Dijkstra" |"A_Star"|"BFS"|"DFS";

export type MazeType="None"|"Binary Tree"|"Recursive Division";
export interface MazeSelectType{
    name:string;
    value:MazeType;
}

export type TileType={
    row: number;
    col:number;
    isEnd:boolean;
    isWall:boolean;
    isPath:boolean;
    distance:number;
    isStart:boolean;
    parent:TileType|null;
    isTraversed:boolean;
}

export type GridType=TileType[][];

export type SpeedType=2|1|0.5;
export interface SpeedSelectType{
    name:string;
    value:SpeedType;
}