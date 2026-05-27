import Head from 'next/head';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Là Púráné - The Art of Wearing Heritage</title>
        <meta name="description" content="Luxury Indian fashion crafted with generations of artisan knowledge. Every thread tells a story. Every garment carries a heritage." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="page-transition">{children}</main>
      <Footer />
    </>
  );
}