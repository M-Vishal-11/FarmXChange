import { create } from "zustand";

/* ========================= */
/* Types                     */
/* ========================= */

type SeedItem = {
  seedName: string;
  price: number;
  qnty: number;
};

type SeedCartState = {
  sellers: Record<string, SeedItem[]>;

  actions: {
    addSeed: (
      sellerName: string,
      seedName: string,
      price: number,
      qnty: number,
    ) => void;

    removeSeed: (sellerName: string, seedName: string) => void;

    updateSeedQnty: (
      sellerName: string,
      seedName: string,
      qnty: number,
    ) => void;

    clearSeedCart: () => void;
  };
};

/* ========================= */
/* Store                     */
/* ========================= */

export const useSeedCart = create<SeedCartState>((set) => ({
  sellers: {},

  actions: {
    // ✅ ADD SEED
    addSeed: (sellerName, seedName, price, qnty) =>
      set((state) => {
        const sellerSeeds = state.sellers[sellerName] ?? [];

        const existingIndex = sellerSeeds.findIndex(
          (s) => s.seedName === seedName,
        );

        const updatedSeeds =
          existingIndex !== -1
            ? sellerSeeds.map((s, i) =>
                i === existingIndex ? { ...s, qnty: s.qnty + qnty } : s,
              )
            : [...sellerSeeds, { seedName, price, qnty }];

        return {
          sellers: {
            ...state.sellers,
            [sellerName]: updatedSeeds,
          },
        };
      }),

    // ✅ REMOVE SEED
    removeSeed: (sellerName, seedName) =>
      set((state) => {
        const sellerSeeds = state.sellers[sellerName];
        if (!sellerSeeds) return state;

        const updatedSeeds = sellerSeeds.filter((s) => s.seedName !== seedName);

        // remove seller bucket if empty
        if (updatedSeeds.length === 0) {
          const { [sellerName]: _, ...rest } = state.sellers;
          return { sellers: rest };
        }

        return {
          sellers: {
            ...state.sellers,
            [sellerName]: updatedSeeds,
          },
        };
      }),

    // ✅ UPDATE QUANTITY
    updateSeedQnty: (sellerName, seedName, qnty) =>
      set((state) => {
        const sellerSeeds = state.sellers[sellerName];
        if (!sellerSeeds) return state;

        return {
          sellers: {
            ...state.sellers,
            [sellerName]: sellerSeeds.map((s) =>
              s.seedName === seedName ? { ...s, qnty } : s,
            ),
          },
        };
      }),

    // ✅ CLEAR CART
    clearSeedCart: () =>
      set(() => ({
        sellers: {},
      })),
  },
}));

/* ========================= */
/* Selectors                 */
/* ========================= */

export const useSeedSellers = () => useSeedCart((s) => s.sellers);

export const useAddSeed = () => useSeedCart((s) => s.actions.addSeed);

export const useUpdateSeedQnty = () =>
  useSeedCart((s) => s.actions.updateSeedQnty);

export const useRemoveSeed = () => useSeedCart((s) => s.actions.removeSeed);

export const useClearSeedCart = () =>
  useSeedCart((s) => s.actions.clearSeedCart);
