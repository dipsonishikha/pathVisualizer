import { Select } from "./Select";
import { usePathfinding } from "../context/hooks/usePathfinding";
import { MAZES } from "../context/utils/constants";

export function Nav(){
    const {maze,setMaze}=usePathfinding();

    const hsndleGenerateMaze=(maze :Mazetype)=>{
        if(maze=='NONE'){
          setMaze(maze)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-[4.5rem] shadow-gray-600 sm:px-5 px-0;">
            <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
                <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">PathFinding Visualiser </h1>
                <div className='flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4'>
                    {/* <Select
                        label='Maze'
                        value={maze}
                        options={MAZES}
                        // onChange={(e)}=>{

                        // }
                    /> */}
                </div>
            </div>
        </div>
    )
}