"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { Menu, X } from "lucide-react";

// The navigation items array (NAVITEMS) is defined here, as requested.
const NAVITEMS = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Category", href: "/category" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        // Base Navbar 2 Styling: Clean padding, fixed height, subtle border
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100/70">
            <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-between container mx-auto">
                {/* LEFT: Logo (Using Card 2's clean logo styling) */}
                <div className="flex items-center w-1/3 md:w-1/4">
                    <Link href="/" className="shrink-0">
                        <span className="text-lg md:text-2xl font-bold font-display text-gray-900 tracking-wider">
                            UNDERWORLD
                        </span>
                    </Link>
                </div>

                {/* CENTER: Desktop Navigation Items */}
                <div className="hidden md:flex items-center gap-6 text-sm justify-center w-1/3">
                    {NAVITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            // Card 2 Link Styling
                            className="text-gray-700/80 hover:text-gray-900 transition-colors font-medium"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* RIGHT: Search Bar and Icons (Actions) */}
                <div className="flex items-center gap-3 justify-end w-1/3 md:w-1/4">
                    {/* Search Bar (Hidden on small screens, shown on desktop) */}
                    <div className="hidden lg:block w-56">
                        <SearchBar />
                    </div>

                    {/* SHOPPING CART ICON (From Card 1's component) */}
                    <button
                        type="button"
                        aria-label="Shopping Cart"
                        className="cursor-pointer p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 relative"
                    >
                        <ShoppingCartIcon />
                    </button>

                    {/* SIGN IN / PROFILE LINK (From Card 1, styled as a button/link) */}
                    <Link
                        href="/login"
                        className="hidden md:inline-block text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors px-4 py-2 rounded-md"
                    >
                        Sign in
                    </Link>

                    {/* Mobile menu toggle */}
                    <button
                        type="button"
                        aria-label="Toggle menu"
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                        onClick={() => setMobileOpen((s) => !s)}
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu panel */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
                    <div className="flex flex-col px-4 py-3 gap-2">
                        {NAVITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block text-gray-700/90 py-2 px-2 rounded-md hover:bg-gray-50"
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="block lg:hidden pt-2">
                            <SearchBar />
                        </div>

                        <Link
                            href="/login"
                            className="block text-center text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors px-4 py-2 rounded-md mt-2"
                            onClick={() => setMobileOpen(false)}
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;