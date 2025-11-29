import React from "react";
import { ProductsType } from "@/types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";

// SHOE DATA
const products: ProductsType = [
    {
        id: 1,
        name: "Jordan 1 Retro High OG",
        shortDescription: "Classic high-top with premium leather",
        description: "Jordan 1 Retro High OG is the classic basketball shoe that puts a fresh spin on what you know best.",
        price: 199.99,
        stock: 10,
        sizes: [7, 8, 8.5, 9, 9.5, 10, 11],
        colors: ["red", "black", "gray"],
        image: {
            red: "/products/Jordan-red.png",
            black: "/products/Jordan-black.png",
            gray: "/products/Jordan-gray.png",
        },
        category: "sneakers",
        subCategory: "high-top",
    },
    {
        id: 2,
        name: "Air Force 1 '07",
        shortDescription: "Timeless style with everyday comfort",
        description: "The classic basketball shoe that puts a fresh spin on what you know best.",
        price: 149.99,
        stock: 5,
        sizes: [6, 7, 8, 9, 10],
        colors: ["white", "gray"],
        image: {
            white: "/products/Air-white.png",
            gray: "/products/Air-gray.png",
        },
        category: "sneakers",
        subCategory: "low-top",
    },
    {
        id: 3,
        name: "Nike Blazer Mid '77 Vintage",
        shortDescription: "Vintage hoops heritage",
        description: "Styled for the '70s. Loved in the '80s. Classic in the '90s.",
        price: 129.99,
        stock: 0,
        sizes: [7, 8, 9, 10],
        colors: ["gray", "pink"],
        image: {
            gray: "/products/Nike-gray.png",
            pink: "/products/Nike-pink.png",
        },
        category: "sneakers",
        subCategory: "canvas",
    },
    {
        id: 4,
        name: "Zoom Fly 5",
        shortDescription: "Durable design for your weekend run",
        description: "Bridge the gap between your weekend training run and race day.",
        price: 160.00,
        stock: 15,
        sizes: [8, 9, 10, 11, 12],
        colors: ["green", "black"],
        image: {
            green: "/products/zoom-green.png",
            black: "/products/zoom-black.png",
        },
        category: "sport",
        subCategory: "running",
    },
    {
        id: 5,
        name: "Classic Leather Oxford",
        shortDescription: "Timeless elegance for formal occasions",
        description: "Hand-polished leather oxfords featuring a cap toe and durable leather sole.",
        price: 189.99,
        stock: 8,
        sizes: [7, 8, 9, 10, 11],
        colors: ["black", "brown"],
        image: {
            black: "/products/oxford-black.png",
            brown: "/products/oxford-brown.png",
        },
        category: "formal",
        subCategory: "oxfords",
    },
    {
        id: 6,
        name: "Rugged Chelsea Boot",
        shortDescription: "Versatile suede boots",
        description: "Classic Chelsea silhouette with elastic side panels and a grippy rubber sole.",
        price: 155.00,
        stock: 12,
        sizes: [8, 9, 10, 11, 12],
        colors: ["tan", "black"],
        image: {
            tan: "/products/chelsea-tan.png",
            black: "/products/chelsea-black.png",
        },
        category: "boots",
        subCategory: "chelsea",
    },
    {
        id: 8, // ID skipped to match previous list flow
        name: "Summer Comfort Slide",
        shortDescription: "Easy slip-on for beach or home",
        description: "Soft foam footbed contours to your foot for all-day comfort.",
        price: 35.00,
        stock: 50,
        sizes: [7, 8, 9, 10, 11, 12],
        colors: ["black", "blue", "white"],
        image: {
            black: "/products/slide-black.png",
            blue: "/products/slide-blue.png",
            white: "/products/slide-white.png",
        },
        category: "sandals",
        subCategory: "slides",
    },
    {
        id: 9,
        name: "Midnight Stiletto",
        shortDescription: "Elegant high heels",
        description: "A pointed-toe stiletto heel that adds sophistication to any outfit.",
        price: 119.99,
        stock: 6,
        sizes: [5, 6, 7, 8, 9],
        colors: ["red", "black"],
        image: {
            red: "/products/stiletto-red.png",
            black: "/products/stiletto-black.png",
        },
        category: "heels",
        subCategory: "stilettos",
    },
];

const ProductList = ({ category, params }: { category: string, params: "homepage" | "products" }) => {

    // Filter logic: If category exists and is not "all", filter the list.
    const displayProducts = (category && category !== "all")
        ? products.filter((p) => p.category === category)
        : products;

    return (
        <div className="w-full">
            <Categories />

            {params === "products" && <Filter />}

            {/* HCI: Appropriate gaps between cards for visual hierarchy and smooth scrolling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Show "View all" link only if we are on homepage or looking at a specific subset */}
            <Link
                href={category ? `/products/?category=${category}` : "/products"}
                className="flex justify-end mt-6 underline text-sm text-gray-500 hover:text-black transition-colors"
            >
                View all products
            </Link>
        </div>
    );
};

export default React.memo(ProductList);