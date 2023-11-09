import { create } from 'zustand';

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

export const useQuote = create<QuoteStore>((set) => ({
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
      data,
      stock,
    });
  },
}));
