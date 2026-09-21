import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { getTechIcon } from "@/data/tech-icons";

const gradients = [
  "from-indigo-500 to-violet-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-rose-600",
];

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div
        className={`flex h-28 items-center justify-center bg-gradient-to-br text-3xl font-bold text-white/90 ${
          gradients[index % gradients.length]
        }`}
      >
        {project.title.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="flex items-center gap-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {project.title}
          <ArrowUpRight
            size={16}
            className="text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {project.shortDescription}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.stack.slice(0, 4).map((tech) => {
            const Icon = getTechIcon(tech);
            return (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
              >
                {Icon && <Icon className="h-3 w-3" />}
                {tech}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
