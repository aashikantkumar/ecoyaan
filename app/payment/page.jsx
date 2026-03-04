"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import OrderSummary from "@/components/OrderSummary";

/**
 * Payment & Confirmation Page
 * Displays the full order summary + shipping address.
 * "Pay Securely" button navigates to the success page.
 */
export default function PaymentPage() {
    const router = useRouter();
    const { cartItems, shippingFee, shippingAddress } = useCart();

    // Guard: redirect to cart if no items in context
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 pb-12 text-center">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
                    <p className="text-gray-500 mb-4">Your cart is empty. Please add items first.</p>
                    <button
                        onClick={() => router.push("/")}
                        className="text-green-600 hover:text-green-700 font-medium underline cursor-pointer"
                    >
                        Go to Cart
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 pb-12">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Review & Pay</h1>
                <p className="text-gray-500 mt-1">Confirm your order details before payment</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Shipping Address Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        Shipping Address
                    </h3>

                    {shippingAddress ? (
                        <div className="text-sm text-gray-600 space-y-1.5">
                            <p className="font-medium text-gray-800 text-base">{shippingAddress.fullName}</p>
                            <p>{shippingAddress.email}</p>
                            <p>{shippingAddress.phone}</p>
                            <p>
                                {shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pinCode}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400">No shipping address provided.</p>
                    )}
                </div>

                {/* Order Summary + Pay Button */}
                <div className="space-y-4">
                    <OrderSummary cartItems={cartItems} shippingFee={shippingFee} />

                    {/* Payment method indicator */}
                    <div className="bg-green-50 rounded-xl border border-green-100 p-4 flex items-center gap-3">
                        <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                        <div>
                            <p className="text-sm font-medium text-green-800">Secure Payment</p>
                            <p className="text-xs text-green-600">Your payment information is encrypted</p>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push("/success")}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold
                       py-3.5 rounded-xl transition-all duration-200
                       shadow-lg shadow-green-600/25 hover:shadow-green-700/30
                       active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                        Pay Securely
                    </button>
                </div>
            </div>
        </div>
    );
}
