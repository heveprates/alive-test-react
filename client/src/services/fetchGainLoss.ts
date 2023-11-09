import dayjs from 'dayjs';
import { useGainLoss } from '../stores/useGainLoss';
import { useQuote } from '../stores/useQuote';

export async function fetchGainLoss(
  stock: string,
  purchasedAt: Date,
  purchasedAmount: number,
) {
  const params = new URLSearchParams({
    purchasedAt: dayjs(purchasedAt).format('YYYY-MM-DD'),
    purchasedAmount: String(purchasedAmount),
  });
  const response = await fetch(
    `http://localhost:3001/stocks/${stock}/gains?${params}`,
  );
  if (response.ok) {
    return await response.json();
  }
  throw response;
}

export function useFetchGainLoss() {
  const [loadGainLoss, clearGainLoss, setGainLoss] = useGainLoss((state) => [
    state.loadGainLoss,
    state.clearGainLoss,
    state.setGainLoss,
  ]);
  const stock = useQuote((state) => state.stock);

  function fetch(purchasedAt: Date, purchasedAmount: number) {
    if (!stock) {
      return Promise.reject();
    }

    loadGainLoss(purchasedAt, purchasedAmount);

    const requestFetch = fetchGainLoss(stock, purchasedAt, purchasedAmount);

    requestFetch
      .then((data) =>
        setGainLoss(purchasedAt, purchasedAmount, {
          capitalGains: Number(data.capitalGains),
          lastPrice: Number(data.lastPrice),
          priceAt: Number(data.priceAtDate),
          date: new Date(data.purchasedAt),
        }),
      )
      .catch(() => clearGainLoss());

    return requestFetch;
  }

  return fetch;
}
