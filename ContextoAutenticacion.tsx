import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Usuario } from '../tipos';
import { autenticarUsuario } from '../utilidades/autenticacion';

interface TipoContextoAutenticacion {
  usuarioActual: Usuario | null;
  iniciarSesion: (codigo: string, contraseña: string) => boolean;
  cerrarSesion: () => void;
  estaCargando: boolean;
}

const ContextoAutenticacion = createContext<TipoContextoAutenticacion | undefined>(undefined);

export const useAutenticacion = (): TipoContextoAutenticacion => {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto) {
    throw new Error('useAutenticacion debe ser usado dentro de un ProveedorAutenticacion');
  }
  return contexto;
};

interface PropiedadesProveedorAutenticacion {
  children: ReactNode;
}

export const ProveedorAutenticacion: React.FC<PropiedadesProveedorAutenticacion> = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [estaCargando, setEstaCargando] = useState(false);

  const iniciarSesion = (codigo: string, contraseña: string): boolean => {
    setEstaCargando(true);
    
    const usuario = autenticarUsuario(codigo, contraseña);
    
    setTimeout(() => {
      if (usuario) {
        setUsuarioActual(usuario);
      }
      setEstaCargando(false);
    }, 1000);
    
    return !!usuario;
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
  };

  const valor: TipoContextoAutenticacion = {
    usuarioActual,
    iniciarSesion,
    cerrarSesion,
    estaCargando
  };

  return (
    <ContextoAutenticacion.Provider value={valor}>
      {children}
    </ContextoAutenticacion.Provider>
  );
};