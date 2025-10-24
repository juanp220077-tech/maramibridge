import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom'; // Necesario para el enlace a Agregar Juego
import { API_BASE_URL } from '../config'; // Asegúrate de que esta ruta sea correcta
import TarjetaJuego from '../components/TarjetaJuego'; // ¡Necesitas importar este componente!

const BibliotecaJuegos = () => {
    // Definición de estados
    const [games, setGames] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función que trae los datos de la API (READ)
    const fetchGames = async () => {
        setLoading(true);
        try {
            // Petición GET al endpoint /api/games
            const response = await axios.get(`${API_BASE_URL}/games`);
            setGames(response.data.data); // Asume que el array de juegos está en response.data.data
            setError(null);
        } catch (err) {
            // Este es el error "Error al conectar con el servidor o cargar juegos."
            setError('Error al conectar con el servidor o cargar juegos. Asegúrate que el Backend (node server.js) esté activo.');
            console.error('Error al obtener juegos:', err);
        } finally {
            setLoading(false);
        }
    };

    // Función para manejar la eliminación (DELETE)
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este juego? Esta acción es permanente.')) {
            try {
                await axios.delete(`${API_BASE_URL}/games/${id}`);
                alert('Juego eliminado con éxito.');
                // Refrescar la lista después de eliminar
                fetchGames(); 
            } catch (error) {
                alert('Error al eliminar el juego. Verifica la conexión con la API.');
                console.error(error);
            }
        }
    };

    // useEffect se ejecuta una vez al cargar el componente para traer los datos
    useEffect(() => {
        fetchGames();
    }, []);

    if (loading) return <p style={{ padding: '20px' }}>Cargando tu biblioteca...</p>;
    
    // Muestra el mensaje de error si la conexión falla
    if (error) return <p style={{ color: 'red', padding: '20px' }}>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>📚 Mi Biblioteca de Juegos ({games.length} juegos)</h1>
            
            {games.length === 0 ? (
                // Mensaje si la biblioteca está vacía
                <div style={{ marginTop: '20px' }}>
                    <p>Tu biblioteca está vacía. ¡Añade tu primer juego!</p>
                    {/* Enlace al FormularioJuego */}
                    <Link to="/agregar-juego" style={linkStyle}>
                        ➕ Agregar un Juego Ahora
                    </Link>
                </div>
            ) : (
                // Mapeo para renderizar las tarjetas
                <div style={gridStyle}>
                    {games.map(game => (
                        <TarjetaJuego 
                            key={game._id} 
                            game={game} 
                            onDelete={handleDelete} // Pasa la función de eliminar
                            // Ya no necesitas pasar handleEdit, pues TarjetaJuego usa <Link>
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Estilos
const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px'
};

const linkStyle = {
    display: 'inline-block',
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    marginTop: '10px'
};

export default BibliotecaJuegos;