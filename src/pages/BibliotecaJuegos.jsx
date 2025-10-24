// src/pages/BibliotecaJuegos.jsx
import React, { useState, useEffect } from 'react';
// ... (imports)

const BibliotecaJuegos = () => {
  // ... (estados games, loading, error como antes)
  
  // Nuevo estado para forzar la recarga
  const [refreshKey, setRefreshKey] = useState(0); 

  // Función para incrementar el estado y forzar la re-ejecución del useEffect
  const handleGameDeleted = () => {
      setRefreshKey(prevKey => prevKey + 1);
  };

  // En useEffect, añade refreshKey a las dependencias:
  useEffect(() => {
    const fetchGames = async () => { /* ... lógica de axios ... */ };
    fetchGames();
  }, [refreshKey]); // Se re-ejecuta cuando refreshKey cambia

  // ... (Manejo de loading, error, y games.length === 0 como antes)

  return (
    <div>
      <h1>📚 Mi Biblioteca de Videojuegos ({games.length} juegos)</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {games.map(game => (
          <TarjetaJuego 
            key={game._id} 
            game={game} 
            onGameDeleted={handleGameDeleted} // Pasa la función de refresco
          />
        ))}
      </div>
    </div>
  );
};

export default BibliotecaJuegos;