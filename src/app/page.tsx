import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillsGrid } from "@/components/SkillsGrid";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <section className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 pb-20 pt-24 sm:pt-32">
        <p className="text-sm font-medium uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Portfolio
        </p>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          {siteConfig.role}
        </p>
        <p className="max-w-xl text-zinc-500 dark:text-zinc-500">
          {siteConfig.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link
            href="#proyectos"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Ver proyectos
            <ArrowRight size={16} />
          </Link>
          <a
            href={siteConfig.cvHref}
            download
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
          >
            <Download size={16} />
            Descargar CV
          </a>
        </div>
      </section>

      <section
        id="sobre-mi"
        className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16"
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Sobre mí
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Soy {siteConfig.role.toLowerCase()}. Me interesa construir sistemas
          completos: desde el modelo de datos y la lógica de negocio hasta la
          interfaz que usan las personas todos los días. Disfruto tanto
          escribir código como entender los datos que ese código termina
          generando.
        </p>
      </section>

      <section id="skills" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Skills & tecnologías
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Hacé clic en una tecnología para ver para qué se usa, ventajas,
          desventajas y cómo se combina con el resto del stack.
        </p>
        <SkillsGrid />
      </section>

      <section
        id="proyectos"
        className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16"
      >
        <div className="flex items-end justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Proyectos
          </h2>
          <Link
            href="/proyectos"
            className="text-sm font-medium text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
          >
            Ver todos
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
