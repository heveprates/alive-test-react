import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type EmptyQuoteStore = {
  isLoading: false;
  data: null;
  stock: null;
};

type LoadingQuoteStore = {
  isLoading: true;
  data: null;
  stock: string;
};

type SuccessQuoteStore = {
  isLoading: false;
  data: {
    lastPrice: number;
    pricedAt: Date;
  };
  stock: string;
};

type QuoteStoreData = EmptyQuoteStore | LoadingQuoteStore | SuccessQuoteStore;

type QuoteStoreActions = {
  loadQuote: (stock: string) => void;
  clearQuote: () => void;
  setQuote: (stock: string, data: SuccessQuoteStore['data']) => void;
};

type QuoteStore = QuoteStoreData & QuoteStoreActions;

export const useQuote = create(
  devtools<QuoteStore>(
    (set) => ({
      isLoading: false,
      data: null,
      stock: null,
      loadQuote: (stock) => {
        set({
          isLoading: true,
          data: null,
          stock,
        });
      },
      clearQuote: () => {
        set({
          isLoading: false,
          data: null,
          stock: null,
        });
      },
      setQuote: (stock, data) => {
        set({
          isLoading: false,
          data: {
            lastPrice: data.lastPrice,
            pricedAt: data.pricedAt,
          },
          stock,
        });
      },
    }),
    {
      name: 'Quote',
      store: 'Quote',
    },
  ),
);
