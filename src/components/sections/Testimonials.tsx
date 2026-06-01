"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Testimonials() {
  return (
    <section id="reviews" className="section-padding">
      <div className="container-cafe">
        <SectionHeading
          label="Guest Reviews"
          title="Loved by our community"
          description="Real words from guests who've made CafeHira part of their daily ritual."
        />

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {testimonials.map((item, i) => (
            <motion.blockquote
              key={item.id}
              variants={fadeUp}
              custom={i}
              className="card-glass p-8 flex flex-col gap-6 relative"
            >
              <Quote className="w-8 h-8 text-accent opacity-40" />
              <p className="text-foreground leading-relaxed flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex gap-1">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-[var(--color-accent)] text-accent"
                  />
                ))}
              </div>
              <footer className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
                <div
                  className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary text-sm font-semibold"
                  aria-hidden
                >
                  {item.avatar}
                </div>
                <div>
                  <cite className="not-italic font-semibold text-foreground text-sm">
                    {item.name}
                  </cite>
                  <p className="text-muted text-xs mt-0.5">{item.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
