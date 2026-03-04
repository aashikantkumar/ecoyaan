import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products";

/**
 * GET /api/products
 * Returns the catalog of eco-friendly products.
 * Uses the shared lib/products.js to keep data in one place.
 */
export async function GET() {
    return NextResponse.json(PRODUCTS);
}
