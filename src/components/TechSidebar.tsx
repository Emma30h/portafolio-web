"use client";

import { useEffect } from "react";
import { ExternalLink, X } from "lucide-react";
import type { Skill } from "@/data/skills";
import { CodeBlock } from "@/components/CodeBlock";

export function TechSidebar({
  skill,
  onClose,
}: {
  skill: Skill | null;
  onClose: () => void;
}) {
  const isOpen = !!skill;

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-zinc-200 bg-white p-6 shadow-xl transition-transform duration-300 dark:border-zinc-800 dark:bg-zinc-950 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {skill && (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
                  <skill.icon className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {skill.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="shrink-0 rounded-full border border-zinc-200 p-2 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
              >
                <X size={18} />
              </button>
            </div>

            <a
              href={skill.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Documentación oficial
              <ExternalLink size={14} />
            </a>

            <p className="mt-6 leading-relaxed text-zinc-700 dark:text-zinc-300">
              {skill.details.summary}
            </p>

            <section className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                Características clave
              </h3>
              <ul className="mt-3 space-y-2">
                {skill.details.keyFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Ejemplo
              </h3>
              <div className="mt-3">
                <CodeBlock
                  language={skill.details.codeExample.language}
                  code={skill.details.codeExample.code}
                />
              </div>
            </section>

            <section className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Ventajas
              </h3>
              <ul className="mt-3 space-y-2">
                {skill.details.pros.map((pro) => (
                  <li
                    key={pro}
                    className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {pro}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                Desventajas
              </h3>
              <ul className="mt-3 space-y-2">
                {skill.details.cons.map((con) => (
                  <li
                    key={con}
                    className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                    {con}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Cómo se combina con otras tecnologías
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {skill.details.combinesWith}
              </p>
            </section>
          </>
        )}
      </aside>
    </div>
  );
}
