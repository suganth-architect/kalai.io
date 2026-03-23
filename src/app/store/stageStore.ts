import { create } from 'zustand';

interface StageState {
  currentStage: number;
  isBooted: boolean;
  sfxTrigger: string | null;
  isTransitioning: boolean;
  isManualOverride: boolean;
  fpsTier: 'high' | 'low';
  isAbsorbing: boolean;
  setCurrentStage: (stage: number) => void;
  setIsBooted: (val: boolean) => void;
  triggerSFX: (name: string) => void;
  triggerAbsorption: () => void;
  setIsTransitioning: (val: boolean) => void;
  setIsManualOverride: (val: boolean) => void;
  setFpsTier: (tier: 'high' | 'low') => void;
}

export const useStageStore = create<StageState>((set) => ({
  currentStage: 1,
  isBooted: false,
  sfxTrigger: null,
  isTransitioning: false,
  isManualOverride: false,
  fpsTier: 'high',
  isAbsorbing: false,
  setCurrentStage: (stage) => set({ currentStage: stage }),
  setIsBooted: (val) => set({ isBooted: val }),
  triggerSFX: (name) => {
    set({ sfxTrigger: name });
    setTimeout(() => set({ sfxTrigger: null }), 100); // Clear immediately for re-triggers
  },
  triggerAbsorption: () => {
    set({ isAbsorbing: true });
    // Releases WebGL back after a rapid 400ms implosion creating an explosive rebound effect
    setTimeout(() => set({ isAbsorbing: false }), 400); 
  },
  setIsTransitioning: (val) => set({ isTransitioning: val }),
  setIsManualOverride: (val) => set({ isManualOverride: val }),
  setFpsTier: (tier) => set({ fpsTier: tier }),
}));
