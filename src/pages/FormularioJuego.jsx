import React, { useState, useEffect } from 'react'; // Importar useEffect
import { useNavigate, useParams } from 'react-router-dom'; // Importar useParams
import axios from 'axios';
import { API_BASE_URL } from '../config';

const FormularioJuego = () => {
    const navigate = useNavigate();
    // Obtener el ID del juego de la URL (si existe)
    const { id } = useParams(); 
    const isEditing = !!id; // True si id existe (estamos editando)
    const [loading, setLoading] = useState(isEditing);

    // ... (Mantener el estado inicial del formulario como antes)
    const [formData, setFormData] = useState({ /* ... */ });
    // ... (Mantener la función handleChange como antes)
    
    // 1. Lógica para cargar los datos del juego si estamos editando
    useEffect(() => {
        if (isEditing) {
            const fetchGame = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/games/${id}`);
                    // Cargar los datos al estado del formulario
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
    }, [id, isEditing, navigate]); // Dependencias del hook

    // 2. Lógica para manejar la creación (POST) o actualización (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Petición PUT para actualizar
                await axios.put(`${API_BASE_URL}/games/${id}`, formData);
                alert(`Juego ${formData.title} actualizado con éxito!`);
            } else {
                // Petición POST para crear (como antes)
                await axios.post(`${API_BASE_URL}/games`, formData);
                alert(`Juego ${formData.title} agregado con éxito!`);
            }
            
            navigate('/biblioteca'); 

        } catch (error) {
            // ... (Manejo de error como antes)
        }
    };
    
    if (loading) return <div style={{ textAlign: 'center' }}>Cargando datos del juego...</div>;
    
    // ... (Resto del formulario HTML, ahora usa {isEditing ? '✏️ Editar Juego' : '➕ Agregar Nuevo Juego'} en el h1)
    
    return (
        // ... (Tu HTML de formulario)
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>{isEditing ? '✏️ Editar Juego' : '➕ Agregar Nuevo Juego'}</h1>
            {/* ... (Resto del formulario que usa formData y handleChange) */}
        </div>
    );
};

export default FormularioJuego;