import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function GameForm({ onGameAdded }) { // Recibe una función para actualizar la lista
    const [formData, setFormData] = useState({
        title: '',
        platform: '',
        status: 'Plan to Play',
        hoursPlayed: 0,
        coverImage: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envía la petición POST al backend para crear el nuevo juego
            const response = await axios.post(`${API_BASE_URL}/juegos`, formData);
            alert(`Juego "${response.data.title}" agregado con éxito!`);
            
            // Llama a la función que actualiza el componente GameLibrary
            if (onGameAdded) {
                onGameAdded(response.data);
            }

            // Limpia el formulario
            setFormData({ title: '', platform: '', status: 'Plan to Play', hoursPlayed: 0, coverImage: '' });

        } catch (error) {
            alert('Error al agregar el juego: ' + (error.response?.data?.message || 'Error de conexión'));
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: '20px', margin: '20px 0' }}>
            <h2>Agregar Nuevo Juego</h2>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Título (Requerido)" required /><br/>
            <input type="text" name="platform" value={formData.platform} onChange={handleChange} placeholder="Plataforma (Requerido)" required /><br/>
            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Playing">Jugando</option>
                <option value="Completed">Completado</option>
                <option value="Plan to Play">Plan para Jugar</option>
                <option value="Dropped">Abandonado</option>
            </select><br/>
            <input type="number" name="hoursPlayed" value={formData.hoursPlayed} onChange={handleChange} placeholder="Horas Jugadas" /><br/>
            <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} placeholder="URL de la Portada (Opcional)" /><br/>
            
            <button type="submit" style={{ marginTop: '10px' }}>Agregar a la Biblioteca</button>
        </form>
    );
}

export default GameForm;