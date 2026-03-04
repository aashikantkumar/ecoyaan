"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

/**
 * Shipping Address Page
 * Collects shipping info with full validation, saves to context, navigates to payment.
 */
export default function ShippingPage() {
    const router = useRouter();
    const { setShippingAddress } = useCart();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        pinCode: "",
        city: "",
        state: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    /** Update a single form field */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    /** Mark a field as touched on blur */
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        validateField(name, form[name]);
    };

    /** Validate a single field */
    const validateField = (name, value) => {
        let error = "";

        if (!value.trim()) {
            error = "This field is required";
        } else {
            switch (name) {
                case "email":
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        error = "Please enter a valid email address";
                    }
                    break;
                case "phone":
                    if (!/^\d{10}$/.test(value)) {
                        error = "Phone number must be exactly 10 digits";
                    }
                    break;
                case "pinCode":
                    if (!/^\d{6}$/.test(value)) {
                        error = "PIN code must be exactly 6 digits";
                    }
                    break;
            }
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
        return error;
    };

    /** Validate all fields and submit */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Mark all fields as touched
        const allTouched = {};
        Object.keys(form).forEach((key) => (allTouched[key] = true));
        setTouched(allTouched);

        // Validate every field
        const newErrors = {};
        let hasError = false;
        Object.entries(form).forEach(([key, value]) => {
            const error = validateField(key, value);
            if (error) {
                newErrors[key] = error;
                hasError = true;
            }
        });

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        // Save to context and navigate
        setShippingAddress(form);
        router.push("/payment");
    };

    /** Renders a single form field with label, input, and error message */
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
                        : "border-gray-200 focus:ring-green-200 focus:border-green-400 bg-white"
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
        <div className="max-w-2xl mx-auto px-4 pb-12">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Shipping Address</h1>
                <p className="text-gray-500 mt-1">Where should we deliver your order?</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-5"
            >
                {renderField("Full Name", "fullName", "text", "e.g. Priya Sharma")}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {renderField("Email", "email", "email", "you@example.com")}
                    {renderField("Phone Number", "phone", "tel", "9876543210", 10)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {renderField("PIN Code", "pinCode", "text", "560001", 6)}
                    {renderField("City", "city", "text", "Bengaluru")}
                    {renderField("State", "state", "text", "Karnataka")}
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold
                     py-3.5 rounded-xl transition-all duration-200
                     shadow-lg shadow-green-600/25 hover:shadow-green-700/30
                     active:scale-[0.98] cursor-pointer"
                >
                    Continue to Payment →
                </button>
            </form>
        </div>
    );
}
