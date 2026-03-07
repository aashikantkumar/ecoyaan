"use client";

import * as React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import { BackgroundGradient } from "@/components/ui/background-gradient";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export type FeaturedProduct = {
  product_id: number;
  product_name: string;
  product_price: number;
  image: string;
  description: string;
};

type BackgroundGradientDemoProps = {
  product: FeaturedProduct;
  onBuyNow?: () => void;
};

export function BackgroundGradientDemo({
  product,
  onBuyNow,
}: BackgroundGradientDemoProps) {
  return (
    <div className="w-full">
      <BackgroundGradient
        containerClassName="mx-auto w-full max-w-[560px]"
        className="rounded-[28px] bg-[#f6f7f8] p-5 sm:p-10"
      >
        <Image
          src={product.image}
          alt={product.product_name}
          height={400}
          width={400}
          className="h-52 w-full rounded-2xl object-cover sm:h-64"
          sizes="(max-width: 640px) 95vw, 560px"
          priority
        />
        <p className="mb-2 mt-5 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
          {product.product_name}
        </p>

        <p className="text-base leading-8 text-slate-600">{product.description}</p>
        <LiquidButton
          type="button"
          onClick={onBuyNow}
          variant="primary"
          size="sm"
          className="mt-5 gap-1.5 pl-4 pr-3"
        >
          <span>Buy now</span>
          <span className="rounded-full bg-zinc-700 px-2 py-0 text-xs text-white">
            ₹{product.product_price}
          </span>
          <ShoppingCart className="h-4 w-4" />
        </LiquidButton>
      </BackgroundGradient>
    </div>
  );
}
