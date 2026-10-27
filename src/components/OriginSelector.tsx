import React, { useState } from 'react';
import { ORIGINS } from '../data/plans';
import { Origin } from '../types';
import { Coffee, Mountain, Zap, Sparkles, Check, Flame } from 'lucide-react';

interface OriginSelectorProps {
  selectedOriginId: string;
  onSelectOrigin: (originId: string) => void;
}

export const OriginSelector: React.FC<OriginSelectorProps> = ({ selectedOriginId, onSelectOrigin }) => {
  const [filter, setFilter] = useState<'all' | 'base' | 'premium' | 'cacao'>('all');

  const filteredOrigins = ORIGINS.filter(o => {
    if (filter === 'base') return o.category === 'base' && !o.id.includes('cacao');
    if (filter === 'premium') return o.category === 'premium';
    if (filter === 'cacao') return o.id.includes('cacao');
    return true;
  });

  return (
    <section id="origenes" className="py-12 sm:py-20 relative scroll-mt-20 bg-[#121110]/50 border-t border-b border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-3">
            <Coffee className="w-3.5 h-3.5 text-[#C59B27]" />
            Paso 2: Perfil Botánico & Origen
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F2EB]">
            Elige tu Origen o Cacao Ancestral
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D5CCB9] leading-relaxed">
            Grano fresco de cordillera o cacao 100% puro para potenciar tu entrenamiento. Incluye 5 orígenes base sin costo extra, o asciende a micro-lotes exclusivos (+ $2.000).
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                filter === 'all'
                  ? 'bg-[#D4AF37] text-[#0a0908] shadow-md'
                  : 'bg-[#1A1715] text-[#D5CCB9] hover:text-[#D4AF37] border border-[#C59B27]/25'
              }`}
            >
              Todos ({ORIGINS.length})
            </button>
            <button
              onClick={() => setFilter('base')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                filter === 'base'
                  ? 'bg-[#D4AF37] text-[#0a0908] shadow-md'
                  : 'bg-[#1A1715] text-[#D5CCB9] hover:text-[#D4AF37] border border-[#C59B27]/25'
              }`}
            >
              Base Incluidos (4 Cafés)
            </button>
            <button
              onClick={() => setFilter('premium')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                filter === 'premium'
                  ? 'bg-[#D4AF37] text-[#0a0908] shadow-md'
                  : 'bg-[#1A1715] text-[#D5CCB9] hover:text-[#D4AF37] border border-[#C59B27]/25'
              }`}
            >
              Selección Premium (+ $2.000)
            </button>
            <button
              onClick={() => setFilter('cacao')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                filter === 'cacao'
                  ? 'bg-[#8C3B2B] text-white shadow-md'
                  : 'bg-[#1A1715] text-[#D5CCB9] hover:text-[#D4AF37] border border-[#C59B27]/25'
              }`}
            >
              Cacao Puro Samaná (Teobromina)
            </button>
          </div>
        </div>

        {/* Origins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredOrigins.map((origin: Origin) => {
            const isSelected = selectedOriginId === origin.id;
            const isPremium = origin.category === 'premium';
            const isCacao = origin.id.includes('cacao');

            return (
              <div
                key={origin.id}
                onClick={() => onSelectOrigin(origin.id)}
                className={`rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer border-2 group ${
                  isSelected
                    ? 'bg-[#24201D] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)] scale-[1.01]'
                    : 'bg-[#1A1715] border-[#C59B27]/20 hover:border-[#D4AF37]/50 hover:bg-[#24201D]/80'
                }`}
              >
                {/* Image & Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-[#0a0908]">
                  <img
                    src={origin.image}
                    alt={origin.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'reserva de la granja.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1715] via-transparent to-black/40"></div>

                  {/* Category pill */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isPremium
                        ? 'bg-amber-500/90 text-[#0a0908] border border-amber-300'
                        : isCacao
                        ? 'bg-[#8C3B2B] text-[#F5F2EB] border border-[#B25340]'
                        : 'bg-[#121110]/80 text-[#D4AF37] border border-[#D4AF37]/40'
                    }`}>
                      {origin.tag}
                    </span>
                  </div>

                  {/* Radio check status */}
                  <div className="absolute top-3 right-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? 'bg-[#D4AF37] text-[#0a0908] shadow-lg' : 'bg-[#121110]/70 text-transparent border border-white/20'
                    }`}>
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>

                  {/* Altitude / Region bottom bar */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#F5F2EB]">
                    {origin.altitude && (
                      <span className="flex items-center gap-1 font-semibold text-[#D4AF37] bg-[#0a0908]/75 px-2 py-0.5 rounded backdrop-blur-sm">
                        <Mountain className="w-3.5 h-3.5" /> {origin.altitude}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded bg-[#0a0908]/75 text-[11px] text-[#D5CCB9] backdrop-blur-sm">
                      {origin.variety}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-xl font-bold text-[#F5F2EB] group-hover:text-[#D4AF37] transition-colors">
                        {origin.name}
                      </h3>
                      {origin.surcharge > 0 && (
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 whitespace-nowrap">
                          +${origin.surcharge.toLocaleString('es-CO')}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#9E978C] block mt-0.5">
                      {origin.region}
                    </span>

                    {/* Sensory Notes */}
                    <div className="mt-3.5 p-3 rounded-xl bg-[#121110]/60 border border-[#C59B27]/15">
                      <span className="text-[10px] uppercase font-bold text-[#C59B27] tracking-wider block mb-0.5">
                        Notas de Cata:
                      </span>
                      <p className="text-xs text-[#E8E1D3] leading-relaxed">
                        {origin.flavorNotes}
                      </p>
                    </div>

                    {/* Athletic Performance Benefit */}
                    <div className="mt-2.5 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-start gap-2">
                      <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                          Beneficio Atlético en Nutrishark:
                        </span>
                        <p className="text-xs text-[#D5CCB9] leading-relaxed">
                          {origin.fitnessBenefit}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Select button */}
                  <div className="mt-5 pt-2">
                    <button
                      type="button"
                      className={`w-full py-2 px-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#D4AF37] text-[#0a0908]'
                          : 'bg-[#24201D] text-[#D5CCB9] hover:bg-[#C59B27] hover:text-[#0a0908] border border-[#C59B27]/30'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4" />
                          Origen Activo en mi Pase
                        </>
                      ) : (
                        'Elegir este Origen'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
