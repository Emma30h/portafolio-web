import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projects";
import { MermaidDiagram } from "@/components/MermaidDiagram";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/proyectos/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectPage(
  props: PageProps<"/proyectos/[slug]">
) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/proyectos"
        className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
      >
        <ArrowLeft size={16} />
        Todos los proyectos
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {project.role}
      </p>
      <p className="mt-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        {project.summary}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
        >
          <FaGithub size={16} />
          Ver repositorio
        </a>
      )}

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Puntos destacados
        </h2>
        <ul className="mt-4 space-y-2">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex gap-3 text-zinc-700 dark:text-zinc-300"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              {h}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Arquitectura
        </h2>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">
          {project.architecture.description}
        </p>
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <MermaidDiagram chart={project.architecture.diagram} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Modelo de datos
        </h2>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">
          {project.dataModel.description}
        </p>
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <MermaidDiagram chart={project.dataModel.diagram} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Funcionalidades clave
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {project.features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
                {f.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
