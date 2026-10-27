import React, { useState } from 'react';
import { Plan, Origin, ExtraOption, AthleteProfile, PassState } from '../types';
import { MessageCircle, Sparkles, ChevronUp, ChevronDown, Check, Dumbbell, Coffee } from 'lucide-react';
import { CONTACT_LINES } from '../data/plans';

interface StickyBottomBarProps {
  plan: Plan;
  origin: Origin;
  extras: ExtraOption[];
  selectedExtras: string[];
  selectedMilk: string;
  selectedTiming: string;
  athleteProfile: AthleteProfile;
  passState: PassState;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  plan,
  origin,
  extras,
  selectedExtras,
  selectedMilk,
  selectedTiming,
  athleteProfile,
  passState,
}) => {
  const [selectedContactIndex, setSelectedContactIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate total:
  // Base plan price + extras selected
  const activeExtras = extras.filter(e => selectedExtras.includes(e.id));
  const extrasTotal = activeExtras.reduce((sum, e) => sum + e.price, 0);
  const originSurcharge = origin.surcharge || 0;
  const totalPrice = plan.price + extrasTotal + originSurcharge;

  const contact = CONTACT_LINES[selectedContactIndex];

  const handleOpenWhatsApp = () => {
    const extrasList = activeExtras.length > 0 
      ? activeExtras.map(e => `${e.name} (+$${e.price.toLocaleString('es-CO')})`).join(', ')
      : 'Sin extras adicionales';

    const athleteName = athleteProfile.name.trim() || 'Atleta Nutrishark';
    const athletePhone = athleteProfile.phone.trim() || 'No especificado';

    const message = `¡Hola ${contact.name}! ☕🦈
Quiero activar mi Pase de Café & Cacao en Nutrishark:

🏋️ Atleta: ${athleteName}
📱 Teléfono: ${athletePhone}
🎯 Objetivo: ${athleteProfile.goal.toUpperCase()} (${selectedTiming})
📋 Plan Elegido: Plan ${plan.name} (${plan.days} días / ${plan.cups} tazas) - $${plan.price.toLocaleString('es-CO')} COP
☕ Origen / Cacao: ${origin.name} (${origin.region})${originSurcharge > 0 ? ` [Recargo Premium +$${originSurcharge.toLocaleString('es-CO')}]` : ''}
🥛 Base preferida: ${selectedMilk}
✨ Extras: ${extrasList}
💰 Total Membresía: $${totalPrice.toLocaleString('es-CO')} COP
🎫 Código de Pase: ${passState.passId}

¡Quedo atento para validar en la barra de Nutrishark e iniciar mis tazas!`;

    const url = `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`;
    try {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      window.location.href = url;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Expandable summary drawer */}
      {isExpanded && (
        <div className="bg-[#1A1715]/98 border-t border-[#D4AF37]/30 backdrop-blur-xl px-4 py-4 max-w-7xl mx-auto shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pb-3 border-b border-[#D4AF37]/15">
            <div>
              <span className="text-[#9E978C] block uppercase text-[10px] font-bold">Plan Membresía:</span>
              <span className="font-bold text-[#F5F2EB] text-sm">
                Plan {plan.name} ({plan.cups} tazas)
              </span>
              <span className="text-[#D4AF37] block font-mono">
                ${plan.price.toLocaleString('es-CO')} COP
              </span>
            </div>
            <div>
              <span className="text-[#9E978C] block uppercase text-[10px] font-bold">Origen & Base:</span>
              <span className="font-bold text-[#F5F2EB]">
                {origin.name} {originSurcharge > 0 && `(+$${originSurcharge.toLocaleString('es-CO')})`}
              </span>
              <span className="text-[#D5CCB9] block text-[11px]">
                {selectedMilk} • {selectedTiming}
              </span>
            </div>
            <div>
              <span className="text-[#9E978C] block uppercase text-[10px] font-bold">Línea de WhatsApp:</span>
              <div className="flex gap-2 mt-1">
                {CONTACT_LINES.map((c, idx) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedContactIndex(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                      selectedContactIndex === idx
                        ? 'bg-[#D4AF37] text-[#0a0908] border-[#D4AF37]'
                        : 'bg-[#24201D] text-[#D5CCB9] border-[#C59B27]/30'
                    }`}
                  >
                    {c.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className="glass-dark border-t border-[#D4AF37]/35 py-3 px-4 sm:px-6 shadow-[0_-10px_35px_rgba(0,0,0,0.7)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Summary left */}
          <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-[#F5F2EB]">
                    Plan {plan.name} ({plan.cups} Tazas)
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono">
                    {origin.name.split(' ')[0]}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#9E978C]">Total:</span>
                  <span className="font-serif font-extrabold text-base sm:text-lg text-[#D4AF37]">
                    ${totalPrice.toLocaleString('es-CO')} COP
                  </span>
                </div>
              </div>
            </div>

            {/* Toggle Details Chevron */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-[#D4AF37] hover:bg-[#24201D] sm:hidden text-xs flex items-center gap-1"
            >
              <span className="text-[10px] uppercase font-mono">Detalles</span>
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          {/* Right Action: Open WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hidden sm:flex items-center gap-1 text-xs text-[#D5CCB9] hover:text-[#D4AF37] px-2 py-1 rounded"
            >
              <span>{isExpanded ? 'Ocultar' : 'Ver desglose'}</span>
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="flex-1 sm:flex-initial py-3 px-6 sm:px-8 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95 flex items-center justify-center gap-2.5 whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Abrir WhatsApp con mi Plan</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
