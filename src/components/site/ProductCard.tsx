type Props = {
  image: string;
  title: string;
  description: string;
  tag?: string;
};

export function ProductCard({ image, title, description, tag }: Props) {
  return (
    <article className="group relative flex flex-col bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">

      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--muted)]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Tag Badge */}
        {tag && (
          <span className="absolute top-4 left-4 z-20 inline-flex px-3 py-1.5 bg-[var(--foreground)] rounded-full text-white text-xs font-medium">
            {tag}
          </span>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="font-display text-lg font-bold text-[var(--foreground)] leading-tight mb-2">
            {title}
          </h3>

          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            {description}
          </p>
        </div>

        {/* View Details Link */}
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--foreground)] transition-colors group/link"
        >
          <span>View Details</span>
          <span className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

export default ProductCard;
