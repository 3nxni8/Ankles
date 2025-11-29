"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

// Assuming ProductType for Card 1 contains:
// name, shortDescription, price, sizes[], colors[], images: Record<string, string>

// I will add a mock `formatPrice` function for compatibility,
// as it was used in the CSS source card.
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

    const handleAddToCart = () => {
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
        // Outer Container Styling from the new CSS source: Rounded corners, shadow, hover effects
        <div
            className={[
                "group relative rounded-2xl border border-neutral-200 bg-white",
                "shadow-sm hover:shadow-lg transition-all duration-300 ease-out",
                "hover:-translate-y-1",
                "overflow-hidden",
            ].join(" ")}
        >
            <Link href={href} className="block" aria-label={`View ${product.name}`}>
                {/* Image area and Overlays (New CSS Structure) */}
                <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl bg-neutral-100">
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
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-900">
                Out of Stock
              </span>
                        </div>
                    )}

                    {/* Top-left category badge */}
                    {product.category && (
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-white/85 px-2.5 py-1 text-xs font-medium text-neutral-800 shadow-sm backdrop-blur">
              {product.category}
            </span>
                    )}

                    {/* Top-right price pill */}
                    <span className="absolute right-3 top-3 z-10 rounded-full bg-neutral-900/85 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur">
            {formatPrice(product.price)}
          </span>

                    {/* Bottom overlay (name and colors) */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
                        <div className="from-black/60 via-black/35 to-transparent bg-gradient-to-t px-3 pb-3 pt-10">
                            <div className="flex items-end justify-between gap-3">
                                <h3 className="line-clamp-1 text-sm font-semibold tracking-tight text-white drop-shadow">
                                    {product.name}
                                </h3>
                                {/* Note: Colors are displayed here on the image overlay,
                    but the *selector* logic is kept in the section below. */}
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
                </div>
            </Link>

            {/* PRODUCT DETAIL & LOGIC (From Card 1, placed below the image/overlay area) */}
            <div className="flex flex-col gap-3 p-4">
                {/* Short Description */}
                <p className="text-xs text-gray-500 line-clamp-2">
                    {product.shortDescription}
                </p>

                {/* PRODUCT TYPE SELECTORS (Card 1 Logic) */}
                <div className="flex items-center gap-4 text-xs">
                    {/* SIZES */}
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 font-medium">Size</span>
                        <select
                            name="size"
                            id="size"
                            // Minimal, clean styling
                            className="ring-1 ring-gray-300 rounded-lg px-2 py-1 bg-white text-gray-700 text-sm focus:ring-neutral-700 focus:border-neutral-700"
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

                    {/* COLORS (The actual selector logic, separate from the visual swatch overlay) */}
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 font-medium">Color Selector</span>
                        <div className="flex items-center gap-2">
                            {product.colors.map((color) => (
                                <div
                                    className={`cursor-pointer border-2 ${
                                        productTypes.color === color
                                            ? "border-neutral-900" // Highlight selected color
                                            : "border-gray-200"
                                    } rounded-full p-[1.5px] transition-all duration-200`}
                                    key={color}
                                    onClick={() =>
                                        handleProductType({ type: "color", value: color })
                                    }
                                >
                                    <div
                                        className="w-[16px] h-[16px] rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ADD TO CART BUTTON (Card 1 Logic) */}
                <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    // Styled to look like a modern, clean button
                    className="mt-2 w-full rounded-xl bg-neutral-900 text-white text-sm font-semibold py-2.5 hover:bg-neutral-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <ShoppingCart className="w-4 h-4" />
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
