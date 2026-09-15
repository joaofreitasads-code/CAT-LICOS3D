interface InfiniteMarqueeProps {
  images: string[];
  direction?: 'left' | 'right';
  className?: string;
}

export default function InfiniteMarquee({
  images,
  direction = 'left',
  className = '',
}: InfiniteMarqueeProps) {
  // Duplicar a lista para garantir o loop infinito 100% contínuo e sem emendas
  const marqueeList = [...images, ...images];
  const animClass = direction === 'right' ? 'animate-marquee-right' : 'animate-marquee-left';

  return (
    <div className={`relative w-full max-w-[1140px] mx-auto my-3 overflow-hidden rounded-2xl select-none ${className}`}>
      {/* Máscara de gradiente suave nas bordas laterais */}
      <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[#141216] via-[#141216]/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[#141216] via-[#141216]/60 to-transparent z-10 pointer-events-none" />

      {/* Trilha animada continuamente por CSS - sem pausas por toque ou hover */}
      <div className={`${animClass} gap-3 sm:gap-4 py-2 pointer-events-none`}>
        {marqueeList.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="flex-shrink-0 w-[180px] sm:w-[240px] h-[235px] sm:h-[310px] rounded-[20px] overflow-hidden border border-[#c9a84c]/25 bg-[#1a1a1a] shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          >
            <img
              src={src}
              alt={`Modelo STL Católico ${idx + 1}`}
              loading="lazy"
              decoding="async"
              width={240}
              height={310}
              className="w-full h-full object-cover block pointer-events-none select-none"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
