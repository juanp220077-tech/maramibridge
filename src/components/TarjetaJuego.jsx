// src/components/TarjetaJuego.jsx (Revisión)
import React from 'react';

const TarjetaJuego = ({ game }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', width: '250px' }}>
            <img 
                src={game.coverUrl || 'https://via.placeholder.com/250x150?text=Sin+Portada'} 
                alt={`Portada de ${game.title}`} 
                style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
            />
            <h3>{game.title}</h3>
            <p>⭐ Puntuación: {game.rating} / 5</p>
            <p>🎮 Estado: **{game.status}**</p>
            <p>⏱️ Horas: {game.hoursPlayed}</p>
            {/* Botones de acción futuros */}
        </div>
    );
};

export default TarjetaJuego;