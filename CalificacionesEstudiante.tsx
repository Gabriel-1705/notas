import React, { useState } from 'react';
import { Award, Calendar, TrendingUp, Download } from 'lucide-react';
import { Tarjeta } from '../ui/Tarjeta';
import { Boton } from '../ui/Boton';
import { Selector } from '../ui/Selector';

interface Calificacion {
  id: string;
  materia: string;
  nota: number;
  semestre: string;
  fecha: string;
  docente: string;
}

export const CalificacionesEstudiante: React.FC = () => {
  const [semestreSeleccionado, setSemestreSeleccionado] = useState('2023-2');
  
  const calificaciones: Calificacion[] = [
    { id: '1', materia: 'Programación I', nota: 85, semestre: '2023-2', fecha: '2023-11-15', docente: 'Ing. María González' },
    { id: '2', materia: 'Matemáticas', nota: 78, semestre: '2023-2', fecha: '2023-11-10', docente: 'Lic. Carlos Pérez' },
    { id: '3', materia: 'Base de Datos', nota: 90, semestre: '2023-2', fecha: '2023-11-08', docente: 'Ing. Ana López' },
    { id: '4', materia: 'Inglés Técnico', nota: 82, semestre: '2023-2', fecha: '2023-11-05', docente: 'Prof. John Smith' },
    { id: '5', materia: 'Algoritmos', nota: 75, semestre: '2023-2', fecha: '2023-11-01', docente: 'Dr. Roberto Silva' },
  ];

  const calificacionesFiltradas = calificaciones.filter(calificacion => calificacion.semestre === semestreSeleccionado);
  const promedio = calificacionesFiltradas.reduce((suma, calificacion) => suma + calificacion.nota, 0) / calificacionesFiltradas.length;

  const obtenerColorNota = (nota: number) => {
    if (nota >= 95) return 'text-purple-600 bg-purple-50 border-purple-200';
    if (nota >= 85) return 'text-green-600 bg-green-50 border-green-200';
    if (nota >= 61) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const obtenerEstadoNota = (nota: number) => {
    if (nota >= 95) return 'Excelencia';
    if (nota >= 61) return 'Aprobado';
    return 'Reprobado';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mis Calificaciones</h2>
          <p className="text-gray-600">Consulta tus notas y progreso académico</p>
        </div>
        <Boton variante="contorno">
          <Download className="h-4 w-4 mr-2" />
          Descargar Reporte
        </Boton>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Tarjeta>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Promedio General</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{promedio.toFixed(1)}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Tarjeta>

        <Tarjeta>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Materias Cursadas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{calificacionesFiltradas.length}</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Tarjeta>

        <Tarjeta>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Materias Aprobadas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {calificacionesFiltradas.filter(c => c.nota >= 61).length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Tarjeta>
      </div>

      <Tarjeta>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Detalle de Calificaciones</h3>
          <Selector
            value={semestreSeleccionado}
            onChange={(e) => setSemestreSeleccionado(e.target.value)}
            opciones={[
              { valor: '2023-2', etiqueta: 'Semestre 2023-2' },
              { valor: '2023-1', etiqueta: 'Semestre 2023-1' },
              { valor: '2022-2', etiqueta: 'Semestre 2022-2' }
            ]}
            className="w-48"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Materia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Docente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Calificación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {calificacionesFiltradas.map((calificacion) => (
                <tr key={calificacion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{calificacion.materia}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{calificacion.docente}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-4 py-2 rounded-lg text-lg font-bold border-2 ${obtenerColorNota(calificacion.nota)}`}>
                      {calificacion.nota}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      calificacion.nota >= 95 ? 'bg-purple-100 text-purple-800' :
                      calificacion.nota >= 61 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {obtenerEstadoNota(calificacion.nota)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(calificacion.fecha).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {calificacionesFiltradas.length === 0 && (
          <div className="text-center py-8">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No hay calificaciones para este semestre</p>
          </div>
        )}
      </Tarjeta>
    </div>
  );
};