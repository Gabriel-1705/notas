import React from 'react';
import { 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  UserPlus, 
  FileText,
  Settings,
  BarChart3
} from 'lucide-react';
import { useAutenticacion } from '../../contextos/ContextoAutenticacion';

interface PropiedadesBarraLateral {
  pestañaActiva: string;
  setPestañaActiva: (pestaña: string) => void;
}

export const BarraLateral: React.FC<PropiedadesBarraLateral> = ({ pestañaActiva, setPestañaActiva }) => {
  const { usuarioActual } = useAutenticacion();

  const obtenerElementosMenu = () => {
    const elementosBase = [
      { id: 'tablero', etiqueta: 'Tablero', icono: Home },
      { id: 'perfil', etiqueta: 'Perfil', icono: Settings }
    ];

    if (usuarioActual?.rol === 'admin') {
      return [
        ...elementosBase.slice(0, 1),
        { id: 'usuarios', etiqueta: 'Gestión de Usuarios', icono: Users },
        { id: 'registrar', etiqueta: 'Registrar Usuario', icono: UserPlus },
        { id: 'reportes', etiqueta: 'Reportes', icono: BarChart3 },
        ...elementosBase.slice(1)
      ];
    }

    if (usuarioActual?.rol === 'docente') {
      return [
        ...elementosBase.slice(0, 1),
        { id: 'estudiantes', etiqueta: 'Mis Estudiantes', icono: GraduationCap },
        { id: 'calificaciones', etiqueta: 'Gestión de Notas', icono: BookOpen },
        ...elementosBase.slice(1)
      ];
    }

    return [
      ...elementosBase.slice(0, 1),
      { id: 'mis-calificaciones', etiqueta: 'Mis Notas', icono: FileText },
      ...elementosBase.slice(1)
    ];
  };

  const elementosMenu = obtenerElementosMenu();

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {elementosMenu.map((elemento) => {
            const Icono = elemento.icono;
            return (
              <li key={elemento.id}>
                <button
                  onClick={() => setPestañaActiva(elemento.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                    pestañaActiva === elemento.id
                      ? 'bg-red-50 text-red-700 border-r-2 border-red-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icono className="h-5 w-5 mr-3" />
                  {elemento.etiqueta}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};