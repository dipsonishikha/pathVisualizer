import type {GridType,TileType,SpeedType} from "../../../context/utils/types";
import  {createWall} from "../../../context/utils/createWall";
import { MAX_COLS, MAX_ROWS } from "../../../context/utils/constants";
import {getRandInt, isEqual,sleep} from "../../../context/utils/helpers"
import { destroyWall } from "../../../context/utils/destroyWall";

export const binaryTree = async (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  setIsDisabled: (disabled: boolean) => void,
  speed: SpeedType
) => {
  createWall(startTile, endTile, speed); 
  await sleep(MAX_ROWS * MAX_COLS); 

  for (const row of grid) {
    for (const node of row) {
      if (node.row % 2 === 0 || node.col % 2 === 0) {
        if (!isEqual(node, startTile) && !isEqual(node, endTile)) {
          node.isWall = true; 
        }
      }
    }
  }

  for (let r = 1; r < MAX_ROWS; r += 2) {
    for (let c = 1; c < MAX_COLS; c += 2) {
      if (r === MAX_ROWS - 2 && c === MAX_COLS - 2) {
        continue;
      } else if (r === MAX_ROWS - 2) {
        await destroyWall(grid, r, c, 1, speed);
      } else if (c === MAX_COLS - 2) {
        await destroyWall(grid, r, c, 0, speed);
      } else {
        await destroyWall(grid, r, c, getRandInt(0, 2), speed);
      }
    }
  }
  setIsDisabled(false);
};