const express = require('express');
const router = express.Router();
const Game = require('../models/Game'); // Importa el modelo de Juego

// 1. ENDPOINT: GET /api/juegos (Buscar/Listar todos) [cite: 53]
router.get('/', async (req, res) => {
    try {
        const games = await Game.find({});
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. ENDPOINT: POST /api/juegos (Agregar juego) [cite: 53]
router.post('/', async (req, res) => {
    try {
        const newGame = new Game(req.body);
        const savedGame = await newGame.save();
        res.status(201).json(savedGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 3. ENDPOINT: PUT /api/juegos/:id (Editar juego) [cite: 53]
router.put('/:id', async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGame) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.status(200).json(updatedGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 4. ENDPOINT: DELETE /api/juegos/:id (Eliminar juego) [cite: 53]
router.delete('/:id', async (req, res) => {
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.id);
        if (!deletedGame) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.status(200).json({ message: 'Juego eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;