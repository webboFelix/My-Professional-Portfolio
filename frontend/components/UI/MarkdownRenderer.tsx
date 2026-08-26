"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import mermaid from "mermaid";

interface MarkdownRendererProps {
  content: string;
  accent?: "green" | "cyan";
}

function normalizeMarkdown(content: string) {
  // Uploaded write-ups sometimes keep several list items in one paragraph.
  return content.replace(/\s+-\s+(?=[A-Z0-9])/g, "\n- ");
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy code"
      className="markdown-copy-button"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function MermaidDiagram({ source }: { source: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramId = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let active = true;
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "dark",
    });

    mermaid
      .render(diagramId.current, source)
      .then(({ svg }) => {
        if (active && containerRef.current)
          containerRef.current.innerHTML = svg;
      })
      .catch(() => {
        if (active && containerRef.current) {
          containerRef.current.textContent =
            "Unable to render Mermaid diagram.";
        }
      });

    return () => {
      active = false;
    };
  }, [source]);

  return (
    <div
      ref={containerRef}
      className="markdown-mermaid"
      role="img"
      aria-label="Mermaid diagram"
    />
  );
}

export function MarkdownRenderer({
  content,
  accent = "green",
}: MarkdownRendererProps) {
  const components: Components = {
    code({ className, children, ...props }) {
      const language = /language-(\w+)/.exec(className || "")?.[1];
      const value = String(children).replace(/\n$/, "");

      if (language === "mermaid") return <MermaidDiagram source={value} />;
      if (!className) return <code {...props}>{children}</code>;

      return (
        <div className="markdown-code-block">
          <div className="markdown-code-toolbar">
            <span>{language || "code"}</span>
            <CopyButton value={value} />
          </div>
          <pre>
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    },
    img({ src, alt }) {
      return (
        <img
          src={src}
          alt={alt || "Markdown image"}
          loading="lazy"
          className="markdown-image"
        />
      );
    },
    a({ href, children }) {
      return (
        <a href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    },
  };

  return (
    <article className={`markdown-renderer markdown-accent-${accent}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={components}
      >
        {normalizeMarkdown(content)}
      </ReactMarkdown>
    </article>
  );
}
