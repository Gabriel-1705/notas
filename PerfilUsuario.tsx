import React, { useState, useEffect } from 'react';
import { User, Edit, X, Camera } from 'lucide-react';
import { Tarjeta } from '../ui/Tarjeta';
import { Boton } from '../ui/Boton';
import { Entrada } from '../ui/Entrada';
import { Selector } from '../ui/Selector';
import { useAutenticacion } from '../../contextos/ContextoAutenticacion';
import { actualizarPerfilUsuario, obtenerTodosLosUsuarios } from '../../utilidades/autenticacion';
import { carreras } from '../../datos/carreras';
import { Usuario } from '../../tipos';

export const PerfilUsuario: React.FC = () => {
  const { usuarioActual } = useAutenticacion();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [datosEditados, setDatosEditados] = useState<Partial<Usuario>>({});
  const [estaCargando, setEstaCargando] = useState(false);
  const [exito, setExito] = useState<string>('');
  const [errores, setErrores] = useState<Record<string, string>>({});

  useEffect(() => {
    if (usuarioActual?.rol === 'admin') {
      setUsuarios(obtenerTodosLosUsuarios());
    }
  }, [usuarioActual]);

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

  const manejarSeleccionUsuario = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setDatosEditados({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      telefono: usuario.telefono,
      carrera: usuario.carrera,
      rol: usuario.rol
    });
    setModoEdicion(false);
    setExito('');
    setErrores({});
  };

  const manejarCambioEntrada = (campo: keyof Usuario, valor: string) => {
    setDatosEditados(prev => ({ ...prev, [campo]: valor }));
    if (errores[campo]) {
      setErrores(prev => ({ ...prev, [campo]: '' }));
    }
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: Record<string, string> = {};

    if (!datosEditados.nombre?.trim()) nuevosErrores.nombre = 'El nombre es requerido';
    if (!datosEditados.apellido?.trim()) nuevosErrores.apellido = 'El apellido es requerido';
    if (!datosEditados.email?.trim()) nuevosErrores.email = 'El email es requerido';
    if (!datosEditados.email?.includes('@')) nuevosErrores.email = 'El email no es válido';
    if (!datosEditados.telefono?.trim()) nuevosErrores.telefono = 'El teléfono es requerido';
    if (!datosEditados.carrera) nuevosErrores.carrera = 'La carrera es requerida';
    if (!datosEditados.rol) nuevosErrores.rol = 'El rol es requerido';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardarCambios = async () => {
    if (!usuarioSeleccionado || !validarFormulario()) return;

    setEstaCargando(true);

    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const usuarioActualizado = actualizarPerfilUsuario(usuarioSeleccionado.id, datosEditados);
      
      if (usuarioActualizado) {
        setUsuarioSeleccionado(usuarioActualizado);
        setUsuarios(obtenerTodosLosUsuarios());
        setExito('Perfil actualizado exitosamente');
        setModoEdicion(false);
        
        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => setExito(''), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setEstaCargando(false);
    }
  };

  const cancelarEdicion = () => {
    setModoEdicion(false);
    setDatosEditados({
      nombre: usuarioSeleccionado?.nombre || '',
      apellido: usuarioSeleccionado?.apellido || '',
      email: usuarioSeleccionado?.email || '',
      telefono: usuarioSeleccionado?.telefono || '',
      carrera: usuarioSeleccionado?.carrera || '',
      rol: usuarioSeleccionado?.rol || 'estudiante'
    });
    setErrores({});
  };

  if (!usuarioActual) {
    return <div>Cargando...</div>;
  }

  // Si es admin, mostrar selector de usuarios
  if (usuarioActual.rol === 'admin') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestión de Perfiles</h2>
          <p className="text-gray-600">Selecciona un usuario para editar su perfil</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de usuarios */}
          <div className="lg:col-span-1">
            <Tarjeta>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Usuarios</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {usuarios.map((usuario) => (
                  <div
                    key={usuario.id}
                    onClick={() => manejarSeleccionUsuario(usuario)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      usuarioSeleccionado?.id === usuario.id
                        ? 'bg-red-50 border border-red-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {usuario.nombre} {usuario.apellido}
                        </p>
                        <p className="text-xs text-gray-500">#{usuario.codigo}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${obtenerColorInsigniaRol(usuario.rol)}`}>
                          {obtenerEtiquetaRol(usuario.rol)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tarjeta>
          </div>

          {/* Perfil del usuario seleccionado */}
          <div className="lg:col-span-2">
            {usuarioSeleccionado ? (
              <Tarjeta>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Perfil de {usuarioSeleccionado.nombre} {usuarioSeleccionado.apellido}
                    </h3>
                    <p className="text-sm text-gray-500">#{usuarioSeleccionado.codigo}</p>
                  </div>
                  <Boton
                    variante={modoEdicion ? 'secundario' : 'contorno'}
                    onClick={() => setModoEdicion(!modoEdicion)}
                    disabled={estaCargando}
                  >
                    {modoEdicion ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                    {modoEdicion ? 'Cancelar' : 'Editar'}
                  </Boton>
                </div>

                {exito && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                    {exito}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Información del usuario */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Entrada
                      etiqueta="Nombre"
                      value={modoEdicion ? datosEditados.nombre || '' : usuarioSeleccionado.nombre}
                      onChange={(e) => manejarCambioEntrada('nombre', e.target.value)}
                      error={errores.nombre}
                      disabled={!modoEdicion}
                    />

                    <Entrada
                      etiqueta="Apellido"
                      value={modoEdicion ? datosEditados.apellido || '' : usuarioSeleccionado.apellido}
                      onChange={(e) => manejarCambioEntrada('apellido', e.target.value)}
                      error={errores.apellido}
                      disabled={!modoEdicion}
                    />
                  </div>

                  <Entrada
                    etiqueta="Correo Electrónico"
                    type="email"
                    value={modoEdicion ? datosEditados.email || '' : usuarioSeleccionado.email}
                    onChange={(e) => manejarCambioEntrada('email', e.target.value)}
                    error={errores.email}
                    disabled={!modoEdicion}
                  />

                  <Entrada
                    etiqueta="Teléfono"
                    type="tel"
                    value={modoEdicion ? datosEditados.telefono || '' : usuarioSeleccionado.telefono}
                    onChange={(e) => manejarCambioEntrada('telefono', e.target.value)}
                    error={errores.telefono}
                    disabled={!modoEdicion}
                  />

                  <Selector
                    etiqueta="Carrera"
                    value={modoEdicion ? datosEditados.carrera || '' : usuarioSeleccionado.carrera}
                    onChange={(e) => manejarCambioEntrada('carrera', e.target.value)}
                    error={errores.carrera}
                    opciones={carreras.map(carrera => ({
                      valor: carrera.nombre,
                      etiqueta: carrera.nombre
                    }))}
                    disabled={!modoEdicion}
                  />

                  <Selector
                    etiqueta="Rol"
                    value={modoEdicion ? datosEditados.rol || '' : usuarioSeleccionado.rol}
                    onChange={(e) => manejarCambioEntrada('rol', e.target.value as 'admin' | 'docente' | 'estudiante')}
                    error={errores.rol}
                    opciones={[
                      { valor: 'estudiante', etiqueta: 'Estudiante' },
                      { valor: 'docente', etiqueta: 'Docente' },
                      { valor: 'admin', etiqueta: 'Administrativo' }
                    ]}
                    disabled={!modoEdicion}
                  />
                </div>

                {/* Botones de acción */}
                {modoEdicion && (
                  <div className="flex space-x-3 pt-6 border-t">
                    <Boton
                      variante="secundario"
                      onClick={cancelarEdicion}
                      disabled={estaCargando}
                    >
                      Cancelar
                    </Boton>
                    <Boton
                      onClick={guardarCambios}
                      disabled={estaCargando}
                    >
                      {estaCargando ? 'Guardando...' : 'Guardar Cambios'}
                    </Boton>
                  </div>
                )}
              </Tarjeta>
            ) : (
              <Tarjeta>
                <div className="text-center py-12">
                  <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Selecciona un usuario</h3>
                  <p className="text-gray-500">Elige un usuario de la lista para ver y editar su perfil</p>
                </div>
              </Tarjeta>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Si no es admin, mostrar perfil personal
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mi Perfil</h2>
        <p className="text-gray-600">Gestiona tu información personal</p>
      </div>

      <Tarjeta>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {usuarioActual.nombre} {usuarioActual.apellido}
            </h3>
            <p className="text-sm text-gray-500">#{usuarioActual.codigo}</p>
          </div>
          <Boton
            variante={modoEdicion ? 'secundario' : 'contorno'}
            onClick={() => setModoEdicion(!modoEdicion)}
            disabled={estaCargando}
          >
            {modoEdicion ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
            {modoEdicion ? 'Cancelar' : 'Editar'}
          </Boton>
        </div>

        {exito && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            {exito}
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Entrada
              etiqueta="Nombre"
              value={modoEdicion ? datosEditados.nombre || '' : usuarioActual.nombre}
              onChange={(e) => manejarCambioEntrada('nombre', e.target.value)}
              error={errores.nombre}
              disabled={!modoEdicion}
            />

            <Entrada
              etiqueta="Apellido"
              value={modoEdicion ? datosEditados.apellido || '' : usuarioActual.apellido}
              onChange={(e) => manejarCambioEntrada('apellido', e.target.value)}
              error={errores.apellido}
              disabled={!modoEdicion}
            />
          </div>

          <Entrada
            etiqueta="Correo Electrónico"
            type="email"
            value={modoEdicion ? datosEditados.email || '' : usuarioActual.email}
            onChange={(e) => manejarCambioEntrada('email', e.target.value)}
            error={errores.email}
            disabled={!modoEdicion}
          />

          <Entrada
            etiqueta="Teléfono"
            type="tel"
            value={modoEdicion ? datosEditados.telefono || '' : usuarioActual.telefono}
            onChange={(e) => manejarCambioEntrada('telefono', e.target.value)}
            error={errores.telefono}
            disabled={!modoEdicion}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Carrera</label>
              <div className="px-3 py-2 bg-gray-100 rounded-lg text-gray-900">
                {usuarioActual.carrera}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
              <span className={`inline-flex px-3 py-2 text-sm font-semibold rounded-lg ${obtenerColorInsigniaRol(usuarioActual.rol)}`}>
                {obtenerEtiquetaRol(usuarioActual.rol)}
              </span>
            </div>
          </div>
        </div>

        {modoEdicion && (
          <div className="flex space-x-3 pt-6 border-t">
            <Boton
              variante="secundario"
              onClick={cancelarEdicion}
              disabled={estaCargando}
            >
              Cancelar
            </Boton>
            <Boton
              onClick={guardarCambios}
              disabled={estaCargando}
            >
              {estaCargando ? 'Guardando...' : 'Guardar Cambios'}
            </Boton>
          </div>
        )}
      </Tarjeta>
    </div>
  );
};