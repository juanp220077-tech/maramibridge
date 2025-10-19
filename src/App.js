import React from 'react';
import GameLibrary from './components/GameLibrary';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <header style={{ padding: '20px', backgroundColor: '#333', color: 'white' }}>
        <h1>RETO GameTracker</h1>
      </header>
      <main style={{ padding: '20px' }}>
        <GameLibrary /> 
      </main>
    </div>
  );
}

export default App;