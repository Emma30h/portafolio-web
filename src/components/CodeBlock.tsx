"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import graphql from "react-syntax-highlighter/dist/esm/languages/prism/graphql";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("graphql", graphql);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("dockerfile", docker);

export function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // sin acceso al portapapeles (permiso denegado o contexto no seguro); no hacemos nada
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-[#1e1e1e]">
      <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-1.5">
        <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 text-[11px] text-zinc-500 transition-colors hover:text-zinc-300"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "0.75rem",
          background: "transparent",
          fontSize: "12.5px",
          lineHeight: 1.6,
        }}
        codeTagProps={{ style: { fontFamily: "var(--font-geist-mono, monospace)" } }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
