const mongoose = require('mongoose');

// Definición del Schema para la Reseña
const ReviewSchema = new mongoose.Schema({
    gameId: { // Vínculo con el juego al que pertenece la reseña
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game', // Hace referencia al modelo 'Game'
        required: true
    },
    rating: { // Puntuación con estrellas [cite: 59]
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    content: { // Reseñas detalladas [cite: 60]
        type: String,
        required: true,
        trim: true
    },
    // Añade el campo para el usuario si tu aplicación tuviera autenticación.
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Review', ReviewSchema);