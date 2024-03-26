import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-6 text-4xl font-medium">{children}</h1>
    ),
    ...components,
  };
}
