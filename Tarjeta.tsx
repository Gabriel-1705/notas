import React from 'react';
import { cn } from '../../utilidades/cn';

interface PropiedadesTarjeta {
  children: React.ReactNode;
  className?: string;
  relleno?: boolean;
}

export const Tarjeta: React.FC<PropiedadesTarjeta> = ({
  children,
  className,
  relleno = true
}) => {
  return (
    <div className={cn(
      'bg-white rounded-xl shadow-lg border border-gray-100',
      relleno && 'p-6',
      className
    )}>
      {children}
    </div>
  );
};