// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000; 
const MONGODB_URI = process.env.MONGODB_URI;

// Middlewares
app.use(cors()); 
app.use(express.json()); 
// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.send('API de GameTracker funcionando. (Listo para agregar modelos y rutas)');
});
// ... (Código de configuración de Express y Conexión a DB)

// 6. Importar Rutas
const gamesRouter = require('./routes/games');
// const reviewsRouter = require('./routes/reviews'); // Añadir cuando esté listo

// 7. Usar Rutas
app.use('/api/juegos', gamesRouter); // Todos los endpoints de juegos comenzarán con /api/juegos

// app.use('/api/reseñas', reviewsRouter); // Añadir cuando esté listo

// Ruta de prueba inicial (Endpoint Raíz)
app.get('/', (req, res) => {
  res.send('API de GameTracker funcionando. (Listo para agregar modelos y rutas)');
});

// ... (Resto del código del servidor)
// Conexión a MongoDB Atlas
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas con éxito.');

    // Iniciar el servidor solo si la conexión a la DB es exitosa
    app.listen(PORT, () => {
      console.log(`🚀 Servidor de GameTracker corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    // Usa un log más detallado para debug: console.error('Detalles del error:', error);
    process.exit(1); 
  });

