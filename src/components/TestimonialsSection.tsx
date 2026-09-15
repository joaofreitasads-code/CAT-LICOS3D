import { useState, useEffect, useRef, useCallback, type TouchEvent } from 'react';
import { TESTIMONIALS } from '../data';

interface TestimonialsSectionProps {
  onCtaClick: () => void;
}

export default function TestimonialsSection({ onCtaClick }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const total = TESTIMONIALS.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = window.setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    setIsPaused(false);
  };

  return (
    <section id="depoimentos" className="py-20 px-4 bg-[#0d0d0d] border-t border-[#c9a84c]/10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[#c9a84c] text-[10px] uppercase tracking-[0.35em] mb-4 font-semibold">
          Depoimentos
        </p>
        <h3 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-12 tracking-tight font-serif">
          Quem já está imprimindo e vendendo arte sacra
        </h3>

        <div
          className="relative overflow-hidden rounded-2xl touch-pan-y"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            id="depTrack"
            className="flex transition-transform duration-500 ease-out"
            style={{
              willChange: 'transform',
              transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
            }}
          >
            {TESTIMONIALS.map((src, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                <img
                  src={src}
                  alt={`Depoimento ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  width={512}
                  height={800}
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl shadow-black border border-[#c9a84c]/15 object-cover"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Anterior"
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1a1a1a]/80 border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d0d0d] transition-colors flex items-center justify-center cursor-pointer text-xl select-none"
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Próximo"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1a1a1a]/80 border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d0d0d] transition-colors flex items-center justify-center cursor-pointer text-xl select-none"
          >
            ›
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6" id="depDots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para depoimento ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentIndex ? 'w-8 bg-[#c9a84c]' : 'w-2 bg-[#c9a84c]/30'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onCtaClick}
          className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-base py-5 px-8 mt-14 rounded-xl shadow-xl shadow-[#c9a84c]/10 uppercase tracking-[0.2em] transition-all cursor-pointer active:scale-98"
        >
          Quero Fazer Parte
        </button>
      </div>
    </section>
  );
}
