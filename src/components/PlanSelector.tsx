import React, { useState } from 'react';
import { Plan, PlanId } from '../types';
import { PLANS, TRANSPARENCY_INFO } from '../data/plans';
import { CheckCircle2, Dumbbell, Info, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface PlanSelectorProps {
  selectedPlanId: PlanId;
  onSelectPlan: (planId: PlanId) => void;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({ selectedPlanId, onSelectPlan }) => {
  const [showTransparency, setShowTransparency] = useState(false);

  return (
    <section id="planes" className="py-12 sm:py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-3">
            <Dumbbell className="w-3.5 h-3.5 text-[#C59B27]" />
            Paso 1: Membresías en Barra
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F2EB]">
            Elige tu Plan en Nutrishark
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D5CCB9] leading-relaxed">
            Planes flexibles calculados para acompañar tu frecuencia de entrenamiento semanal. Cada taza es preparada al instante por nuestro barista en barra.
          </p>
        </div>

        {/* 4 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan: Plan) => {
            const isSelected = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => onSelectPlan(plan.id)}
                className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border-2 ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#24201D] to-[#1A1715] border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)] scale-[1.02]'
                    : 'bg-[#1A1715]/80 border-[#C59B27]/20 hover:border-[#D4AF37]/50 hover:bg-[#24201D]/90'
                }`}
              >
                {/* Popular or Best Value Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-md whitespace-nowrap ${
                      plan.isBestValue 
                        ? 'bg-emerald-600 text-white' 
                        : plan.isPopular
                        ? 'bg-[#D4AF37] text-[#0a0908]'
                        : 'bg-[#2D2723] text-[#D5CCB9] border border-[#C59B27]/30'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Top info */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37]">
                      {plan.days} Días / {plan.cups} Tazas
                    </span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? 'bg-[#D4AF37] text-[#0a0908]' : 'border border-[#C59B27]/40 text-transparent'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 fill-current" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#F5F2EB] mt-1">
                    Plan {plan.name}
                  </h3>
                  <span className="text-xs text-[#9E978C] block mt-0.5">
                    {plan.subtitle}
                  </span>

                  {/* Price */}
                  <div className="mt-5 pb-4 border-b border-[#D4AF37]/15">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-3xl font-extrabold text-[#F5F2EB]">
                        ${plan.price.toLocaleString('es-CO')}
                      </span>
                      <span className="text-xs text-[#D5CCB9] font-medium">COP</span>
                    </div>
                    <span className="text-[11px] text-[#C59B27] font-mono font-semibold block mt-1">
                      ~${plan.costPerCup.toLocaleString('es-CO')} COP por taza servida
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs text-[#D5CCB9] leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Select button */}
                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#C59B27] via-[#D4AF37] to-[#C59B27] text-[#0a0908] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                        : 'bg-[#2D2723] hover:bg-[#C59B27] text-[#F5F2EB] hover:text-[#0a0908] border border-[#C59B27]/30'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        Plan Seleccionado
                      </>
                    ) : (
                      'Seleccionar Este Plan'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparency Banner: 60% Insumo, 20% Gym, 20% Tuyo */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="rounded-2xl bg-[#1A1715]/90 border border-[#D4AF37]/30 p-5 sm:p-6 shadow-xl">
            <div 
              onClick={() => setShowTransparency(!showTransparency)}
              className="flex items-center justify-between cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#F5F2EB] flex items-center gap-2">
                    Transparencia de Costos & Alianza (Regla 60 / 20 / 20)
                    <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded font-sans font-bold">
                      Fórmula Real
                    </span>
                  </h4>
                  <p className="text-xs text-[#9E978C] mt-0.5">
                    Costo promedio servido ≈ $2.000 COP por taza. Haz clic para ver el desglose matemático.
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                aria-label="Ver desglose" 
                className="p-1 rounded-lg text-[#D4AF37] hover:bg-[#24201D]"
              >
                {showTransparency ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>

            {/* Expandable Breakdown */}
            {showTransparency && (
              <div className="mt-5 pt-5 border-t border-[#D4AF37]/15 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#0a0908]/60 border border-[#C59B27]/20">
                    <span className="font-bold text-[#D4AF37] block mb-1">
                      Costo Promedio Insumos por Taza: ≈ $2.000 COP
                    </span>
                    <ul className="text-[#D5CCB9] space-y-1 list-disc list-inside">
                      <li>Café de especialidad: $750 a $1.140 COP</li>
                      <li>Insumos (vaso eco, filtro barista, agua micro-filtrada, leche para cacao): $800 COP</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0a0908]/60 border border-[#C59B27]/20">
                    <span className="font-bold text-[#D4AF37] block mb-1">
                      Distribución de Cada Cuota Pagada:
                    </span>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[#D5CCB9]">60% Insumos y preparación</span>
                        <span className="font-mono font-bold text-white">60%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#D5CCB9]">20% Gimnasio Nutrishark</span>
                        <span className="font-mono font-bold text-emerald-400">20%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#D5CCB9]">20% Origen & Alquimia</span>
                        <span className="font-mono font-bold text-[#D4AF37]">20%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#9E978C] mb-1.5 font-mono">
                    <span>Insumos y Barista (60%)</span>
                    <span>Nutrishark (20%)</span>
                    <span>Origen & Alquimia (20%)</span>
                  </div>
                  <div className="h-3 w-full rounded-full overflow-hidden flex bg-[#0a0908] border border-[#C59B27]/20">
                    <div className="h-full bg-[#C59B27] w-[60%]" title="60% Insumos"></div>
                    <div className="h-full bg-emerald-500 w-[20%]" title="20% Nutrishark"></div>
                    <div className="h-full bg-[#8C3B2B] w-[20%]" title="20% Origen & Alquimia"></div>
                  </div>
                </div>

                <p className="text-[11px] text-[#9E978C] italic">
                  Esta fórmula garantiza la máxima frescura en cada taza, apoya a los campesinos colombianos de las 4 cordilleras y retribuye la infraestructura del gimnasio sin tarifas infladas de intermediarios.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
