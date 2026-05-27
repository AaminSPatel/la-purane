import "./globals.css";


import { CartProvider } from '../contexts/CartContext';

const geistSans = null;
const geistMono = null;


export const metadata = {
  title: "La Purane",
  description: "Developed by Business Sathi",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"

    >
      <body className="min-h-full flex flex-col">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
