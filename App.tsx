import React, { useState } from 'react';
import { ProveedorAutenticacion, useAutenticacion } from './contextos/ContextoAutenticacion';
import { FormularioLogin } from './componentes/autenticacion/FormularioLogin';
import { Encabezado } from './componentes/diseño/Encabezado';
import { BarraLateral } from './componentes/diseño/BarraLateral';
import { TableroAdmin } from './componentes/tableros/TableroAdmin';
import { TableroDocente } from './componentes/tableros/TableroDocente';
import { TableroEstudiante } from './componentes/tableros/TableroEstudiante';
import { GestionUsuarios } from './componentes/usuarios/GestionUsuarios';
import { RegistrarUsuario } from './componentes/usuarios/RegistrarUsuario';
import { PerfilUsuario } from './componentes/usuarios/PerfilUsuario';
import { GestionCalificaciones } from './componentes/calificaciones/GestionCalificaciones';
import { CalificacionesEstudiante } from './componentes/calificaciones/CalificacionesEstudiante';

const Tablero: React.FC = () => {
  const { usuarioActual } = useAutenticacion();
  
  switch (usuarioActual?.rol) {
    case 'admin':
      return <TableroAdmin />;
    case 'docente':
      return <TableroDocente />;
    case 'estudiante':
      return <TableroEstudiante />;
    default:
      return <div>Cargando...</div>;
  }
};

const ContenidoPrincipal: React.FC<{ pestañaActiva: string }> = ({ pestañaActiva }) => {
  const { usuarioActual } = useAutenticacion();

  const renderizarContenido = () => {
    switch (pestañaActiva) {
      case 'tablero':
        return <Tablero />;
      case 'usuarios':
        return usuarioActual?.rol === 'admin' ? <GestionUsuarios /> : <Tablero />;
      case 'registrar':
        return usuarioActual?.rol === 'admin' ? <RegistrarUsuario /> : <Tablero />;
      case 'estudiantes':
        return usuarioActual?.rol === 'docente' ? <GestionUsuarios /> : <Tablero />;
      case 'calificaciones':
        return usuarioActual?.rol === 'docente' ? <GestionCalificaciones /> : <Tablero />;
      case 'mis-calificaciones':
        return usuarioActual?.rol === 'estudiante' ? <CalificacionesEstudiante /> : <Tablero />;
      case 'perfil':
        return <PerfilUsuario />;
      default:
        return <Tablero />;
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {renderizarContenido()}
    </main>
  );
};

const ContenidoApp: React.FC = () => {
  const { usuarioActual } = useAutenticacion();
  const [pestañaActiva, setPestañaActiva] = useState('tablero');

  if (!usuarioActual) {
    return <FormularioLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Encabezado />
      <div className="flex">
        <BarraLateral pestañaActiva={pestañaActiva} setPestañaActiva={setPestañaActiva} />
        <ContenidoPrincipal pestañaActiva={pestañaActiva} />
      </div>
    </div>
  );
};

function App() {
  return (
    <ProveedorAutenticacion>
      <ContenidoApp />
    </ProveedorAutenticacion>
  );
}

export default App;