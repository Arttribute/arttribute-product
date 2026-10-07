"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowUp,
  BookOpen,
  Check,
  FileText,
  FolderClosed,
  Library,
  Lock,
  MessageSquare,
  Plus,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTION = "Summarise the Q3 board pack and flag anything confidential.";
const ANSWER =
  "Revenue grew 18% on the quarter, led by the Nairobi pilot. Two items are marked confidential: the supplier renegotiation and the hiring plan. I kept both out of the shared summary.";
const FILES = ["board-pack-q3.pdf", "budget-2026.xlsx", "minutes-sep.docx"];

/**
 * Product preview: Agent Commons desktop in Local mode, with the
 * Wi-Fi off, answering from files on the computer with an on-device model.
 * It plays once; with reduced motion it renders the finished state.
 */
export function AppPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const reduce = useReducedMotion();
  const [playStage, setStage] = useState(0);
  const [playWords, setWords] = useState(0);
  const total = ANSWER.split(" ").length;
  const stage = reduce ? 4 : playStage;
  const words = reduce ? total : playWords;

  useEffect(() => {
    if (reduce || !inView) return;
    const timers = [
      setTimeout(() => setStage(1), 300),
      setTimeout(() => setStage(2), 1100),
      setTimeout(() => setStage(3), 3100),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduce, inView]);

  useEffect(() => {
    if (reduce || playStage !== 3) return;
    if (playWords >= total) {
      const timer = setTimeout(() => setStage(4), 250);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setWords((count) => count + 1), 55);
    return () => clearTimeout(timer);
  }, [reduce, playStage, playWords, total]);

  const answer = ANSWER.split(" ").slice(0, words).join(" ");

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-composer">
        {/* Title bar */}
        <div className="flex h-10 items-center gap-3 border-b border-stone-100 bg-stone-50/70 px-3.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-stone-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-200" />
          </div>
          <span className="hidden text-xs text-stone-500 sm:inline">Agent Commons</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] text-stone-500">
              <WifiOff className="h-3 w-3" strokeWidth={2} />
              Offline
            </span>
            <span className="flex rounded-lg bg-stone-100 p-0.5 text-[11px]">
              <span className="rounded-md px-2 py-0.5 text-stone-400">Cloud</span>
              <span className="rounded-md bg-white px-2 py-0.5 font-medium text-stone-900 shadow-card">Local</span>
            </span>
          </div>
        </div>

        <div className="flex h-[400px] sm:h-[420px]">
          {/* Sidebar */}
          <aside className="hidden w-44 shrink-0 flex-col gap-0.5 border-r border-stone-100 bg-page p-2.5 text-[12.5px] text-stone-600 sm:flex">
            <span className="mb-2 flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-stone-800 shadow-card">
              <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
              New session
            </span>
            {[
              { icon: MessageSquare, label: "Sessions" },
              { icon: FolderClosed, label: "Projects" },
              { icon: BookOpen, label: "Knowledge" },
              { icon: Library, label: "Library" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2 rounded-lg px-2.5 py-1.5">
                <Icon className="h-3.5 w-3.5 text-stone-400" strokeWidth={1.75} />
                {label}
              </span>
            ))}
            <p className="mb-1 mt-4 px-2.5 text-[11px] text-stone-400">Recent</p>
            <span className="truncate rounded-lg bg-accent px-2.5 py-1.5 text-stone-900">Board pack review</span>
            <span className="truncate px-2.5 py-1.5">Grant proposal draft</span>
            <span className="truncate px-2.5 py-1.5">Interview notes</span>
          </aside>

          {/* Session */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 space-y-4 overflow-hidden px-4 py-5 sm:px-6">
              <AnimatePresence>
                {stage >= 1 ? (
                  <motion.div
                    key="q"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-indigo-100 px-3.5 py-2 text-[13px] leading-5 text-stone-900"
                  >
                    {QUESTION}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {stage >= 2 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-2 text-[12.5px] text-stone-500"
                >
                  {stage === 2 ? (
                    <span className="text-shimmer">Reading {FILES.length} files on this computer…</span>
                  ) : (
                    <span className="flex flex-wrap items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-stone-400" strokeWidth={2} />
                      Read
                      {FILES.map((file) => (
                        <span
                          key={file}
                          className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-1.5 py-0.5 text-[11px] text-stone-600"
                        >
                          <FileText className="h-3 w-3" strokeWidth={1.75} />
                          {file}
                        </span>
                      ))}
                    </span>
                  )}
                </motion.div>
              ) : null}

              {stage >= 3 ? (
                <div className="max-w-[94%] text-[13.5px] leading-6 text-stone-800">
                  {answer}
                  {stage === 3 ? (
                    <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] rounded-full bg-indigo-400" />
                  ) : null}
                  <AnimatePresence>
                    {stage >= 4 ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ml-1 inline-flex gap-1 align-middle"
                      >
                        {[1, 2].map((n) => (
                          <span
                            key={n}
                            className="flex h-4 min-w-4 items-center justify-center rounded bg-stone-100 px-1 text-[10px] text-stone-600"
                          >
                            {n}
                          </span>
                        ))}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </div>
              ) : null}
            </div>

            {/* Composer */}
            <div className="shrink-0 px-3 pb-3 sm:px-5 sm:pb-4">
              <div className="rounded-2xl border border-stone-200 bg-white shadow-card">
                <div className="h-10 px-3 pt-2.5 text-[13px] text-stone-400">Ask about your files…</div>
                <div className="flex items-center justify-between px-2 pb-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="flex items-center gap-1.5 rounded-md bg-stone-100 px-2 py-1 text-[11px] text-stone-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Qwen 3.5 · on this device
                    </span>
                    <span className="hidden items-center gap-1 text-[11px] text-stone-400 sm:flex">
                      <Lock className="h-3 w-3" strokeWidth={2} />
                      Stays on this computer
                    </span>
                  </div>
                  <span className="rounded-lg bg-stone-900 p-1.5 text-white">
                    <ArrowUp className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The answer's sources, shown as it lands. */}
      <AnimatePresence>
        {stage >= 4 ? (
          <motion.div
            key="sources"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute -right-6 top-[44%] hidden w-64 rounded-xl border border-stone-200 bg-white/95 p-3 shadow-floating backdrop-blur lg:block xl:-right-12",
            )}
          >
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-stone-900">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
              Sources
            </p>
            <div className="mt-2 space-y-1.5 text-[11.5px] text-stone-600">
              <p className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="flex h-4 min-w-4 items-center justify-center rounded bg-stone-100 text-[10px]">1</span>
                  board-pack-q3.pdf
                </span>
                <span className="text-stone-400">p. 4</span>
              </p>
              <p className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="flex h-4 min-w-4 items-center justify-center rounded bg-stone-100 text-[10px]">2</span>
                  minutes-sep.docx
                </span>
                <span className="text-stone-400">§ 3</span>
              </p>
              <p className="flex items-center gap-1.5 border-t border-stone-100 pt-1.5 text-stone-400">
                <Lock className="h-3 w-3" strokeWidth={2} />
                Read on this computer. Nothing uploaded.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
