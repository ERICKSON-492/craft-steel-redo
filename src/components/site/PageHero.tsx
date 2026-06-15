type Props = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="steel-surface brushed-line relative overflow-hidden border-b border-white/5">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(800px circle at 80% 0%, oklch(0.7 0.19 45 / 0.35), transparent 60%)",
        }}
      />
      <div className="container-page relative py-20 md:py-28">
        <div className="eyebrow !text-accent">{eyebrow}</div>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl max-w-3xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
