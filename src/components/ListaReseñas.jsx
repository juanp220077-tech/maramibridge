import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config'; 

// Este componente recibe el gameId del juego y una función de "refresco"
const ListaReseñas = ({ gameId, onReviewChanged }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect se encarga de cargar las reseñas CADA VEZ que el gameId o la lista cambia
    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                // Petición GET al endpoint que creamos en el Backend
                const response = await axios.get(`${API_BASE_URL}/reviews/bygame/${gameId}`);
                setReviews(response.data.data);
                setError(null); // Limpiar errores si la carga es exitosa
            } catch (err) {
                console.error('Error al obtener reseñas:', err);
                setError('No se pudieron cargar las reseñas de este juego.');
            } finally {
                setLoading(false);
            }
        };

        if (gameId) {
            fetchReviews();
        }
    }, [gameId, onReviewChanged]); // Se ejecuta al cargar y cuando hay cambios

    // Lógica para eliminar una reseña
    const handleDelete = async (reviewId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
            return;
        }

        try {
            // Petición DELETE al endpoint de Backend
            await axios.delete(`${API_BASE_URL}/reviews/${reviewId}`);
            
            alert('Reseña eliminada con éxito.');
            
            // Notificar al componente padre que la lista ha cambiado (refresco)
            if (onReviewChanged) {
                onReviewChanged();
            } else {
                // Si no hay prop de refresco, actualizar el estado localmente
                setReviews(prev => prev.filter(r => r._id !== reviewId));
            }

        } catch (err) {
            console.error('Error al eliminar reseña:', err);
            alert('Error al eliminar la reseña.');
        }
    };


    if (loading) return <p>Cargando reseñas...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (reviews.length === 0) return <p>Aún no hay reseñas para este juego.</p>;


    return (
        <div style={{ marginTop: '30px' }}>
            <h2>Comentarios de Usuarios ({reviews.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {reviews.map(review => (
                    <div key={review._id} style={reviewCardStyle}>
                        {/* Asumimos que la reseña tiene 'author' y 'content' */}
                        <p><strong>Autor:</strong> {review.author || 'Anónimo'}</p>
                        <p style={{ fontStyle: 'italic' }}>"{review.content}"</p>
                        <p>
                            <strong>Puntuación:</strong> 
                            <span style={{ color: '#FFD700', fontSize: '1.2em' }}>
                                {'★'.repeat(review.rating)}
                            </span>
                        </p>
                        
                        {/* Botón de Eliminación (DELETE) */}
                        <button 
                            onClick={() => handleDelete(review._id)}
                            style={deleteButtonStyle}
                        >
                            Eliminar Reseña
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Estilos internos
const reviewCardStyle = {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
};

const deleteButtonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
};

export default ListaReseñas;