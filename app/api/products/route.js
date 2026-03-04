import { NextResponse } from "next/server";

/**
 * GET /api/products
 * Returns the catalog of eco-friendly products available for purchase.
 */
export async function GET() {
    const products = [
        {
            product_id: 101,
            product_name: "Bamboo Toothbrush (Pack of 4)",
            product_price: 299,
            image: "https://placehold.co/300x300/e8f5e9/2e7d32?text=Bamboo",
            description:
                "Eco-friendly bamboo toothbrushes with charcoal-infused bristles. BPA-free and 100% biodegradable.",
        },
        {
            product_id: 102,
            product_name: "Reusable Cotton Produce Bags",
            product_price: 450,
            image: "https://placehold.co/300x300/e8f5e9/2e7d32?text=Cotton",
            description:
                "Set of 6 organic cotton mesh bags. Perfect for grocery shopping — say no to plastic!",
        },
    ];

    return NextResponse.json(products);
}
