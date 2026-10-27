import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { PassState, Plan, Origin } from '../types';
import { PLANS, ORIGINS } from '../data/plans';
import { QrCode, CheckCircle, Flame, Sparkles, RefreshCw, Trophy, Share2, Check } from 'lucide-react';

interface DigitalPassProps {
  passState: PassState;
  onConsumeCup: () => void;
  onResetPass: () => void;
  selectedTiming: string;
  selectedMilk: string;
}

export const DigitalPass: React.FC<DigitalPassProps> = ({
  passState,
  onConsumeCup,
  onResetPass,
  selectedTiming,
  selectedMilk,
}) => {
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [lastCheckinTime, setLastCheckinTime] = useState<string | null>(null);

  const plan = PLANS.find(p => p.id === passState.planId) || PLANS[1];
  const origin = ORIGINS.find(o => o.id === passState.originId) || ORIGINS[0];
  const remainingCups = Math.max(0, passState.totalCups - passState.consumedCups);
  const progressPercent = Math.min(100, Math.round((passState.consumedCups / passState.totalCups) * 100));

  // Generate QR Code onto canvas safely
  useEffect(() => {
    if (!qrCanvasRef.current) return;

    try {
      const qrData = JSON.stringify({
        app: 'Origen & Alquimia × Nutrishark',
        passId: passState.passId,
        athlete: passState.athleteName || 'Atleta Nutrishark',
        plan: plan.name,
        totalCups: passState.totalCups,
        remainingCups: remainingCups,
        consumed: passState.consumedCups,
        origin: origin.name,
        validUntil: passState.expirationDate,
      });

      const toCanvasFn = typeof (QRCode as any)?.toCanvas === 'function' 
        ? (QRCode as any).toCanvas 
        : typeof (QRCode as any)?.default?.toCanvas === 'function'
        ? (QRCode as any).default.toCanvas
        : null;

      if (toCanvasFn) {
        toCanvasFn(qrCanvasRef.current, qrData, {
          width: 180,
          margin: 1,
          color: {
            dark: '#121110',
            light: '#F5E4A8',
          },
        }, (error: any) => {
          if (error) console.warn('QR Code generation notice:', error);
        });
      }
    } catch (err) {
      console.warn('QR Code generation notice:', err);
    }
  }, [passState, plan, origin, remainingCups]);

  const handleBaristaConsume = () => {
    if (remainingCups <= 0) return;

    // Trigger confetti safely
    try {
      const confettiFn = (confetti as any)?.default || confetti;
      if (typeof confettiFn === 'function') {
        confettiFn({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#D4AF37', '#C59B27', '#10B981', '#F5E4A8'],
        });
      }
    } catch {
      // safe fallback
    }

    const now = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    setLastCheckinTime(now);
    onConsumeCup();
  };

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(passState.passId);
      } else {
        const input = document.createElement('input');
        input.value = passState.passId;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="pase" className="py-12 sm:py-20 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            Membresía Digital Activa
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F2EB]">
            Tu Pase Nutrishark Coffee & Cacao
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D5CCB9] max-w-xl mx-auto leading-relaxed">
            Presenta este código QR en la barra para que el barista escanee tu pase y te sirva tu taza al instante sin filas ni pagos en efectivo.
          </p>
        </div>

        {/* The VIP Member Pass Graphic Card */}
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-9 bg-gradient-to-br from-[#1A1715] via-[#24201D] to-[#121110] border-2 border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Subtle metallic texture and glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#8C3B2B]/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Pass Bar: Co-Branding & Member Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#D4AF37]/25 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#C59B27] to-[#D4AF37] flex-shrink-0">
                <img 
                  src="logo.jpg" 
                  alt="Origen & Alquimia" 
                  className="w-full h-full object-cover rounded-full" 
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'reserva de la granja.jpeg'; }} 
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block font-bold">
                  Pase Oficial de Rendimiento
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F2EB]">
                  ORIGEN & ALQUIMIA <span className="text-[#D4AF37] font-sans">×</span> NUTRISHARK
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-mono font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                SOCIO ACTIVO
              </span>
              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1 rounded-lg bg-[#2D2723] hover:bg-[#C59B27] hover:text-[#0a0908] text-[#D5CCB9] border border-[#C59B27]/30 text-[11px] font-mono transition-all flex items-center gap-1"
                title="Copiar código de pase"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                {passState.passId}
              </button>
            </div>
          </div>

          {/* Center Content: QR Frame + Athlete Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-6 items-center relative z-10">
            
            {/* QR Scanner Display */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="p-3.5 rounded-2xl bg-[#F5E4A8] shadow-[0_0_25px_rgba(212,175,55,0.3)] border-4 border-[#C59B27] relative group">
                {/* Scanner corners */}
                <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#121110]"></div>
                <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#121110]"></div>
                <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#121110]"></div>
                <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#121110]"></div>

                <canvas ref={qrCanvasRef} className="block rounded-lg"></canvas>
              </div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] mt-3 font-semibold">
                Escanear en Barra Nutrishark
              </span>
            </div>

            {/* Athlete & Plan Status Details */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#9E978C] tracking-wider block">
                  Atleta Titular
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#F5F2EB] block">
                  {passState.athleteName || 'Atleta de Especialidad'}
                </span>
                <span className="text-xs text-[#D4AF37] font-mono">
                  Membresía Plan {plan.name} ({plan.days} Días / {plan.cups} Tazas)
                </span>
              </div>

              {/* Coffee and Extras summary on pass */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#121110]/70 border border-[#C59B27]/20 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-[#9E978C] block font-bold">Origen Preferido:</span>
                  <span className="font-bold text-[#F5F2EB] block truncate">{origin.name}</span>
                  <span className="text-[10px] text-[#C59B27]">{origin.region}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#9E978C] block font-bold">Protocolo / Base:</span>
                  <span className="font-bold text-[#F5F2EB] block truncate">{selectedMilk}</span>
                  <span className="text-[10px] text-emerald-400">{selectedTiming}</span>
                </div>
              </div>

              {/* Remaining Cups Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F5F2EB] flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#D4AF37]" />
                    Saldo en Barra:
                  </span>
                  <span className="font-mono font-bold text-sm text-[#D4AF37]">
                    {remainingCups} de {passState.totalCups} Tazas Disponibles
                  </span>
                </div>

                <div className="h-3.5 w-full rounded-full overflow-hidden bg-[#121110] border border-[#C59B27]/30 p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#C59B27] via-[#D4AF37] to-emerald-400 transition-all duration-500"
                    style={{ width: `${100 - progressPercent}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#9E978C]">
                  <span>Consumidas: {passState.consumedCups} tazas ({progressPercent}%)</span>
                  <span>Vence: {passState.expirationDate}</span>
                </div>
              </div>

              {lastCheckinTime && (
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>¡Taza servida hoy a las <strong>{lastCheckinTime}</strong> en barra Nutrishark!</span>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Controls: Barista Check-in Simulation */}
          <div className="pt-6 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="text-xs text-[#9E978C]">
              <span>💡 Modo Interactivo: Simula el consumo en la barra del gym al entrenar.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleBaristaConsume}
                disabled={remainingCups <= 0}
                className={`flex-1 sm:flex-initial py-3 px-6 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg ${
                  remainingCups > 0
                    ? 'bg-gradient-to-r from-[#C59B27] via-[#D4AF37] to-[#C59B27] text-[#0a0908] hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-[#2D2723] text-[#9E978C] cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                {remainingCups > 0 ? 'Registrar Consumo de Hoy en Barra' : 'Pase Agotado (Renovar)'}
              </button>

              <button
                type="button"
                onClick={onResetPass}
                className="p-3 rounded-xl bg-[#24201D] hover:bg-[#2D2723] text-[#D5CCB9] border border-[#C59B27]/30 transition-all"
                title="Recargar / Reiniciar saldo del pase"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Next reward notification below pass */}
        <div className="mt-6 p-4 rounded-2xl bg-[#1A1715]/70 border border-[#D4AF37]/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-[#F5F2EB] block">
                {passState.consumedCups < 20
                  ? `Te faltan ${20 - passState.consumedCups} tazas para ganar tu Pack 125g de Café`
                  : passState.consumedCups < 60
                  ? `Te faltan ${60 - passState.consumedCups} tazas para ganar tu Termo Inox Nutrishark`
                  : `Te faltan ${120 - passState.consumedCups} tazas para tu Método Personal de Extracción`}
              </span>
              <span className="text-[#9E978C]">
                Progreso acumulado: {passState.consumedCups} tazas servidas en Nutrishark.
              </span>
            </div>
          </div>
          <a
            href="#incentivos"
            className="text-xs text-[#D4AF37] font-bold hover:underline whitespace-nowrap"
          >
            Ver Premios &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};
