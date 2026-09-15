import { useRef, useEffect, useState, useCallback, type MouseEvent } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Iniciar tentando áudio ativado
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [feedbackIcon, setFeedbackIcon] = useState<'play' | 'pause' | null>(null);
  const feedbackTimeoutRef = useRef<number | null>(null);

  // Animação sutil de feedback ao clicar
  const triggerFeedback = useCallback((type: 'play' | 'pause') => {
    setFeedbackIcon(type);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = window.setTimeout(() => {
      setFeedbackIcon(null);
    }, 500);
  }, []);

  // 1. REQUISITO: O VÍDEO PRECISA COMEÇAR COM SOM AO ABRIR A PÁGINA
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Tentar reproduzir COM SOM imediatamente ao carregar
    video.muted = false;
    video.volume = 1;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((_error) => {
          // Se o navegador móvel restringir autoplay com som antes do 1º toque:
          // Inicia a reprodução e ativa o áudio no primeiro toque/clique em qualquer lugar da tela
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    }

    // Ao menor toque ou clique na página, ativa o som imediatamente
    const handleImmediateAudioActivation = () => {
      if (video.muted) {
        video.muted = false;
        video.volume = 1;
        setIsMuted(false);
      }
      if (video.paused && isPlaying) {
        video.play().catch(() => {});
      }
    };

    const events = ['click', 'touchstart', 'touchend', 'mousedown', 'keydown'];
    events.forEach((evt) => {
      window.addEventListener(evt, handleImmediateAudioActivation, { capture: true, passive: true });
    });

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleImmediateAudioActivation, { capture: true });
      });
    };
  }, [isPlaying]);

  // Sincronizar estados do elemento de vídeo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // 2. REQUISITO: Clicar no vídeo pausa; clicar de novo despausa e toca com som
  const handleVideoClick = (e: MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    // Sempre assegurar que o som está ativado
    video.muted = false;
    video.volume = 1;
    setIsMuted(false);

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
        <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black border border-[#c9a84c]/30 bg-[#111] select-none">
          {/* O Vídeo aberto sem barrinhas no meio */}
          <video
            ref={videoRef}
            poster="/images/video-poster-horizontal.webp"
            className="w-full h-full object-cover"
            autoPlay
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

          {/* Área de Clique Total: pausar e retornar o vídeo diretamente com som */}
          <button
            type="button"
            aria-label={isPlaying ? 'Pausar vídeo' : 'Retornar vídeo com som'}
            onClick={handleVideoClick}
            className="absolute inset-0 w-full h-full cursor-pointer bg-transparent border-none flex items-center justify-center z-10"
          >
            {/* Ícone de Play elegante apenas quando estiver pausado */}
            {!isPlaying && (
              <div className="bg-black/50 backdrop-blur-[2px] w-full h-full flex flex-col items-center justify-center p-4 transition-all duration-200">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#c9a84c] to-[#f0d78c] text-[#0d0d0d] flex items-center justify-center shadow-2xl shadow-black pl-1 hover:scale-105 active:scale-95 transition-transform">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
                </div>
                <p className="mt-3 text-white text-xs sm:text-sm font-semibold tracking-wide bg-black/75 px-4 py-1.5 rounded-full border border-[#c9a84c]/40 shadow-lg">
                  Toque para continuar assistindo com som
                </p>
              </div>
            )}

            {/* Feedback rápido visual ao pausar/despausar */}
            {feedbackIcon && isPlaying && (
              <div className="pointer-events-none w-14 h-14 rounded-full bg-black/70 text-[#f0d78c] border border-[#c9a84c]/50 flex items-center justify-center shadow-2xl animate-ping duration-300">
                <Play className="w-7 h-7 fill-current ml-0.5" />
              </div>
            )}
          </button>

          {/* Botão sutil de controle de som no canto superior (não fica no meio nem embaixo) */}
          <button
            type="button"
            onClick={toggleMute}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-black/75 hover:bg-black/90 text-white text-xs px-2.5 py-1.5 rounded-lg border border-[#c9a84c]/40 backdrop-blur-sm flex items-center gap-1.5 cursor-pointer transition-colors shadow-lg"
            title={isMuted ? 'Ativar Som' : 'Silenciar'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-[#f0d78c]" />
                <span className="text-[11px] text-[#f0d78c] font-medium hidden xs:inline">Ativar som</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-green-400" />
                <span className="text-[11px] text-white font-medium hidden xs:inline">Som ativo</span>
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

