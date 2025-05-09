
import { CartProvider } from '@/context/CartContext';
import '@/app/globals.css';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;