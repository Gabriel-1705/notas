import React, { useState } from 'react';
import { Search, Plus, Edit, Save, X, AlertCircle } from 'lucide-react';
import { Tarjeta } from '../ui/Tarjeta';
import { Boton } from '../ui/Boton';
import { Entrada } from '../ui/Entrada';
import { Selector } from '../ui/Selector';

interface Calificacion {
  id: string;
  nombreEstudiante: string;
  materia: string;
  nota: number;
  semestre: string;
  fecha: string;
}

export const GestionCalificaciones: React.FC = () => {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([
    { id: '1', nombreEstudiante: 'Ana García', materia: 'Programación I', nota: 85, semestre: '2023-2', fecha: '2023-11-15' },
    { id: '2', nombreEstudiante: 'Carlos López', materia: 'Programación I', nota: 78, semestre: '2023-2', fecha: '2023-11-15' },
    { id: '3', nombreEstudiante: 'María Rodríguez', materia: 'Base de Datos', nota: 90, semestre: '2023-2', fecha: '2023-11-10' },
    { id: '4', nombreEstudiante: 'Luis Martínez', materia: 'Matemáticas', nota: 55, semestre: '2023-2', fecha: '2023-11-12' },
    { id: '5', nombreEstudiante: 'Sofia Torres', materia: 'Inglés Técnico', nota: 98, semestre: '2023-2', fecha: '2023-11-14' },
  ]);

  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [filtroMateria, setFiltroMateria] = useState('');
  const [editandoCalificacion, setEditandoCalificacion] = useState<string | null>(null);
  const [valorEdicion, setValorEdicion] = useState<number>(0);
  const [errorValidacion, setErrorValidacion] = useState<string>('');

  const materias = ['Programación I', 'Base de Datos', 'Matemáticas', 'Inglés Técnico', 'Algoritmos'];

  const calificacionesFiltradas = calificaciones.filter(calificacion => {
    const coincideBusqueda = calificacion.nombreEstudiante.toLowerCase().includes(terminoBusqueda.toLowerCase());
    const coincideMateria = !filtroMateria || calificacion.materia === filtroMateria;
    return coincideBusqueda && coincideMateria;
  });

  const manejarEditarCalificacion = (calificacionId: string, notaActual: number) => {
    setEditandoCalificacion(calificacionId);
    setValorEdicion(notaActual);
    setErrorValidacion('');
  };

  const validarNota = (nota: number): boolean => {
    if (nota < 0 || nota > 100) {
      setErrorValidacion('La nota debe estar entre 0 y 100');
      return false;
    }
    if (!Number.isInteger(nota)) {
      setErrorValidacion('La nota debe ser un número entero');
      return false;
    }
    setErrorValidacion('');
    return true;
  };

  const manejarGuardarCalificacion = (calificacionId: string) => {
    if (!validarNota(valorEdicion)) {
      return;
    }

    // Actualizar la calificación en el estado local
    setCalificaciones(prev => 
      prev.map(cal => 
        cal.id === calificacionId 
          ? { ...cal, nota: valorEdicion, fecha: new Date().toISOString().split('T')[0] }
          : cal
      )
    );

    // Aquí actualizarías la calificación en el backend
    console.log(`Actualizando calificación ${calificacionId} a ${valorEdicion}`);
    setEditandoCalificacion(null);
    setErrorValidacion('');
  };

  const obtenerColorNota = (nota: number) => {
    if (nota >= 95) return 'text-purple-600 bg-purple-50 border-purple-200';
    if (nota >= 61) return 'text-green-600 bg-green-50 border-green-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const obtenerEstadoNota = (nota: number) => {
    if (nota >= 95) return 'Excelencia';
    if (nota >= 61) return 'Aprobado';
    return 'Reprobado';
  };

  const obtenerDescripcionEstado = (nota: number) => {
    if (nota >= 95) return 'Excelente rendimiento académico';
    if (nota >= 61) return 'Rendimiento satisfactorio';
    return 'Rendimiento insuficiente';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Panel de Notas del Docente</h2>
          <p className="text-gray-600">Sistema de calificación: Reprobado (0-60) | Aprobado (61-94) | Excelencia (95-100)</p>
        </div>
        <Boton>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Nota
        </Boton>
      </div>

      {/* Información del sistema de calificación */}
      <Tarjeta>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Sistema de Calificación</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">0-60</div>
              <div className="text-sm text-red-700 font-medium">Reprobado</div>
              <div className="text-xs text-red-600">Rendimiento insuficiente</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">61-94</div>
              <div className="text-sm text-green-700 font-medium">Aprobado</div>
              <div className="text-xs text-green-600">Rendimiento satisfactorio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">95-100</div>
              <div className="text-sm text-purple-700 font-medium">Excelencia</div>
              <div className="text-xs text-purple-600">Excelente rendimiento</div>
            </div>
          </div>
        </div>
      </Tarjeta>

      <Tarjeta>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Entrada
              type="text"
              placeholder="Buscar estudiante..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="pl-10"
            />
          </div>
          <Selector
            value={filtroMateria}
            onChange={(e) => setFiltroMateria(e.target.value)}
            opciones={materias.map(materia => ({ valor: materia, etiqueta: materia }))}
            className="sm:w-48"
          />
        </div>

        {/* Mensaje de error de validación */}
        {errorValidacion && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
            <AlertCircle className="h-5 w-5 mr-2" />
            {errorValidacion}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estudiante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Materia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nota
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semestre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {calificacionesFiltradas.map((calificacion) => (
                <tr key={calificacion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {calificacion.nombreEstudiante}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {calificacion.materia}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editandoCalificacion === calificacion.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="1"
                          value={valorEdicion}
                          onChange={(e) => setValorEdicion(parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-xs text-gray-500">/100</span>
                      </div>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${obtenerColorNota(calificacion.nota)}`}>
                        {calificacion.nota}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        calificacion.nota >= 95 ? 'bg-purple-100 text-purple-800' :
                        calificacion.nota >= 61 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {obtenerEstadoNota(calificacion.nota)}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {obtenerDescripcionEstado(calificacion.nota)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {calificacion.semestre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(calificacion.fecha).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editandoCalificacion === calificacion.id ? (
                      <div className="flex space-x-2">
                        <Boton
                          variante="primario"
                          tamaño="sm"
                          onClick={() => manejarGuardarCalificacion(calificacion.id)}
                          className="p-2"
                        >
                          <Save className="h-4 w-4" />
                        </Boton>
                        <Boton
                          variante="contorno"
                          tamaño="sm"
                          onClick={() => {
                            setEditandoCalificacion(null);
                            setErrorValidacion('');
                          }}
                          className="p-2"
                        >
                          <X className="h-4 w-4" />
                        </Boton>
                      </div>
                    ) : (
                      <Boton
                        variante="contorno"
                        tamaño="sm"
                        onClick={() => manejarEditarCalificacion(calificacion.id, calificacion.nota)}
                        className="p-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Boton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tarjeta>
    </div>
  );
};