"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";

export function ReservationCTA() {
  return (
    <section id="reserve" className="section-padding">
      <div className="container-cafe">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-[var(--radius-xl)] bg-gradient-banner px-8 py-16 md:px-16 md:py-20 text-center"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[var(--color-accent)] opacity-10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[var(--color-cream)] opacity-5 blur-2xl" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
            <span className="label-caps !text-[var(--color-accent)]">
              Reserve Your Table
            </span>
            <h2 className="heading-section !text-[var(--color-cream)]">
              Your perfect moment awaits
            </h2>
            <p className="text-[var(--color-beige)]/90 text-lg leading-relaxed max-w-lg">
              Whether it&apos;s a morning ritual or an evening gathering, we&apos;ll
              save your favorite spot. Book in seconds — no account required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Link
                href="/reserve"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-cream)] text-[var(--color-espresso)] font-semibold text-sm transition-transform hover:scale-[1.02] hover:shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                Book a Table
              </Link>
              <Link
                href="menu"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--color-cream)]/30 text-[var(--color-cream)] font-semibold text-sm transition-colors hover:bg-[var(--color-cream)]/10 group"
              >
                Explore Menu
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
