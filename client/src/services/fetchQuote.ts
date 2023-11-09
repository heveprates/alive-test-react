import { useQuote } from '../stores/useQuote';

export async function fetchQuote(stock: string) {
  const response = await fetch(`http://localhost:3001/stock/${stock}/quote`);
  if (response.ok) {
    return await response.json();
  }
  throw response;
}

export function useFetchQuote() {
  const { loadQuote, setQuote, clearQuote } = useQuote();

  function fetch(stock: string) {
    loadQuote(stock);

    const requestFetch = fetchQuote(stock);

    requestFetch
      .then((data) => setQuote(stock, data))
      .catch(() => clearQuote());

    return requestFetch;
  }

  return fetch;
}
