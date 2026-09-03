import { IMAGES } from '../assets/images';
import { Ensaio } from '../types';

export interface PortfolioStoryItem {
  id: string;
  codigoEnsaio?: string;
  titulo: string;
  cliente: string;
  categoria: 'Casais' | '15 Anos' | 'Família' | 'Individual' | 'Casamento' | 'Gestante';
  local: string;
  data: string;
  descricao: string;
  fotoCapa: string;
  fotosExtras: string[];
  tags: string[];
  depoimento?: {
    autor: string;
    texto: string;
  };
  googleDriveUrl?: string;
}

export const PORTFOLIO_STORIES: PortfolioStoryItem[] = [
  {
    id: 'story-ana-pedro',
    codigoEnsaio: 'SOLAR-818T',
    titulo: 'Ensaio Casamento Ana & Pedro',
    cliente: 'Ana & Pedro',
    categoria: 'Casamento',
    local: 'Foz do Iguaçu, PR',
    data: 'Setembro / 2026',
    descricao:
      'Cerimônia e celebração intimista com fotos autorais, luz natural dourada e momentos de cumplicidade genuína entre o casal.',
    fotoCapa: IMAGES.coupleRings,
    fotosExtras: [
      IMAGES.coupleRings,
      IMAGES.barbaraPortrait,
      IMAGES.polaroidNature,
      IMAGES.heroWideBarbara,
    ],
    tags: ['Casamento', 'Luz Dourada', 'Alianças', 'Afeto'],
    depoimento: {
      autor: 'Ana & Pedro',
      texto:
        'A Bárbara capturou o nosso casamento com uma sensibilidade única! Amamos cada foto e a leveza que ela nos transmitiu durante todo o dia.',
    },
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsTuVwXyZ012345?usp=sharing',
  },
  {
    id: 'story-valentina-15',
    codigoEnsaio: 'OK-15-VALENTINA',
    titulo: '15 Anos Valentina & Família',
    cliente: 'Valentina & Família',
    categoria: '15 Anos',
    local: 'Balneário Camboriú, SC',
    data: 'Junho / 2026',
    descricao:
      'Comemoração inesquecível com ensaio externo prévio na praia ao entardecer, valsa emocionante e registros cheios de energia com amigos e família.',
    fotoCapa: IMAGES.galleryPortrait,
    fotosExtras: [
      IMAGES.galleryPortrait,
      IMAGES.polaroidNature,
      IMAGES.barbaraPortrait,
      IMAGES.galleryFamily,
    ],
    tags: ['15 Anos', 'Praia', 'Pôr do Sol', 'Juventude'],
    depoimento: {
      autor: 'Valentina',
      texto:
        'As fotos mais lindas do meu aniversário de 15 anos! Me senti super confiante e o resultado superou todos os meus sonhos.',
    },
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1zYxWvUtSrQpOnMlKjIhGfEdCbA543210?usp=sharing',
  },
  {
    id: 'story-mariana-lucas',
    codigoEnsaio: 'OK-CASAMENTO-LUCAS',
    titulo: 'Casamento Mariana & Lucas',
    cliente: 'Mariana & Lucas',
    categoria: 'Casamento',
    local: 'Villa Bella, SC',
    data: 'Julho / 2026',
    descricao:
      'Casamento clássico e romântico. Desde o making-of tranquilo até a cerimônia emocionante e recepção cheia de alegria.',
    fotoCapa: IMAGES.heroWideBarbara,
    fotosExtras: [
      IMAGES.heroWideBarbara,
      IMAGES.coupleRings,
      IMAGES.galleryPortrait,
      IMAGES.ctaCameraBg,
    ],
    tags: ['Casamento', 'Romântico', 'Cerimônia', 'Preto & Branco'],
    depoimento: {
      autor: 'Mariana & Lucas',
      texto:
        'Trabalho impecável do início ao fim. Recomendo de olhos fechados para quem quer memórias eternas e autênticas.',
    },
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1mNoPqRsTuVwXyZ012345aBcDeFgHiJkL?usp=sharing',
  },
  {
    id: 'story-maryana-praia',
    codigoEnsaio: 'OK-15-MARYANA',
    titulo: 'Ensaio 15 Anos Maryana',
    cliente: 'Maryana (Pais Eric & Fabi)',
    categoria: '15 Anos',
    local: 'Praia Brava, Itajaí - SC',
    data: 'Agosto / 2026',
    descricao:
      'Sessão ao pôr do sol na Praia Brava, explorando o contraste da brisa do mar, tons pastéis e a luz quente de final de tarde.',
    fotoCapa: IMAGES.polaroidNature,
    fotosExtras: [
      IMAGES.polaroidNature,
      IMAGES.galleryPortrait,
      IMAGES.barbaraPortrait,
      IMAGES.qme,
    ],
    tags: ['15 Anos', 'Praia Brava', 'Golden Hour', 'Itajaí'],
    depoimento: {
      autor: 'Fabi (mãe da Maryana)',
      texto:
        'A delicadeza da Bárbara em conduzir a sessão foi mágica. Minha filha amou a experiência!',
    },
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1maryana15anos2026?usp=sharing',
  },
  {
    id: 'story-familia-afeto',
    titulo: 'Ensaio Família & Conexão',
    cliente: 'Família Silveira',
    categoria: 'Família',
    local: 'Parque Ecológico, Itajaí',
    data: 'Maio / 2026',
    descricao:
      'Uma tarde de brincadeiras, abraços sinceros e risadas espontâneas. Retratos de família que captam o amor cotidiano sem formalidades.',
    fotoCapa: IMAGES.galleryFamily,
    fotosExtras: [
      IMAGES.galleryFamily,
      IMAGES.polaroidNature,
      IMAGES.barbaraPortrait,
      IMAGES.heroBarbara,
    ],
    tags: ['Família', 'Ar Livre', 'Sorrisos', 'Conexão'],
    depoimento: {
      autor: 'Juliana Silveira',
      texto:
        'Fotos tão naturais que quando olhamos conseguimos ouvir as risadas das crianças. Foi especial demais.',
    },
  },
  {
    id: 'story-individual-retratos',
    titulo: 'Retratos Autoriais & Identidade',
    cliente: 'Camila Rossi',
    categoria: 'Individual',
    local: 'Centro Histórico & Estúdio, Itajaí',
    data: 'Abril / 2026',
    descricao:
      'Ensaio feminino individual focado em autoestima, luz lateral marcante e textura analógica. Uma celebração da própria beleza.',
    fotoCapa: IMAGES.barbaraPortrait,
    fotosExtras: [
      IMAGES.barbaraPortrait,
      IMAGES.qme,
      IMAGES.heroBarbara,
      IMAGES.galleryPortrait,
    ],
    tags: ['Individual', 'Autoestima', 'Retrato', 'Estilo'],
    depoimento: {
      autor: 'Camila Rossi',
      texto:
        'Eu nunca tinha feito um ensaio sozinha e estava tímida, mas a Bárbara me deixou tão à vontade que parecia uma conversa entre amigas.',
    },
  },
  {
    id: 'story-casal-golden',
    titulo: 'Ensaio Casal Pôr do Sol',
    cliente: 'Beatriz & Henrique',
    categoria: 'Casais',
    local: 'Praia dos Amores, Balneário Camboriú',
    data: 'Março / 2026',
    descricao:
      'Conexão, pés na areia e o reflexo dourado das ondas. Um ensaio intimista de pré-wedding repleto de ternura e companheirismo.',
    fotoCapa: IMAGES.coupleRings,
    fotosExtras: [
      IMAGES.coupleRings,
      IMAGES.polaroidNature,
      IMAGES.heroWideBarbara,
      IMAGES.galleryPortrait,
    ],
    tags: ['Casais', 'Pré-Wedding', 'Praia dos Amores', 'Luz Natural'],
    depoimento: {
      autor: 'Beatriz & Henrique',
      texto:
        'As fotos ficaram de cinema! Amamos cada detalhe e agora decoram a nossa casa nova.',
    },
  },
  {
    id: 'story-gestante-luz',
    titulo: 'Ensaio Gestante Espera de Luísa',
    cliente: 'Renata & Gabriel',
    categoria: 'Gestante',
    local: 'Canto do Morcego, Itajaí',
    data: 'Fevereiro / 2026',
    descricao:
      'A doçura e a transformação da maternidade registradas na orla marítima com tecidos leves, tons quentes e muita tranquilidade.',
    fotoCapa: IMAGES.qme,
    fotosExtras: [
      IMAGES.qme,
      IMAGES.polaroidNature,
      IMAGES.galleryFamily,
      IMAGES.barbaraPortrait,
    ],
    tags: ['Gestante', 'Maternidade', 'Esperança', 'Itajaí'],
    depoimento: {
      autor: 'Renata',
      texto:
        'Guardarei para sempre a lembrança da barriguinha com o olhar tão carinhoso da Bárbara.',
    },
  },
];
