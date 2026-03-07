/**
 * Mock product catalog — shared between the API route and the Server Component.
 * No need for a self-referential fetch in production; just import this directly.
 */
export const PRODUCTS = [
    {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        image:
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80",
        description:
            "Eco-friendly bamboo toothbrushes with charcoal-infused bristles. BPA-free and 100% biodegradable.",
    },
    {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        image:
            "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
        description:
            "Set of 6 organic cotton mesh bags. Perfect for grocery shopping — say no to plastic!",
    },
];
