import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type EmptyComparisonStore = {
  isLoading: false;
  data: null;
  param: null;
};

type LoadingComparisonStore = {
  isLoading: true;
  data: null;
  param: {
    stock: string;
  };
};

type SuccessComparisonStore = {
  isLoading: false;
  data: Map<
    string,
    {
      id: string;
      name: string;
      price: number;
      isBig: boolean;
      isSmall: boolean;
    }
  >;
  param: {
    stock: string;
  };
};

type ComparisonStoreData =
  | EmptyComparisonStore
  | LoadingComparisonStore
  | SuccessComparisonStore;

type ComparisonStoreActions = {
  loadComparison: (stock: string) => void;
  clearComparison: () => void;
  addComparison: (data: {
    name: string;
    price: number;
    isBig: boolean;
    isSmall: boolean;
  }) => void;
  removeComparison: (id: string) => void;
};

type ComparisonStore = ComparisonStoreData & ComparisonStoreActions;

export const useComparison = create(
  devtools<ComparisonStore>(
    (set, get) => ({
      isLoading: false,
      data: null,
      param: null,
      loadComparison: (stock) => {
        set({
          isLoading: true,
          param: {
            stock,
          },
        });
      },
      clearComparison: () => {
        set({
          isLoading: false,
          data: null,
          param: null,
        });
      },
      addComparison: (data) => {
        const dataMap = get().data ?? new Map();
        const id = `${data.name}-${Math.random().toString(36).slice(-4)}`;
        dataMap.set(id, {
          id,
          name: data.name,
          price: data.price,
          isBig: data.isBig,
          isSmall: data.isSmall,
        });
        set({
          isLoading: false,
          data: dataMap,
        });
      },
      removeComparison: (id) => {
        const dataMap = get().data ?? new Map();
        dataMap.delete(id);
        set({
          data: dataMap,
        });
      },
    }),
    {
      name: 'Comparison',
      store: 'Comparison',
    },
  ),
);
