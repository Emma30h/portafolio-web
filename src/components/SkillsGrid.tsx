"use client";

import { useState } from "react";
import { skillCategories, type Skill } from "@/data/skills";
import { TechSidebar } from "@/components/TechSidebar";

export function SkillsGrid() {
  const [selected, setSelected] = useState<Skill | null>(null);

  return (
    <>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {skillCategories.map((category) => (
          <div key={category.title}>
            <h3 className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => setSelected(skill)}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
                >
                  <skill.icon className="h-4 w-4" />
                  {skill.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <TechSidebar skill={selected} onClose={() => setSelected(null)} />
    </>
  );
}
