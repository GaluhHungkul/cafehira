"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { fadeUp } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100dvh] flex items-center bg-gradient-hero overflow-hidden pt-[var(--navbar-height)]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-[0.07] blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-[var(--color-primary)] opacity-[0.06] blur-3xl" />
      </div>

      <div className="container-cafe relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-24">
        <motion.div style={{ y: contentY, opacity }} className="flex flex-col gap-8">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border border-[var(--color-border)] bg-surface/60 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="label-caps !text-[0.65rem]">Est. 2024 · Specialty Coffee</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="heading-display text-foreground font-body"
          >
            Brewed for Comfort,{" "}
            <span className="gradient-text">Crafted for Moments.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="text-muted text-lg max-w-lg leading-relaxed"
          >
            CafeHira is a sanctuary for slow mornings and meaningful
            conversations — where every cup is poured with intention and every
            corner invites you to stay a little longer.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="flex flex-wrap gap-4"
          >
            <Link href="#menu" className="btn-primary group">
              View Menu
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="#reserve" className="btn-outline">
              Reserve Table
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            className="flex gap-10 pt-4 border-t border-[var(--color-border)]"
          >
            {[
              { value: "12+", label: "Single Origins" },
              { value: "4.9", label: "Guest Rating" },
              { value: "Daily", label: "Fresh Pastries" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="heading-card text-primary">{stat.value}</p>
                <p className="text-muted text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] max-h-[min(72vh,640px)] mx-auto lg:mx-0 lg:ml-auto w-full max-w-md rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-card-hover)]">
            <Image
              src="https://images.unsplash.com/photo-1569096651661-820d0de8b4ab?w=800&q=85"
              alt="Artisan pour-over coffee at CafeHira"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 480px"
            />
            <div className="absolute inset-0 bg-gradient-overlay pointer-events-none" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -bottom-4 -left-4 lg:-left-8 card-glass px-5 py-4 max-w-[200px]"
          >
            <p className="label-caps !text-[0.65rem] mb-1">Today&apos;s Pick</p>
            <p className="heading-card !text-base text-foreground">Hira Signature Latte</p>
            <p className="text-muted text-sm mt-1">Honey · Oat · Espresso</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
