"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { menuItems } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function FeaturedMenu() {
  return (
    <section id="menu" className="section-padding">
      <div className="container-cafe">
        <SectionHeading
          label="Featured Menu"
          title="Curated sips & bites"
          description="A thoughtful selection of our most-loved drinks and pastries — each crafted with premium ingredients."
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {menuItems.slice(0, 6).map((item, i) => (
            <motion.article
              key={item.id}
              variants={fadeUp}
              custom={i}
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
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link href="/menu" className="btn-outline group inline-flex">
            View Full Menu
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
