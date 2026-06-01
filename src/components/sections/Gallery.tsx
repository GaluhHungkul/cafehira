"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryImages } from "@/lib/data";
import { scaleIn, staggerContainer } from "@/lib/motion";

export function Gallery() {
  return (
    <section id="gallery" className="section-padding bg-surface-muted">
      <div className="container-cafe">
        <SectionHeading
          label="Gallery"
          title="Moments at CafeHira"
          description="Glimpses of the space, the craft, and the quiet beauty in between."
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {galleryImages.map((img) => (
            <motion.figure
              key={img.id}
              variants={scaleIn}
              className={`group relative overflow-hidden rounded-[var(--radius-lg)] cursor-pointer ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-[var(--color-espresso)]/0 group-hover:bg-[var(--color-espresso)]/30 transition-colors duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[var(--color-cream)] text-sm font-medium">
                  {img.alt}
                </p>
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
