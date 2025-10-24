import React, { useState, useEffect } from 'react'; // ¡Corregido! Importa useState y useEffect
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config'; 
// Importar los componentes de reseñas que creaste
import ListaReseñas from '../components/ListaReseñas';
import FormularioReseña from '../components/FormularioReseña'; 

const DetalleJuego = () => {
    // 1. Obtener el ID del juego de la URL
    const { id } = useParams(); 

    // Estado para guardar los datos del juego y para forzar el refresh de la lista
    const [juego, setJuego] = useState(null);
    const [loading, setLoading] = useState(true);
    // Estado para forzar la recarga de ListaReseñas cuando hay cambios (DELETE/CREATE)
    const [refreshKey, setRefreshKey] = useState(0); 

    // Función para recargar los datos del juego y la lista de reseñas
    const fetchGameDetails = async () => {
        try {
            // Petición para obtener los datos del juego por ID (si tienes ese endpoint)
            const response = await axios.get(`${API_BASE_URL}/games/${id}`);
            setJuego(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error al cargar detalles del juego:", error);
            setLoading(false);
        }
    };

    // Función que se llama cuando se publica una nueva reseña o se elimina una
    const handleReviewChange = () => {
        // Incrementamos la clave para forzar a ListaReseñas a re-ejecutar su useEffect
        setRefreshKey(prev => prev + 1);
    };

    useEffect(() => {
        fetchGameDetails();
    }, [id]); // Se ejecuta al cargar y si cambia el ID de la URL

    if (loading) return <p>Cargando detalles del juego...</p>;
    if (!juego) return <p>Juego no encontrado.</p>;

    return (
        <div style={{ padding: '20px' }}>
            {/* Sección de Detalle del Juego */}
            <h1>{juego.title}</h1>
            <p><strong>Estado:</strong> {juego.status}</p>
            <p><strong>Horas jugadas:</strong> {juego.hoursPlayed}</p>
            <p><strong>Puntuación:</strong> {'★'.repeat(juego.rating)} / 5</p>

            <hr style={{ margin: '30px 0' }} />

            {/* Sección de Reseñas */}
            {/* 1. Formulario de Creación de Reseñas */}
            <FormularioReseña 
                gameId={juego._id} // Pasar el ID del juego
                onNewReview={handleReviewChange} // Notificar a la lista que hubo un cambio
            />

            {/* 2. Lista de Reseñas (Se recarga automáticamente gracias a 'key') */}
            <ListaReseñas 
                gameId={juego._id} // Pasar el ID del juego
                onReviewChanged={handleReviewChange} // Notificar al detalle de la eliminación
                key={refreshKey} // Clave para forzar la recarga
            />
        </div>
    );
};

export default DetalleJuego;