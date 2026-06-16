type Props = {
  image: string;
  title: string;
  description: string;
  tag?: string;
};

export function ProductCard({ image, title, description, tag }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-md border border-border bg-card transition-all hover:border-foreground/30 hover:shadow-[var(--shadow-card)]">
      {/* Image Wrapper */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {tag && (
          <span className="absolute left-3 top-3 rounded-sm bg-background/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur">
            {tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-base font-bold text-foreground line-clamp-1">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </article>
  );
}

export default ProductCard;
