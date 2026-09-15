import { useState } from 'react';
import { FAQ_ITEMS } from '../data';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <section id="faq" className="py-20 px-4 bg-[#1a1a1a] border-t border-[#c9a84c]/10">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-normal text-[#f0d78c] mb-12 tracking-tight font-serif">
            Dúvidas Frequentes
          </h3>

          <div className="space-y-3 text-left">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#0d0d0d] rounded-xl border border-white/5 overflow-hidden transition-colors hover:border-[#c9a84c]/20"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full p-5 list-none cursor-pointer flex justify-between items-center gap-4 text-left"
                  >
                    <span className="text-sm md:text-base font-medium text-white">
                      {item.question}
                    </span>
                    <span
                      className={`text-[#c9a84c] transition-transform duration-300 text-xl leading-none font-light select-none ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-[10px] uppercase tracking-[0.3em] text-gray-600 bg-[#0d0d0d] border-t border-[#c9a84c]/10">
        © 2026 Mega Pack Católico · Arte &amp; Devoção 3D
      </footer>
    </>
  );
}
