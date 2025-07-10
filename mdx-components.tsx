import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import Image from 'next/image'
const Question = ({ children }: { children: React.ReactNode }) => (
  <div className="text-lg font-medium text-blue-700 my-4">
    {children}
  </div>
);

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Question,
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-primary">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-secondary">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-medium mt-5 mb-2 text-muted-foreground">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold mt-4 mb-2">{children}</h4>,

    // Paragraph
    p: ({ children }) => <p className="mb-4 leading-7 text-base">{children}</p>,

    // Lists
    ul: ({ children }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,

    // Code blocks & inline code
    code: ({ children }) => (
      <code className="bg-muted text-sm px-1 py-0.5 rounded font-mono">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-muted p-4 rounded overflow-x-auto text-sm text-foreground">
        <code>{children}</code>
      </pre>
    ),

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-muted-foreground">
        {children}
      </blockquote>
    ),

    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border border-border text-left text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-accent">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-border hover:bg-accent transition">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 font-semibold text-foreground">{children}</th>
    ),
    td: ({ children }) => <td className="px-4 py-2">{children}</td>,

    // Links
    a: ({ href, children }) => {
      const isInternal = href?.startsWith('/')
      if (isInternal) {
        return (
          <Link href={href} className="text-blue-600 underline hover:text-blue-800">
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </a>
      )
    },

    // Images
    img: (props) => (
      <img {...props} className="my-4 mx-auto max-w-full rounded-lg shadow-sm" />
    ),

    // Horizontal rule
    hr: () => <hr className="my-6 border-t-2 border-black" />,

    // Strong/emphasis
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,

    ...components,
  }
}
