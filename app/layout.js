import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { Tiles } from "@/components/ui/tiles";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Ecoyaan — Eco-Friendly Checkout",
  description:
    "Complete your purchase of sustainable, eco-friendly products on Ecoyaan. Fast, secure checkout with free eco-packaging.",
};

/**
 * Root Layout
 * Wraps the entire app in CartProvider for global state,
 * includes the Header and ProgressBar at the top of every page.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <CartProvider>
          <Header />
          <ProgressBar />

          {/* Page content */}
          <main className="relative isolate min-h-[60vh] overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 [--tile:rgba(15,23,42,0.08)]">
              <Tiles
                rows={34}
                cols={12}
                tileSize="md"
                className="h-full w-full opacity-70"
                tileClassName="border-slate-200/60"
              />
            </div>
            <div className="relative z-10">{children}</div>
          </main>

          {/* Footer */}
          <footer className="mt-12 border-t border-gray-100 bg-white py-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Ecoyaan. Making the planet greener, one order at a time. 🌍
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
