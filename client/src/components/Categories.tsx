"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
    ShoppingBasket,
    Footprints,
    Zap,
    Briefcase,
    Mountain,
    Sun,
    Home,
    Gem
} from "lucide-react";

const categories = [
    {
        name: "All Shoes",
        icon: <ShoppingBasket className="w-4 h-4" />,
        slug: "all",
        subCategories: [],
    },
    {
        name: "Sneakers",
        icon: <Footprints className="w-4 h-4" />,
        slug: "sneakers",
        subCategories: [
            { name: "Low Top", slug: "low-top" },
            { name: "High Top", slug: "high-top" },
            { name: "Slip-on", slug: "slip-on" },
            { name: "Canvas", slug: "canvas" }
        ]
    },
    {
        name: "Running & Sport",
        icon: <Zap className="w-4 h-4" />,
        slug: "sport",
        subCategories: [
            { name: "Running", slug: "running" },
            { name: "Training", slug: "training" },
            { name: "Trail", slug: "trail" },
            { name: "Cleats", slug: "cleats" }
        ]
    },
    {
        name: "Formal",
        icon: <Briefcase className="w-4 h-4" />,
        slug: "formal",
        subCategories: [
            { name: "Oxfords", slug: "oxfords" },
            { name: "Derbys", slug: "derbys" },
            { name: "Loafers", slug: "loafers" },
            { name: "Monk Straps", slug: "monk-straps" }
        ]
    },
    {
        name: "Boots",
        icon: <Mountain className="w-4 h-4" />,
        slug: "boots",
        subCategories: [
            { name: "Chelsea", slug: "chelsea" },
            { name: "Chukka", slug: "chukka" },
            { name: "Hiking", slug: "hiking" },
            { name: "Work Boots", slug: "work-boots" }
        ]
    },
    {
        name: "Sandals",
        icon: <Sun className="w-4 h-4" />,
        slug: "sandals",
        subCategories: [
            { name: "Slides", slug: "slides" },
            { name: "Flip Flops", slug: "flip-flops" },
            { name: "Gladiator", slug: "gladiator" }
        ]
    },
    {
        name: "Heels & Party",
        icon: <Gem className="w-4 h-4" />,
        slug: "heels",
        subCategories: [
            { name: "Pumps", slug: "pumps" },
            { name: "Stilettos", slug: "stilettos" },
            { name: "Wedges", slug: "wedges" },
            { name: "Platforms", slug: "platforms" }
        ]
    },
    {
        name: "Slippers",
        icon: <Home className="w-4 h-4" />,
        slug: "slippers",
        subCategories: [
            { name: "Moccasins", slug: "moccasins" },
            { name: "House Shoes", slug: "house-shoes" }
        ]
    },
];
const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "all");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm">
      {categories.map((category) => (
        <div
          className={`flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md ${
            category.slug === selectedCategory ? "bg-white" : "text-gray-500"
          }`}
          key={category.name}
          onClick={() => handleChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
