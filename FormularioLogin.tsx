import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { Boton } from '../ui/Boton';
import { Entrada } from '../ui/Entrada';
import { Tarjeta } from '../ui/Tarjeta';
import { useAutenticacion } from '../../contextos/ContextoAutenticacion';

export const FormularioLogin: React.FC = () => {
  const { iniciarSesion, estaCargando } = useAutenticacion();
  const [datosFormulario, setDatosFormulario] = useState({
    codigo: '',
    contraseña: ''
  });
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [error, setError] = useState('');

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!datosFormulario.codigo || !datosFormulario.contraseña) {
      setError('Por favor, complete todos los campos');
      return;
    }

    const exito = iniciarSesion(datosFormulario.codigo, datosFormulario.contraseña);
    
    if (!exito) {
      setTimeout(() => {
        setError('Código o contraseña incorrectos');
      }, 1000);
    }
  };

  const manejarCambioEntrada = (campo: string, valor: string) => {
    setDatosFormulario(prev => ({ ...prev, [campo]: valor }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center px-4">
      <Tarjeta className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Instituto Tecnológico</h1>
          <h2 className="text-xl font-semibold text-red-600 mb-2">OMIE</h2>
          <p className="text-gray-600">Sistema de Gestión Académica</p>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-6">
          <div className="relative">
            <Entrada
              type="text"
              etiqueta="Código de Usuario"
              value={datosFormulario.codigo}
              onChange={(e) => manejarCambioEntrada('codigo', e.target.value)}
              placeholder="Ingrese su código de 5 dígitos"
              maxLength={5}
              className="pl-10"
            />
            <User className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <Entrada
              type={mostrarContraseña ? 'text' : 'password'}
              etiqueta="Contraseña"
              value={datosFormulario.contraseña}
              onChange={(e) => manejarCambioEntrada('contraseña', e.target.value)}
              placeholder="Ingrese su contraseña"
              className="pl-10 pr-10"
            />
            <Lock className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
            <button
              type="button"
              onClick={() => setMostrarContraseña(!mostrarContraseña)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {mostrarContraseña ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Boton
            type="submit"
            className="w-full"
            disabled={estaCargando}
            tamaño="lg"
          >
            {estaCargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Boton>
        </form>
      </Tarjeta>
    </div>
  );
};