import React from 'react';
// 1. Importar los elementos necesarios de React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

// 2. Importar tus componentes y vistas (Pages)
import Navbar from './components/Navbar';
import BibliotecaJuegos from './pages/BibliotecaJuegos';
import FormularioJuego from './pages/FormularioJuego';
import Estadisticas from './pages/Estadisticas';

// La vista Home es opcional, puede ser la misma Biblioteca
const Home = () => <h1>Bienvenido a GameTracker</h1>; 

function App() {
  return (
    // 3. El componente Router envuelve toda la aplicación
    <Router> 
        {/* 4. La Navbar se renderiza en TODAS las rutas */}
        <Navbar /> 
        
        {/* 5. El contenedor <Routes> define las URLs y los componentes */}
        <div className="container" style={{ padding: '20px' }}>
            <Routes>
                {/* Ruta principal */}
                <Route path="/" element={<Home />} /> 
                
                {/* Rutas obligatorias del proyecto GameTracker */}
                <Route path="/biblioteca" element={<BibliotecaJuegos />} />
                <Route path="/agregar-juego" element={<FormularioJuego />} />
                <Route path="/editar/:id" element={<FormularioJuego />} /> 
                <Route path="/estadisticas" element={<Estadisticas />} />
                
                {/* Puedes añadir una ruta para un Not Found */}
                <Route path="*" element={<h1>404: Página no encontrada</h1>} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;