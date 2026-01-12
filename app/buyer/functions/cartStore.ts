import { create } from "zustand";

type productProps = {
  productName: string;
  price: number;
  qnty: number;
};

type cartProps = {
  farmers: Record<string, productProps[]>;
  actions: {
    addItem: (
      farmerName: string,
      productName: string,
      price: number,
      qnty: number
    ) => void;
    removeItem: (farmerName: string, productName: string) => void;
    updateQnty: (farmerName: string, productName: string, qnty: number) => void;
    clearCart: () => void;
  };
};

export const useCart = create<cartProps>((set) => ({
  farmers: {},

  actions: {
    // ✅ ADD ITEM
    addItem: (farmerName, productName, price, qnty) =>
      set((state) => {
        const farmerProducts = state.farmers[farmerName] ?? [];

        const existingIndex = farmerProducts.findIndex(
          (p) => p.productName === productName
        );

        const updatedProducts =
          existingIndex !== -1
            ? farmerProducts.map((p, index) =>
                index === existingIndex ? { ...p, qnty: p.qnty + qnty } : p
              )
            : [...farmerProducts, { productName, price, qnty }];

        return {
          farmers: {
            ...state.farmers,
            [farmerName]: updatedProducts,
          },
        };
      }),

    // ✅ REMOVE ITEM (FIXED)
    removeItem: (farmerName, productName) =>
      set((state) => {
        const farmerProducts = state.farmers[farmerName];
        if (!farmerProducts) return state;

        const updatedProducts = farmerProducts.filter(
          (p) => p.productName !== productName
        );

        // remove farmer if empty
        if (updatedProducts.length === 0) {
          const { [farmerName]: _, ...remainingFarmers } = state.farmers;
          return {
            farmers: remainingFarmers,
          };
        }

        return {
          farmers: {
            ...state.farmers,
            [farmerName]: updatedProducts,
          },
        };
      }),

    // ✅ UPDATE QUANTITY (FIXED)
    updateQnty: (farmerName, productName, qnty) =>
      set((state) => {
        const farmerProducts = state.farmers[farmerName];
        if (!farmerProducts) return state;

        return {
          farmers: {
            ...state.farmers,
            [farmerName]: farmerProducts.map((p) =>
              p.productName === productName ? { ...p, qnty } : p
            ),
          },
        };
      }),

    //Clear CartData
    clearCart: () =>
      set(() => ({
        farmers: {},
      })),
  },
}));

// ✅ Selectors (good 👍)
export const useFarmers = () => useCart((state) => state.farmers);
export const useUpdateQnty = () => useCart((state) => state.actions.updateQnty);
export const useRemoveItem = () => useCart((state) => state.actions.removeItem);
export const useClearCart = () => useCart((state) => state.actions.clearCart);
