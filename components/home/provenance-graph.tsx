"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowDown, ShieldCheck } from "lucide-react";

type Node = { id: string; x: number; y: number; title: string; kind: string; tone: "entity" | "action" | "resource" };

const W = 150;
const H = 54;
const NODES: Node[] = [
  { id: "amina", x: 10, y: 24, title: "Amina", kind: "Entity · person", tone: "entity" },
  { id: "model", x: 10, y: 160, title: "Image model", kind: "Entity · AI", tone: "entity" },
  { id: "write", x: 205, y: 24, title: "Writes the story", kind: "Action · create", tone: "action" },
  { id: "gen", x: 205, y: 160, title: "Generates image", kind: "Action · generate", tone: "action" },
  { id: "story", x: 400, y: 92, title: "Published story", kind: "Resource", tone: "resource" },
];

const EDGES = [
  { d: `M${10 + W} ${24 + H / 2} H205`, delay: 0.5 },
  { d: `M${10 + W} ${160 + H / 2} H205`, delay: 0.7 },
  { d: `M${205 + W} ${24 + H / 2} C 380 ${24 + H / 2}, 370 ${92 + H / 2 - 10}, 400 ${92 + H / 2 - 10}`, delay: 1.1 },
  { d: `M${205 + W} ${160 + H / 2} C 380 ${160 + H / 2}, 370 ${92 + H / 2 + 10}, 400 ${92 + H / 2 + 10}`, delay: 1.3 },
];

const toneStyle = {
  entity: { fill: "#ffffff", stroke: "#e7e5e4", dot: "#f74581" },
  action: { fill: "#fafaf9", stroke: "#e7e5e4", dot: "#813380" },
  resource: { fill: "#ffffff", stroke: "#a5b4fc", dot: "#1a237e" },
};

/** Who did what, and who gets credit: the Entity, Action, Attribution model. */
export function ProvenanceGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const shown = Boolean(inView || reduce);
  const t = (delay: number) => (reduce ? { duration: 0 } : { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const });

  return (
    <div ref={ref} className="rounded-2xl border border-border bg-white p-4 shadow-card sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-stone-900">A provenance record</p>
        <div className="flex items-center gap-3 text-[11px] text-stone-500">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
            Entity
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-plum" />
            Action
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo" />
            Resource
          </span>
        </div>
      </div>

      {/* Wide screens: the graph. */}
      <svg viewBox="0 0 560 240" className="mt-5 hidden w-full sm:block" style={{ fontFamily: "inherit" }} role="img" aria-label="Amina writes the story and an image model generates an image; both lead to the published story, with Amina credited as author and the model as AI assisted.">
        {EDGES.map((edge, i) => (
          <motion.path
            key={i}
            d={edge.d}
            fill="none"
            stroke="#d6d3d1"
            strokeWidth={1.25}
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: shown ? 1 : 0 }}
            transition={t(edge.delay)}
          />
        ))}
        <motion.g initial={{ opacity: reduce ? 1 : 0 }} animate={{ opacity: shown ? 1 : 0 }} transition={t(1.6)}>
          <rect x={366} y={58} width={50} height={18} rx={9} fill="#fce7f3" />
          <text x={391} y={70.5} textAnchor="middle" fontSize={10} fill="#831843">Author</text>
          <rect x={358} y={188} width={66} height={18} rx={9} fill="#e0e7ff" />
          <text x={391} y={200.5} textAnchor="middle" fontSize={10} fill="#312e81">AI assisted</text>
        </motion.g>
        {NODES.map((node, i) => {
          const style = toneStyle[node.tone];
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 6 }}
              animate={shown ? { opacity: 1, y: 0 } : undefined}
              transition={t(0.1 + i * 0.15)}
            >
              <rect x={node.x} y={node.y} width={W} height={H} rx={12} fill={style.fill} stroke={style.stroke} />
              <circle cx={node.x + 16} cy={node.y + 20} r={3} fill={style.dot} />
              <text x={node.x + 26} y={node.y + 24} fontSize={13} fill="#1c1917" fontWeight={500}>
                {node.title}
              </text>
              <text x={node.x + 26} y={node.y + 41} fontSize={10.5} fill="#78716c">
                {node.kind}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Phones: the same record, stacked. */}
      <ol className="mt-4 space-y-2 sm:hidden">
        {[
          ["Amina", "Entity · person", "writes the story"],
          ["Image model", "Entity · AI", "generates an image"],
        ].map(([who, kind, what]) => (
          <li key={who} className="rounded-xl border border-border bg-page px-3 py-2.5 text-sm">
            <span className="font-medium text-stone-900">{who}</span>{" "}
            <span className="text-stone-500">({kind}) {what}</span>
          </li>
        ))}
        <li className="flex justify-center text-stone-300">
          <ArrowDown className="h-4 w-4" strokeWidth={1.75} />
        </li>
        <li className="rounded-xl border border-indigo-200 bg-white px-3 py-2.5 text-sm">
          <span className="font-medium text-stone-900">Published story</span>{" "}
          <span className="text-stone-500">credits Amina as author and the model as AI assisted</span>
        </li>
      </ol>

      <motion.div
        initial={{ opacity: reduce ? 1 : 0 }}
        animate={{ opacity: shown ? 1 : 0 }}
        transition={t(1.9)}
        className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 text-[12.5px] text-stone-600"
      >
        <span className="flex items-center gap-1.5 text-stone-900">
          <ShieldCheck className="h-4 w-4 text-emerald-600" strokeWidth={1.75} />
          Verifiable record
        </span>
        <span>AI use disclosed</span>
        <span>Licence: CC BY 4.0</span>
        <span>Credit follows contribution</span>
      </motion.div>
    </div>
  );
}
