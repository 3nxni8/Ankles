"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

const ProductCard = ({ product }: { product: ProductType }) => {
    const [productTypes, setProductTypes] = useState({
        size: String(product.sizes[0]),
        color: product.colors[0],
    });

    const { addToCart } = useCartStore();

    const handleProductType = ({
                                   type,
                                   value,
                               }: {
        type: "size" | "color";
        value: string;
    }) => {
        setProductTypes((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            ...product,
            quantity: 1,
            selectedSize: String(productTypes.size),
            selectedColor: productTypes.color,
        });
        toast.success("Product added to cart");
    };

    const href = `/products/${product.id}`;
    const currentImage = product.image[productTypes.color] || product.image[product.colors[0]];

    const isOutOfStock = product.stock <= 0;

    return (
        <div
            className={[
                "group relative rounded-2xl border border-gray-200 bg-white",
                "shadow-sm hover:shadow-lg transition-all duration-300 ease-out",
                "hover:-translate-y-1",
                "overflow-hidden",
            ].join(" ")}
        >
            <Link href={href} className="block" aria-label={`View ${product.name}`}>
                {/* Image area with overlay */}
                <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl bg-gray-100">
                    {currentImage && (
                        <Image
                            src={currentImage}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                        />
                    )}

                    {/* Out of stock overlay */}
                    {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900">
                                Out of Stock
                            </span>
                        </div>
                    )}

                    {/* Top-left category badge */}
                    {product.category && (
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800 shadow-sm backdrop-blur">
                            {product.category}
                        </span>
                    )}

                    {/* Top-right price pill */}
                    <span className="absolute right-3 top-3 z-10 rounded-full bg-black/85 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur">
                        {formatPrice(product.price)}
                    </span>

                    {/* Bottom overlay with name */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
                        <div className="from-black/60 via-black/35 to-transparent bg-gradient-to-t px-3 pb-3 pt-10">
                            <div className="flex items-end justify-between gap-3">
                                <h3 className="line-clamp-1 text-sm font-semibold tracking-tight text-white drop-shadow">
                                    {product.name}
                                </h3>
                                {product.colors?.length ? (
                                    <div className="flex items-center gap-2">
                                        {product.colors.slice(0, 4).map((c) => (
                                            <span
                                                key={c}
                                                title={c}
                                                className="h-4 w-4 rounded-full border border-white/50 shadow-sm"
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                        {product.colors.length > 4 && (
                                            <span className="text-xs text-white/85">+{product.colors.length - 4}</span>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* Add to Cart button - ONLY visible on hover/focus (Critical UX) */}
                    <button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        aria-label={isOutOfStock ? "Out of Stock" : "Add to Cart"}
                        className={[
                            "absolute bottom-4 left-1/2 -translate-x-1/2 z-20",
                            "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0",
                            "focus:opacity-100 focus:translate-y-0",
                            "transition-all duration-300 ease-out",
                            "min-h-[48px] min-w-[180px] px-6 py-3",
                            "rounded-xl text-sm font-semibold",
                            "flex items-center justify-center gap-2",
                            "shadow-lg",
                            isOutOfStock
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-black text-white hover:bg-gray-800 cursor-pointer",
                        ].join(" ")}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                    </button>
                </div>
            </Link>

            {/* Product details below image */}
            <div className="flex flex-col gap-3 p-4">
                {/* Short Description */}
                <p className="text-xs text-gray-500 line-clamp-2">
                    {product.shortDescription}
                </p>

                {/* Product type selectors */}
                <div className="flex items-center gap-4 text-xs">
                    {/* Sizes */}
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 font-medium">Size</span>
                        <select
                            name="size"
                            id={`size-${product.id}`}
                            className="ring-1 ring-gray-300 rounded-lg px-2 py-1.5 bg-white text-gray-700 text-sm focus:ring-black focus:outline-none min-h-[36px]"
                            onChange={(e) =>
                                handleProductType({ type: "size", value: e.target.value })
                            }
                            value={productTypes.size}
                        >
                            {product.sizes.map((size) => (
                                <option key={size} value={size}>
                                    {String(size).toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Colors */}
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 font-medium">Color</span>
                        <div className="flex items-center gap-2">
                            {product.colors.map((color) => (
                                <button
                                    type="button"
                                    aria-label={`Select ${color}`}
                                    className={`cursor-pointer border-2 ${
                                        productTypes.color === color
                                            ? "border-black"
                                            : "border-gray-200"
                                    } rounded-full p-[2px] transition-all duration-200 min-w-[28px] min-h-[28px] flex items-center justify-center`}
                                    key={color}
                                    onClick={() =>
                                        handleProductType({ type: "color", value: color })
                                    }
                                >
                                    <div
                                        className="w-[18px] h-[18px] rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProductCard);
