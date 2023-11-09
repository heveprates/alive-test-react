import { useComparison } from '../stores/useComparison';
import { useQuote } from '../stores/useQuote';

export async function fetchComparison(stock: string, stockToCompare: string) {
  const params = new URLSearchParams({
    'stocksToCompare[]': stockToCompare,
  });
  const response = await fetch(
    `http://localhost:3001/stocks/${stock}/compare?${params}`,
  );
  if (!response.ok) {
    throw response;
  }
  const {
    lastPrices,
  }: {
    lastPrices: { lastPrice: number; name: string; pricedAt: string }[];
  } = await response.json();

  const compareDate = lastPrices.find(
    (lastPrice) => lastPrice.name === stockToCompare,
  );
  if (!compareDate) {
    throw new Error('Stock not found');
  }
  return {
    name: compareDate.name,
    price: compareDate.lastPrice,
    date: new Date(compareDate.pricedAt),
  };
}

export function useFetchGainLoss() {
  const [stock, lastPrice] = useQuote((state) => [
    state.stock,
    state.data?.lastPrice,
  ]);
  const [clearComparison, loadComparison, addComparison] = useComparison(
    (state) => [
      state.clearComparison,
      state.loadComparison,
      state.addComparison,
    ],
  );

  return function fetch(stockToCompare: string) {
    if (!stock || !lastPrice) {
      return Promise.reject();
    }

    loadComparison(stockToCompare);

    const requestFetch = fetchComparison(stock, stockToCompare);

    requestFetch
      .then((data) =>
        addComparison({
          name: data.name,
          price: data.price,
          isBig: data.price > lastPrice,
          isSmall: data.price < lastPrice,
        }),
      )
      .catch(() => clearComparison());

    return requestFetch;
  };
}
