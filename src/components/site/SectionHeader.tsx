type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, align = "left" }: Props) {
  const isCenter = align === "center";

  return (
    <div
      className={`w-full bg-[var(--background)] py-12 md:py-16 px-6 md:px-8 ${
        isCenter ? "text-center flex flex-col items-center" : "text-left"
      }`}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <div className={`mb-4 ${isCenter ? "justify-center" : ""}`}>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] font-medium">
            {eyebrow}
          </span>
        </div>
      )}

      {/* Title */}
      <h2
        className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1] max-w-5xl ${
          isCenter ? "" : ""
        }`}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={`mt-6 text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl ${
            isCenter ? "" : ""
          }`}
        >
          {description}
        </p>
      )}

      {/* Subtle Bottom Border */}
      <div className="mt-8 md:mt-12 w-full h-[1px] bg-gradient-to-r from-[var(--border)] via-[var(--border)] to-transparent" />
    </div>
  );
}
