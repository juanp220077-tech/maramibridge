import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TarjetaJuego from '../components/TarjetaJuego'; // Componente Tarjeta
import { API_BASE_URL } from '../config'; // URL base de la API

const BibliotecaJuegos = () => {
  // 1. Estado para almacenar la lista de juegos
  const [games, setGames] = useState([]);
  // 2. Estados para el manejo de la UI (Carga y Error)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect se ejecuta después de que el componente se monta
  useEffect(() => {
    // Función asíncrona para obtener los datos de la API
    const fetchGames = async () => {
      try {
        // Hacemos la petición GET al endpoint de juegos
        const response = await axios.get(`${API_BASE_URL}/games`);
        
        // Guardamos los datos recibidos del servidor en el estado
        setGames(response.data.data); // Asumiendo que el controlador devuelve { success: true, data: [...] }
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener juegos:", err);
        setError('No se pudo conectar con la API del Backend.');
        setLoading(false);
      }
    };

    fetchGames();
  }, []); // El array vacío asegura que solo se ejecute al montar el componente

  // Manejo de estados de la UI
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Cargando colección... 🔄</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (games.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>¡Tu biblioteca está vacía! Agrega tu primer juego.</div>;
  }

  return (
    <div>
      <h1>📚 Mi Biblioteca de Videojuegos ({games.length} juegos)</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {/* 3. Mapeo de datos: Creamos una TarjetaJuego por cada juego */}
        {games.map(game => (
          <TarjetaJuego key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default BibliotecaJuegos;