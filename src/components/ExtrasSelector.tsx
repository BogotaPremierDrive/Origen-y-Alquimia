import React from 'react';
import { EXTRAS } from '../data/plans';
import { Sparkles, Dumbbell, Flame, Check, User, Phone, Clock } from 'lucide-react';
import { AthleteProfile } from '../types';

interface ExtrasSelectorProps {
  selectedExtras: string[];
  onToggleExtra: (extraId: string) => void;
  selectedMilk: string;
  onSelectMilk: (milk: string) => void;
  selectedTiming: string;
  onSelectTiming: (timing: string) => void;
  athleteProfile: AthleteProfile;
  onChangeProfile: (profile: Partial<AthleteProfile>) => void;
}

export const ExtrasSelector: React.FC<ExtrasSelectorProps> = ({
  selectedExtras,
  onToggleExtra,
  selectedMilk,
  onSelectMilk,
  selectedTiming,
  onSelectTiming,
  athleteProfile,
  onChangeProfile,
}) => {
  return (
    <section id="extras" className="py-12 sm:py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Paso 3: Personalización & Suplementación
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F2EB]">
            Extras & Protocolo Atlético
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D5CCB9] leading-relaxed">
            Agrega recargos funcionales por taza servida para sincronizar tu nutrición con tu fase de entrenamiento en Nutrishark.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Functional Extras */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#F5F2EB] flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#D4AF37]" />
              Recargos Funcionales por Bebida
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EXTRAS.map(extra => {
                const isSelected = selectedExtras.includes(extra.id);

                return (
                  <div
                    key={extra.id}
                    onClick={() => onToggleExtra(extra.id)}
                    className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#24201D] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                        : 'bg-[#1A1715] border-[#C59B27]/20 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center">
                          {extra.category === 'protein' ? (
                            <Dumbbell className="w-4 h-4" />
                          ) : (
                            <Sparkles className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-[#D4AF37]">
                            +${extra.price.toLocaleString('es-CO')} COP
                          </span>
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            isSelected ? 'bg-[#D4AF37] text-[#0a0908]' : 'border border-[#C59B27]/40 text-transparent'
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </div>
                      </div>

                      <h4 className="font-serif text-base font-bold text-[#F5F2EB]">
                        {extra.name}
                      </h4>
                      <p className="text-xs text-[#D5CCB9] mt-1.5 leading-relaxed">
                        {extra.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#D4AF37]/15">
                      <span className="text-[10px] uppercase font-bold text-[#C59B27] tracking-wider block">
                        Recomendado:
                      </span>
                      <span className="text-[11px] text-[#9E978C]">
                        {extra.recommendedFor}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Milk / Base Selection */}
            <div className="p-5 rounded-2xl bg-[#1A1715] border border-[#C59B27]/25">
              <span className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider block mb-3">
                Base Líquida Preferida (Sin costo adicional):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'Agua Filtrada Fría (Cold)', label: 'Agua Fría / Hielo' },
                  { id: 'Agua Purificada Caliente', label: 'Agua Caliente' },
                  { id: 'Leche Deslactosada Light', label: 'Deslactosada' },
                  { id: 'Bebida de Almendras / Avena', label: 'Almendras / Avena' },
                ].map(base => (
                  <button
                    key={base.id}
                    type="button"
                    onClick={() => onSelectMilk(base.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all text-center border ${
                      selectedMilk === base.id
                        ? 'bg-[#D4AF37] text-[#0a0908] border-[#D4AF37] font-bold shadow'
                        : 'bg-[#24201D] text-[#D5CCB9] border-[#C59B27]/20 hover:border-[#D4AF37]'
                    }`}
                  >
                    {base.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Timing Selection */}
            <div className="p-5 rounded-2xl bg-[#1A1715] border border-[#C59B27]/25">
              <span className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider block mb-3 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C59B27]" />
                Momento de Consumo Recomendado en tu Rutina:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'Pre-Entreno (30 min antes)', label: 'Pre-Entreno', desc: 'Enfoque y vasodilatación' },
                  { id: 'Intra-Entreno (Hidratación)', label: 'Intra-Entreno', desc: 'Electrolitos con Hibiscus' },
                  { id: 'Post-Entreno (Recuperación)', label: 'Post-Entreno', desc: 'Síntesis proteica & Cacao' },
                ].map(timing => (
                  <button
                    key={timing.id}
                    type="button"
                    onClick={() => onSelectTiming(timing.id)}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      selectedTiming === timing.id
                        ? 'bg-[#24201D] border-[#D4AF37] shadow'
                        : 'bg-[#121110] border-[#C59B27]/20 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <span className={`block text-xs font-bold ${selectedTiming === timing.id ? 'text-[#D4AF37]' : 'text-[#F5F2EB]'}`}>
                      {timing.label}
                    </span>
                    <span className="text-[11px] text-[#9E978C] block mt-0.5">
                      {timing.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Athlete Info for Pass */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#1A1715] border-2 border-[#D4AF37]/40 shadow-xl space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30">
                  Credencial Digital
                </span>
                <h3 className="font-serif text-xl font-bold text-[#F5F2EB] mt-2">
                  Datos del Atleta para el Pase QR
                </h3>
                <p className="text-xs text-[#D5CCB9] mt-1">
                  Estos datos se imprimirán digitalmente en tu membresía para identificarte en la barra de Nutrishark.
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D5CCB9] mb-1.5">
                  Nombre y Apellido del Atleta
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#9E978C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={athleteProfile.name}
                    onChange={(e) => onChangeProfile({ name: e.target.value })}
                    placeholder="Ej: David Salazar"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#24201D] border border-[#C59B27]/30 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-[#F5F2EB] text-xs placeholder-[#9E978C]/50 transition-all"
                  />
                </div>
              </div>

              {/* WhatsApp Phone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D5CCB9] mb-1.5">
                  Número de WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#9E978C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={athleteProfile.phone}
                    onChange={(e) => onChangeProfile({ phone: e.target.value })}
                    placeholder="Ej: 300 123 4567"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#24201D] border border-[#C59B27]/30 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-[#F5F2EB] text-xs placeholder-[#9E978C]/50 transition-all"
                  />
                </div>
              </div>

              {/* Training Goal */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D5CCB9] mb-1.5">
                  Objetivo Principal en Nutrishark
                </label>
                <select
                  value={athleteProfile.goal}
                  onChange={(e) => onChangeProfile({ goal: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl bg-[#24201D] border border-[#C59B27]/30 focus:border-[#D4AF37] outline-none text-[#F5F2EB] text-xs transition-all cursor-pointer"
                >
                  <option value="fuerza">Fuerza & Hipertrofia (Masa Muscular)</option>
                  <option value="definicion">Pérdida de Grasa & Definición</option>
                  <option value="rendimiento">Resistencia, Funcional & Crossfit</option>
                </select>
              </div>

              {/* Training Time */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D5CCB9] mb-1.5">
                  Horario habitual de entrenamiento
                </label>
                <input
                  type="text"
                  value={athleteProfile.trainingTime}
                  onChange={(e) => onChangeProfile({ trainingTime: e.target.value })}
                  placeholder="Ej: 06:30 AM o 06:00 PM"
                  className="w-full px-4 py-3 rounded-xl bg-[#24201D] border border-[#C59B27]/30 focus:border-[#D4AF37] outline-none text-[#F5F2EB] text-xs placeholder-[#9E978C]/50 transition-all"
                />
              </div>

              <div className="pt-2">
                <a
                  href="#pase"
                  className="w-full py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#C59B27] text-[#0a0908] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  Ver Mi Pase QR Generado
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
