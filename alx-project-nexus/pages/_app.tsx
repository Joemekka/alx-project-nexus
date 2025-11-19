import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layouts/Layout';
import localFont from 'next/font/local';
import { CartProvider } from '@/context/CartContext';

const gilroy = localFont({
  src: [
    {
      path: '../public/fonts/Gilroy-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Gilroy-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <main className={gilroy.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </CartProvider>
  );
}
