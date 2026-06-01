"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      className={`flex flex-col gap-4 mb-12 md:mb-16 ${alignClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      <span className="label-caps">{label}</span>
      <div className={`divider-accent ${align === "center" ? "mx-auto" : ""}`} />
      <h2 className="heading-section text-foreground max-w-2xl">{title}</h2>
      {description && (
        <p className="text-muted max-w-xl text-[length:var(--text-body)] leading-[var(--leading-body)]">
          {description}
        </p>
      )}
    </motion.div>
  );
}
