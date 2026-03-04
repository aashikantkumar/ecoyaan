import ProductListingClient from "@/components/ProductListingClient";
import { PRODUCTS } from "@/lib/products";

/**
 * Home Page — Product Listing (Server Component)
 * Imports product data directly — avoids a self-referential fetch that
 * breaks in production (Vercel has no localhost to call).
 */
export default function HomePage() {
  return <ProductListingClient products={PRODUCTS} />;
}
