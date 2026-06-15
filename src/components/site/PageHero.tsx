"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Play, Sparkles, Zap, Shield, Cloud } from "lucide-react";

type Props = {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string;
  cta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  /** Video URL for background or inline player */
  videoUrl?: string;
  /** Image URL for background */
  backgroundImage?: string;
  /** Show animated gradient background */
  animatedGradient?: boolean;
  /** Show floating elements animation */
  floatingElements?: boolean;
  /** Features to display as badges */
  features?: string[];
  /** Trusted brands/companies logos */
  logos?: { name: string; logoUrl: string }[];
  /** Accent color in oklch format */
  accentColor?: string;
};

export function ModernHero({
  eyebrow,
  title,
  description,
  cta,
  secondaryCta,
  videoUrl,
  backgroundImage,
  animatedGradient = true,
  floatingElements = true,
  features,
  logos,
  accentColor = "0.7 0.19 45",
}: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!floatingElements) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [floatingElements]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Animated Gradient Background */}
      {animatedGradient && (
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -inset-[10px] opacity-30 blur-3xl animate-pulse"
            style={{
              background: `radial-gradient(circle at 30% 30%, oklch(${accentColor} / 0.4), transparent 50%),
                          radial-gradient(circle at 70% 70%, oklch(0.6 0.25 260 / 0.3), transparent 50%)`,
              animation: "gradientShift 8s ease infinite",
            }}
          />
        </div>
      )}

      {/* Floating Elements */}
      {floatingElements && (
        <>
          <div 
            className="absolute top-20 left-[10%] h-72 w-72 rounded-full bg-white/5 blur-3xl animate-float"
            style={{ 
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: "transform 0.3s ease-out"
            }}
          />
          <div 
            className="absolute bottom-20 right-[10%] h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-float-delayed"
            style={{ 
              transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
              transition: "transform 0.3s ease-out"
            }}
          />
        </>
      )}

      {/* Background Video/Image */}
      {videoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          style={{ filter: "blur(2px)" }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      
      {backgroundImage && !videoUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[90vh] flex-col items-center justify-center text-center">
          {/* Eyebrow with animated border */}
          {eyebrow && (
            <div className="mb-6 animate-fade-in-up">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
                <Sparkles className="mr-2 h-3.5 w-3.5 text-accent" />
                {eyebrow}
              </span>
            </div>
          )}

          {/* Main Title */}
          <h1 className="animate-fade-in-up animation-delay-100 max-w-5xl bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="animate-fade-in-up animation-delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              {description}
            </p>
          )}

          {/* CTA Buttons */}
          {(cta || secondaryCta) && (
            <div className="animate-fade-in-up animation-delay-300 mt-10 flex flex-col sm:flex-row gap-4">
              {cta && (
                <a
                  href={cta.href}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-accent px-8 py-3 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
                >
                  <span className="relative z-10 flex items-center">
                    {cta.text}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-accent to-accent/80 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              )}
              
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 hover:scale-105"
                >
                  {secondaryCta.text}
                  {secondaryCta.text.includes("Watch") && (
                    <Play className="ml-2 h-4 w-4" />
                  )}
                </a>
              )}
            </div>
          )}

          {/* Features Grid */}
          {features && features.length > 0 && (
            <div className="animate-fade-in-up animation-delay-400 mt-16 flex flex-wrap justify-center gap-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-sm"
                >
                  <Zap className="h-3.5 w-3.5 text-accent" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Trusted By Section */}
          {logos && logos.length > 0 && (
            <div className="animate-fade-in-up animation-delay-500 mt-20 w-full">
              <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-white/50">
                Trusted by industry leaders
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {logos.map((logo, idx) => (
                  <div key={idx} className="opacity-50 transition-opacity hover:opacity-100">
                    <img
                      src={logo.logoUrl}
                      alt={logo.name}
                      className="h-8 w-auto grayscale transition-all hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="h-10 w-6 rounded-full border-2 border-white/30">
          <div className="mx-auto mt-2 h-2 w-2 rounded-full bg-white/50" />
        </div>
      </div>

      {/* Styles for animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 2s;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
