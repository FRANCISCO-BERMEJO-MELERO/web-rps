import { useState } from 'react'
import './App.css'
import Header from './components/General/Header.jsx'
import GamesList from './components/Games/GamesList.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div className='bg-radial-[at_25%_25%] from-neutral-800 from-10%% to-neutral-950 to-35%% min-h-screen text-white'>
      <Header/>
      
      <GamesList/>
    </div>
    
  )
}

export default App
