import React from 'react';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';
import { Tarjeta } from '../ui/Tarjeta';
import { obtenerTodosLosUsuarios, obtenerUsuariosPorRol } from '../../utilidades/autenticacion';

export const TableroAdmin: React.FC = () => {
  const todosLosUsuarios = obtenerTodosLosUsuarios();
  const estudiantes = obtenerUsuariosPorRol('estudiante');
  const docentes = obtenerUsuariosPorRol('docente');
  const admins = obtenerUsuariosPorRol('admin');

  const estadisticas = [
    {
      titulo: 'Total Usuarios',
      valor: todosLosUsuarios.length,
      icono: Users,
      color: 'bg-blue-500',
      colorFondo: 'bg-blue-50'
    },
    {
      titulo: 'Estudiantes',
      valor: estudiantes.length,
      icono: GraduationCap,
      color: 'bg-green-500',
      colorFondo: 'bg-green-50'
    },
    {
      titulo: 'Docentes',
      valor: docentes.length,
      icono: BookOpen,
      color: 'bg-purple-500',
      colorFondo: 'bg-purple-50'
    },
    {
      titulo: 'Administrativos',
      valor: admins.length,
      icono: TrendingUp,
      color: 'bg-red-500',
      colorFondo: 'bg-red-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Panel Administrativo</h2>
        <p className="text-gray-600">Gestión completa del sistema académico</p>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Usuarios Recientes</h3>
          <div className="space-y-3">
            {todosLosUsuarios.slice(-5).map((usuario) => (
              <div key={usuario.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{usuario.nombre} {usuario.apellido}</p>
                  <p className="text-sm text-gray-600">#{usuario.codigo} - {usuario.rol}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(usuario.fechaCreacion).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </Tarjeta>

        <Tarjeta>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad del Sistema</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Usuarios activos hoy</span>
              <span className="font-semibold text-gray-900">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Notas registradas</span>
              <span className="font-semibold text-gray-900">45</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Nuevos registros</span>
              <span className="font-semibold text-gray-900">3</span>
            </div>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
};