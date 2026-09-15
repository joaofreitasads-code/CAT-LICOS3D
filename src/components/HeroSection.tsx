import { useRef, useEffect, useState, type MouseEvent } from 'react';
import { Play, Volume2, VolumeX, AlertCircle, RotateCcw } from 'lucide-react';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => setHasError(true);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    // Tentativa suave de autoplay mudo (100% suportado pelos navegadores)
    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
    });

    // Pausar vídeo ao rolar para fora da tela (economiza CPU/bateria em mobile)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      // Ao tocar para dar play, ativa o áudio
      video.muted = false;
      setIsMuted(false);
      video.play().then(() => setIsPlaying(true)).catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play();
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const retryVideo = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
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

      <div className="flex flex-col items-center justify-center mb-8 md:mb-10">
        {/* Container do Vídeo */}
        <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl shadow-black border border-[#c9a84c]/30 bg-[#1a1a1a] group">
          <video
            ref={videoRef}
            poster="/images/vsl-poster.webp"
            className="w-full h-full object-cover cursor-pointer"
            onClick={togglePlay}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            width={480}
            height={854}
          >
            <source src="https://i.imgur.com/dD3JkuZ.mp4" type="video/mp4" />
            <source src="/videos/vsl-catolica.mp4" type="video/mp4" />
            Seu navegador não suporta a reprodução de vídeo.
          </video>

          {/* Botão Play Central quando Pausado */}
          {!isPlaying && !hasError && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Dar Play no Vídeo"
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#c9a84c]/90 hover:bg-[#f0d78c] text-[#0d0d0d] flex items-center justify-center shadow-2xl transition-transform transform active:scale-90 z-20 cursor-pointer"
            >
              <Play className="w-8 h-8 fill-current ml-1" />
            </button>
          )}

          {/* Fallback de Erro de Vídeo no Navegador */}
          {hasError && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center z-25">
              <AlertCircle className="w-10 h-10 text-[#c9a84c] mb-3" />
              <p className="text-white font-medium text-sm mb-4">
                Ocorreu uma instabilidade ao reproduzir o vídeo.
              </p>
              <button
                type="button"
                onClick={retryVideo}
                className="bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-xs py-2.5 px-4 rounded-lg flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tentar Novamente</span>
              </button>
            </div>
          )}

          {/* Controle Rápido de Áudio */}
          <button
            type="button"
            onClick={toggleMute}
            className="absolute bottom-3 right-3 bg-black/80 hover:bg-black text-white text-xs px-3 py-1.5 rounded-lg border border-[#c9a84c]/30 backdrop-blur-sm flex items-center gap-1.5 cursor-pointer z-20 transition-colors"
            title={isMuted ? 'Ativar Som' : 'Silenciar'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-[#f0d78c]" />
                <span className="text-[11px] text-[#f0d78c] font-medium">Toque p/ som</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-green-400" />
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
