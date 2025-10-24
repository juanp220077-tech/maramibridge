import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config'; 

const Estadisticas = () => {
    const [stats, setStats] = useState({ 
        totalGames: 0,
        completedGames: 0,
        totalHours: 0,
        avgRating: 0 
    });

    useEffect(() => {
        const calculateStats = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/games`);
                const games = response.data.data;

                // Cálculo: Juegos Completados
                const completed = games.filter(g => g.status === 'Completado').length;

                // Cálculo: Horas Totales Jugadas
                const hours = games.reduce((sum, g) => sum + g.hoursPlayed, 0);

                // Cálculo: Puntuación Promedio
                const totalRatings = games.reduce((sum, g) => sum + g.rating, 0);
                const avgRating = games.length > 0 ? (totalRatings / games.length).toFixed(2) : 0;

                setStats({
                    totalGames: games.length,
                    completedGames: completed,
                    totalHours: hours,
                    avgRating: avgRating
                });

            } catch (error) {
                console.error('Error al calcular estadísticas:', error);
            }
        };

        calculateStats();
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>📊 Estadísticas Personales</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
                <StatBox title="Juegos en Biblioteca" value={stats.totalGames} />
                <StatBox title="Juegos Completados" value={stats.completedGames} />
                <StatBox title="Horas Totales Jugadas" value={`${stats.totalHours} h`} />
                <StatBox title="Puntuación Promedio" value={`${stats.avgRating} / 5`} />
            </div>
        </div>
    );
};

// Componente auxiliar para mostrar la estadística
const StatBox = ({ title, value }) => (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', minWidth: '200px' }}>
        <h2>{value}</h2>
        <p>{title}</p>
    </div>
);

export default Estadisticas;