"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import OrderSummary from "@/components/OrderSummary";

export default function PaymentPage() {
    const router = useRouter();
    const { cartItems, shippingFee, shippingAddress } = useCart();

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-3 sm:px-4 pb-12 text-center">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
                    <p className="text-gray-500 mb-4">Your cart is empty. Please add items first.</p>
                    <button onClick={() => router.push("/")}
                        className="text-green-600 font-medium underline cursor-pointer">Go to Shop</button>
                </div>
            </div>
        );
    }

    const grandTotal = cartItems.reduce((s, i) => s + i.product_price * i.quantity, 0) + shippingFee;

    return (
        <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-32 sm:pb-12">
            <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Review & Pay</h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">Confirm your order details before payment</p>
            </div>

            {/* Stack on mobile, grid on desktop */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-8">
                {/* Shipping Address Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Shipping Address
                    </h3>
                    {shippingAddress ? (
                        <div className="text-sm text-gray-600 space-y-1.5">
                            <p className="font-semibold text-gray-800 text-base">{shippingAddress.fullName}</p>
                            <p>{shippingAddress.email}</p>
                            <p>{shippingAddress.phone}</p>
                            <p>{shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pinCode}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400">No shipping address provided.</p>
                    )}
                </div>

                {/* Order Summary (desktop only) */}
                <div className="hidden lg:block space-y-4">
                    <OrderSummary cartItems={cartItems} shippingFee={shippingFee} />
                    <PayButton onClick={() => router.push("/success")} />
                </div>
            </div>

            {/* Compact order summary on mobile */}
            <div className="lg:hidden mt-4">
                <OrderSummary cartItems={cartItems} shippingFee={shippingFee} />
            </div>

            {/* Sticky bottom bar on mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg lg:hidden z-40 p-3"
                style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
                <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-sm text-gray-500">Total to Pay</span>
                    <span className="font-bold text-green-700 text-lg">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
                <PayButton onClick={() => router.push("/success")} />
            </div>
        </div>
    );
}

function PayButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full bg-green-600 active:bg-green-700 text-white font-semibold
                 py-3.5 rounded-xl transition-all duration-150
                 shadow-lg shadow-green-600/25 active:scale-[0.98]
                 flex items-center justify-center gap-2 cursor-pointer min-h-[52px]"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pay Securely
        </button>
    );
}
