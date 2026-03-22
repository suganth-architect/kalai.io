import { create } from 'zustand';

interface StageState {
  currentStage: number;
  scrollProgress: number;
  setCurrentStage: (stage: number) => void;
  setScrollProgress: (progress: number) => void;
}

export const useStageStore = create<StageState>((set) => ({
  currentStage: 1,
  scrollProgress: 0,
  setCurrentStage: (stage) => set({ currentStage: stage }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
