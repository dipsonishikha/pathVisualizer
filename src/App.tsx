import { useRef } from 'react'
import { PathfindingProvider } from './context/Pathfindingcontext'
import './index.css'
import { TileProvider } from './context/TileContext';
import { SpeedProvider } from "./context/SpeedContext";
import { Grid } from './components/Grid';
import { Nav } from './components/Nav'

function App() {
  const isVisualizationRunningRef = useRef(false);
  
  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div className="h-screen w-screen flex flex-col">
            <Nav isVisualizationRunningRef={isVisualizationRunningRef}/>
            <Grid isVisualizationRunningRef={isVisualizationRunningRef}/>
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  )
}
<div className="bg-red-500 text-white p-4 text-2xl m-4">
     Tailwind Test - This should be RED!
   </div>

export default App