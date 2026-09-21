"use client";

import { useEffect, useId, useState } from "react";

export function MermaidDiagram({ chart }: { chart: string }) {
  const rawId = useId().replace(/:/g, "-");
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      mermaid.initialize({
        startOnLoad: false,
        theme: prefersDark ? "dark" : "default",
        securityLevel: "strict",
        fontFamily: "var(--font-sans)",
      });

      try {
        const { svg } = await mermaid.render(`mermaid-${rawId}`, chart);
        if (!cancelled) setSvg(svg);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("No se pudo renderizar el diagrama.");
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, rawId]);

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!svg) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-zinc-400 dark:text-zinc-600">
        Cargando diagrama…
      </div>
    );
  }

  return (
    <div
      className="mermaid-diagram flex justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
