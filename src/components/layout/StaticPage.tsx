import { ReactNode } from "react";

export function StaticPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="container-shell py-20 md:py-28">
      <article className="mx-auto max-w-4xl rounded-3xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-8 md:p-12">
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
        <div className="prose prose-slate mt-6 max-w-none dark:prose-invert">{children}</div>
      </article>
    </section>
  );
}
