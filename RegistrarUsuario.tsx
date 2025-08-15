import React, { useState } from 'react';
import { UserPlus, Camera, CheckCircle, XCircle } from 'lucide-react';
import { Tarjeta } from '../ui/Tarjeta';
import { Boton } from '../ui/Boton';
import { Entrada } from '../ui/Entrada';
import { Selector } from '../ui/Selector';
import { crearUsuarioConCodigo, verificarCodigoDisponible } from '../../utilidades/autenticacion';
import { carreras } from '../../datos/carreras';
import { FormularioRegistro } from '../../tipos';

export const RegistrarUsuario: React.FC = () => {
  const [datosFormulario, setDatosFormulario] = useState<FormularioRegistro>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    carrera: '',
    rol: 'estudiante'
  });
  const [codigoPersonalizado, setCodigoPersonalizado] = useState('');
  const [estaCargando, setEstaCargando] = useState(false);
  const [exito, setExito] = useState<string>('');
  const [errores, setErrores] = useState<Partial<FormularioRegistro>>({});
  const [errorCodigo, setErrorCodigo] = useState<string>('');

  const manejarCambioEntrada = (campo: keyof FormularioRegistro, valor: string) => {
    setDatosFormulario(prev => ({ ...prev, [campo]: valor }));
    if (errores[campo]) {
      setErrores(prev => ({ ...prev, [campo]: undefined }));
    }
  };

  const manejarCambioCodigo = (valor: string) => {
    // Solo permitir números y máximo 5 dígitos
    const soloNumeros = valor.replace(/\D/g, '');
    if (soloNumeros.length <= 5) {
      setCodigoPersonalizado(soloNumeros);
      setErrorCodigo('');
    }
  };

  const validarCodigo = (): boolean => {
    if (!codigoPersonalizado) {
      setErrorCodigo('El código es requerido');
      return false;
    }
    if (codigoPersonalizado.length !== 5) {
      setErrorCodigo('El código debe tener exactamente 5 dígitos');
      return false;
    }
    if (!verificarCodigoDisponible(codigoPersonalizado)) {
      setErrorCodigo('Este código ya está en uso');
      return false;
    }
    return true;
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: Partial<FormularioRegistro> = {};

    if (!datosFormulario.nombre.trim()) nuevosErrores.nombre = 'El nombre es requerido';
    if (!datosFormulario.apellido.trim()) nuevosErrores.apellido = 'El apellido es requerido';
    if (!datosFormulario.email.trim()) nuevosErrores.email = 'El email es requerido';
    if (!datosFormulario.email.includes('@')) nuevosErrores.email = 'El email no es válido';
    if (!datosFormulario.telefono.trim()) nuevosErrores.telefono = 'El teléfono es requerido';
    if (!datosFormulario.carrera) nuevosErrores.carrera = 'La carrera es requerida';
    if (!datosFormulario.rol) nuevosErrores.rol = 'El rol es requerido';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setExito('');

    if (!validarFormulario() || !validarCodigo()) return;

    setEstaCargando(true);

    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const nuevoUsuario = crearUsuarioConCodigo({
        ...datosFormulario,
        contraseña: 'temporal123' // Contraseña temporal
      }, codigoPersonalizado);

      if (nuevoUsuario) {
        setExito(`Usuario creado exitosamente con código: ${nuevoUsuario.codigo}`);
        setDatosFormulario({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          carrera: '',
          rol: 'estudiante'
        });
        setCodigoPersonalizado('');
      } else {
        setErrorCodigo('Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setEstaCargando(false);
    }
  };

  const generarCodigoAutomatico = () => {
    const codigo = Math.floor(10000 + Math.random() * 90000).toString();
    setCodigoPersonalizado(codigo);
    setErrorCodigo('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Registrar Nuevo Usuario</h2>
        <p className="text-gray-600">Agregar estudiantes, docentes o personal administrativo</p>
      </div>

      <Tarjeta className="max-w-2xl">
        <form onSubmit={manejarEnvio} className="space-y-6">
          {/* Subida de Foto */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-gray-400" />
            </div>
            <Boton type="button" variante="contorno" tamaño="sm">
              Subir Foto
            </Boton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Entrada
              etiqueta="Nombre"
              value={datosFormulario.nombre}
              onChange={(e) => manejarCambioEntrada('nombre', e.target.value)}
              error={errores.nombre}
              placeholder="Ingrese el nombre"
            />

            <Entrada
              etiqueta="Apellido"
              value={datosFormulario.apellido}
              onChange={(e) => manejarCambioEntrada('apellido', e.target.value)}
              error={errores.apellido}
              placeholder="Ingrese el apellido"
            />
          </div>

          <Entrada
            etiqueta="Correo Electrónico"
            type="email"
            value={datosFormulario.email}
            onChange={(e) => manejarCambioEntrada('email', e.target.value)}
            error={errores.email}
            placeholder="correo@ejemplo.com"
          />

          <Entrada
            etiqueta="Teléfono"
            type="tel"
            value={datosFormulario.telefono}
            onChange={(e) => manejarCambioEntrada('telefono', e.target.value)}
            error={errores.telefono}
            placeholder="+591 12345678"
          />

          <Selector
            etiqueta="Carrera"
            value={datosFormulario.carrera}
            onChange={(e) => manejarCambioEntrada('carrera', e.target.value)}
            error={errores.carrera}
            opciones={carreras.map(carrera => ({
              valor: carrera.nombre,
              etiqueta: carrera.nombre
            }))}
          />

          <Selector
            etiqueta="Rol"
            value={datosFormulario.rol}
            onChange={(e) => manejarCambioEntrada('rol', e.target.value as 'docente' | 'estudiante')}
            error={errores.rol}
            opciones={[
              { valor: 'estudiante', etiqueta: 'Estudiante' },
              { valor: 'docente', etiqueta: 'Docente' }
            ]}
          />

          {/* Campo de código personalizado */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Código de Usuario (5 dígitos)
            </label>
            <div className="flex space-x-2">
              <Entrada
                type="text"
                value={codigoPersonalizado}
                onChange={(e) => manejarCambioCodigo(e.target.value)}
                placeholder="12345"
                maxLength={5}
                className="flex-1"
                error={errorCodigo}
              />
              <Boton
                type="button"
                variante="secundario"
                onClick={generarCodigoAutomatico}
                className="whitespace-nowrap"
              >
                Generar
              </Boton>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              {codigoPersonalizado && (
                <>
                  {verificarCodigoDisponible(codigoPersonalizado) ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Código disponible
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <XCircle className="h-4 w-4 mr-1" />
                      Código en uso
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {exito && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <UserPlus className="h-5 w-5 mr-2" />
                {exito}
              </div>
              <p className="text-sm mt-1">La contraseña temporal es: temporal123</p>
            </div>
          )}

          <Boton
            type="submit"
            className="w-full"
            disabled={estaCargando}
            tamaño="lg"
          >
            {estaCargando ? 'Registrando...' : 'Registrar Usuario'}
          </Boton>
        </form>
      </Tarjeta>
    </div>
  );
};