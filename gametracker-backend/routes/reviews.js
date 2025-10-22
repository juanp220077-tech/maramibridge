const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); 
const Game = require('../models/Game');


// 1. ENDPOINT: POST /api/reseñas (Agregar nueva reseña)
// Implementa la lógica de 'agregar'
router.post('/', async (req, res) => {
    try {
        const newReview = new Review(req.body);
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        // Devuelve 400 si faltan campos requeridos
        res.status(400).json({ message: error.message });
    }
});
// 2. ENDPOINT: GET /api/reseñas/:gameId (Buscar reseñas por juego)
router.get('/:gameId', async (req, res) => {
    try {
        // Usa el gameId para encontrar todas las reseñas asociadas
        const reviews = await Review.find({ gameId: req.params.gameId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ... (Añadir endpoints PUT y DELETE para edición/eliminación de reseñas)
// ¡IMPORTANTE! Exportar el router

module.exports = router;