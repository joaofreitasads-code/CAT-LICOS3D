import { GUIDE_ITEMS, LUM_CAROUSEL_IMAGES, PREMIUM_CAROUSEL_ROW1, PREMIUM_CAROUSEL_ROW2 } from '../data';
import InfiniteMarquee from './InfiniteMarquee';
import ArrowCarousel from './ArrowCarousel';

interface BonusSectionProps {
  onCtaClick: () => void;
}

export default function BonusSection({ onCtaClick }: BonusSectionProps) {
  return (
    <>
      {/* Bonus 1: Luminárias 3D - Carrossel Navegável por Setas */}
      <section id="bonus-luminarias" className="py-20 px-4 bg-[#0d0d0d] border-t border-[#c9a84c]/10">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block bg-[#c9a84c] text-[#0d0d0d] font-bold py-1.5 px-6 rounded-full uppercase text-[10px] tracking-[0.25em] mb-6">
            Bônus incluso
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-4 tracking-tight font-serif">
            E ainda tem um bônus especial…
          </h2>
          <h3 className="text-lg md:text-xl font-medium text-[#c9a84c] mb-4">
            Leve também o Pack de Luminárias 3D
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Além da coleção de arte sacra, você recebe modelos de luminárias para ampliar ainda mais seu catálogo.
          </p>

          <div className="mb-10">
            <ArrowCarousel images={LUM_CAROUSEL_IMAGES} />
          </div>

          <button
            type="button"
            onClick={onCtaClick}
            className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-base py-5 px-8 rounded-xl shadow-xl shadow-[#c9a84c]/10 uppercase tracking-[0.2em] transition-all cursor-pointer active:scale-98"
          >
            Quero Meus Bônus
          </button>
        </div>
      </section>

      {/* Bonus Exclusivo: Artes Sacras Premium - Carrossel Infinito */}
      <section id="premium" className="py-20 px-4 bg-[#141216] border-t border-[#c9a84c]/10">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block bg-gradient-to-r from-[#f0d78c] to-[#a56f1e] text-[#0d0d0d] font-bold py-1.5 px-6 rounded-full uppercase text-[10px] tracking-[0.25em] mb-6">
            Exclusivo do Plano Completo
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-4 tracking-tight font-serif">
            Artes Sacras Premium: as peças mais buscadas e que mais vendem
          </h2>
          <p className="text-[#c9a84c] font-semibold text-lg mb-4">
            A seleção com a maior qualidade do acervo
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed text-sm md:text-base">
            São as peças de acabamento mais refinado, mais procuradas por quem imprime e as que mais convertem em venda. Esse bônus vem apenas no Plano Completo — não está incluso no Plano Básico.
          </p>

          <div className="my-6 space-y-2 sm:space-y-3">
            <InfiniteMarquee
              images={PREMIUM_CAROUSEL_ROW1}
              direction="left"
            />
            <InfiniteMarquee
              images={PREMIUM_CAROUSEL_ROW2}
              direction="right"
            />
          </div>

          <button
            type="button"
            onClick={onCtaClick}
            className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-base py-5 px-8 mt-6 rounded-xl shadow-xl shadow-[#c9a84c]/10 uppercase tracking-[0.2em] transition-all cursor-pointer active:scale-98"
          >
            Quero as Artes Sacras Premium
          </button>
        </div>
      </section>

      {/* Bonus 2: Guias e Materiais Inclusos */}
      <section id="bonus-guias" className="py-20 px-4 bg-[#0d0d0d] border-t border-[#c9a84c]/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#c9a84c] text-[10px] uppercase tracking-[0.35em] mb-4 font-semibold">
            Bônus Inclusos
          </p>
          <h2 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-3 tracking-tight font-serif">
            Tudo o que você vai receber
          </h2>
          <h3 className="text-sm font-medium text-gray-400 mb-12 italic font-serif">
            Acesso Imediato, sem enrolação
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" id="guias">
            {GUIDE_ITEMS.map((guia) => (
              <div
                key={guia.id}
                className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden hover:border-[#c9a84c]/25 transition-colors text-center"
              >
                <img
                  src={guia.image}
                  alt={guia.title}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={600}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6 text-center">
                  <h4 className="font-normal text-[#f0d78c] mb-2 text-lg tracking-tight font-serif">
                    {guia.title}
                  </h4>
                  <p className="text-gray-500 line-through text-xs mb-4">{guia.originalPrice}</p>
                  <span className="bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30 font-semibold py-2 px-6 rounded-full inline-block w-full uppercase text-[10px] tracking-[0.25em]">
                    Incluso
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onCtaClick}
            className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-base py-5 px-8 rounded-xl shadow-xl shadow-[#c9a84c]/10 transition-all uppercase tracking-[0.2em] cursor-pointer active:scale-98"
          >
            Quero Tudo Isso
          </button>
        </div>
      </section>
    </>
  );
}
