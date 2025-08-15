import React from 'react';
import { LogOut, User, Settings } from 'lucide-react';
import { useAutenticacion } from '../../contextos/ContextoAutenticacion';
import { Boton } from '../ui/Boton';

export const Encabezado: React.FC = () => {
  const { usuarioActual, cerrarSesion } = useAutenticacion();

  const obtenerEtiquetaRol = (rol: string) => {
    switch (rol) {
      case 'admin': return 'Administrativo';
      case 'docente': return 'Docente';
      case 'estudiante': return 'Estudiante';
      default: return rol;
    }
  };

  const obtenerColorRol = (rol: string) => {
    switch (rol) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'docente': return 'bg-blue-100 text-blue-800';
      case 'estudiante': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">OMIE</h1>
              <p className="text-sm text-gray-500">Sistema Académico</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {usuarioActual?.nombre} {usuarioActual?.apellido}
              </p>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${obtenerColorRol(usuarioActual?.rol || '')}`}>
                  {obtenerEtiquetaRol(usuarioActual?.rol || '')}
                </span>
                <span className="text-xs text-gray-500">
                  #{usuarioActual?.codigo}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Boton
                variante="contorno"
                tamaño="sm"
                onClick={() => {}}
                className="p-2"
              >
                <Settings className="h-4 w-4" />
              </Boton>
              
              <Boton
                variante="secundario"
                tamaño="sm"
                onClick={cerrarSesion}
                className="p-2"
              >
                <LogOut className="h-4 w-4" />
              </Boton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};