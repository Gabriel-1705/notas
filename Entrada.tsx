import React from 'react';
import { cn } from '../../utilidades/cn';

interface PropiedadesEntrada extends React.InputHTMLAttributes<HTMLInputElement> {
  etiqueta?: string;
  error?: string;
}

export const Entrada: React.FC<PropiedadesEntrada> = ({
  etiqueta,
  error,
  className,
  ...props
}) => {
  return (
    <div className="mb-4">
      {etiqueta && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {etiqueta}
        </label>
      )}
      <input
        className={cn(
          'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};