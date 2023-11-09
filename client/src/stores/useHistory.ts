import { create } from 'zustand';

type EmptyHistoryStore = {
  isLoading: false;
  data: null;
  param: null;
};

type LoadingHistoryStore = {
  isLoading: true;
  data: null;
  param: {
    from: Date;
    to: Date;
  };
};

type SuccessHistoryStore = {
  isLoading: false;
  data: {
    prices: {
      opening: number;
      high: number;
      low: number;
      closing: number;
      date: Date;
    }[];
  };
  param: {
    from: Date;
    to: Date;
  };
};

type HistoryStoreData =
  | EmptyHistoryStore
  | LoadingHistoryStore
  | SuccessHistoryStore;

type HistoryStoreActions = {
  loadHistory: (from: Date, to: Date) => void;
  clearHistory: () => void;
  setHistory: (from: Date, to: Date, data: SuccessHistoryStore['data']) => void;
};

type HistoryStore = HistoryStoreData & HistoryStoreActions;

export const useHistory = create<HistoryStore>((set) => ({
  isLoading: false,
  data: null,
  param: null,
  loadHistory: (from, to) => {
    set({
      isLoading: true,
      data: null,
      param: {
        from,
        to,
      },
    });
  },
  clearHistory: () => {
    set({
      isLoading: false,
      data: null,
      param: null,
    });
  },
  setHistory: (from, to, data) => {
    set({
      isLoading: false,
      data: {
        prices: data.prices,
      },
      param: {
        from,
        to,
      },
    });
  },
}));
