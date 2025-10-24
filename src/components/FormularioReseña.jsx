import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config'; 

// Recibe el ID del juego y una función de notificación como props
const FormularioReseña = ({ gameId, onNewReview }) => {
    // Estado para guardar el contenido y la puntuación de la reseña
    const [formData, setFormData] = useState({
        author: '', 
        content: '',
        rating: 5, // Valor inicial de 5 estrellas
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        // Validaciones básicas
        if (!formData.content || formData.rating < 1 || formData.rating > 5) {
            setError('Por favor, escribe un comentario y asigna una puntuación válida (1-5).');
            setSubmitting(false);
            return;
        }

        try {
            // Petición POST al endpoint de Backend para crear la reseña
            const response = await axios.post(
                `${API_BASE_URL}/reviews/bygame/${gameId}`, 
                formData
            );
            
            alert('¡Reseña publicada con éxito!');
            
            // 1. Resetear el formulario (opcional, mantener el autor)
            setFormData({ ...formData, content: '', rating: 5 }); 
            
            // 2. Notificar al componente padre (ListaReseñas) para que se recargue
            if (onNewReview) {
                onNewReview(response.data.data);
            }

        } catch (err) {
            console.error('Error al publicar reseña:', err);
            setError('Error al conectar con el servidor o datos incompletos.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Escribir una Nueva Reseña</h3>
            <form onSubmit={handleSubmit}>
                {/* Campo Autor */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Autor (Opcional):</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        style={{ width: '98%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                {/* Campo Contenido */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Comentario:</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="4"
                        required
                        style={{ width: '98%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                {/* Campo Puntuación (1-5) */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Puntuación (1-5):</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                        style={{ width: '100px', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                
                {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

                {/* Botón de envío */}
                <button 
                    type="submit" 
                    disabled={submitting}
                    style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    {submitting ? 'Publicando...' : 'Publicar Reseña'}
                </button>
            </form>
        </div>
    );
};

export default FormularioReseña;