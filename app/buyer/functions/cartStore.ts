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
  };
};

export const useCart = create<cartProps>((set) => ({
  farmers: {},
  actions: {
    addItem: (farmerName, productName, price, qnty) =>
      set((state) => {
        const farmerProducts = state.farmers[farmerName] ?? [];

        const existingIndex = farmerProducts.findIndex(
          (p) => p.productName === productName
        );

        let updatedProducts;

        if (existingIndex !== -1) {
          // ✅ Product exists → update quantity
          updatedProducts = farmerProducts.map((p, index) =>
            index === existingIndex ? { ...p, qnty: p.qnty + qnty } : p
          );
        } else {
          // ✅ Product does not exist → add new
          updatedProducts = [...farmerProducts, { productName, price, qnty }];
        }

        return {
          farmers: {
            ...state.farmers,
            [farmerName]: updatedProducts,
          },
        };
      }),

    removeItem: (farmerName, productName) => {
      set((state) => {
        const farmerProducts = state.farmers[farmerName];
        if (!farmerProducts) {
          return state;
        }

        const updatedProducts = farmerProducts.filter(
          (p) => p.productName != productName
        );

        if (updatedProducts.length === 0) {
          const { [farmerName]: _, ...remainingFarmers } = state.farmers;

          return {
            farmers: remainingFarmers,
          };
        }

        return {
          ...state.farmers,
          [farmerName]: updatedProducts,
        };
      });
    },

    updateQnty: (farmerName, productName, qnty) => {
      set((state) => {
        const farmerProducts = state.farmers[farmerName];

        if (!farmerProducts) {
          return state;
        }

        const updatedProducts = farmerProducts.map((p) =>
          p.productName == productName ? { ...p, qnty } : p
        );

        return {
          ...state.farmers,
          [farmerName]: updatedProducts,
        };
      });
    },
  },
}));
