"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const EMPTY_FORM = {
    fullName: "",
    email: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "",
};

export default function ShippingPage() {
    const router = useRouter();
    const {
        shippingAddresses,
        shippingAddress,
        addShippingAddress,
        selectShippingAddress,
    } = useCart();

    const [form, setForm] = useState(EMPTY_FORM);

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [notice, setNotice] = useState("");

    const isFormEmpty = Object.values(form).every((value) => !value.trim());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setNotice("");
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = getFieldError(name, form[name]);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const getFieldError = (name, value) => {
        if (!value.trim()) {
            return "This field is required";
        }

        switch (name) {
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return "Please enter a valid email address";
                }
                break;
            case "phone":
                if (!/^\d{10}$/.test(value)) {
                    return "Phone number must be exactly 10 digits";
                }
                break;
            case "pinCode":
                if (!/^\d{6}$/.test(value)) {
                    return "PIN code must be exactly 6 digits";
                }
                break;
        }

        return "";
    };

    const validateAll = () => {
        const allTouched = {};
        const nextErrors = {};
        let hasError = false;

        Object.entries(form).forEach(([key, value]) => {
            allTouched[key] = true;
            const error = getFieldError(key, value);
            if (error) {
                hasError = true;
            }
            nextErrors[key] = error;
        });

        setTouched(allTouched);
        setErrors(nextErrors);
        return hasError;
    };

    const handleSelectAddress = (addressId) => {
        selectShippingAddress(addressId);
        setForm(EMPTY_FORM);
        setErrors({});
        setTouched({});
        setNotice("Using selected address for delivery.");
    };

    const handleSaveAddress = () => {
        if (isFormEmpty) {
            setNotice("Fill the form to save a new address.");
            return;
        }
        if (validateAll()) return;

        addShippingAddress(form, { select: true });
        setNotice("Address saved. You can add another or continue.");
        setForm(EMPTY_FORM);
        setErrors({});
        setTouched({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormEmpty && shippingAddress) {
            router.push("/payment");
            return;
        }

        if (validateAll()) return;

        addShippingAddress(form, { select: true });
        router.push("/payment");
    };

    const renderField = (label, name, type = "text", placeholder = "", maxLength) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
                {label} <span className="text-red-400">*</span>
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                maxLength={maxLength}
                className={`
                    w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200
                    focus:outline-none focus:ring-2
                    ${touched[name] && errors[name]
                        ? "border-red-300 focus:ring-red-200 bg-red-50/50"
                        : "border-gray-200 focus:ring-slate-200 focus:border-slate-400 bg-white"
                    }
                `}
            />
            {touched[name] && errors[name] && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {errors[name]}
                </p>
            )}
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto px-4 pb-28 sm:pb-12">
            <div className="mb-6 sm:mb-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:text-center">
                    Step 3 of 5
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 sm:text-center">
                    Shipping Address
                </h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base sm:text-center">Where should we deliver your order?</p>
            </div>

            {shippingAddresses.length > 0 && (
                <section className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-slate-800">Saved Addresses</h2>
                        <span className="text-xs text-slate-500">{shippingAddresses.length} saved</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {shippingAddresses.map((address) => {
                            const isSelected = shippingAddress?.id === address.id;
                            return (
                                <button
                                    key={address.id}
                                    type="button"
                                    onClick={() => handleSelectAddress(address.id)}
                                    className={`rounded-xl border p-3 text-left transition ${isSelected
                                            ? "border-slate-900 bg-slate-50"
                                            : "border-slate-200 bg-white hover:border-slate-300"
                                        }`}
                                >
                                    <p className="text-sm font-semibold text-slate-800">{address.fullName}</p>
                                    <p className="mt-1 text-xs text-slate-600">{address.phone}</p>
                                    <p className="text-xs text-slate-600">
                                        {address.city}, {address.state} — {address.pinCode}
                                    </p>
                                    {isSelected && (
                                        <p className="mt-1 text-[11px] font-semibold text-slate-800">Selected for delivery</p>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </section>
            )}

            <form
                id="shipping-form"
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 md:p-8 space-y-6"
            >
                <section className="space-y-4">
                    <h2 className="text-sm font-semibold text-slate-800">Contact Details</h2>
                    {renderField("Full Name", "fullName", "text", "e.g. Priya Sharma")}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        {renderField("Email", "email", "email", "you@example.com")}
                        {renderField("Phone Number", "phone", "tel", "9876543210", 10)}
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-sm font-semibold text-slate-800">Delivery Location</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                        {renderField("PIN Code", "pinCode", "text", "560001", 6)}
                        {renderField("City", "city", "text", "Bengaluru")}
                        {renderField("State", "state", "text", "Karnataka")}
                    </div>
                </section>

                {notice && (
                    <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">{notice}</p>
                )}

                <div className="hidden sm:flex items-center gap-3">
                    <LiquidButton
                        type="button"
                        onClick={() => router.push("/cart")}
                        variant="secondary"
                        size="xl"
                        className="min-h-[52px] flex-1"
                    >
                        ← Back
                    </LiquidButton>
                    <LiquidButton
                        type="button"
                        onClick={handleSaveAddress}
                        variant="secondary"
                        size="xl"
                        className="min-h-[52px] flex-1"
                    >
                        Save Address
                    </LiquidButton>
                    <LiquidButton
                        type="submit"
                        variant="primary"
                        size="xl"
                        className="min-h-[52px] flex-1"
                    >
                        Next Step →
                    </LiquidButton>
                </div>
            </form>

            <div
                className="fixed bottom-0 left-0 right-0 border-t border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-lg sm:hidden z-40 p-3"
                style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
            >
                <div className="mb-2 px-1 text-xs text-slate-500">
                    {shippingAddress ? `Selected: ${shippingAddress.fullName}` : "Select a saved address or add a new one"}
                </div>
                <div className="flex items-center gap-2">
                    <LiquidButton
                        type="button"
                        onClick={() => router.push("/cart")}
                        variant="secondary"
                        size="xl"
                        className="min-h-[52px] flex-1"
                    >
                        ← Back
                    </LiquidButton>
                    <LiquidButton
                        type="submit"
                        form="shipping-form"
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
