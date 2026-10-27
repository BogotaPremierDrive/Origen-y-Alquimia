import React, { useState } from 'react';
import { INCENTIVES, TRANSPARENCY_INFO } from '../data/plans';
import { Incentive, PassState } from '../types';
import { Award, Gift, Share2, Check, Users, Sparkles, MessageCircle, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IncentivesSectionProps {
  passState: PassState;
  onAddBonusCups: (cups: number) => void;
}

export const IncentivesSection: React.FC<IncentivesSectionProps> = ({ passState, onAddBonusCups }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [referredFriends, setReferredFriends] = useState(passState.friendInvitesCount || 0);
  const [claimedRewards, setClaimedRewards] = useState<number[]>([]);

  const referralCode = passState.referralCode || 'SHARK-OA89';
  const referralShareText = `¡Hola! Te invito a una taza gratis de cortesía de café de especialidad o cacao 100% puro en la barra de Nutrishark. Usa mi código de invitado: ${referralCode} para reclamarla en tu próximo entrenamiento. ☕🦈`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(referralShareText);
      } else {
        const input = document.createElement('input');
        input.value = referralShareText;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(referralShareText)}`;
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

  const handleSimulateReferral = () => {
    setReferredFriends(prev => prev + 1);
    onAddBonusCups(4);
    try {
      const confettiFn = (confetti as any)?.default || confetti;
      if (typeof confettiFn === 'function') {
        confettiFn({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#10B981', '#D4AF37', '#F5E4A8'],
        });
      }
    } catch {
      // safe fallback
    }
  };

  const handleClaimReward = (target: number) => {
    setClaimedRewards([...claimedRewards, target]);
    try {
      const confettiFn = (confetti as any)?.default || confetti;
      if (typeof confettiFn === 'function') {
        confettiFn({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      }
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="incentivos" className="py-12 sm:py-20 relative scroll-mt-20 bg-[#121110]/60 border-t border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-[#C59B27]" />
            Gamificación & Lealtad en Nutrishark
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F2EB]">
            Incentivos por Constancia & Referidos
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D5CCB9] leading-relaxed">
            Cada taza registrada te acerca a equipamiento barista para tu casa. Además, invita a tus compañeros de gym y ambos ganan tazas gratis.
          </p>
        </div>

        {/* 3 Incentives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {INCENTIVES.map((item: Incentive) => {
            const isUnlocked = passState.consumedCups >= item.cupsTarget;
            const progress = Math.min(100, Math.round((passState.consumedCups / item.cupsTarget) * 100));
            const isClaimed = claimedRewards.includes(item.cupsTarget);

            return (
              <div
                key={item.cupsTarget}
                className={`rounded-2xl p-6 border-2 transition-all duration-300 flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-[#24201D] to-[#1A1715] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                    : 'bg-[#1A1715]/90 border-[#C59B27]/20'
                }`}
              >
                <div>
                  {/* Image banner */}
                  <div className="h-44 w-full rounded-xl overflow-hidden mb-4 bg-[#0a0908] relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'reserva de la granja.jpeg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1715] via-transparent to-black/30"></div>
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#0a0908]/85 text-[#D4AF37] font-mono text-[10px] font-bold border border-[#D4AF37]/30">
                      {item.cupsTarget} Tazas
                    </span>
                    {isUnlocked && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold shadow">
                        ¡DESBLOQUEADO!
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#C59B27]">
                    {item.badge}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#F5F2EB] mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#D5CCB9] mt-2 leading-relaxed">
                    <strong>Premio:</strong> {item.reward}.
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mt-6 pt-4 border-t border-[#D4AF37]/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#9E978C]">Progreso:</span>
                    <span className={isUnlocked ? 'text-emerald-400 font-bold' : 'text-[#D4AF37]'}>
                      {passState.consumedCups} / {item.cupsTarget} tazas ({progress}%)
                    </span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-[#121110] overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isUnlocked ? 'bg-emerald-500' : 'bg-[#D4AF37]'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  {isUnlocked ? (
                    <button
                      type="button"
                      onClick={() => handleClaimReward(item.cupsTarget)}
                      disabled={isClaimed}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all mt-3 ${
                        isClaimed
                          ? 'bg-[#2D2723] text-[#9E978C] cursor-default'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg animate-pulse'
                      }`}
                    >
                      {isClaimed ? '✓ Reclamado en Barra' : '¡Reclamar Premio en Barra!'}
                    </button>
                  ) : (
                    <span className="text-[11px] text-[#9E978C] block text-center mt-2 italic">
                      Faltan {item.cupsTarget - passState.consumedCups} tazas para desbloquear
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION: PROGRAMA DE REFERIDOS GYM PARTNER */}
        <div id="referidos" className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#1A1715] via-[#24201D] to-[#121110] border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold uppercase">
                <Users className="w-3.5 h-3.5" />
                Programa Partner de Entrenamiento
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F2EB]">
                Invita a tu Compañero de Gym y Reciban <span className="text-emerald-400">+4 Tazas Extras</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#121110]/80 border border-emerald-500/30">
                  <span className="font-bold text-emerald-400 block mb-1">🎁 Para tu Amigo:</span>
                  <p className="text-[#D5CCB9]">
                    Prueba <strong>1 taza de cortesía gratis</strong> en barra Nutrishark sin ningún compromiso al presentar tu código.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#121110]/80 border border-emerald-500/30">
                  <span className="font-bold text-[#D4AF37] block mb-1">🔥 Si se Suscribe a Cualquier Plan:</span>
                  <p className="text-[#D5CCB9]">
                    <strong>¡Los DOS reciben +4 tazas extras</strong> de café de especialidad añadidas a su membresía! (Costo ~$8.000 COP asumido por Origen & Alquimia).
                  </p>
                </div>
              </div>

              {/* Code Box */}
              <div className="p-3 rounded-xl bg-[#0a0908] border border-[#C59B27]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#9E978C]">Tu Código de Partner:</span>
                  <span className="font-mono text-base font-extrabold text-[#D4AF37] px-2 py-0.5 rounded bg-[#1A1715] border border-[#D4AF37]/40">
                    {referralCode}
                  </span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg bg-[#24201D] hover:bg-[#C59B27] text-[#D5CCB9] hover:text-[#0a0908] text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedLink ? 'Copiado' : 'Copiar Texto'}
                  </button>
                  <button
                    onClick={handleShareWhatsApp}
                    className="flex-1 sm:flex-initial px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Enviar WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Referral Counter & Live Simulation Card */}
            <div className="w-full lg:w-80 p-5 rounded-2xl bg-[#121110]/90 border border-emerald-500/40 text-center flex flex-col items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#9E978C] tracking-wider block font-bold">
                  Compañeros Referidos
                </span>
                <span className="font-serif text-4xl sm:text-5xl font-extrabold text-emerald-400 my-1 block">
                  {referredFriends}
                </span>
                <span className="text-xs text-[#D5CCB9]">
                  +{referredFriends * 4} Tazas ganadas por referidos
                </span>
              </div>

              <button
                type="button"
                onClick={handleSimulateReferral}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                Simular Amigo Suscrito (+4 Tazas)
              </button>
              <span className="text-[10px] text-[#9E978C]">
                Agrega 4 tazas inmediatamente al saldo de tu pase QR.
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
