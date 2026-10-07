"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const STEPS = [
  { title: "Concept", body: "What it is and how it works" },
  { title: "Demonstration", body: "See it done on real work" },
  { title: "Tinkering", body: "Try it in a safe sandbox" },
  { title: "Application", body: "Use it on your own tasks" },
];

/** How every session runs, drawn as a line that fills in when seen. */
export function SessionModel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const shown = inView || reduce;

  return (
    <div ref={ref} className="mt-3 rounded-2xl border border-border bg-page p-5">
      <p className="text-sm font-medium text-stone-900">How a session runs</p>
      <div className="relative mt-5">
        <div className="absolute left-[11px] right-[11px] top-[11px] hidden h-px bg-stone-200 sm:block" />
        <motion.div
          className="brand-rule absolute left-[11px] top-[11px] hidden h-px origin-left sm:block"
          style={{ right: 11 }}
          initial={{ scaleX: reduce ? 1 : 0 }}
          animate={{ scaleX: shown ? 1 : 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <ol className="relative grid gap-4 sm:grid-cols-4 sm:gap-3">
          {STEPS.map((step, index) => (
            <motion.li
              key={step.title}
              className="flex items-start gap-3 sm:block"
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 6 }}
              animate={shown ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: reduce ? 0 : 0.25 + index * 0.3, duration: 0.45 }}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white font-mono text-[11px] text-stone-600">
                {index + 1}
              </span>
              <span className="block sm:mt-3">
                <span className="block text-sm font-medium text-stone-900">{step.title}</span>
                <span className="mt-0.5 block text-[13px] leading-5 text-stone-500">{step.body}</span>
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
      <p className="mt-5 text-xs text-stone-500">No programming experience needed.</p>
    </div>
  );
}
