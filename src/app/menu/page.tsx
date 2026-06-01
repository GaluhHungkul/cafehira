"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Search, Coffee, Utensils, Star, IceCream } from "lucide-react";
import Image from "next/image";
import { fadeUp } from "@/lib/motion";

const categories = ["All", ...Array.from(new Set(menuItems.map((item) => item.category)))];

const categoryIcons: Record<string, React.ElementType> = {
  All: Utensils,
  Signature: Star,
  Coffee: Coffee,
  Dessert: IceCream,
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const debouncedSearchQuery = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(debouncedSearchQuery);
  },[searchQuery])

  const filteredMenu = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(debouncedQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, debouncedQuery]);

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container-cafe">
        <SectionHeading
          label="Our Offerings"
          title="The CafeHira Menu"
          description="Discover our carefully curated selection of signature drinks, single-origin coffees, and freshly baked pastries."
        />

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 gap-2 no-scrollbar">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || Coffee;
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-surface-muted text-muted hover:bg-surface hover:text-foreground"
                  }`}
                >
                  <Icon size={16} />
                  <span className="font-medium">{category}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search our menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-muted border border-transparent rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-border-strong focus:bg-surface focus:ring-1 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item, index) => (
                <motion.article
                  key={item.id}
                  variants={fadeUp}
                  custom={index}
                  className="card-cafe group"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-4 left-4 label-caps text-[0.65rem]! px-3 py-1.5 rounded-full bg-surface backdrop-blur-sm border border-(--color-border)">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="heading-card text-foreground">{item.name}</h3>
                      <span className="text-primary font-semibold whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-surface-muted flex items-center justify-center mb-4 text-muted">
                  <Search size={24} />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-2">No items found</h3>
                <p className="text-muted">
                  We couldn&apos;t find any matches for &quot;{searchQuery}&quot;. Try adjusting your search.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-6 btn-outline"
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
