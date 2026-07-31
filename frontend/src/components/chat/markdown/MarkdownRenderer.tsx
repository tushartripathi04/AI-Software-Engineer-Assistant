import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children }) {
          const match = /language-(\w+)/.exec(className || "");

          if (match) {
            return (
              <CodeBlock
                language={match[1]}
                value={String(children).replace(/\n$/, "")}
              />
            );
          }

          return (
            <code className="rounded-md bg-slate-800 px-1.5 py-0.5 font-mono text-sm text-slate-200">
              {children}
            </code>
          );
        },

        pre({ children }) {
          return <>{children}</>;
        },

        h1({ children }) {
          return (
            <h1 className="mb-4 mt-6 text-3xl font-bold text-white">
              {children}
            </h1>
          );
        },

        h2({ children }) {
          return (
            <h2 className="mb-3 mt-5 text-2xl font-semibold text-white">
              {children}
            </h2>
          );
        },

        h3({ children }) {
          return (
            <h3 className="mb-2 mt-4 text-xl font-semibold text-white">
              {children}
            </h3>
          );
        },

        p({ children }) {
          return (
            <p className="mb-4 leading-7 text-slate-300">
              {children}
            </p>
          );
        },

        ul({ children }) {
          return (
            <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-300">
              {children}
            </ul>
          );
        },

        ol({ children }) {
          return (
            <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-300">
              {children}
            </ol>
          );
        },

        li({ children }) {
          return <li>{children}</li>;
        },

        blockquote({ children }) {
          return (
            <blockquote className="my-4 border-l-4 border-violet-500 bg-slate-900 px-4 py-2 italic text-slate-300">
              {children}
            </blockquote>
          );
        },

        table({ children }) {
          return (
            <div className="my-4 overflow-x-auto">
              <table className="w-full border-collapse border border-slate-700">
                {children}
              </table>
            </div>
          );
        },

        thead({ children }) {
          return (
            <thead className="bg-slate-800">
              {children}
            </thead>
          );
        },

        tbody({ children }) {
          return (
            <tbody className="bg-slate-900">
              {children}
            </tbody>
          );
        },

        tr({ children }) {
          return (
            <tr className="border-b border-slate-700">
              {children}
            </tr>
          );
        },

        th({ children }) {
          return (
            <th className="border border-slate-700 px-4 py-2 text-left font-semibold text-white">
              {children}
            </th>
          );
        },

        td({ children }) {
          return (
            <td className="border border-slate-700 px-4 py-2 text-slate-300">
              {children}
            </td>
          );
        },

        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-300"
            >
              {children}
            </a>
          );
        },

        hr() {
          return (
            <hr className="my-6 border-slate-700" />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}