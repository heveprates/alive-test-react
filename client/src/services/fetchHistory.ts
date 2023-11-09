import dayjs from 'dayjs';
import { useQuote } from '../stores/useQuote';
import { useHistory } from '../stores/useHistory';

export async function fetchHistory(stock: string, from: Date, to: Date) {
  const params = new URLSearchParams({
    from: dayjs(from).format('YYYY-MM-DD'),
    to: dayjs(to).format('YYYY-MM-DD'),
  });
  const response = await fetch(
    `http://localhost:3001/stocks/${stock}/history?${params}`,
  );
  if (!response.ok) {
    throw response;
  }
  const data: {
    prices: {
      opening: number;
      low: number;
      high: number;
      closing: number;
      pricedAt: string;
      volume: number;
    }[];
  } = await response.json();

  return data;
}

export function useFetchHistory() {
  const stock = useQuote((state) => state.stock);
  const [loadHistory, setHistory] = useHistory((state) => [
    state.loadHistory,
    state.setHistory,
  ]);

  function fetch(from: Date, to: Date) {
    if (!stock) {
      return Promise.reject();
    }

    loadHistory(from, to);

    const requestFetch = fetchHistory(stock, from, to);

    requestFetch.then((data) =>
      setHistory(from, to, {
        prices: data.prices.reverse().map((item) => ({
          opening: item.opening,
          high: item.high,
          low: item.low,
          closing: item.closing,
          date: new Date(item.pricedAt),
        })),
      }),
    );
  }

  return fetch;
}
