import React from 'react';
// 1. Importar los elementos necesarios de React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

// 2. Importar tus componentes y vistas (Pages)
import Navbar from './components/Navbar';
import BibliotecaJuegos from './pages/BibliotecaJuegos';
import FormularioJuego from './pages/FormularioJuego';
import Estadisticas from './pages/Estadisticas';
// --- NUEVA IMPORTACIÓN ---
import DetalleJuego from './pages/DetalleJuego'; 


// La vista Home es opcional, puede ser la misma Biblioteca
const Home = () => <h1>Bienvenido a GameTracker</h1>; 

function App() {
  return (
    // El componente Router envuelve toda la aplicación
    <Router> 
        {/* La Navbar se renderiza en TODAS las rutas */}
        <Navbar /> 
        
        {/* El contenedor <Routes> define las URLs y los componentes */}
        <div className="container" style={{ padding: '20px' }}>
            <Routes>
                {/* Ruta principal */}
                <Route path="/" element={<Home />} /> 
                
                {/* Rutas obligatorias de CRUD de Juegos */}
                <Route path="/biblioteca" element={<BibliotecaJuegos />} />
                <Route path="/agregar-juego" element={<FormularioJuego />} />
                <Route path="/editar/:id" element={<FormularioJuego />} /> 

                {/* Ruta obligatoria de Estadísticas */}
                <Route path="/estadisticas" element={<Estadisticas />} />
                
                {/* --- NUEVA RUTA DINÁMICA para Reseñas y Detalle --- */}
                {/* Esta ruta carga DetalleJuego (que a su vez carga ListaReseñas y FormularioReseña) */}
                <Route path="/juegos/:id" element={<DetalleJuego />} />

                {/* Ruta para Not Found */}
                <Route path="*" element={<h1>404: Página no encontrada</h1>} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;