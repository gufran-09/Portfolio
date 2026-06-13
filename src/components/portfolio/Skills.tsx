"use client";
import React from "react";
import { motion } from "framer-motion";
import { MarqueeTitle } from "./MarqueeTitle";

export function Skills() {
  return (
    <section
      id="skills"
      className="section bg-section relative w-full flex flex-col justify-center items-center pointer-events-auto"
      style={{ minHeight: "100vh", paddingBottom: "128px" }}
    >
      <MarqueeTitle text="TECH STACK" direction="right" />
      <div className="container relative z-10 text-center flex flex-col justify-start items-center h-full pt-12 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="space-y-4"
        >
          <div className="section-label">01 / TECH STACK</div>
          <h2 className="h1">My Tech Stack.</h2>
          <p
            className="body max-w-xl mx-auto text-center"
            style={{ color: "var(--color-text-2)" }}
          >
            Hover over the 3D keycaps or press any keys on your keyboard to
            reveal details about my skills and experience.
          </p>
          <div className="flex justify-center items-center gap-2 mt-8">
            <span
              className="pill animate-pulse"
              style={{
                borderColor: "var(--color-accent-border)",
                color: "var(--color-accent-text)",
                background: "var(--color-accent-dim)",
              }}
            >
              🎮 Interactive 3D Model
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
