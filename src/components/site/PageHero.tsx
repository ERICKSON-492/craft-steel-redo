type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional CTA button */
  cta?: {
    text: string;
    href: string;
  };
  /** Optional background gradient color (oklch format) */
  accentColor?: string;
  /** Reduce padding for smaller sections */
  compact?: boolean;
  className?: string;
};

export function PageHero({ 
  eyebrow, 
  title, 
  description, 
  cta, 
  accentColor = "0.7 0.19 45",
  compact = false,
  className = ""
}: Props) {
  return (
    <section 
      className={`
        steel-surface brushed-line relative overflow-hidden 
        border-b border-white/5
        ${className}
      `}
      aria-labelledby={eyebrow ? undefined : "hero-title"}
    >
      {/* Gradient overlay - memoized styles for better performance */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(800px circle at 80% 0%, oklch(${accentColor} / 0.35), transparent 60%)`,
        }}
        aria-hidden="true"
      />
      
      <div className={`
        container-page relative 
        ${compact ? 'py-12 md:py-16' : 'py-20 md:py-28'}
      `}>
        {/* Eyebrow */}
        {eyebrow && (
          <div 
            className="eyebrow !text-accent text-sm font-semibold uppercase tracking-wider"
            id="hero-eyebrow"
          >
            {eyebrow}
          </div>
        )}
        
        {/* Title */}
        <h1 
          id="hero-title"
          className={`
            mt-4 font-display font-bold tracking-tight text-white
            ${compact ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-4xl sm:text-5xl md:text-6xl'}
            max-w-3xl
          `}
        >
          {title}
        </h1>
        
        {/* Description */}
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {description}
          </p>
        )}
        
        {/* Optional CTA */}
        {cta && (
          <div className="mt-8">
            <a
              href={cta.href}
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors"
            >
              {cta.text}
              <svg 
                className="ml-2 h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
