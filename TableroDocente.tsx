import React from 'react';
import { GraduationCap, BookOpen, Clock, Award } from 'lucide-react';
import { Tarjeta } from '../ui/Tarjeta';
import { useAutenticacion } from '../../contextos/ContextoAutenticacion';

export const TableroDocente: React.FC = () => {
  const { usuarioActual } = useAutenticacion();

  const estadisticas = [
    {
      titulo: 'Estudiantes Asignados',
      valor: '24',
      icono: GraduationCap,
      color: 'bg-blue-500',
      colorFondo: 'bg-blue-50'
    },
    {
      titulo: 'Materias',
      valor: '3',
      icono: BookOpen,
      color: 'bg-green-500',
      colorFondo: 'bg-green-50'
    },
    {
      titulo: 'Clases Pendientes',
      valor: '8',
      icono: Clock,
      color: 'bg-orange-500',
      colorFondo: 'bg-orange-50'
    },
    {
      titulo: 'Promedio General',
      valor: '85',
      icono: Award,
      color: 'bg-purple-500',
      colorFondo: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bienvenido, {usuarioActual?.nombre}
        </h2>
        <p className="text-gray-600">Panel de Docente - {usuarioActual?.carrera}</p>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividades Recientes</h3>
          <div className="space-y-3">
            {[
              { accion: 'Calificación registrada', estudiante: 'Ana García', materia: 'Programación I', tiempo: '2 horas' },
              { accion: 'Asistencia tomada', estudiante: 'Clase completa', materia: 'Base de Datos', tiempo: '1 día' },
              { accion: 'Examen creado', estudiante: 'Evaluación', materia: 'Algoritmos', tiempo: '2 días' }
            ].map((actividad, indice) => (
              <div key={indice} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{actividad.accion}</p>
                  <p className="text-sm text-gray-600">{actividad.estudiante} - {actividad.materia}</p>
                </div>
                <span className="text-xs text-gray-500">hace {actividad.tiempo}</span>
              </div>
            ))}
          </div>
        </Tarjeta>

        <Tarjeta>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Actividades</h3>
          <div className="space-y-4">
            {[
              { tarea: 'Entregar calificaciones', fecha: 'Mañana', urgente: true },
              { tarea: 'Reunión de carrera', fecha: '2 días', urgente: false },
              { tarea: 'Examen final', fecha: '1 semana', urgente: false }
            ].map((tarea, indice) => (
              <div key={indice} className="flex justify-between items-center">
                <div>
                  <span className="text-gray-600">{tarea.tarea}</span>
                  {tarea.urgente && (
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      Urgente
                    </span>
                  )}
                </div>
                <span className="font-semibold text-gray-900">{tarea.fecha}</span>
              </div>
            ))}
          </div>
        </Tarjeta>
      </div>
    </div>
  );
};