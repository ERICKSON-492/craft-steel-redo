type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
};

export function PageHero({ eyebrow, title, description, backgroundImage }: Props) {
  return (
    <section className="relative w-full bg-[var(--background)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-0">

        {/* Left Column: Text Content */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">

          {eyebrow && (
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">
              {eyebrow}
            </p>
          )}

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--foreground)] mb-6 leading-[1.1] max-w-2xl">
            {title}
          </h1>

          {description && (
            <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Right Column: Background Image */}
        <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-full overflow-hidden bg-[var(--navy-deep)]">
          {backgroundImage ? (
            <>
              {/* Subtle dark overlay gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-l from-[var(--navy-deep)]/60 via-[var(--navy-deep)]/30 to-transparent z-10 pointer-events-none" />

              {/* Image with subtle hover zoom effect */}
              <img
                src={backgroundImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                loading="eager"
              />
            </>
          ) : (
            /* Minimal fallback when no image provided */
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--border)]/20 rounded-lg mx-auto mb-4" />
                <p className="text-sm text-[var(--muted-foreground)]">No image available</p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Responsive: Stack vertically on smaller screens */}
      <style>{`
        @media (max-width: 1024px) {
          /* Image appears below text on mobile */
        }
      `}</style>
    </section>
  );
}

export default PageHero;
