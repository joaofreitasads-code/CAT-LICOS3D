interface GuaranteeSectionProps {
  onCtaClick: () => void;
}

export default function GuaranteeSection({ onCtaClick }: GuaranteeSectionProps) {
  return (
    <section id="garantia" className="py-20 px-4 bg-[#1a1a1a] text-center border-t border-[#c9a84c]/10">
      <div className="max-w-3xl mx-auto">
        <img
          src="/images/garantia.webp"
          alt="Selo de 7 dias de garantia"
          loading="lazy"
          decoding="async"
          width={160}
          height={160}
          className="w-32 md:w-40 aspect-square object-contain mx-auto mb-6 drop-shadow-[0_10px_30px_rgba(201,168,76,0.35)]"
        />

        <h3 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-8 tracking-tight font-serif">
          Sua compra 100% segura e sem risco nenhum
        </h3>

        <div className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto space-y-5 text-left md:text-center">
          <p>
            Quero que você se sinta em paz ao adquirir esse material de fé. Por isso, você tem{' '}
            <strong className="text-white font-semibold">7 dias de garantia incondicional</strong>.
          </p>
          <p>
            Você recebe acesso imediato a mais de 500 arquivos STL de arte sacra, prontos para
            imprimir em 3D e começar a faturar ainda essa semana.
          </p>
          <p>
            Se dentro desse prazo você sentir que o material não faz sentido para o seu negócio,
            basta solicitar o reembolso e eu devolvo{' '}
            <strong className="text-white font-semibold">100% do seu dinheiro.</strong>
          </p>
          <p>Sem perguntas. Sem burocracia. O risco é todo meu.</p>
          <p className="font-serif italic text-[#f0d78c] text-xl md:text-2xl mt-10 leading-snug">
            Ou esse material te ajuda a faturar com arte sacra e construir uma nova fonte de renda… ou
            você não paga nada por isso. Simples assim.
          </p>
        </div>

        <div className="mt-12">
          <button
            type="button"
            onClick={onCtaClick}
            className="inline-block w-full max-w-sm bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-base py-5 px-8 rounded-xl shadow-xl shadow-[#c9a84c]/10 uppercase tracking-[0.2em] transition-all cursor-pointer active:scale-98"
          >
            Quero Meu Acesso
          </button>
        </div>
      </div>
    </section>
  );
}
