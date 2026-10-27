import React, { useState, useEffect } from 'react';
import { PlanId, AthleteProfile, PassState } from './types';
import { PLANS, ORIGINS, EXTRAS } from './data/plans';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PlanSelector } from './components/PlanSelector';
import { OriginSelector } from './components/OriginSelector';
import { ExtrasSelector } from './components/ExtrasSelector';
import { DigitalPass } from './components/DigitalPass';
import { IncentivesSection } from './components/IncentivesSection';
import { ScienceAndCacao } from './components/ScienceAndCacao';
import { TakeHomeShop } from './components/TakeHomeShop';
import { StickyBottomBar } from './components/StickyBottomBar';
import { Footer } from './components/Footer';

export function App() {
  // Plan Selection
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>('constante');

  // Origin Selection
  const [selectedOriginId, setSelectedOriginId] = useState<string>('pico-diamante');

  // Extras Selection
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['cold_brew_infusion']);
  const [selectedMilk, setSelectedMilk] = useState<string>('Agua Filtrada Fría (Cold)');
  const [selectedTiming, setSelectedTiming] = useState<string>('Pre-Entreno (30 min antes)');

  // Athlete Profile
  const [athleteProfile, setAthleteProfile] = useState<AthleteProfile>({
    name: 'David Salazar',
    phone: '301 464 4983',
    goal: 'fuerza',
    trainingTime: '06:30 AM',
  });

  // Calculate expiration date (30 days from now)
  const expirationDateStr = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Digital Pass State
  const initialPlan = PLANS.find(p => p.id === 'constante') || PLANS[1];
  const [passState, setPassState] = useState<PassState>({
    passId: 'NS-OA-4921',
    athleteName: 'David Salazar',
    planId: 'constante',
    totalCups: initialPlan.cups,
    consumedCups: 2,
    originId: 'pico-diamante',
    selectedExtras: ['cold_brew_infusion'],
    expirationDate: expirationDateStr,
    qrPayload: 'NS-OA-4921',
    referralCode: 'SHARK-DAV2026',
    friendInvitesCount: 1,
  });

  // Sync pass state when plan changes
  const handleSelectPlan = (planId: PlanId) => {
    setSelectedPlanId(planId);
    const plan = PLANS.find(p => p.id === planId) || PLANS[0];
    setPassState(prev => ({
      ...prev,
      planId: planId,
      totalCups: plan.cups,
      // keep consumed cups bounded
      consumedCups: Math.min(prev.consumedCups, plan.cups - 1),
    }));
  };

  // Sync pass state when origin changes
  const handleSelectOrigin = (originId: string) => {
    setSelectedOriginId(originId);
    setPassState(prev => ({
      ...prev,
      originId: originId,
    }));
  };

  // Toggle extra
  const handleToggleExtra = (extraId: string) => {
    setSelectedExtras(prev => {
      const next = prev.includes(extraId) ? prev.filter(id => id !== extraId) : [...prev, extraId];
      setPassState(p => ({ ...p, selectedExtras: next }));
      return next;
    });
  };

  // Update athlete profile
  const handleUpdateProfile = (partial: Partial<AthleteProfile>) => {
    const next = { ...athleteProfile, ...partial };
    setAthleteProfile(next);
    setPassState(prev => ({
      ...prev,
      athleteName: next.name,
      referralCode: `SHARK-${(next.name.slice(0, 3) || 'ATH').toUpperCase()}2026`,
    }));
  };

  // Barista cup consumption check-in
  const handleConsumeCup = () => {
    setPassState(prev => {
      if (prev.consumedCups >= prev.totalCups) return prev;
      return {
        ...prev,
        consumedCups: prev.consumedCups + 1,
      };
    });
  };

  // Reset pass cups
  const handleResetPass = () => {
    const currentPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[0];
    setPassState(prev => ({
      ...prev,
      totalCups: currentPlan.cups,
      consumedCups: 0,
    }));
  };

  // Add bonus cups from referral
  const handleAddBonusCups = (bonus: number) => {
    setPassState(prev => ({
      ...prev,
      totalCups: prev.totalCups + bonus,
      friendInvitesCount: (prev.friendInvitesCount || 0) + 1,
    }));
  };

  const handleScrollToPlans = () => {
    const el = document.getElementById('planes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenPass = () => {
    const el = document.getElementById('pase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activePlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[0];
  const activeOrigin = ORIGINS.find(o => o.id === selectedOriginId) || ORIGINS[0];

  return (
    <div className="bg-speakeasy-texture min-h-screen text-[#F5F2EB] flex flex-col selection:bg-[#C59B27] selection:text-[#0a0908]">
      {/* Sticky Header */}
      <Navbar passState={passState} onOpenPass={handleOpenPass} />

      {/* Main Content */}
      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <HeroSection onScrollToPlans={handleScrollToPlans} onOpenPass={handleOpenPass} />

        {/* Step 1: Plans */}
        <PlanSelector selectedPlanId={selectedPlanId} onSelectPlan={handleSelectPlan} />

        {/* Step 2: Origins & Pure Cacao */}
        <OriginSelector selectedOriginId={selectedOriginId} onSelectOrigin={handleSelectOrigin} />

        {/* Step 3: Extras, Protein & Protocol */}
        <ExtrasSelector
          selectedExtras={selectedExtras}
          onToggleExtra={handleToggleExtra}
          selectedMilk={selectedMilk}
          onSelectMilk={setSelectedMilk}
          selectedTiming={selectedTiming}
          onSelectTiming={setSelectedTiming}
          athleteProfile={athleteProfile}
          onChangeProfile={handleUpdateProfile}
        />

        {/* Digital QR Pass */}
        <DigitalPass
          passState={passState}
          onConsumeCup={handleConsumeCup}
          onResetPass={handleResetPass}
          selectedTiming={selectedTiming}
          selectedMilk={selectedMilk}
        />

        {/* Incentives & Referral Program */}
        <IncentivesSection
          passState={passState}
          onAddBonusCups={handleAddBonusCups}
        />

        {/* Science, Teobromina & Cacao Dossier */}
        <ScienceAndCacao />

        {/* Take Home Shop */}
        <TakeHomeShop />
      </main>

      {/* Sticky Bottom Bar */}
      <StickyBottomBar
        plan={activePlan}
        origin={activeOrigin}
        extras={EXTRAS}
        selectedExtras={selectedExtras}
        selectedMilk={selectedMilk}
        selectedTiming={selectedTiming}
        athleteProfile={athleteProfile}
        passState={passState}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
export default App;
