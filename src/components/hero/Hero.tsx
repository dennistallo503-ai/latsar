import BackgroundGlow from "./BackgroundGlow";
import HeroMap from "./HeroMap";
import AnimatedGrid from "./AnimatedGrid";
import FloatingParticles from "./FloatingParticles";
import AnimatedLines from "./AnimatedLines";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export default function Hero({
  title,
  subtitle,
  description,
}: HeroProps) {
  return (
    <section
  className="
    relative
    h-[35vh]
    min-h-[220px]
    max-h-[350px]
    overflow-hidden
    bg-[#020817]
  "
>
      <BackgroundGlow />
      <AnimatedGrid />
      <FloatingParticles />
      <HeroMap />
      <AnimatedLines />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/70 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">

        <div className="max-w-2xl">

          {subtitle && (
            <span className="text-sky-400 uppercase tracking-[0.3em]">
              {subtitle}
            </span>
          )}

          <h1 className="mt-4 text-4xl font-bold text-white lg:text-6xl">
            {title}
          </h1>

          {description && (
            <p className="mt-4 max-w-xl text-slate-300">
              {description}
            </p>
          )}

        </div>

      </div>

    </section>
  );
}