import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { PathfindingProvider } from './context/Pathfindingcontext'
import './App.css'
import { TileProvider } from './context/TileContext';
import {SpeedProvider} from "./context/SpeedContext";
import { Grid } from './components/Grid';
import { Nav } from './components/Nav'

function App() {

  const isVisualizationRunningRef=useRef(false);
  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
      <div className="h-screen w-screen flex flex-col">
        <Grid isVisualizationRunningRef={isVisualizationRunningRef}/>
        <Nav/>
        </div>

      </SpeedProvider>
      </TileProvider>

    </PathfindingProvider>
  )
}

export default App
