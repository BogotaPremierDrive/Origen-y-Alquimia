import React, { useState } from 'react';
import { Coffee, Dumbbell, QrCode, Award, Share2, Menu, X, Sparkles, PhoneCall } from 'lucide-react';
import { PassState } from '../types';

interface NavbarProps {
  passState: PassState;
  onOpenPass: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ passState, onOpenPass }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const remainingCups = Math.max(0, passState.totalCups - passState.consumedCups);

  return (
    <header className="sticky top-0 z-40 w-full glass-dark border-b border-[#D4AF37]/25 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Co-branding: Origen & Alquimia × Nutrishark */}
        <a href="#" className="flex items-center gap-3 group text-left">
          <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#C59B27] via-[#D4AF37] to-[#8C3B2B] shadow-[0_0_20px_rgba(212,175,55,0.25)] flex-shrink-0">
            <img 
              src="logo.jpg" 
              alt="Origen & Alquimia" 
              className="w-full h-full object-cover rounded-full bg-[#121110]" 
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'reserva de la granja.jpeg'; }} 
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0a0908] rounded-full border border-[#D4AF37] flex items-center justify-center text-[10px] font-black text-[#D4AF37]">
              🦈
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif tracking-wider text-base sm:text-lg font-bold text-[#F5F2EB] group-hover:text-[#D4AF37] transition-colors">
                ORIGEN & ALQUIMIA
              </span>
              <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                × NUTRISHARK
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C59B27] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Barra Activa en Gimnasio Nutrishark
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-[#D5CCB9]">
          <a href="#planes" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-2">
            <Dumbbell className="w-3.5 h-3.5 text-[#C59B27]" />
            Planes Gym
          </a>
          <a href="#origenes" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-2">
            <Coffee className="w-3.5 h-3.5 text-[#C59B27]" />
            Orígenes & Cacao
          </a>
          <a href="#extras" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Extras & Proteína
          </a>
          <a href="#pase" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-2">
            <QrCode className="w-3.5 h-3.5 text-[#C59B27]" />
            Mi Pase QR
          </a>
          <a href="#incentivos" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-2">
            <Award className="w-3.5 h-3.5 text-[#C59B27]" />
            Incentivos
          </a>
          <a href="#referidos" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-2 text-emerald-400">
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            Referidos (+4 Tazas)
          </a>
        </nav>

        {/* QR Pass Trigger Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPass}
            className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#1A1715] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#F5F2EB] hover:text-[#D4AF37] shadow-lg transition-all group active:scale-95"
            title="Ver mi pase con QR en Nutrishark"
          >
            <QrCode className="w-4 h-4 text-[#C59B27] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-xs font-bold tracking-wider">Pase QR</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 text-white text-[11px] font-bold flex items-center justify-center shadow">
              {remainingCups} {remainingCups === 1 ? 'taza' : 'tazas'}
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#24201D] text-[#F5F2EB] hover:text-[#D4AF37] border border-[#C59B27]/30"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#D4AF37]/20 bg-[#1A1715]/95 backdrop-blur-xl px-6 py-5 transition-all">
          <div className="flex flex-col gap-4 text-xs font-semibold tracking-wider uppercase">
            <a 
              href="#planes" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-[#E8E1D3] hover:text-[#D4AF37] py-1"
            >
              <Dumbbell className="w-4 h-4 text-[#C59B27]" />
              Planes Gym (8, 12, 20 y 30 días)
            </a>
            <a 
              href="#origenes" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-[#E8E1D3] hover:text-[#D4AF37] py-1"
            >
              <Coffee className="w-4 h-4 text-[#C59B27]" />
              Orígenes Cafeteros & Cacao Samaná
            </a>
            <a 
              href="#extras" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-[#F5E4A8] hover:text-[#D4AF37] py-1"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Extras: Cold Brew Hibiscus & Scoop Proteína
            </a>
            <a 
              href="#pase" 
              onClick={() => { setMobileMenuOpen(false); onOpenPass(); }}
              className="flex items-center gap-3 text-[#E8E1D3] hover:text-[#D4AF37] py-1"
            >
              <QrCode className="w-4 h-4 text-[#C59B27]" />
              Ver Pase QR & Registrar Consumo
            </a>
            <a 
              href="#incentivos" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-[#E8E1D3] hover:text-[#D4AF37] py-1"
            >
              <Award className="w-4 h-4 text-[#C59B27]" />
              Incentivos (20, 60 y 120 Tazas)
            </a>
            <a 
              href="#referidos" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-emerald-400 py-1"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              Programa de Referidos (+4 Tazas Gratis)
            </a>
            <a 
              href="#ciencia" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-[#D5CCB9] py-1"
            >
              <Coffee className="w-4 h-4 text-[#C59B27]" />
              Ciencia: Teobromina y Falso Vino
            </a>
          </div>

          <div className="mt-5 pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs text-[#9E978C]">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#C59B27]" />
              Líneas WhatsApp activas
            </span>
            <span className="text-[#D4AF37] font-bold">Desde $27.000 COP</span>
          </div>
        </div>
      )}
    </header>
  );
};
