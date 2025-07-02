
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorBannerProps {
  message: string;
  className?: string;
  onRetry?: () => void;
}

export default function ErrorBanner({ message, className, onRetry }: ErrorBannerProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4 rounded-lg border border-destructive/20 bg-destructive/5',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm text-destructive font-medium">Erro</p>
        <p className="text-sm text-destructive/80">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1 text-xs font-medium text-destructive border border-destructive/20 rounded hover:bg-destructive/10 transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
