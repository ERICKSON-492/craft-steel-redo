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
      className={`relative w-full border-b border-[var(--border)] bg-[var(--background)] p-6 md:p-8 font-body select-none ${
        isCenter ? "mx-auto text-center flex flex-col items-center" : "text-left"
      }`}
    >
      {/* Structural Crosshair Coordinates */}
      <div 
        className={`absolute top-0 font-mono text-[8px] text-[var(--border)] tracking-widest ${
          isCenter ? "left-1/2 -translate-x-1/2" : "left-6 md:left-8"
        }`}
      >
        // SEC_MATRIX_ALIGN.[{align.toUpperCase()}]
      </div>

      {/* Eyebrow Panel Data */}
      {eyebrow && (
        <div className={`flex items-center gap-2 mb-3 ${isCenter ? "justify-center" : ""}`}>
          <span className="h-1 w-1 bg-[var(--accent)] animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
            {eyebrow}
          </span>
        </div>
      )}

      {/* Screen-Dominating Block Typography */}
      <h2 
        className={`font-display text-2xl font-black uppercase tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl lg:text-5xl leading-[0.95] max-w-4xl ${
          isCenter ? "text-center" : ""
        }`}
      >
        {title}
      </h2>

      {/* Computational Description Block Panel */}
      {description && (
        <div 
          className={`w-full border-t border-[var(--border)] mt-6 pt-4 ${
            isCenter ? "max-w-xl flex justify-center" : "max-w-2xl"
          }`}
        >
          <p 
            className={`font-mono text-xs uppercase tracking-wider text-[var(--muted-foreground)] leading-relaxed ${
              isCenter ? "text-center" : ""
            }`}
          >
            {description}
          </p>
        </div>
      )}

      {/* Bottom Corner Marker Stamp */}
      <div 
        className={`absolute bottom-0 font-mono text-[7px] text-[var(--border)] px-1.5 ${
          isCenter ? "right-1/2 translate-x-1/2" : "right-4"
        }`}
      >
        ▲ STAINLESS_SYS_SPEC_2026
      </div>
    </div>
  );
}
