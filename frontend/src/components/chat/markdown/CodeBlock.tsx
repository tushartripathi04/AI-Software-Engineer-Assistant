import { useEffect, useState } from "react";

import { Copy, Check } from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  language: string;
  value: string;
}

export default function CodeBlock({
  language,
  value,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      setDarkMode(
        root.classList.contains("dark")
      );
    };

    updateTheme();

    const observer =
      new MutationObserver(updateTheme);

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  async function copyCode() {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div
      className="
        my-5
        overflow-hidden
        rounded-xl
        border border-theme
      "
    >

      {/* Header */}
      <div
        className="
          flex items-center justify-between
          border-b border-theme
          bg-tertiary
          px-4 py-2
        "
      >
        <span className="text-sm font-medium text-secondary">
          {language || "text"}
        </span>

        <button
          type="button"
          onClick={copyCode}
          className="
            flex items-center gap-2
            rounded-lg
            px-2 py-1
            text-sm
            text-secondary
            transition
            hover:bg-[var(--bg-primary)]
            hover:text-primary
          "
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={darkMode ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "14px",
        }}
        wrapLongLines={false}
      >
        {value}
      </SyntaxHighlighter>

    </div>
  );
}