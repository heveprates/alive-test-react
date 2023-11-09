import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type EmptyGainLossStore = {
  isLoading: false;
  data: null;
  param: null;
};

type LoadingGainLossStore = {
  isLoading: true;
  data: null;
  param: {
    date: Date;
    amount: number;
  };
};

type SuccessGainLossStore = {
  isLoading: false;
  data: {
    capitalGains: number;
    lastPrice: number;
    priceAt: number;
    date: Date;
  };
  param: {
    date: Date;
    amount: number;
  };
};

type GainLossStoreData =
  | EmptyGainLossStore
  | LoadingGainLossStore
  | SuccessGainLossStore;

type GainLossStoreActions = {
  loadGainLoss: (date: Date, amount: number) => void;
  clearGainLoss: () => void;
  setGainLoss: (
    date: Date,
    amount: number,
    data: SuccessGainLossStore['data'],
  ) => void;
};

type GainLossStore = GainLossStoreData & GainLossStoreActions;

export const useGainLoss = create(
  devtools<GainLossStore>(
    (set) => ({
      isLoading: false,
      data: null,
      param: null,
      loadGainLoss: (date, amount) => {
        set({
          isLoading: true,
          data: null,
          param: {
            date,
            amount,
          },
        });
      },
      clearGainLoss: () => {
        set({
          isLoading: false,
          data: null,
          param: null,
        });
      },
      setGainLoss: (date, amount, data) => {
        set({
          isLoading: false,
          data: {
            capitalGains: data.capitalGains,
            lastPrice: data.lastPrice,
            priceAt: data.priceAt,
            date: data.date,
          },
          param: {
            date,
            amount,
          },
        });
      },
    }),
    {
      name: 'GainLoss',
      store: 'GainLoss',
    },
  ),
);
