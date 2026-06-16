type Props = {
  image: string;
  title: string;
  description: string;
  tag?: string;
};

export function ProductCard({ image, title, description, tag }: Props) {
  return (
    <article className="group relative bg-[var(--card)] border border-[var(--border)] transition-all duration-300 hover:border-[var(--accent)] flex flex-col font-body">
      
      {/* Decorative Corner Laser Coordinates */}
      <div className="absolute top-0 right-0 font-mono text-[8px] text-[var(--border)] px-1.5 py-0.5 select-none pointer-events-none group-hover:text-[var(--accent)] transition-colors">
        // GRID_NODE
      </div>

      {/* Image Block Sub-Assembly Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--navy-deep)] border-b border-[var(--border)] group-hover:border-[var(--accent)] transition-colors">
        {/* Architectural Blueprint Grayscale Filter Matte */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent z-10 opacity-60 mix-blend-multiply" />
        
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover filter grayscale contrast-[1.1] brightness-[0.7] transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:brightness-[0.85]"
        />

        {tag && (
          <span className="absolute left-0 bottom-0 z-20 bg-[var(--background)] border-tr border-t border-r border-[var(--border)] px-3 py-1 font-mono text-[9px] font-black uppercase tracking-widest text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
            {tag}
          </span>
        )}
      </div>

      {/* Content Data Panel */}
      <div className="p-5 flex-1 flex flex-col justify-between relative bg-[var(--background)]/40 group-hover:bg-[var(--muted)]/10 transition-colors">
        <div>
          {/* Static Item Matrix Identifier Index */}
          <div className="font-mono text-[9px] text-[var(--muted-foreground)] tracking-wider mb-2 uppercase block">
            ITEM_SPEC // [REF_04]
          </div>
          
          <h3 className="font-display text-base font-black uppercase tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
            {title}
          </h3>
          
          <p className="mt-2 font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wide leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Technical Call-to-Action Indicator Line */}
        <div className="mt-5 pt-3 border-t border-[var(--border)] group-hover:border-[var(--accent)] flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
          <span>SPECIFICATION_SHEET</span>
          <span className="text-[var(--accent)] transform translate-x-0 group-hover:translate-x-1 transition-transform">
            ➔
          </span>
        </div>
      </div>

      {/* Ground Laser Highlight Frame Anchor */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
    </article>
  );
}

export default ProductCard;
