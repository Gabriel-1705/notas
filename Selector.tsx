import React from 'react';
import { cn } from '../../utilidades/cn';

interface PropiedadesSelector extends React.SelectHTMLAttributes<HTMLSelectElement> {
  etiqueta?: string;
  error?: string;
  opciones: { valor: string; etiqueta: string }[];
}

export const Selector: React.FC<PropiedadesSelector> = ({
  etiqueta,
  error,
  opciones,
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
      <select
        className={cn(
          'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      >
        <option value="">Seleccionar...</option>
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.etiqueta}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};