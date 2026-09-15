import { CHECKOUT_URLS } from '../data';

interface PricingSectionProps {
  onOpenUpsell: () => void;
}

export default function PricingSection({ onOpenUpsell }: PricingSectionProps) {
  return (
    <>
      <section id="oferta" className="pt-24 pb-8 px-4 bg-[#0d0d0d] text-center scroll-mt-12">
        <div className="inline-flex items-center gap-2 bg-[#1a1a1a] text-[#c9a84c] font-semibold px-6 py-2 rounded-full mb-8 uppercase text-[10px] md:text-xs tracking-[0.3em] border border-[#c9a84c]/30 shadow-lg shadow-black">
          🔥 OFERTA VÁLIDA POR TEMPO LIMITADO
        </div>
        <h2 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-4 leading-tight max-w-3xl mx-auto tracking-tight font-serif">
          Aproveite Enquanto o <span className="italic text-white">Plano Completo</span> está em promoção
        </h2>
      </section>

      <section className="pb-24 px-4 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Card 1: Básico */}
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-8 flex flex-col items-center text-center hover:border-white/10 transition-colors">
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-3">
              Acesso Básico
            </span>
            <p className="text-4xl font-light text-white mb-6">R$ 10,90</p>

            <ul className="text-left space-y-3 text-gray-400 text-sm mb-8 w-full">
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>+500 Arquivos STL Católicos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>Acesso Vitalício</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>Envio Imediato</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>Não inclui bônus</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={onOpenUpsell}
              className="block w-full py-3.5 rounded-xl border border-[#c9a84c]/50 text-[#c9a84c] hover:bg-[#c9a84c]/10 font-semibold uppercase tracking-[0.2em] text-xs transition-colors mb-6 cursor-pointer"
            >
              Escolher Básico
            </button>

            <div className="text-[11px] text-gray-500 uppercase tracking-[0.15em] leading-relaxed">
              97% dos alunos escolhem o Plano Completo →
            </div>
          </div>

          {/* Card 2: Completo (Mais Vendido) */}
          <div className="bg-[#1a1a1a] rounded-2xl border-2 border-[#c9a84c] p-8 flex flex-col items-center text-center relative shadow-2xl shadow-[#c9a84c]/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#0d0d0d] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap shadow-md">
              Mais Vendido
            </div>

            <span className="text-[10px] text-[#f0d78c]/70 uppercase tracking-[0.3em] mt-2 mb-3">
              Mega Pack + Bônus
            </span>

            <div className="w-full mb-6">
              <img
                src="/images/mega-pack.webp"
                alt="Mega Pack Católico Completo"
                loading="lazy"
                decoding="async"
                width={600}
                height={600}
                className="w-full aspect-square rounded-xl border border-[#c9a84c]/20 object-cover"
              />
            </div>

            <ul className="text-left space-y-2.5 text-gray-300 text-sm mb-6 w-full">
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>+500 Arquivos STL Católicos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>Uso comercial liberado e sem limite</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>
                  <strong className="text-[#f0d78c] font-semibold">Bônus 1:</strong> Guia de Produtos Católicos que Mais Vendem
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>
                  <strong className="text-[#f0d78c] font-semibold">Bônus 2:</strong> Tabela de Preços para Produtos 3D Católicos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>
                  <strong className="text-[#f0d78c] font-semibold">Bônus 3:</strong> Guia de Configuração para Impressão
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>
                  <strong className="text-[#f0d78c] font-semibold">Bônus 4:</strong> Mockups para Divulgação
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>
                  <strong className="text-[#f0d78c] font-semibold">Bônus 5:</strong> Guia de Acabamento e Pintura
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>
                  <strong className="text-[#f0d78c] font-semibold">Bônus 6:</strong> Pack de Luminárias 3D
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span className="text-[#f0d78c] font-medium flex items-center flex-wrap gap-2">
                  <strong className="font-semibold">Bônus 7:</strong> Artes Sacras Premium
                  <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    NOVO
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>Acesso Vitalício</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5 font-bold">✓</span>
                <span>Envio Imediato</span>
              </li>
            </ul>

            <div className="w-full border-t border-[#c9a84c]/15 pt-5 mb-2">
              <p className="text-gray-500 line-through text-xs">Valor Total: R$ 97,00</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.25em] mt-1">
                Hoje, pagamento único
              </p>
              <p className="text-5xl font-bold text-[#c9a84c] my-3">R$ 37,90</p>
            </div>

            <a
              href={CHECKOUT_URLS.completo}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#c9a84c] hover:bg-[#f0d78c] text-[#0d0d0d] font-bold text-sm py-5 rounded-xl uppercase tracking-[0.2em] shadow-xl shadow-[#c9a84c]/20 transition-colors mb-5 active:scale-98 text-center"
            >
              Quero o Plano Completo
            </a>

            <div className="flex flex-wrap justify-center items-center gap-4 text-gray-500 text-[10px] uppercase tracking-[0.2em]">
              <span>🛡️ Garantida</span>
              <span>🔒 Segura</span>
              <span>⚡ Imediato</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
