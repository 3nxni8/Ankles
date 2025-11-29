"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  const isOutOfStock = product.stock <= 0;

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      // Limit quantity to available stock
      if (quantity < product.stock) {
        setQuantity((prev) => prev + 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* SIZE */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500 font-medium">Size</span>
        <div className="flex flex-wrap items-center gap-2">
          {product.sizes.map((size) => (
            <button
              type="button"
              aria-label={`Select size ${size}`}
              className={[
                "min-w-[44px] min-h-[44px] px-3 py-2",
                "border rounded-lg text-center",
                "flex items-center justify-center",
                "transition-all duration-200",
                "cursor-pointer",
                String(selectedSize) === String(size)
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-800 hover:border-gray-500",
              ].join(" ")}
              key={size}
              onClick={() => handleTypeChange("size", String(size))}
            >
              {String(size).toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* COLOR */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500 font-medium">Color</span>
        <div className="flex flex-wrap items-center gap-3">
          {product.colors.map((color) => (
            <button
              type="button"
              aria-label={`Select color ${color}`}
              className={[
                "min-w-[44px] min-h-[44px] p-1",
                "rounded-full border-2",
                "flex items-center justify-center",
                "transition-all duration-200",
                "cursor-pointer",
                selectedColor === color
                  ? "border-black"
                  : "border-gray-200 hover:border-gray-400",
              ].join(" ")}
              key={color}
              onClick={() => handleTypeChange("color", color)}
            >
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: color }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* QUANTITY - HCI: Touch-friendly +/- buttons with B/W/G styling */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500 font-medium">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            className={[
              "min-w-[48px] min-h-[48px]",
              "border border-gray-300 rounded-lg",
              "flex items-center justify-center",
              "transition-all duration-200",
              quantity <= 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-100 cursor-pointer",
            ].join(" ")}
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="min-w-[40px] text-center text-lg font-medium">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={quantity >= product.stock || isOutOfStock}
            className={[
              "min-w-[48px] min-h-[48px]",
              "border border-gray-300 rounded-lg",
              "flex items-center justify-center",
              "transition-all duration-200",
              quantity >= product.stock || isOutOfStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-100 cursor-pointer",
            ].join(" ")}
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-5 h-5" />
          </button>
          {!isOutOfStock && (
            <span className="text-xs text-gray-400 ml-2">
              {product.stock} available
            </span>
          )}
        </div>
      </div>

      {/* ACTION BUTTONS - B/W/G styling with touch-friendly sizes */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={[
          "min-h-[52px] px-6 py-3",
          "rounded-lg shadow-md",
          "flex items-center justify-center gap-2",
          "text-sm font-semibold",
          "transition-all duration-200",
          isOutOfStock
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800 cursor-pointer",
        ].join(" ")}
      >
        <ShoppingCart className="w-5 h-5" />
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </button>
      <button
        type="button"
        disabled={isOutOfStock}
        className={[
          "min-h-[52px] px-6 py-3",
          "ring-1 ring-gray-300 rounded-lg shadow-sm",
          "flex items-center justify-center gap-2",
          "text-sm font-semibold",
          "transition-all duration-200",
          isOutOfStock
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-800 hover:bg-gray-50 cursor-pointer",
        ].join(" ")}
      >
        <ShoppingCart className="w-5 h-5" />
        Buy Now
      </button>
    </div>
  );
};

export default React.memo(ProductInteraction);
