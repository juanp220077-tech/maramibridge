import React from 'react';
import GameLibrary from './components/GameLibrary';
import GameForm from './components/GameForm'; // Importar el formulario
import './App.css'; 

function App() {
  // Nota: Aquí se necesitaría lógica más avanzada (ej. un estado global)
  // para actualizar GameLibrary después de agregar un juego, pero por ahora
  // solo lo renderizamos y mostraremos la alerta.
  return (
    <div className="App">
      <header style={{ padding: '20px', backgroundColor: '#333', color: 'white' }}>
        <h1>RETO GameTracker</h1>
      </header>
      <main style={{ padding: '20px' }}>
        <GameForm /> {/* Renderiza el formulario para agregar juegos */}
        <hr/>
        <GameLibrary /> 
      </main>
    </div>
  );
}

export default App;