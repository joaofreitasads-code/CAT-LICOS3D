import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ArrowCarouselProps {
  images: string[];
  className?: string;
}

export default function ArrowCarousel({ images, className = '' }: ArrowCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className={`relative w-full max-w-5xl mx-auto my-4 group ${className}`}>
      {/* Botão Seta Esquerda */}
      <button
        type="button"
        onClick={() => handleScroll('left')}
        aria-label="Ver anterior"
        className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[#c9a84c]/40 bg-[#0d0d0d]/90 text-[#f0d78c] hover:bg-[#c9a84c] hover:text-[#0d0d0d] transition-all flex items-center justify-center shadow-xl backdrop-blur-md cursor-pointer active:scale-95"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Máscaras de desfoque nas laterais */}
      <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent z-10 pointer-events-none" />

      {/* Carrossel navegável por setas e swipe */}
      <div
        ref={containerRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth py-3 px-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="flex-shrink-0 w-[190px] sm:w-[240px] h-[245px] sm:h-[310px] rounded-[20px] overflow-hidden border border-[#c9a84c]/25 bg-[#1a1a1a] shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.02] hover:border-[#c9a84c]/50"
          >
            <img
              src={src}
              alt={`Luminária 3D ${idx + 1}`}
              loading="lazy"
              decoding="async"
              width={240}
              height={310}
              className="w-full h-full object-cover block select-none"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Botão Seta Direita */}
      <button
        type="button"
        onClick={() => handleScroll('right')}
        aria-label="Ver próximo"
        className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[#c9a84c]/40 bg-[#0d0d0d]/90 text-[#f0d78c] hover:bg-[#c9a84c] hover:text-[#0d0d0d] transition-all flex items-center justify-center shadow-xl backdrop-blur-md cursor-pointer active:scale-95"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
