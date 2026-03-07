/**
 * OrderSummary — Reusable component showing cart items, subtotal, shipping, and grand total.
 * Used on both the Cart and Payment pages.
 */
export default function OrderSummary({ cartItems, shippingFee }) {
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );
    const grandTotal = subtotal + shippingFee;
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Order Summary</h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
            </div>

            <div className="space-y-3 mb-5">
                {cartItems.map((item) => (
                    <div key={item.product_id} className="flex items-start justify-between gap-3 text-sm text-gray-600">
                        <span className="line-clamp-2">
                            {item.product_name} × {item.quantity}
                        </span>
                        <span className="font-medium text-gray-800">
                            ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                        </span>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>₹{shippingFee}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Grand Total</span>
                    <span className="text-slate-900">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
            </div>
        </div>
    );
}
