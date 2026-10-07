"use client";

import { useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Cloud, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

const SIDES = {
  local: {
    label: "On your computer",
    icon: Laptop,
    note: "Nothing leaves the machine",
    items: [
      { name: "Qwen 3.5", kind: "Text" },
      { name: "Whisper", kind: "Transcription" },
      { name: "Kokoro", kind: "Voice" },
      { name: "Image model", kind: "Images" },
      { name: "Your files", kind: "Retrieval" },
    ],
  },
  cloud: {
    label: "In the cloud",
    icon: Cloud,
    note: "When you choose to go further",
    items: [
      { name: "OpenAI", kind: "Frontier" },
      { name: "Anthropic", kind: "Frontier" },
      { name: "Google", kind: "Frontier" },
      { name: "Mistral", kind: "Open and hosted" },
      { name: "Agents and workflows", kind: "Always on" },
    ],
  },
} as const;

type Side = keyof typeof SIDES;

/**
 * Local and cloud as one workspace: the switch moves between them on its own
 * while in view, and either side can be picked by hand.
 */
export function LocalCloudVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [side, setSide] = useState<Side>("local");
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (!inView || reduce || pinned) return;
    const timer = setInterval(() => setSide((s) => (s === "local" ? "cloud" : "local")), 3200);
    return () => clearInterval(timer);
  }, [inView, reduce, pinned]);

  return (
    <div ref={ref} className="rounded-2xl border border-border bg-white p-4 shadow-card sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-stone-900">One workspace, two places to run</p>
        <div role="tablist" aria-label="Where AI runs" className="relative flex rounded-lg bg-stone-100 p-0.5 text-xs">
          {(Object.keys(SIDES) as Side[]).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={side === key}
              onClick={() => {
                setSide(key);
                setPinned(true);
              }}
              className={cn(
                "relative z-10 rounded-md px-2.5 py-1 transition-colors",
                side === key ? "font-medium text-stone-900" : "text-stone-500 hover:text-stone-800",
              )}
            >
              {side === key ? (
                <motion.span
                  layoutId="side-pill"
                  className="absolute inset-0 -z-10 rounded-md bg-white shadow-card"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              {key === "local" ? "Local" : "Cloud"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {(Object.keys(SIDES) as Side[]).map((key) => {
          const data = SIDES[key];
          const active = side === key;
          const Icon = data.icon;
          return (
            <motion.div
              key={key}
              animate={{ opacity: active ? 1 : 0.45, scale: active ? 1 : 0.985 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "rounded-xl border p-4 transition-colors duration-500",
                active
                  ? key === "local"
                    ? "border-pink-200 bg-pink-50/60"
                    : "border-indigo-200 bg-indigo-50/60"
                  : "border-border bg-page",
              )}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-stone-900">
                <Icon className="h-4 w-4 text-stone-500" strokeWidth={1.75} />
                {data.label}
              </div>
              <ul className="mt-3 space-y-1.5">
                {data.items.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-2 text-[13px]">
                    <span className="text-stone-800">{item.name}</span>
                    <span className="text-stone-400">{item.kind}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-stone-200/70 pt-2.5 text-xs text-stone-500">{data.note}</p>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-stone-500">
        Your agents, projects and knowledge follow the mode you choose.
      </p>
    </div>
  );
}
