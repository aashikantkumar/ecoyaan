"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

/**
 * ProductCard — Displays a single product with "Add to Cart" functionality.
 */
function ProductCard({ product }) {
    const { addToCart, cartItems } = useCart();

    const inCart = cartItems.find((item) => item.product_id === product.product_id);
    const qty = inCart ? inCart.quantity : 0;

    return (
        <div
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden
                 hover:shadow-lg transition-all duration-300 group"
        >
            {/* Product image */}
            <div className="relative w-full aspect-square bg-green-50 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.product_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                {qty > 0 && (
                    <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                        {qty} in cart
                    </div>
                )}
            </div>

            {/* Product info */}
            <div className="p-5">
                <h3 className="font-semibold text-gray-800 text-lg mb-1">
                    {product.product_name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    {product.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-700">
                        ₹{product.product_price.toLocaleString("en-IN")}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold
                       px-5 py-2.5 rounded-xl transition-all duration-200
                       shadow-md shadow-green-600/20 hover:shadow-green-700/30
                       active:scale-95 cursor-pointer"
                    >
                        {qty > 0 ? "Add More" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/**
 * ProductListingClient — Client component for the product listing page.
 * Receives server-fetched products as props.
 */
export default function ProductListingClient({ products }) {
    const router = useRouter();
    const { cartCount } = useCart();

    return (
        <div className="max-w-4xl mx-auto px-4 pb-12">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Our Eco Products</h1>
                <p className="text-gray-500 mt-1">
                    Choose sustainable, choose better 🌿
                </p>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {products.map((product) => (
                    <ProductCard key={product.product_id} product={product} />
                ))}
            </div>

            {/* Go to Cart button — visible when items are added */}
            {cartCount > 0 && (
                <div className="text-center">
                    <button
                        onClick={() => router.push("/cart")}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold
                       px-8 py-3.5 rounded-xl transition-all duration-200
                       shadow-lg shadow-green-600/25 hover:shadow-green-700/30
                       active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                            />
                        </svg>
                        Go to Cart ({cartCount} {cartCount === 1 ? "item" : "items"}) →
                    </button>
                </div>
            )}
        </div>
    );
}
