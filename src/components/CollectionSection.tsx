import { CAT_CAROUSEL_ROW1, CAT_CAROUSEL_ROW2, CAT_CAROUSEL_ROW3 } from '../data';
import InfiniteMarquee from './InfiniteMarquee';

interface CollectionSectionProps {
  onCtaClick: () => void;
}

export default function CollectionSection({ onCtaClick }: CollectionSectionProps) {
  return (
    <section id="colecao" className="bg-[#141216] py-16 md:py-20 px-4 border-y border-[#c9a84c]/15 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-normal text-[#f0d78c] mb-10 leading-tight tracking-tight font-serif uppercase max-w-3xl mx-auto">
          VEJA TUDO O QUE VOCÊ VAI RECEBER NESSA COLEÇÃO EXCLUSIVA
        </h2>

        <div className="flex justify-center mb-12">
          <img
            src="/images/impressao3d.webp"
            alt="Impressão 3D Arte Sacra"
            loading="lazy"
            decoding="async"
            width={800}
            height={800}
            className="w-full max-w-lg aspect-square rounded-2xl shadow-2xl shadow-black border border-[#c9a84c]/20 object-cover"
          />
        </div>

        <h3 className="text-xl md:text-3xl font-normal text-white mb-4 leading-snug font-serif max-w-3xl mx-auto">
          SÃO + DE 500 ARQUIVOS{' '}
          <span className="italic text-[#c9a84c]">
            de arte sacra testados, otimizados e prontos para imprimir hoje mesmo
          </span>
        </h3>

        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-10">
          E dezenas de outros modelos exclusivos que só quem tem esse pack pode oferecer. Veja a variedade de peças que você pode transformar em impressões reais.
        </p>

        {/* 3 Linhas do Carrossel Infinito da Coleção Principal */}
        <div className="my-6 space-y-2 sm:space-y-3">
          <InfiniteMarquee
            images={CAT_CAROUSEL_ROW1}
            direction="left"
          />
          <InfiniteMarquee
            images={CAT_CAROUSEL_ROW2}
            direction="right"
          />
          <InfiniteMarquee
            images={CAT_CAROUSEL_ROW3}
            direction="left"
          />
        </div>

        <p className="text-[#f0d78c] text-sm md:text-base font-medium max-w-2xl mx-auto mt-8 mb-8 px-4">
          São centenas de possibilidades reunidas em um único acervo para você não depender de pesquisas intermináveis por arquivos espalhados na internet.
        </p>

        <button
          type="button"
          onClick={onCtaClick}
          className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-base py-5 px-8 rounded-xl shadow-xl shadow-[#c9a84c]/10 transition-all uppercase tracking-[0.2em] cursor-pointer active:scale-98"
        >
          Quero Meus Modelos
        </button>
      </div>
    </section>
  );
}

