// src/components/TarjetaJuego.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config'; 

// Agregamos onGameDeleted como prop para notificar a la biblioteca que debe refrescar
const TarjetaJuego = ({ game, onGameDeleted }) => {
    const navigate = useNavigate();

    // ... (handleEdit como antes)

    const handleDelete = async () => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar ${game.title}?`)) {
            try {
                await axios.delete(`${API_BASE_URL}/games/${game._id}`);
                alert('Juego eliminado con éxito.');
                
                // Llama a la función prop para que la lista se actualice en BibliotecaJuegos
                if (onGameDeleted) onGameDeleted(); 

            } catch (error) {
                console.error('Error al eliminar el juego:', error);
                alert('Error al eliminar el juego.');
            }
        }
    };

    return (
        <div style={{ /* ... estilos ... */ }}>
            {/* ... (contenido del juego) */}
            <button onClick={handleEdit} /* ... */>Editar</button>
            
            {/* Botón de Eliminar */}
            <button 
                onClick={handleDelete}
                style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px' }}
            >
                Eliminar
            </button>
        </div>
    );
};

export default TarjetaJuego;