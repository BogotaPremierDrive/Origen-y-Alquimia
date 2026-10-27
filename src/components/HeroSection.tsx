import React from 'react';
import { Sparkles, QrCode, Dumbbell, Zap, Flame, ShieldCheck, HeartPulse } from 'lucide-react';

interface HeroSectionProps {
  onScrollToPlans: () => void;
  onOpenPass: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToPlans, onOpenPass }) => {
  return (
    <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-4 w-80 h-80 bg-[#8C3B2B]/15 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1A1715]/90 border border-[#D4AF37]/35 text-xs font-semibold text-[#F5F2EB] shadow-[0_0_20px_rgba(212,175,55,0.18)] mb-6">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide text-[#F5E4A8]">Experiencia Oficial en Barra Nutrishark</span>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-500/30">
            Pase QR Activo
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F2EB] max-w-4xl mx-auto leading-[1.12]">
          Energía limpia, <span className="gold-gradient-text italic font-serif">vasodilatación</span> y café de especialidad en tu entrenamiento.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 sm:mt-7 text-sm sm:text-lg md:text-xl text-[#D5CCB9] max-w-3xl mx-auto font-normal leading-relaxed">
          Diseñado para atletas en <strong className="text-white">Nutrishark</strong>. Selecciona tu plan mensual (8, 12, 20 o 30 días), personaliza tu origen cafetero o cacao 100% puro con extras funcionales, y valida cada taza con tu <strong className="text-[#D4AF37]">Pase Digital QR</strong>.
        </p>

        {/* Fast Action CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          <button
            onClick={onScrollToPlans}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C59B27] via-[#D4AF37] to-[#C59B27] text-[#0a0908] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5"
          >
            <Dumbbell className="w-4 h-4 text-[#0a0908]" />
            Elegir Plan & Armar mi Pase
          </button>
          
          <button
            onClick={onOpenPass}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#1A1715]/90 hover:bg-[#24201D] text-[#F5F2EB] hover:text-[#D4AF37] font-semibold text-xs sm:text-sm tracking-wider uppercase border border-[#D4AF37]/35 transition-all hover:border-[#D4AF37] flex items-center justify-center gap-2"
          >
            <QrCode className="w-4 h-4 text-[#C59B27]" />
            Ver mi Pase QR Activo
          </button>
        </div>

        {/* Athletic Quick Metric Badges */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-[#1A1715]/70 border border-[#C59B27]/20 text-center flex flex-col items-center">
            <Zap className="w-5 h-5 text-[#D4AF37] mb-1.5" />
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37]">0 Taquicardia</span>
            <span className="text-[11px] text-[#9E978C] uppercase tracking-wider mt-0.5">Teobromina & pH Suave</span>
          </div>
          <div className="p-4 rounded-xl bg-[#1A1715]/70 border border-[#C59B27]/20 text-center flex flex-col items-center">
            <Flame className="w-5 h-5 text-[#D4AF37] mb-1.5" />
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37]">$2.966</span>
            <span className="text-[11px] text-[#9E978C] uppercase tracking-wider mt-0.5">Costo Mínimo por Taza</span>
          </div>
          <div className="p-4 rounded-xl bg-[#1A1715]/70 border border-[#C59B27]/20 text-center flex flex-col items-center">
            <HeartPulse className="w-5 h-5 text-emerald-400 mb-1.5" />
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400">Vasodilatador</span>
            <span className="text-[11px] text-[#9E978C] uppercase tracking-wider mt-0.5">Óxido Nítrico & Enfoque</span>
          </div>
          <div className="p-4 rounded-xl bg-[#1A1715]/70 border border-[#C59B27]/20 text-center flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] mb-1.5" />
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37]">60 / 20 / 20</span>
            <span className="text-[11px] text-[#9E978C] uppercase tracking-wider mt-0.5">Regla Transparente Alianza</span>
          </div>
        </div>

        {/* WhatsApp direct help bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-[#9E978C]">
          <span className="text-[#D4AF37] font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Atención directa al atleta:
          </span>
          <span className="text-[#D5CCB9]">Línea Steven: 301 464 4983</span>
          <span className="text-[#9E978C]">•</span>
          <span className="text-[#D5CCB9]">Línea Barista Nutrishark: 302 319 1311</span>
        </div>

      </div>
    </section>
  );
};
