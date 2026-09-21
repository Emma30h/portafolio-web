import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer
      id="contacto"
      className="scroll-mt-24 border-t border-zinc-200 dark:border-zinc-800"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          ¿Hablamos?
        </h2>
        <p className="max-w-md text-zinc-600 dark:text-zinc-400">
          Estoy abierto a nuevas oportunidades y proyectos. Escribime por
          cualquiera de estos medios.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            <Mail size={16} />
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
          >
            <FaGithub size={16} />
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
          >
            <FaLinkedin size={16} />
            LinkedIn
          </a>
        </div>

        <p className="pt-8 text-xs text-zinc-400 dark:text-zinc-600">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
