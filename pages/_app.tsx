import { Provider } from 'next-auth/client';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { useRef } from 'react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<any>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}
export default MyApp;
