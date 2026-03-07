"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import OrderSummary from "@/components/OrderSummary";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function PaymentPage() {
    const router = useRouter();
    const { cartItems, shippingFee, shippingAddress, placeOrder } = useCart();

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-3 sm:px-4 pb-12 text-center">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
                    <p className="text-gray-500 mb-4">Your cart is empty. Please add items first.</p>
                    <LiquidButton
                        onClick={() => router.push("/")}
                        variant="link"
                        size="sm"
                        className="font-medium"
                    >
                        Go to Shop
                    </LiquidButton>
                </div>
            </div>
        );
    }

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const grandTotal = cartItems.reduce((s, i) => s + i.product_price * i.quantity, 0) + shippingFee;
    const handlePay = () => {
        const placed = placeOrder(cartItems, shippingAddress, shippingFee);
        if (!placed) {
            router.push("/shipping");
            return;
        }
        router.push("/success");
    };

    return (
        <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-36 sm:pb-12">
            <div className="mb-6 sm:mb-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:text-center">
                    Step 4 of 5
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Review & Pay</h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">Confirm your order details before payment</p>
            </div>

            {/* Stack on mobile, grid on desktop */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-8">
                {/* Shipping Address Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <svg className="w-5 h-5 text-slate-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Shipping Address
                        </h3>
                        <LiquidButton
                            onClick={() => router.push("/shipping")}
                            variant="link"
                            size="sm"
                            className="text-xs font-medium"
                        >
                            Edit
                        </LiquidButton>
                    </div>
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
                    <div className="grid grid-cols-2 gap-3">
                        <BackButton onClick={() => router.push("/shipping")} />
                        <PayButton onClick={handlePay} />
                    </div>
                </div>
            </div>

            {/* Compact order summary on mobile */}
            <div className="lg:hidden mt-4">
                <OrderSummary cartItems={cartItems} shippingFee={shippingFee} />
            </div>

            {/* Sticky bottom bar on mobile */}
            <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-lg lg:hidden z-40 p-3"
                style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
                <div className="mb-3 flex items-center justify-between px-1">
                    <div>
                        <p className="text-xs text-gray-500">{itemCount} {itemCount === 1 ? "item" : "items"} • incl. shipping</p>
                        <p className="font-bold text-slate-900 text-lg">₹{grandTotal.toLocaleString("en-IN")}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <BackButton onClick={() => router.push("/shipping")} className="flex-1" />
                    <PayButton onClick={handlePay} className="flex-[1.35]" />
                </div>
            </div>
        </div>
    );
}

function BackButton({ onClick, className = "" }) {
    return (
        <LiquidButton
            onClick={onClick}
            variant="secondary"
            size="xl"
            className={`min-h-[52px] ${className}`}
        >
            ← Back
        </LiquidButton>
    );
}

function PayButton({ onClick, className = "" }) {
    return (
        <LiquidButton
            onClick={onClick}
            variant="primary"
            size="xl"
            className={`w-full min-h-[52px] ${className}`}
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pay Securely
        </LiquidButton>
    );
}
