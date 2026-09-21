"use client";

import { useEffect, useId, useRef, useState, type PointerEvent, type WheelEvent } from "react";
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

function clampZoom(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +value.toFixed(2)));
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const rawId = useId().replace(/:/g, "-");
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOrigin = useRef({ startX: 0, startY: 0, panX: 0, panY: 0 });

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

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  function openModal() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsOpen(true);
  }

  function zoomIn() {
    setZoom((z) => clampZoom(z + ZOOM_STEP));
  }

  function zoomOut() {
    setZoom((z) => clampZoom(z - ZOOM_STEP));
  }

  function resetView() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function onWheel(e: WheelEvent<HTMLDivElement>) {
    e.preventDefault();
    setZoom((z) => clampZoom(z - e.deltaY * 0.001));
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    setIsDragging(true);
    dragOrigin.current = {
      startX: e.clientX,
      startY: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    const dx = e.clientX - dragOrigin.current.startX;
    const dy = e.clientY - dragOrigin.current.startY;
    setPan({ x: dragOrigin.current.panX + dx, y: dragOrigin.current.panY + dy });
  }

  function onPointerUp() {
    setIsDragging(false);
  }

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

  const baseId = `mermaid-${rawId}`;
  const inlineSvg = svg.replaceAll(baseId, `${baseId}-inline`);
  const modalSvg = svg.replaceAll(baseId, `${baseId}-modal`);

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={openModal}
          className="absolute right-2 top-2 z-10 inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-zinc-500"
        >
          <Maximize2 size={14} />
          Ver en grande
        </button>
        <div
          className="mermaid-diagram flex justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: inlineSvg }}
        />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="flex items-center justify-between px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={zoomOut}
                disabled={zoom <= MIN_ZOOM}
                aria-label="Alejar"
                className="rounded-full border border-zinc-600 p-2 text-zinc-200 transition-colors hover:bg-zinc-800 disabled:opacity-40"
              >
                <ZoomOut size={18} />
              </button>
              <span className="min-w-12 text-center text-sm tabular-nums text-zinc-300">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={zoomIn}
                disabled={zoom >= MAX_ZOOM}
                aria-label="Acercar"
                className="rounded-full border border-zinc-600 p-2 text-zinc-200 transition-colors hover:bg-zinc-800 disabled:opacity-40"
              >
                <ZoomIn size={18} />
              </button>
              <button
                type="button"
                onClick={resetView}
                aria-label="Restablecer zoom"
                className="rounded-full border border-zinc-600 p-2 text-zinc-200 transition-colors hover:bg-zinc-800"
              >
                <RotateCcw size={16} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar"
              className="rounded-full border border-zinc-600 p-2 text-zinc-200 transition-colors hover:bg-zinc-800"
            >
              <X size={18} />
            </button>
          </div>

          <div
            className="flex-1 touch-none overflow-hidden select-none"
            onClick={(e) => e.stopPropagation()}
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <div
              className="flex h-full w-full items-center justify-center [&_svg]:h-auto [&_svg]:max-w-none"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transition: isDragging ? "none" : "transform 0.1s ease-out",
              }}
              dangerouslySetInnerHTML={{ __html: modalSvg }}
            />
          </div>

          <p className="px-4 pb-4 text-center text-xs text-zinc-500 sm:px-6">
            Rueda del mouse para zoom · arrastrar para mover · Esc para cerrar
          </p>
        </div>
      )}
    </>
  );
}
