const mongoose = require('mongoose');

// Definición del Schema para el Juego
const GameSchema = new mongoose.Schema({
    // Propiedades basadas en las funcionalidades requeridas:
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    platform: { 
        type: String, 
        required: true 
    },
    coverImage: { // Para mostrar la biblioteca con portadas [cite: 56]
        type: String, 
        default: 'default_cover.png' 
    },
    status: { // Marcar juegos como completados [cite: 58]
        type: String,
        enum: ['Playing', 'Completed', 'Plan to Play', 'Dropped'],
        default: 'Plan to Play'
    },
    hoursPlayed: { // Registrar horas jugadas [cite: 61]
        type: Number,
        default: 0
    },
    // Las reseñas se vincularán desde su propio modelo.
    // Aquí puedes añadir más campos relevantes para editar/agregar juegos [cite: 57]
}, { 
    timestamps: true // Añade campos createdAt y updatedAt automáticamente
});

// Exportar el modelo
module.exports = mongoose.model('Game', GameSchema);