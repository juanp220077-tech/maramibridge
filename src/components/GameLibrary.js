import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config'; // Importa la URL base

function GameLibrary() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect se ejecuta al montar el componente para obtener los datos
    useEffect(() => {
        const fetchGames = async () => {
            try {
                // Llama al endpoint GET /api/juegos
                const response = await axios.get(`${API_BASE_URL}/juegos`);
                setGames(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar la biblioteca de juegos.');
                setLoading(false);
            }
        };

        fetchGames();
    }, []); 

    if (loading) return <div>Cargando biblioteca...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="game-library">
            <h2>Mi Biblioteca de Videojuegos</h2>
            <div className="game-list">
                {games.length === 0 ? (
                    <p>No tienes juegos en tu biblioteca. ¡Agrega uno!</p>
                ) : (
                    // Mapea los juegos obtenidos del backend
                    games.map(game => (
                        <div key={game._id} className="game-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <h3>{game.title}</h3>
                            <p>Plataforma: {game.platform}</p>
                            <p>Estado: {game.status}</p>
                            <img src={game.coverImage} alt={game.title} style={{ width: '100px', height: 'auto' }} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default GameLibrary;