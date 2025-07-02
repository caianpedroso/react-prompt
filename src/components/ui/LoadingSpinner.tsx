
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({ className, size = 'medium' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-primary/20 border-t-primary',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Carregando..."
    >
      <span className="sr-only">Carregando...</span>
    </div>
  );
}
