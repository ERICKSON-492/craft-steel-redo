type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
};

export function PageHero({ eyebrow, title, description, backgroundImage }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background)] font-body">
      
      {/* Background Matrix Blueprint Layer */}
      <div className="absolute inset-0 pointer-events-none brushed-line opacity-[0.15]" />
      
      {/* Structural bounding grid frame container matches the system framework layout */}
      <div className="container-page border-x border-[var(--border)] relative grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
        
        {/* Left Computational Panel: Structural Text Data Content */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--border)] z-10 relative">
          
          {/* Top Decorative Layout Crosshair */}
          <div className="absolute top-0 left-0 font-mono text-[9px] text-[var(--border)] select-none tracking-tighter">
            + SYS_HDR_LN_04
          </div>

          {eyebrow && (
            <div className="mb-6 flex items-center gap-3">
              <span className="h-1 w-1 bg-[var(--accent)]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
                {eyebrow}
              </p>
            </div>
          )}
          
          <h1 className="font-display text-4xl font-black uppercase tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl max-w-3xl leading-[0.95]">
            {title}
          </h1>
          
          {description && (
            <div className="mt-8 border-t border-[var(--border)] pt-6 max-w-xl">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted-foreground)] leading-relaxed">
                {description}
              </p>
            </div>
          )}
        </div>

        {/* Right Computational Panel: Industrial Imagery Viewport */}
        <div className="relative min-h-[240px] lg:min-h-full w-full bg-[var(--navy-deep)]/30 flex items-center justify-center overflow-hidden">
          
          {/* Image Overlay Grid Grid-Lines */}
          <div className="absolute inset-0 z-10 border-t lg:border-t-0 border-[var(--border)] pointer-events-none" />
          
          {backgroundImage ? (
            <>
              {/* Technical Blueprint Filter Matte */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--navy-deep)]/40 to-transparent mix-blend-multiply z-10" />
              <img
                src={backgroundImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center filter grayscale contrast-[1.15] brightness-[0.45] transition-all duration-500 hover:scale-[1.03]"
                loading="eager"
              />
            </>
          ) : (
            /* Terminal Fallback Data Container if no image provided */
            <div className="font-mono text-[10px] text-[var(--border)] uppercase tracking-widest p-8 text-center animate-pulse">
              [ NO_VISUAL_ASSET_LOADED // GRAPHICS_OFFLINE ]
            </div>
          )}

          {/* Asset Info Stamp */}
          <div className="absolute bottom-3 right-4 z-20 font-mono text-[9px] tracking-wider uppercase text-[var(--muted-foreground)] bg-[var(--background)] border border-[var(--border)] px-2 py-0.5">
            SYS_VIEW // ACQUISITION
          </div>
        </div>

      </div>
    </section>
  );
}

export default PageHero;
