import React from 'react';
import { BookOpen, Award, Calendar, TrendingUp } from 'lucide-react';
import { Tarjeta } from '../ui/Tarjeta';
import { useAutenticacion } from '../../contextos/ContextoAutenticacion';

export const TableroEstudiante: React.FC = () => {
  const { usuarioActual } = useAutenticacion();

  const estadisticas = [
    {
      titulo: 'Materias Cursando',
      valor: '6',
      icono: BookOpen,
      color: 'bg-blue-500',
      colorFondo: 'bg-blue-50'
    },
    {
      titulo: 'Promedio General',
      valor: '82',
      icono: Award,
      color: 'bg-green-500',
      colorFondo: 'bg-green-50'
    },
    {
      titulo: 'Asistencias',
      valor: '85%',
      icono: Calendar,
      color: 'bg-orange-500',
      colorFondo: 'bg-orange-50'
    },
    {
      titulo: 'Progreso Semestre',
      valor: '70%',
      icono: TrendingUp,
      color: 'bg-purple-500',
      colorFondo: 'bg-purple-50'
    }
  ];

  const calificacionesRecientes = [
    { materia: 'Programación I', nota: 90, fecha: '2023-11-15' },
    { materia: 'Matemáticas', nota: 85, fecha: '2023-11-10' },
    { materia: 'Base de Datos', nota: 78, fecha: '2023-11-08' },
    { materia: 'Inglés Técnico', nota: 89, fecha: '2023-11-05' }
  ];

  const obtenerColorNota = (nota: number) => {
    if (nota >= 95) return 'text-purple-600 bg-purple-50';
    if (nota >= 85) return 'text-green-600 bg-green-50';
    if (nota >= 61) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bienvenido, {usuarioActual?.nombre}
        </h2>
        <p className="text-gray-600">Estudiante de {usuarioActual?.carrera}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {estadisticas.map((estadistica, indice) => {
          const Icono = estadistica.icono;
          return (
            <Tarjeta key={indice} className="hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{estadistica.titulo}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{estadistica.valor}</p>
                </div>
                <div className={`p-3 rounded-full ${estadistica.colorFondo}`}>
                  <Icono className={`h-6 w-6 text-white ${estadistica.color}`} />
                </div>
              </div>
            </Tarjeta>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Tarjeta>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Calificaciones Recientes</h3>
          <div className="space-y-3">
            {calificacionesRecientes.map((calificacion, indice) => (
              <div key={indice} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{calificacion.materia}</p>
                  <p className="text-sm text-gray-600">{new Date(calificacion.fecha).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-lg font-bold ${obtenerColorNota(calificacion.nota)}`}>
                  {calificacion.nota}
                </span>
              </div>
            ))}
          </div>
        </Tarjeta>

        <Tarjeta>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximos Eventos</h3>
          <div className="space-y-4">
            {[
              { evento: 'Examen de Programación', fecha: 'Mañana', tipo: 'Examen' },
              { evento: 'Entrega de Proyecto', fecha: '3 días', tipo: 'Tarea' },
              { evento: 'Presentación Final', fecha: '1 semana', tipo: 'Presentación' }
            ].map((elemento, indice) => (
              <div key={indice} className="flex justify-between items-center">
                <div>
                  <span className="text-gray-600">{elemento.evento}</span>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {elemento.tipo}
                  </span>
                </div>
                <span className="font-semibold text-gray-900">{elemento.fecha}</span>
              </div>
            ))}
          </div>
        </Tarjeta>
      </div>
    </div>
  );
};