import React from 'react';
import { Link } from 'react-router-dom'; // ¡Importar Link para la navegación!

// Este componente debe recibir el objeto 'game' y la función 'onDelete' de la BibliotecaJuegos
const TarjetaJuego = ({ game, onDelete }) => {
    // Función de ayuda para obtener la URL de la portada (si no hay, usa un placeholder)
    const getCoverUrl = () => {
        // Usa la URL guardada, o un placeholder si está vacía
        return game.coverUrl || 'https://via.placeholder.com/300x400?text=Sin+Portada';
    };

    return (
        <div style={cardStyle}>
            {/* Imagen de Portada */}
            <img 
                src={getCoverUrl()} 
                alt={`Portada de ${game.title}`} 
                style={coverStyle} 
            />
            
            <div style={contentStyle}>
                {/* Título y Detalles */}
                <h3>{game.title}</h3>
                <p><strong>Género:</strong> {game.genre || 'N/A'}</p>
                <p><strong>Plataforma:</strong> {game.platform || 'N/A'}</p>
                <p><strong>Estado:</strong> <span style={{ color: statusColor[game.status] }}>{game.status}</span></p>
                <p><strong>Horas:</strong> {game.hoursPlayed} h</p>
                <p><strong>Puntuación:</strong> 
                    <span style={{ color: '#FFD700' }}>
                        {'★'.repeat(game.rating)}
                    </span>
                    /5
                </p>

                {/* --- SECCIÓN DE BOTONES (Navegación y CRUD) --- */}
                <div style={buttonGroupStyle}>
                    
                    {/* Botón 1: Ver Detalles y Reseñas (READ/CREATE/DELETE de Reseñas) */}
                    <Link to={`/juegos/${game._id}`} style={{ ...buttonBaseStyle, ...detailsButtonStyle }}>
                        Detalles / Reseñas
                    </Link>

                    {/* Botón 2: Editar Juego (UPDATE) */}
                    {/* Navega a la ruta configurada en App.jsx: /editar/:id */}
                    <Link to={`/editar/${game._id}`} style={{ ...buttonBaseStyle, ...editButtonStyle }}>
                        Editar
                    </Link>
                    
                    {/* Botón 3: Eliminar Juego (DELETE) */}
                    <button 
                        onClick={() => onDelete(game._id)} // Ejecuta la función pasada por prop
                        style={{ ...buttonBaseStyle, ...deleteButtonStyle }}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Estilos ---
const cardStyle = {
    border: '1px solid #444',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#333',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
};

const coverStyle = {
    width: '100%',
    height: '250px', // Altura fija para portadas
    objectFit: 'cover',
    borderBottom: '1px solid #444'
};

const contentStyle = {
    padding: '15px',
    flexGrow: 1, // Permite que el contenido se estire
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
};

const buttonGroupStyle = {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
};

const buttonBaseStyle = {
    padding: '8px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    fontWeight: 'bold'
};

const detailsButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
};

const editButtonStyle = {
    backgroundColor: '#ffc107',
    color: '#333',
    border: 'none',
};

const deleteButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
};

const statusColor = {
    'Pendiente': '#6c757d',
    'Jugando': '#17a2b8',
    'Completado': '#28a745'
};

export default TarjetaJuego;