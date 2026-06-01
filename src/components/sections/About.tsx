"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Leaf, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { slideInLeft, slideInRight } from "@/lib/motion";

const values = [
  {
    icon: Leaf,
    title: "Sourced with Care",
    text: "Ethically traded beans from small farms across Ethiopia, Colombia, and Japan.",
  },
  {
    icon: Heart,
    title: "Crafted by Hand",
    text: "Every drink is prepared to order by baristas who treat coffee as an art form.",
  },
  {
    icon: Users,
    title: "For Community",
    text: "A warm gathering place designed for connection, creativity, and calm.",
  },
];

export function About() {
  return (
    <section id="about" className="section-padding bg-surface-muted">
      <div className="container-cafe">
        <SectionHeading
          label="Our Story"
          title="A quiet corner in a loud world"
          description="Born from a love of ritual and restraint, CafeHira blends Japanese minimalism with the warmth of a neighborhood café."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInLeft}
            className="relative"
          >
            <div className="relative aspect-5/4 rounded-xl overflow-hidden shadow-(--shadow-card)">
              <Image
                src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80"
                alt="Cozy CafeHira interior with natural wood and soft light"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-lg bg-primary opacity-90 hidden sm:block" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-lg border-2 border-(--color-border) bg-surface hidden sm:block" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInRight}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4">
              <p className="text-foreground text-lg leading-relaxed">
                CafeHira began as a dream between two friends who believed coffee
                could be more than caffeine — it could be a ceremony. Our space
                was designed with intention: soft light, natural materials, and
                silence between the sounds of steaming milk.
              </p>
              <p className="text-muted leading-relaxed">
                Step inside and you&apos;ll find a cozy atmosphere where time
                slows down. Whether you&apos;re journaling by the window,
                catching up with an old friend, or savoring a quiet moment alone,
                every detail — from the ceramic cups to the curated playlist —
                is meant to make you feel at home.
              </p>
            </div>

            <ul className="grid sm:grid-cols-3 gap-6">
              {values.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="heading-card text-base! text-foreground ">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{item.text}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
