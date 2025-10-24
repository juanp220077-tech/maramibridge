import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // Estilos muy básicos para simular una barra de navegación horizontal
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };
    
    // Estilos para los enlaces
    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        transition: 'background-color 0.3s'
    };

    return (
        <nav style={navStyle}>
            {/* Título o Logo (navega a la página de inicio) */}
            <Link to="/" style={{ ...linkStyle, fontWeight: 'bold' }}>
                GameTracker 🎮
            </Link>

            {/* Enlaces a las vistas principales del proyecto */}
            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/biblioteca" style={linkStyle}>
                    Mi Biblioteca
                </Link>
                <Link to="/agregar-juego" style={linkStyle}>
                    Agregar Juego
                </Link>
                <Link to="/estadisticas" style={linkStyle}>
                    Estadísticas
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;