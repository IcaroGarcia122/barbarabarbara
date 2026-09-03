import { Ensaio, CRMLead, TransacaoFinanceira } from '../types';
import { IMAGES } from '../assets/images';

export const INITIAL_ENSAIOS: Record<string, Ensaio> = {
  'SOLAR-818T': {
    id: 'SOLAR-818T',
    titulo: 'Ensaio Casamento Ana e pedro',
    cliente: 'Ana e pedro',
    clienteTelefone: '(47) 99123-4567',
    clienteEmail: 'ana.pedro@gmail.com',
    categoria: 'Casamento',
    data: '2026-09-01',
    local: 'Foz do Iguaçu, PR',
    descricao:
      'Cerimônia e festa emocionantes com fotos autorais, luz natural e momento inesquecível do casal.',
    fotoCapa: IMAGES.coupleRings,
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsTuVwXyZ012345?usp=sharing',
    tamanhoArquivo: '3.4 GB (120 fotos em alta resolução)',
    valor: 3500,
    statusEntrega: 'Galeria Pronta',
    etapaAtual: 'entregue',
    previsaoEntrega: 'Entregue em 01/09/2026',
    mensagemEtapa:
      'Todas as suas fotos foram tratadas e estão prontas na sua galeria!',
    depoimento: {
      autor: 'Ana & Pedro',
      texto:
        'A Bárbara capturou o nosso casamento com uma sensibilidade única! Amamos cada foto.',
    },
    fotos: [
      {
        id: 'f1',
        url: IMAGES.coupleRings,
        legenda: 'Amor eterno e alianças ♡',
        orientacao: 'portrait',
      },
    ],
  },
  'OK-15-VALENTINA': {
    id: 'OK-15-VALENTINA',
    titulo: 'Ensaio 15 Anos Valentina & Família',
    cliente: 'Valentina & Família',
    clienteTelefone: '(47) 99876-5432',
    clienteEmail: 'valentina.familia@outlook.com',
    categoria: '15 Anos',
    data: '2026-06-20',
    local: 'Espaço Imperial & Parque...',
    descricao:
      'Festa de 15 anos com ensaio externo prévio, valsa emocionante e fotos com amigos e família.',
    fotoCapa: IMAGES.galleryPortrait,
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1zYxWvUtSrQpOnMlKjIhGfEdCbA543210?usp=sharing',
    tamanhoArquivo: '4.2 GB (180 fotos)',
    valor: 4800,
    statusEntrega: 'Galeria Pronta',
    etapaAtual: 'entregue',
    previsaoEntrega: 'Entregue em 20/06/2026',
    mensagemEtapa: 'Galeria dos 15 anos disponível para download.',
    depoimento: {
      autor: 'Valentina',
      texto: 'As fotos mais lindas do meu aniversário de 15 anos!',
    },
  },
  'OK-CASAMENTO-LUCAS': {
    id: 'OK-CASAMENTO-LUCAS',
    titulo: 'Casamento Mariana & Lucas',
    cliente: 'Mariana & Lucas',
    clienteTelefone: '(47) 99765-4321',
    clienteEmail: 'mariana.lucas@gmail.com',
    categoria: 'Casamento',
    data: '2026-07-15',
    local: 'Villa Bella & Capela dos...',
    descricao:
      'Casamento clássico e romântico, ensaio do making-of, cerimônia e recepção completa.',
    fotoCapa: IMAGES.coupleRings,
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1mNoPqRsTuVwXyZ012345aBcDeFgHiJkL?usp=sharing',
    tamanhoArquivo: '5.8 GB (240 fotos)',
    valor: 8500,
    statusEntrega: 'Galeria Pronta',
    etapaAtual: 'entregue',
    previsaoEntrega: 'Entregue em 15/07/2026',
    mensagemEtapa: 'Todas as fotos tratadas e aprovadas pelo casal.',
    depoimento: {
      autor: 'Mariana & Lucas',
      texto: 'Trabalho impecável do início ao fim. Recomendo de olhos fechados!',
    },
  },
  'OK-15-MARYANA': {
    id: 'OK-15-MARYANA',
    titulo: 'Ensaio 15 Anos Maryana (Pais Eric & Fabi)',
    cliente: 'Maryana (Pais Eric & Fabi)',
    clienteTelefone: '(47) 99222-3344',
    categoria: '15 Anos',
    data: '2026-08-10',
    local: 'Praia Brava, Itajaí',
    descricao: 'Ensaio de 15 anos ao pôr do sol na praia.',
    fotoCapa: IMAGES.polaroidNature,
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1maryana15anos2026?usp=sharing',
    tamanhoArquivo: '2.5 GB (80 fotos)',
    valor: 3200,
    statusEntrega: 'Galeria Pronta',
    etapaAtual: 'entregue',
    previsaoEntrega: 'Entregue em 10/08/2026',
    mensagemEtapa: 'Galeria completa liberada para download!',
  },
  'SOLAR-JTBO': {
    id: 'SOLAR-JTBO',
    titulo: 'Ensaio Casamento jnhhh',
    cliente: 'jnhhh',
    clienteTelefone: '(47) 99333-4455',
    categoria: 'Casamento',
    data: '2026-09-01',
    local: 'Foz do Iguaçu, PR',
    descricao: 'Ensaio de casamento agendado e planejado.',
    fotoCapa: IMAGES.coupleRings,
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1jnhhhCasamento2026?usp=sharing',
    tamanhoArquivo: 'Aprox. 3 GB',
    valor: 3500,
    statusEntrega: 'Agendado',
    etapaAtual: 'agendado',
    previsaoEntrega: 'Data do Ensaio: 01/09/2026',
    mensagemEtapa:
      'Ensaio agendado! Preparando o briefing de locação e horários.',
  },
  'SOLAR-JTBO-2': {
    id: 'SOLAR-JTBO-2',
    titulo: 'Ensaio Casamento jnhhh (Sessão 2)',
    cliente: 'jnhhh',
    clienteTelefone: '(47) 99333-4455',
    categoria: 'Casamento',
    data: '2026-09-01',
    local: 'Foz do Iguaçu, PR',
    descricao: 'Sessão pré-wedding agendada.',
    fotoCapa: IMAGES.barbaraPortrait,
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1jnhhhSessao2?usp=sharing',
    tamanhoArquivo: 'Aprox. 3 GB',
    valor: 3500,
    statusEntrega: 'Agendado',
    etapaAtual: 'agendado',
    previsaoEntrega: 'Data do Ensaio: 01/09/2026',
    mensagemEtapa: 'Horário reservado com a equipe.',
  },
  'OK-7KW9': {
    id: 'OK-7KW9',
    titulo: 'Ensaio Casamento Amanda',
    cliente: 'Amanda',
    clienteTelefone: '(11) 98888-7777',
    categoria: 'Casamento',
    data: '2026-09-01',
    local: 'São Paulo, SP',
    descricao: 'Casamento no civil e ensaio urbano.',
    fotoCapa: IMAGES.galleryPortrait,
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1amandaCasamentoSp?usp=sharing',
    tamanhoArquivo: 'Aprox. 3 GB',
    valor: 3500,
    statusEntrega: 'Agendado',
    etapaAtual: 'agendado',
    previsaoEntrega: 'Data do Ensaio: 01/09/2026',
    mensagemEtapa: 'Data agendada e confirmada.',
  },
  'SOLAR-B6Y7': {
    id: 'SOLAR-B6Y7',
    titulo: 'Ensaio Casamento Gabriel',
    cliente: 'Gabriel',
    clienteTelefone: '(47) 99555-1122',
    categoria: 'Casamento',
    data: '2026-09-01',
    local: 'Foz do Iguaçu, PR',
    descricao: 'Ensaio de noivos e cerimônia.',
    fotoCapa: IMAGES.coupleRings,
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1gabrielCasamento?usp=sharing',
    tamanhoArquivo: 'Aprox. 3.5 GB',
    valor: 3500,
    statusEntrega: 'Galeria Pronta',
    etapaAtual: 'entregue',
    previsaoEntrega: 'Entregue em 01/09/2026',
    mensagemEtapa: 'Galeria entregue!',
  },
};

// Initial Leads 100% unified with ensaios (8 ensaios total no pipeline)
export const INITIAL_LEADS: CRMLead[] = [
  {
    id: 'lead-solar-jtbo',
    nome: 'jnhhh',
    telefone: '(47) 99333-4455',
    categoria: 'Casamento',
    estagio: 'agendado',
    valor: 3500,
    dataEnsaio: '2026-09-01',
    local: 'Foz do Iguaçu, PR',
    codigoEnsaio: 'SOLAR-JTBO',
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1jnhhhCasamento2026?usp=sharing',
    observacoes: 'Ensaio de casamento agendado e planejado.',
    criadoEm: '2026-09-01',
  },
  {
    id: 'lead-solar-jtbo-2',
    nome: 'jnhhh',
    telefone: '(47) 99333-4455',
    categoria: 'Casamento',
    estagio: 'agendado',
    valor: 3500,
    dataEnsaio: '2026-09-01',
    local: 'Foz do Iguaçu, PR',
    codigoEnsaio: 'SOLAR-JTBO-2',
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1jnhhhSessao2?usp=sharing',
    observacoes: 'Sessão pré-wedding agendada.',
    criadoEm: '2026-09-01',
  },
  {
    id: 'lead-ok-7kw9',
    nome: 'Amanda',
    telefone: '(11) 98888-7777',
    categoria: 'Casamento',
    estagio: 'agendado',
    valor: 3500,
    dataEnsaio: '2026-09-01',
    local: 'São Paulo, SP',
    codigoEnsaio: 'OK-7KW9',
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1amandaCasamentoSp?usp=sharing',
    observacoes: 'Casamento no civil e ensaio urbano.',
    criadoEm: '2026-09-01',
  },
  {
    id: 'lead-solar-818t',
    nome: 'Ana e pedro',
    telefone: '(47) 99123-4567',
    categoria: 'Casamento',
    estagio: 'entregue',
    valor: 3500,
    dataEnsaio: '2026-09-01',
    local: 'Foz do Iguaçu, PR',
    codigoEnsaio: 'SOLAR-818T',
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsTuVwXyZ012345?usp=sharing',
    observacoes:
      'Todas as fotos tratadas e link da galeria compartilhado.',
    criadoEm: '2026-09-01',
  },
  {
    id: 'lead-ok-15-valentina',
    nome: 'Valentina & Família',
    telefone: '(47) 99876-5432',
    categoria: '15 Anos',
    estagio: 'entregue',
    valor: 4800,
    dataEnsaio: '2026-06-20',
    local: 'Espaço Imperial & Parq...',
    codigoEnsaio: 'OK-15-VALENTINA',
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1zYxWvUtSrQpOnMlKjIhGfEdCbA543210?usp=sharing',
    observacoes: 'Ensaio 15 anos entregue com sucesso.',
    criadoEm: '2026-06-20',
  },
  {
    id: 'lead-ok-casamento-lucas',
    nome: 'Mariana & Lucas',
    telefone: '(47) 99765-4321',
    categoria: 'Casamento',
    estagio: 'entregue',
    valor: 8500,
    dataEnsaio: '2026-07-15',
    local: 'Villa Bella & Capela dos...',
    codigoEnsaio: 'OK-CASAMENTO-LUCAS',
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1mNoPqRsTuVwXyZ012345aBcDeFgHiJkL?usp=sharing',
    observacoes: 'Casamento completo entregue.',
    criadoEm: '2026-07-15',
  },
  {
    id: 'lead-ok-15-maryana',
    nome: 'Maryana (Pais Eric & Fabi)',
    telefone: '(47) 99222-3344',
    categoria: '15 Anos',
    estagio: 'entregue',
    valor: 3200,
    dataEnsaio: '2026-08-10',
    local: 'Praia Brava, Itajaí',
    codigoEnsaio: 'OK-15-MARYANA',
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1maryana15anos2026?usp=sharing',
    observacoes: 'Galeria entregue!',
    criadoEm: '2026-08-10',
  },
  {
    id: 'lead-solar-b6y7',
    nome: 'Gabriel',
    telefone: '(47) 99555-1122',
    categoria: 'Casamento',
    estagio: 'entregue',
    valor: 3500,
    dataEnsaio: '2026-09-01',
    local: 'Foz do Iguaçu, PR',
    codigoEnsaio: 'SOLAR-B6Y7',
    googleDriveUrl:
      'https://drive.google.com/drive/folders/1gabrielCasamento?usp=sharing',
    observacoes: 'Fotos entregues na galeria digital.',
    criadoEm: '2026-09-01',
  },
];

export const INITIAL_TRANSACTIONS: TransacaoFinanceira[] = [
  {
    id: 'tx-1',
    tipo: 'receita',
    descricao: 'Pagamento Casamento Ana e pedro',
    categoria: 'Ensaio Completo',
    valor: 3500,
    data: '2026-09-01',
    status: 'pago',
    formaPagamento: 'Pix',
    clienteOuFornecedor: 'Ana e pedro',
    ensaioId: 'SOLAR-818T',
  },
  {
    id: 'tx-2',
    tipo: 'receita',
    descricao: 'Sinal Casamento Mariana & Lucas',
    categoria: 'Ensaio Completo',
    valor: 8500,
    data: '2026-07-15',
    status: 'pago',
    formaPagamento: 'Pix',
    clienteOuFornecedor: 'Mariana & Lucas',
    ensaioId: 'OK-CASAMENTO-LUCAS',
  },
  {
    id: 'tx-3',
    tipo: 'receita',
    descricao: '15 Anos Valentina & Família',
    categoria: 'Ensaio Completo',
    valor: 4800,
    data: '2026-06-20',
    status: 'pago',
    formaPagamento: 'Pix',
    clienteOuFornecedor: 'Valentina & Família',
    ensaioId: 'OK-15-VALENTINA',
  },
  {
    id: 'tx-4',
    tipo: 'receita',
    descricao: 'Sinal 50% jnhhh Casamento',
    categoria: 'Sinal 50%',
    valor: 1750,
    data: '2026-09-01',
    status: 'pago',
    formaPagamento: 'Pix',
    clienteOuFornecedor: 'jnhhh',
    ensaioId: 'SOLAR-JTBO',
  },
  {
    id: 'tx-5',
    tipo: 'despesa',
    descricao: 'Assinatura Adobe Creative Cloud',
    categoria: 'Software / Assinaturas',
    valor: 139,
    data: '2026-08-15',
    status: 'pago',
    formaPagamento: 'Cartão de Crédito',
    clienteOuFornecedor: 'Adobe Inc.',
  },
  {
    id: 'tx-6',
    tipo: 'despesa',
    descricao: 'Armazenamento de Fotos e Backup 2TB',
    categoria: 'Software / Assinaturas',
    valor: 38.9,
    data: '2026-08-10',
    status: 'pago',
    formaPagamento: 'Cartão de Crédito',
    clienteOuFornecedor: 'Servidor de Backup',
  },
];

const STORAGE_KEYS = {
  ENSAIOS: 'bv_ensaios_db_v3',
  LEADS: 'bv_crm_leads_v3',
  TRANSACTIONS: 'bv_finance_transactions_v3',
};

export const getStoredEnsaios = (): Record<string, Ensaio> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENSAIOS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ENSAIOS, JSON.stringify(INITIAL_ENSAIOS));
      return INITIAL_ENSAIOS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ENSAIOS;
  }
};

export const saveStoredEnsaios = (ensaios: Record<string, Ensaio>): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ENSAIOS, JSON.stringify(ensaios));
  } catch (err) {
    console.error('Erro ao salvar ensaios no localStorage:', err);
  }
};

export const getStoredLeads = (): CRMLead[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_LEADS;
  }
};

export const saveStoredLeads = (leads: CRMLead[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  } catch (err) {
    console.error('Erro ao salvar leads no localStorage:', err);
  }
};

export const getStoredTransactions = (): TransacaoFinanceira[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.TRANSACTIONS,
        JSON.stringify(INITIAL_TRANSACTIONS)
      );
      return INITIAL_TRANSACTIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TRANSACTIONS;
  }
};

export const saveStoredTransactions = (
  transactions: TransacaoFinanceira[]
): void => {
  try {
    localStorage.setItem(
      STORAGE_KEYS.TRANSACTIONS,
      JSON.stringify(transactions)
    );
  } catch (err) {
    console.error('Erro ao salvar transações no localStorage:', err);
  }
};
