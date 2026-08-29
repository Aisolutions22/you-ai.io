import { motion } from "framer-motion";
import { ReactNode } from "react";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const Heading = as === "h1" ? motion.h1 : motion.h2;
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <Heading
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="font-display mt-4 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-5 text-base text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  );
}

export function Section({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto max-w-7xl px-6 py-24 sm:py-32 ${className}`}>
      {children}
    </section>
  );
}
