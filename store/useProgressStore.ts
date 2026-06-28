import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  known: Record<string, string[]>;
  markKnown: (topicSlug: string, questionId: string) => void;
  unmarkKnown: (topicSlug: string, questionId: string) => void;
  isKnown: (topicSlug: string, questionId: string) => boolean;
  getKnownCount: (topicSlug: string) => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      known: {},

      markKnown: (topicSlug, questionId) =>
        set((state) => {
          const current = state.known[topicSlug] ?? [];
          if (current.includes(questionId)) return state;
          return {
            known: { ...state.known, [topicSlug]: [...current, questionId] },
          };
        }),

      unmarkKnown: (topicSlug, questionId) =>
        set((state) => {
          const current = state.known[topicSlug] ?? [];
          return {
            known: {
              ...state.known,
              [topicSlug]: current.filter((id) => id !== questionId),
            },
          };
        }),

      isKnown: (topicSlug, questionId) => {
        const current = get().known[topicSlug] ?? [];
        return current.includes(questionId);
      },

      getKnownCount: (topicSlug) => {
        return (get().known[topicSlug] ?? []).length;
      },
    }),
    {
      name: 'frontend-interview-prep-progress',
      storage: {
        getItem: (name) => {
          try {
            const raw = localStorage.getItem(name);
            return raw ? JSON.parse(raw) : null;
          } catch {
            localStorage.removeItem(name);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch {
            // quota exceeded or unavailable — silently skip
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch {
            // unavailable — silently skip
          }
        },
      },
    }
  )
);
