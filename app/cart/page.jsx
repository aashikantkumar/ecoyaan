"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import OrderSummary from "@/components/OrderSummary";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function CartPage() {
    const router = useRouter();
    const { cartItems, shippingFee, addToCart, removeFromCart, cartCount } = useCart();
    const subtotal = cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
    const grandTotal = subtotal + shippingFee;

    if (cartCount === 0) {
        return (
            <div className="max-w-2xl mx-auto px-3 sm:px-4 pb-12 text-center">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6 text-sm">Add some eco-friendly products first!</p>
                    <LiquidButton
                        onClick={() => router.push("/")}
                        variant="link"
                        size="sm"
                        className="font-semibold"
                    >
                        ← Browse Products
                    </LiquidButton>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-36 sm:pb-12">
            <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Cart</h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">Review your eco-friendly picks</p>
            </div>
            <div className="sm:hidden mb-4 flex items-center gap-2 overflow-x-auto pb-1">
                <div className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                    {cartCount} {cartCount === 1 ? "item" : "items"}
                </div>
                <div className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
                    Shipping ₹{shippingFee}
                </div>
                <div className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
                    Total ₹{grandTotal.toLocaleString("en-IN")}
                </div>
            </div>

            {/* Stack on mobile, side-by-side on desktop */}
            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 sm:gap-8">
                {/* Cart items */}
                <div className="lg:col-span-3 space-y-3 sm:space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.product_id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-5
                         flex gap-3 sm:gap-5 items-start">
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                                <Image
                                    src={item.image}
                                    alt={item.product_name}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                    unoptimized
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 text-sm sm:text-base leading-snug line-clamp-2">
                                    {item.product_name}
                                </h3>
                                <p className="text-xs text-gray-400 mt-0.5">₹{item.product_price} each</p>
                                {/* Quantity controls */}
                                <div className="mt-2 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                    <LiquidButton
                                        onClick={() => removeFromCart(item.product_id)}
                                        variant="secondary"
                                        size="icon"
                                        className="h-8 w-8 text-base font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 active:bg-red-100"
                                    >−</LiquidButton>
                                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                                    <LiquidButton
                                        onClick={() => addToCart(item)}
                                        variant="secondary"
                                        size="icon"
                                        className="h-8 w-8 text-base font-bold text-gray-600 hover:bg-gray-200 active:bg-gray-300"
                                    >+</LiquidButton>
                                    </div>
                                    <p className="font-bold text-slate-900 text-base sm:text-lg">
                                        ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order summary — on desktop */}
                <div className="lg:col-span-2 space-y-4 hidden lg:block">
                    <OrderSummary cartItems={cartItems} shippingFee={shippingFee} />
                    <div className="grid grid-cols-2 gap-3">
                        <LiquidButton
                            onClick={() => router.push("/")}
                            variant="secondary"
                            size="xl"
                            className="min-h-[52px]"
                        >
                            ← Back
                        </LiquidButton>
                        <LiquidButton
                            onClick={() => router.push("/shipping")}
                            variant="primary"
                            size="xl"
                            className="min-h-[52px]"
                        >
                            Next Step →
                        </LiquidButton>
                    </div>
                </div>
            </div>

            {/* Sticky bottom bar on mobile */}
            <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-lg lg:hidden z-40 p-3"
                style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
                <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-sm text-gray-500">Grand Total</span>
                    <span className="font-bold text-slate-900 text-lg">
                        ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <LiquidButton
                        onClick={() => router.push("/")}
                        variant="secondary"
                        size="xl"
                        className="min-h-[52px] flex-1"
                    >
                        ← Back
                    </LiquidButton>
                    <LiquidButton
                        onClick={() => router.push("/shipping")}
                        variant="primary"
                        size="xl"
                        className="min-h-[52px] flex-[1.35]"
                    >
                        Next Step →
                    </LiquidButton>
                </div>
            </div>
        </div>
    );
}
