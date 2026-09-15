import { useRef, useEffect, useState } from 'react';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // IntersectionObserver: automatically pause video when out of viewport to save mobile CPU/battery
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              /* Autoplay handled gracefully */
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section id="hero" className="py-12 md:py-20 px-4 text-center max-w-3xl mx-auto">
      <p className="text-[#c9a84c] text-[10px] md:text-xs font-medium uppercase tracking-[0.35em] mb-4 md:mb-6">
        Mega Pack Católico · Edição 2026
      </p>

      <h1 className="text-[28px] sm:text-[36px] md:text-[50px] font-normal text-[#f0d78c] mb-6 leading-[1.15] tracking-tight font-serif">
        +500 Arquivos STL de arte sacra prontos para você{' '}
        <span className="italic text-white">imprimir hoje</span>, vender amanhã e fazer parte da
        comunidade católica que fatura com <span className="italic text-[#c9a84c]">fé</span>
      </h1>

      <div className="flex justify-center mb-8 md:mb-10">
        <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl shadow-black border border-[#c9a84c]/30 bg-[#1a1a1a]">
          <video
            ref={videoRef}
            poster="/images/video-poster.webp"
            className="w-full h-full object-cover"
            controls
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            width={480}
            height={854}
          >
            <source src="/videos/video-sacro-fast.mp4" type="video/mp4" />
            <source src="/videos/video-sacro-vertical.mp4" type="video/mp4" />
            Seu navegador não suporta a reprodução de vídeo.
          </video>

          {/* Quick Audio Unmute Badge for Mobile */}
          <button
            type="button"
            onClick={toggleMute}
            className="absolute bottom-3 right-3 bg-black/75 hover:bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg border border-[#c9a84c]/30 backdrop-blur-sm flex items-center gap-1.5 cursor-pointer z-10 transition-colors"
            title={isMuted ? 'Ativar Som' : 'Silenciar'}
          >
            {isMuted ? (
              <>
                <span>🔇</span>
                <span className="text-[11px] text-[#f0d78c] font-medium">Toque p/ som</span>
              </>
            ) : (
              <>
                <span>🔊</span>
                <span className="text-[11px] text-white">Com áudio</span>
              </>
            )}
          </button>
        </div>
      </div>

      <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto">
        Enquanto você espera, pessoas da comunidade católica já estão faturando com esses mesmos
        modelos. Deixe sua impressora 3D imprimir arte sacra e comece a transformar imagens de fé em
        renda todos os dias.
      </p>

      <button
        type="button"
        onClick={onCtaClick}
        className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-sm sm:text-base py-4 sm:py-5 px-8 rounded-xl shadow-xl shadow-[#c9a84c]/10 transition-all uppercase tracking-[0.2em] cursor-pointer active:scale-98"
      >
        Quero Garantir Meu Acesso
      </button>
    </section>
  );
}
