import { BenefitItem, GuideItem, FaqItem, LampItem } from './types';

// Link do vídeo da VSL no YouTube
export const YOUTUBE_VSL_URL = 'https://www.youtube.com';

export const CHECKOUT_URLS = {
  completo: 'https://ggcheckout.app/checkout/v5/x3T5ba1HxOeEdm1n0cvg', // R$ 37,90
  upgrade18: 'https://ggcheckout.app/checkout/v5/kWxnkS0LLaFsvuEeggTw', // R$ 18,90
  basico: 'https://ggcheckout.app/checkout/v5/oml8UZQNFY8O5y1NrkkW', // R$ 10,90
};

export const MODEL_IMAGES = [
  '/images/modelo1.webp',
  '/images/modelo2.webp',
  '/images/modelo3.webp',
  '/images/modelo4.webp',
  '/images/modelo5.webp',
  '/images/modelo6.webp',
  '/images/modelo7.webp',
  '/images/modelo8.webp',
  '/images/modelo9.webp',
];

export const CAT_CAROUSEL_ROW1 = [
  '/images/cat/cat2_01.webp',
  '/images/cat/cat2_02.webp',
  '/images/cat/cat2_03.webp',
  '/images/cat/cat2_04.webp',
  '/images/cat/cat2_05.webp',
  '/images/cat/cat2_06.webp',
  '/images/cat/cat2_07.webp',
  '/images/cat/cat2_08.webp',
];

export const CAT_CAROUSEL_ROW2 = [
  '/images/cat/cat01.webp',
  '/images/cat/cat02.webp',
  '/images/cat/cat04.webp',
  '/images/cat/cat05.webp',
  '/images/cat/cat06.webp',
  '/images/cat/cat07.webp',
  '/images/cat/cat09.webp',
  '/images/cat/cat10.webp',
];

export const CAT_CAROUSEL_ROW3 = [
  '/images/cat/cat4_01.webp',
  '/images/cat/cat4_02.webp',
  '/images/cat/cat4_03.webp',
  '/images/cat/cat4_04.webp',
  '/images/cat/cat4_05.webp',
  '/images/cat/cat4_06.webp',
  '/images/cat/cat4_07.webp',
  '/images/cat/cat4_08.webp',
];

export const LUM_CAROUSEL_IMAGES = [
  '/images/lum-mq/img18.webp',
  '/images/lum-mq/img19.webp',
  '/images/lum-mq/img20.webp',
  '/images/lum-mq/img21.webp',
  '/images/lum-mq/img22.webp',
  '/images/lum-mq/img23.webp',
  '/images/lum-mq/img24.webp',
  '/images/lum-mq/img25.webp',
];

export const PREMIUM_CAROUSEL_ROW1 = [
  '/images/premium/premium_01.webp',
  '/images/premium/premium_02.webp',
  '/images/premium/premium_03.webp',
  '/images/premium/premium_04.webp',
  '/images/premium/premium_05.webp',
  '/images/premium/premium_06.webp',
];

export const PREMIUM_CAROUSEL_ROW2 = [
  '/images/premium/cat3_01.webp',
  '/images/premium/cat3_02.webp',
  '/images/premium/cat3_03.webp',
  '/images/premium/cat3_04.webp',
  '/images/premium/cat3_05.webp',
  '/images/premium/cat3_06.webp',
  '/images/premium/cat3_07.webp',
];

export const CAROUSEL_IMAGES = [
  '/images/modelo4.webp',
  '/images/modelo8.webp',
  '/images/modelo6.webp',
  '/images/modelo1.webp',
  '/images/modelo7.webp',
  '/images/modelo2.webp',
];

export const BENEFITS: BenefitItem[] = [
  {
    number: '01',
    text: 'Transformar sua impressora 3D em uma oficina de arte sacra, sem sair de casa.',
  },
  {
    number: '02',
    text: 'Oferecer peças exclusivas que a comunidade católica procura e valoriza.',
  },
  {
    number: '03',
    text: 'Imprimir com arquivos 100% testados: zero erro, zero retrabalho.',
  },
  {
    number: '04',
    text: 'Vender para um público fiel que ama imagens de fé e não hesita no preço.',
  },
  {
    number: '05',
    text: 'Lucrar com material que custa centavos e vende como objeto de devoção.',
  },
  {
    number: '06',
    text: 'Ter suporte direto para nunca travar em nenhuma etapa.',
  },
];

export const LAMP_ITEMS: LampItem[] = [
  { id: 1, image: '/images/lum1.webp', title: 'Luminária 3D (bônus) 1' },
  { id: 2, image: '/images/lum2.webp', title: 'Luminária 3D (bônus) 2' },
  { id: 3, image: '/images/lum3.webp', title: 'Luminária 3D (bônus) 3' },
  { id: 4, image: '/images/lum4.webp', title: 'Luminária 3D (bônus) 4' },
  { id: 5, image: '/images/lum5.webp', title: 'Luminária 3D (bônus) 5' },
  { id: 6, image: '/images/lum6.webp', title: 'Luminária 3D (bônus) 6' },
  { id: 7, image: '/images/lum7.webp', title: 'Luminária 3D (bônus) 7' },
  { id: 8, image: '/images/lum8.webp', title: 'Luminária 3D (bônus) 8' },
];

export const GUIDE_ITEMS: GuideItem[] = [
  {
    id: 'guia1',
    title: 'Guia de Produtos Católicos que Mais Vendem',
    originalPrice: 'De R$ 47,00',
    image: '/images/guia1.webp',
  },
  {
    id: 'guia2',
    title: 'Tabela de Preços para Produtos 3D',
    originalPrice: 'De R$ 37,00',
    image: '/images/guia2.webp',
  },
  {
    id: 'guia3',
    title: 'Guia de Configuração p/ Impressão Perfeita',
    originalPrice: 'De R$ 57,00',
    image: '/images/guia3.webp',
  },
  {
    id: 'guia4',
    title: 'Guia de Acabamento e Pintura',
    originalPrice: 'De R$ 67,00',
    image: '/images/guia4.webp',
  },
];

export const TESTIMONIALS = [
  '/images/dep1.webp',
  '/images/dep2.webp',
  '/images/dep3.webp',
  '/images/dep4.webp',
  '/images/dep5.webp',
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Como recebo os arquivos?',
    answer:
      'O acesso é enviado para o seu e-mail imediatamente após a aprovação do pagamento.',
  },
  {
    question: 'Quais as formas de pagamento?',
    answer: 'Aceitamos Pix, Cartão de Crédito e Boleto.',
  },
  {
    question: 'Terei acesso aos bônus no plano básico?',
    answer:
      'Não. Os Guias e o Acesso Vitalício são exclusivos do Plano Completo promocional.',
  },
];
