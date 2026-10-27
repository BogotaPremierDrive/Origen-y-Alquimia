export type PlanId = 'esencial' | 'constante' | 'pro' | 'diario';

export interface Plan {
  id: PlanId;
  name: string;
  days: number;
  cups: number;
  price: number;
  subtitle: string;
  description: string;
  costPerCup: number;
  badge?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  gradient: string;
}

export type OriginCategory = 'base' | 'premium';

export interface Origin {
  id: string;
  name: string;
  region: string;
  altitude?: string;
  variety?: string;
  category: OriginCategory;
  surcharge: number; // 0 for base, 2000 for premium
  flavorNotes: string;
  fitnessBenefit: string;
  image: string;
  tag: string;
}

export interface ExtraOption {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'cold_brew' | 'protein' | 'milk';
  icon: string;
  recommendedFor: string;
}

export interface Incentive {
  cupsTarget: number;
  title: string;
  description: string;
  reward: string;
  icon: string;
  badge: string;
  image: string;
}

export interface AthleteProfile {
  name: string;
  phone: string;
  goal: 'fuerza' | 'definicion' | 'rendimiento';
  trainingTime: string; // e.g. "06:30 AM"
  seatNumber?: string;
}

export interface PassState {
  passId: string;
  athleteName: string;
  planId: PlanId;
  totalCups: number;
  consumedCups: number;
  originId: string;
  selectedExtras: string[];
  expirationDate: string;
  qrPayload: string;
  referralCode: string;
  friendInvitesCount: number;
}
