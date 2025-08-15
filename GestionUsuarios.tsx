import React, { useState } from 'react';
import { Search, Edit, Trash2, User, AlertTriangle } from 'lucide-react';
import { Tarjeta } from '../ui/Tarjeta';
import { Boton } from '../ui/Boton';
import { Entrada } from '../ui/Entrada';
import { Selector } from '../ui/Selector';
import { obtenerTodosLosUsuarios, eliminarUsuario } from '../../utilidades/autenticacion';
import { Usuario } from '../../tipos';

export const GestionUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(obtenerTodosLosUsuarios());
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('');
  const [usuarioAEliminar, setUsuarioAEliminar] = useState<Usuario | null>(null);
  const [mostrarConfirmacionEliminar, setMostrarConfirmacionEliminar] = useState(false);

  const usuariosFiltrados = usuarios.filter(usuario => {
    const coincideBusqueda = `${usuario.nombre} ${usuario.apellido}`.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                         usuario.codigo.includes(terminoBusqueda);
    const coincideRol = !filtroRol || usuario.rol === filtroRol;
    
    return coincideBusqueda && coincideRol;
  });

  const obtenerEtiquetaRol = (rol: string) => {
    switch (rol) {
      case 'admin': return 'Administrativo';
      case 'docente': return 'Docente';
      case 'estudiante': return 'Estudiante';
      default: return rol;
    }
  };

  const obtenerColorInsigniaRol = (rol: string) => {
    switch (rol) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'docente': return 'bg-blue-100 text-blue-800';
      case 'estudiante': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const manejarEliminarUsuario = (usuario: Usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarConfirmacionEliminar(true);
  };

  const confirmarEliminacion = () => {
    if (usuarioAEliminar) {
      const exito = eliminarUsuario(usuarioAEliminar.id);
      if (exito) {
        setUsuarios(obtenerTodosLosUsuarios());
        setMostrarConfirmacionEliminar(false);
        setUsuarioAEliminar(null);
      }
    }
  };

  const cancelarEliminacion = () => {
    setMostrarConfirmacionEliminar(false);
    setUsuarioAEliminar(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h2>
        <p className="text-gray-600">Administrar estudiantes, docentes y personal</p>
      </div>

      <Tarjeta>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Entrada
              type="text"
              placeholder="Buscar por nombre, email o código..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="pl-10"
            />
          </div>
          <Selector
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}
            opciones={[
              { valor: '', etiqueta: 'Todos los roles' },
              { valor: 'estudiante', etiqueta: 'Estudiantes' },
              { valor: 'docente', etiqueta: 'Docentes' },
              { valor: 'admin', etiqueta: 'Administrativos' }
            ]}
            className="sm:w-48"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carrera
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {usuario.nombre} {usuario.apellido}
                        </div>
                        <div className="text-sm text-gray-500">{usuario.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{usuario.codigo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${obtenerColorInsigniaRol(usuario.rol)}`}>
                      {obtenerEtiquetaRol(usuario.rol)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {usuario.carrera}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {usuario.telefono}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Boton 
                        variante="contorno" 
                        tamaño="sm" 
                        className="p-2"
                        onClick={() => window.location.href = `/perfil/${usuario.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Boton>
                      <Boton 
                        variante="peligro" 
                        tamaño="sm" 
                        className="p-2"
                        onClick={() => manejarEliminarUsuario(usuario)}
                        disabled={usuario.rol === 'admin'} // No permitir eliminar admin
                      >
                        <Trash2 className="h-4 w-4" />
                      </Boton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {usuariosFiltrados.length === 0 && (
          <div className="text-center py-8">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron usuarios</p>
          </div>
        )}
      </Tarjeta>

      {/* Modal de confirmación para eliminar usuario */}
      {mostrarConfirmacionEliminar && usuarioAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Confirmar eliminación</h3>
            </div>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres eliminar a <strong>{usuarioAEliminar.nombre} {usuarioAEliminar.apellido}</strong>? 
              Esta acción no se puede deshacer.
            </p>
            <div className="flex space-x-3">
              <Boton variante="secundario" onClick={cancelarEliminacion}>
                Cancelar
              </Boton>
              <Boton variante="peligro" onClick={confirmarEliminacion}>
                Eliminar
              </Boton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};