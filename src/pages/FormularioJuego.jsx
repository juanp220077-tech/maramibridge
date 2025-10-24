import React from 'react';

const FormularioJuego = () => {
  // Usaremos el hook useParams() de react-router-dom aquí para saber si estamos editando
  // o agregando un juego.
  const isEditing = false; // Lógica pendiente

  return (
    <div>
      <h1>{isEditing ? '✏️ Editar Juego' : '➕ Agregar Nuevo Juego'}</h1>
      <form>
        {/* Campos: Título, Portada, Estado (Completado, Jugando, Pendiente), Puntuación, Horas Jugadas */}
        <p>Formulario de juego pendiente de implementar...</p>
      </form>
    </div>
  );
};

export default FormularioJuego;