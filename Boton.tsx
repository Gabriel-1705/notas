import React from 'react';
import { cn } from '../../utilidades/cn';

interface PropiedadesBoton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primario' | 'secundario' | 'contorno' | 'peligro';
  tamaño?: 'sm' | 'md' | 'lg';
}

export const Boton: React.FC<PropiedadesBoton> = ({
  children,
  variante = 'primario',
  tamaño = 'md',
  className,
  ...props
}) => {
  const clasesBase = 'font-medium rounded-lg transition-all duration-200 focus:ring-4 focus:outline-none';
  
  const variantes = {
    primario: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300 shadow-md hover:shadow-lg',
    secundario: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-300 shadow-md hover:shadow-lg',
    contorno: 'border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-300',
    peligro: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300 shadow-md hover:shadow-lg'
  };

  const tamaños = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={cn(clasesBase, variantes[variante], tamaños[tamaño], className)}
      {...props}
    >
      {children}
    </button>
  );
};