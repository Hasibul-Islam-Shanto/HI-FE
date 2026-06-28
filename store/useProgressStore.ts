import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const PERSIST_VERSION = 1;

interface ProgressState {
  known: Record<string, string[]>;
  markKnown: (topicSlug: string, questionId: string) => void;
  unmarkKnown: (topicSlug: string, questionId: string) => void;
  isKnown: (topicSlug: string, questionId: string) => boolean;
  getKnownCount: (topicSlug: string) => number;
  markAllKnown: (topicSlug: string, questionIds: string[]) => void;
  importProgress: (known: Record<string, string[]>) => void;
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

      markAllKnown: (topicSlug, questionIds) =>
        set((state) => {
          const current = new Set(state.known[topicSlug] ?? []);
          questionIds.forEach((id) => current.add(id));
          return {
            known: { ...state.known, [topicSlug]: Array.from(current) },
          };
        }),

      importProgress: (known) =>
        set(() => ({
          known: Object.fromEntries(
            Object.entries(known).map(([slug, ids]) => [
              slug,
              Array.isArray(ids) ? [...new Set(ids)] : [],
            ])
          ),
        })),
    }),
    {
      name: 'frontend-interview-prep-progress',
      version: PERSIST_VERSION,
      partialize: (state) => ({ known: state.known }),
      migrate: (persisted) => {
        const state = persisted as { known?: Record<string, string[]> };
        return { known: state.known ?? {} };
      },
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
          } catch {}
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch {}
        },
      },
    }
  )
);

export function useKnownCount(topicSlug: string): number {
  return useProgressStore((s) => s.getKnownCount(topicSlug));
}
