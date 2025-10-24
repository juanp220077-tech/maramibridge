import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const FormularioJuego = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const isEditing = !!id; 

    // ESTADOS NECESARIOS
    const [loading, setLoading] = useState(isEditing);
    const [isSubmitting, setIsSubmitting] = useState(false); // CRÍTICO para el botón
    const [error, setError] = useState(null);

    // ESTADO DEL FORMULARIO (Datos iniciales para un nuevo juego)
    const [formData, setFormData] = useState({ 
        title: '',
        genre: '',
        platform: '',
        status: 'Pendiente', // Campo de selección (Pendiente, Jugando, Completado)
        hoursPlayed: 0,
        rating: 0, // Puntuación con estrellas (0-5)
        coverUrl: '', // URL de la portada (opcional)
    });
    
    // Función para manejar los cambios en los campos de entrada
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? Number(value) : value 
        }));
    };
    
    // Lógica para cargar los datos del juego si estamos editando
    useEffect(() => {
        if (isEditing) {
            const fetchGame = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/games/${id}`);
                    // Asegúrate de que los datos coincidan con tu esquema
                    setFormData(response.data.data); 
                    setLoading(false);
                } catch (error) {
                    console.error('Error al cargar el juego para edición:', error);
                    alert('Juego no encontrado o error de conexión.');
                    navigate('/biblioteca');
                }
            };
            fetchGame();
        }
    }, [id, isEditing, navigate]);

    // Lógica para manejar la creación (POST) o actualización (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Deshabilita el botón
        setError(null);
        
        // **VALIDACIÓN BÁSICA:** Asegúrate de que al menos el título esté lleno
        if (!formData.title) {
            setError('El título del juego es obligatorio.');
            setIsSubmitting(false); 
            return;
        }

        try {
            if (isEditing) {
                // Petición PUT para actualizar
                await axios.put(`${API_BASE_URL}/games/${id}`, formData);
                alert(`Juego ${formData.title} actualizado con éxito!`);
            } else {
                // Petición POST para crear
                await axios.post(`${API_BASE_URL}/games`, formData);
                alert(`Juego ${formData.title} agregado con éxito!`);
            }
            
            navigate('/biblioteca'); // Redirige a la biblioteca después del éxito

        } catch (error) {
            console.error('Error al guardar/actualizar juego:', error.response ? error.response.data : error.message);
            setError('Error al guardar el juego. Verifica la conexión con la API y los datos.');
            // Aquí, el error podría ser la falta de conexión (Connection Refused) o un error de validación de Mongoose.
        } finally {
            // **CRÍTICO:** Vuelve a habilitar el botón, ¡siempre!
            setIsSubmitting(false); 
        }
    };
    
    if (loading) return <div style={{ textAlign: 'center' }}>Cargando datos del juego...</div>;
    
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>{isEditing ? '✏️ Editar Juego' : '➕ Agregar Nuevo Juego'}</h1>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit} style={formStyle}>
                
                {/* Campo 1: Título (Requerido) */}
                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                
                {/* Campo 2: Estado (Selección) */}
                <label htmlFor="status">Estado:</label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Jugando">Jugando</option>
                    <option value="Completado">Completado</option>
                </select>

                {/* Campo 3: Horas Jugadas */}
                <label htmlFor="hoursPlayed">Horas Jugadas:</label>
                <input
                    type="number"
                    id="hoursPlayed"
                    name="hoursPlayed"
                    value={formData.hoursPlayed}
                    onChange={handleChange}
                    min="0"
                />

                {/* Campo 4: Puntuación (1-5) */}
                <label htmlFor="rating">Puntuación (1-5 Estrellas):</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                />

                {/* Campo 5: URL de Portada (Opcional) */}
                <label htmlFor="coverUrl">URL de Portada:</label>
                <input
                    type="text"
                    id="coverUrl"
                    name="coverUrl"
                    value={formData.coverUrl}
                    onChange={handleChange}
                />
                
                {/* Botón de Envío */}
                <button 
                    type="submit" 
                    // El botón se deshabilita si está enviando
                    disabled={isSubmitting} 
                    style={buttonStyle}
                >
                    {isSubmitting 
                        ? (isEditing ? 'Guardando cambios...' : 'Agregando juego...') 
                        : (isEditing ? 'Guardar Cambios' : 'Añadir a Biblioteca')
                    }
                </button>
            </form>
        </div>
    );
};

// Estilos básicos
const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
};

const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px'
};

export default FormularioJuego;