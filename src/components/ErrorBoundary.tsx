import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#121110] text-[#F5F2EB] flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#1A1715] border-2 border-[#D4AF37]/50 text-center shadow-2xl space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#F5F2EB]">
              Origen & Alquimia × Nutrishark
            </h2>
            <p className="text-xs text-[#D5CCB9] leading-relaxed">
              La experiencia encontró una interrupción. Puedes recargar para continuar con tu membresía.
            </p>
            {this.state.error?.message && (
              <pre className="p-3 rounded-xl bg-[#0a0908] text-[11px] text-amber-300/80 font-mono text-left overflow-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReload}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#D4AF37] text-[#0a0908] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Recargar Experiencia
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
