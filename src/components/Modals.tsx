import { useEffect } from 'react';
import { CHECKOUT_URLS } from '../data';

interface ModalsProps {
  isUpsellOpen: boolean;
  isExitOpen: boolean;
  onCloseUpsell: () => void;
  onCloseExit: () => void;
}

export default function Modals({
  isUpsellOpen,
  isExitOpen,
  onCloseUpsell,
  onCloseExit,
}: ModalsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isUpsellOpen) onCloseUpsell();
        if (isExitOpen) onCloseExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUpsellOpen, isExitOpen, onCloseUpsell, onCloseExit]);

  return (
    <>
      {/* Upsell Modal */}
      {isUpsellOpen && (
        <div
          id="upsell"
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onCloseUpsell();
          }}
        >
          <div className="bg-[#1a1a1a] max-w-lg w-full rounded-2xl shadow-2xl shadow-black relative border border-[#c9a84c]/40 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={onCloseUpsell}
              aria-label="Fechar"
              className="absolute -top-4 -right-4 w-10 h-10 bg-[#0d0d0d] text-[#c9a84c] rounded-full flex items-center justify-center border border-[#c9a84c]/40 shadow-md text-xl z-10 hover:bg-[#c9a84c] hover:text-[#0d0d0d] transition-colors cursor-pointer"
            >
              ×
            </button>
            <div className="py-6 px-6 border-b border-[#c9a84c]/15 text-center">
              <p className="text-[#c9a84c] text-[10px] uppercase tracking-[0.35em] mb-2 font-semibold">
                Oferta Exclusiva
              </p>
              <h3 className="text-xl md:text-2xl font-normal text-[#f0d78c] tracking-tight font-serif">
                Leve o Plano Completo por apenas R$ 18,90
              </h3>
            </div>
            <div className="p-8 md:p-10 text-center">
              <p className="text-gray-300 text-base mb-6 leading-relaxed">
                Faça o upgrade e receba{' '}
                <strong className="text-[#f0d78c]">todos os 6 bônus</strong>, acesso vitalício e
                envio imediato.
              </p>
              <p className="text-gray-500 line-through text-sm mb-1">De R$ 37,90</p>
              <p className="text-3xl font-light text-[#f0d78c] mb-6 font-serif">Por R$ 18,90</p>
              <a
                href={CHECKOUT_URLS.upgrade18}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 hover:bg-green-500 text-white font-bold text-sm py-4 rounded-xl shadow-xl uppercase tracking-[0.2em] transition-colors mb-3 active:scale-98"
              >
                Sim, quero o Completo por R$ 18,90
              </a>
              <a
                href={CHECKOUT_URLS.basico}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs py-4 rounded-xl uppercase tracking-[0.2em] transition-colors active:scale-98"
              >
                Não, prefiro o Básico por R$ 10,90
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Exit Intent Modal */}
      {isExitOpen && (
        <div
          id="exitPop"
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onCloseExit();
          }}
        >
          <div className="bg-[#1a1a1a] max-w-lg w-full rounded-2xl shadow-2xl shadow-black relative border border-[#c9a84c]/40 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={onCloseExit}
              aria-label="Fechar"
              className="absolute -top-4 -right-4 w-10 h-10 bg-[#0d0d0d] text-[#c9a84c] rounded-full flex items-center justify-center border border-[#c9a84c]/40 shadow-md text-xl z-10 hover:bg-[#c9a84c] hover:text-[#0d0d0d] transition-colors cursor-pointer"
            >
              ×
            </button>
            <div className="py-6 px-6 border-b border-[#c9a84c]/15 text-center">
              <p className="text-[#c9a84c] text-[10px] uppercase tracking-[0.35em] mb-2 font-semibold">
                Espere!
              </p>
              <h3 className="text-xl md:text-2xl font-normal text-[#f0d78c] tracking-tight font-serif">
                Temos uma condição especial para você
              </h3>
            </div>
            <div className="p-8 md:p-10 text-center">
              <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
                Antes de sair, aproveite o Plano Básico por apenas R$ 10,90 e tenha acesso imediato ao
                conteúdo.
              </p>
              <a
                href={CHECKOUT_URLS.basico}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-sm py-5 rounded-xl shadow-xl shadow-[#c9a84c]/20 uppercase tracking-[0.2em] transition-colors mb-4 active:scale-98"
              >
                Sim, quero garantir por R$ 10,90
              </a>
              <button
                type="button"
                onClick={onCloseExit}
                className="text-gray-500 hover:text-gray-300 underline text-xs mt-2 cursor-pointer"
              >
                Não, obrigado. Quero sair da página.
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
