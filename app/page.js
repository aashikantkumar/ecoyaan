import ProductListingClient from "@/components/ProductListingClient";

/**
 * Home Page — Product Listing (Server Component)
 * Fetches product catalog from the API and renders the product grid.
 */
export default async function HomePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products`,
    { cache: "no-store" }
  );
  const products = await res.json();

  return <ProductListingClient products={products} />;
}
