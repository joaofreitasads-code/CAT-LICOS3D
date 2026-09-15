import { useRef, useEffect, useState, useCallback, type MouseEvent } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [feedbackIcon, setFeedbackIcon] = useState<'play' | 'pause' | null>(null);
  const [showControls, setShowControls] = useState(true);
  const hideTimeoutRef = useRef<number | null>(null);
  const feedbackTimeoutRef = useRef<number | null>(null);

  // Trigger brief visual feedback in the center when clicking video
  const triggerFeedback = useCallback((type: 'play' | 'pause') => {
    setFeedbackIcon(type);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = window.setTimeout(() => {
      setFeedbackIcon(null);
    }, 700);
  }, []);

  // Format time (mm:ss)
  const formatTime = (time: number) => {
    if (isNaN(time) || time < 0) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 1. REQUISITO: Quando a pessoa clicar em qualquer lugar da página, ativar o áudio direto
  useEffect(() => {
    const handleGlobalInteraction = (e: Event) => {
      const video = videoRef.current;
      if (!video) return;

      // Se o som ainda estiver mudo, ativa o som imediatamente no primeiro toque/clique da página
      if (video.muted) {
        // Se o clique foi no botão de mute ou pause específico, deixe eles controlarem
        const target = e.target as HTMLElement | null;
        if (target?.closest('button[data-no-global-unmute]')) return;

        video.muted = false;
        video.volume = 1;
        setIsMuted(false);
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    window.addEventListener('click', handleGlobalInteraction, { capture: true });
    window.addEventListener('touchstart', handleGlobalInteraction, { capture: true, passive: true });

    return () => {
      window.removeEventListener('click', handleGlobalInteraction, { capture: true });
      window.removeEventListener('touchstart', handleGlobalInteraction, { capture: true });
    };
  }, []);

  // 2. Pause when scrolled far out of view, resume when back
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Se o usuário não tinha pausado intencionalmente, continue tocando
            if (!video.ended && video.paused && isPlaying) {
              video.play().catch(() => {});
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isPlaying]);

  // Video time and buffer tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(0));
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // 3. REQUISITO: Clicar no meio do vídeo pausa; clicar de novo despausa (e se estava mudo, liga o som)
  const handleCenterClick = (e: MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      // Se estava mudo, liga o áudio e garante que está tocando
      video.muted = false;
      video.volume = 1;
      setIsMuted(false);
      video.play().catch(() => {});
      setIsPlaying(true);
      triggerFeedback('play');
      return;
    }

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        triggerFeedback('play');
      }).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
      triggerFeedback('pause');
    }
  };

  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleProgressBarClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const bar = progressBarRef.current;
    const video = videoRef.current;
    if (!bar || !video || !duration) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = newPercent * duration;
    setCurrentTime(video.currentTime);
  };

  const toggleFullscreen = (e: MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      container.requestFullscreen().catch(() => {});
    }
  };

  // Show/Hide controls with interaction
  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferPercent = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <section id="hero" className="py-10 md:py-16 px-4 text-center max-w-4xl mx-auto">
      <p className="text-[#c9a84c] text-[10px] md:text-xs font-semibold uppercase tracking-[0.35em] mb-4 md:mb-5">
        Mega Pack Católico · Edição 2026
      </p>

      <h1 className="text-[26px] sm:text-[34px] md:text-[46px] font-normal text-[#f0d78c] mb-6 leading-[1.2] tracking-tight font-serif">
        +500 Arquivos STL de arte sacra prontos para você{' '}
        <span className="italic text-white">imprimir hoje</span>, vender amanhã e fazer parte da
        comunidade católica que fatura com <span className="italic text-[#c9a84c]">fé</span>
      </h1>

      <div className="flex justify-center mb-8 md:mb-10">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className="group relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black border border-[#c9a84c]/30 bg-[#111] select-none"
        >
          {/* O Vídeo com Pré-carregamento Instantâneo Mobile */}
          <video
            ref={videoRef}
            poster="/images/video-poster-horizontal.webp"
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            loop={false}
            preload="auto"
            width={854}
            height={480}
          >
            <source src="/videos/video-horizontal-opt.mp4" type="video/mp4" />
            <source src="/videos/video-horizontal.mp4" type="video/mp4" />
            <source src="https://i.imgur.com/fXhXaEd.mp4" type="video/mp4" />
            Seu navegador não suporta a reprodução de vídeo.
          </video>

          {/* Área de Clique Central (Toggle Play / Pause com 1 toque) */}
          <button
            type="button"
            aria-label={isPlaying ? 'Pausar vídeo' : 'Assistir vídeo'}
            onClick={handleCenterClick}
            className="absolute inset-0 w-full h-full cursor-pointer bg-transparent border-none flex items-center justify-center z-10"
          >
            {/* Overlay persistente quando o vídeo estiver pausado */}
            {!isPlaying && (
              <div className="bg-black/60 backdrop-blur-[2px] w-full h-full flex flex-col items-center justify-center p-4 transition-all duration-300">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#c9a84c] to-[#f0d78c] text-[#0d0d0d] flex items-center justify-center shadow-2xl shadow-black pl-1 hover:scale-110 active:scale-95 transition-transform">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
                </div>
                <p className="mt-4 text-white text-xs sm:text-sm font-semibold tracking-wide bg-black/80 px-4 py-1.5 rounded-full border border-[#c9a84c]/30 shadow-lg">
                  Vídeo pausado · Toque no centro para continuar
                </p>
              </div>
            )}

            {/* Animação rápida de clique (Ripple feedback) */}
            {feedbackIcon && isPlaying && (
              <div className="pointer-events-none w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/75 text-[#f0d78c] border border-[#c9a84c]/40 flex items-center justify-center shadow-2xl animate-ping duration-500">
                {feedbackIcon === 'play' ? (
                  <Play className="w-8 h-8 fill-current ml-1" />
                ) : (
                  <Pause className="w-8 h-8 fill-current" />
                )}
              </div>
            )}
          </button>

          {/* Badge Informativo de Áudio no Topo (Some quando o som estiver ativo) */}
          {isMuted && (
            <div
              onClick={toggleMute}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-black/85 text-white text-[11px] sm:text-xs px-3.5 py-1.5 rounded-full border border-[#c9a84c] backdrop-blur-md flex items-center gap-2 cursor-pointer shadow-lg animate-pulse hover:animate-none hover:bg-black"
            >
              <VolumeX className="w-4 h-4 text-[#f0d78c]" />
              <span className="text-[#f0d78c] font-semibold">Toque para ouvir com som</span>
            </div>
          )}

          {/* Botão Superior Direito de Som Rápido */}
          <button
            type="button"
            data-no-global-unmute="true"
            onClick={toggleMute}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-black/75 hover:bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg border border-[#c9a84c]/40 backdrop-blur-sm flex items-center gap-1.5 cursor-pointer transition-colors shadow-lg"
            title={isMuted ? 'Ativar Som' : 'Silenciar Som'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-red-400" />
                <span className="text-[11px] text-[#f0d78c] font-medium hidden xs:inline">Sem som</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-green-400" />
                <span className="text-[11px] text-white font-medium hidden xs:inline">Com áudio</span>
              </>
            )}
          </button>

          {/* Barra de Controles Inferior Otimizada */}
          <div
            className={`absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-6 pb-2 px-3 sm:px-4 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Barra de Progresso / Scrub */}
            <div
              ref={progressBarRef}
              onClick={handleProgressBarClick}
              className="group/bar relative w-full h-1.5 sm:h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden mb-2 sm:mb-3"
            >
              {/* Barra de Buffer carregado */}
              <div
                className="absolute inset-y-0 left-0 bg-white/30 rounded-full transition-all duration-200"
                style={{ width: `${bufferPercent}%` }}
              />
              {/* Barra de Reprodução dourada */}
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#c9a84c] to-[#f0d78c] rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Linha de Ações Inferiores */}
            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Play / Pause Pequeno */}
                <button
                  type="button"
                  data-no-global-unmute="true"
                  onClick={handleCenterClick}
                  className="p-1 rounded hover:text-[#f0d78c] transition-colors cursor-pointer"
                  title={isPlaying ? 'Pausar' : 'Reproduzir'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  )}
                </button>

                {/* Mute / Unmute */}
                <button
                  type="button"
                  data-no-global-unmute="true"
                  onClick={toggleMute}
                  className="p-1 rounded hover:text-[#f0d78c] transition-colors cursor-pointer"
                  title={isMuted ? 'Ativar Som' : 'Silenciar'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0d78c]" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </button>

                {/* Tempo Decorrido / Duração */}
                <span className="text-[11px] sm:text-xs text-gray-300 font-mono tracking-tighter">
                  {formatTime(currentTime)} / {formatTime(duration || 89)}
                </span>
              </div>

              {/* Botão de Tela Cheia */}
              <button
                type="button"
                data-no-global-unmute="true"
                onClick={toggleFullscreen}
                className="p-1 rounded hover:text-[#f0d78c] transition-colors cursor-pointer"
                title="Tela Cheia"
              >
                <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
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

