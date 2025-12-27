"use client";

import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  animate = true,
  ...props
}) {
  const Component = animate ? motion.div : "div";

  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <Component
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${className}`}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
}
