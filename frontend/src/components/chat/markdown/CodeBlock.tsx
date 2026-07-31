import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  language: string;
  value: string;
}

export default function CodeBlock({
  language,
  value,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-slate-700">

      <div className="flex items-center justify-between bg-slate-800 px-4 py-2">

        <span className="text-sm font-medium text-slate-300">
          {language || "text"}
        </span>

        <button
          onClick={copyCode}
          className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-slate-300 transition hover:bg-slate-700"
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

      <SyntaxHighlighter
        language={language}
        style={oneDark}
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