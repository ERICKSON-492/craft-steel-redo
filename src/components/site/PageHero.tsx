type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
};

export function PageHero({ eyebrow, title, description, backgroundImage }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      {/* Background Image Layer */}
      {backgroundImage && (
        <div className="absolute inset-0 opacity-20">
          <img
            src={backgroundImage}
            alt=""
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        </div>
      )}
      
      {/* Content Container */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {eyebrow && (
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        )}
        
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        
        {description && (
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

export default PageHero;
