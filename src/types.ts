export type EnsaioCategoria =
  | 'Casais'
  | 'Família'
  | 'Individual'
  | 'Eventos'
  | 'Gestante'
  | 'Formatura'
  | 'Corporativo'
  | 'Casamento'
  | '15 Anos';

// Stages aligned exactly with CRM and pipeline
export type CRMStage =
  | 'lead' // LEAD / CONTATO
  | 'agendado' // AGENDADO
  | 'fotografado' // FOTOGRAFADO
  | 'selecao' // SELEÇÃO DO CLIENTE
  | 'edicao' // EDIÇÃO & COR
  | 'entregue'; // GALERIA ENTREGUE

export type EnsaioEtapaId = CRMStage;

export interface EnsaioFoto {
  id: string;
  url: string;
  legenda?: string;
  orientacao?: 'portrait' | 'landscape' | 'square';
}

export interface Ensaio {
  id: string; // e.g., "SOLAR-818T" or "BV2026-001"
  titulo: string;
  cliente: string;
  clienteTelefone?: string;
  clienteEmail?: string;
  categoria: EnsaioCategoria;
  data: string;
  local: string;
  descricao: string;
  fotoCapa: string;
  fotos?: EnsaioFoto[];
  googleDriveUrl: string; // Link da galeria de fotos
  tamanhoArquivo?: string;
  valor?: number;
  statusEntrega?: 'Galeria Pronta' | 'Pronto no Drive' | 'Em Edição' | 'Agendado';
  etapaAtual?: EnsaioEtapaId;
  previsaoEntrega?: string;
  mensagemEtapa?: string;
  depoimento?: {
    autor: string;
    texto: string;
  };
}

export interface SearchState {
  code: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage?: string;
  result?: Ensaio;}

export interface CRMLead {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  categoria: EnsaioCategoria;
  estagio: CRMStage;
  valor: number;
  dataEnsaio?: string;
  local?: string;
  observacoes?: string;
  codigoEnsaio?: string; // Vinculado ao ensaio
  googleDriveUrl?: string;
  criadoEm: string;
}

// Financial Management Types
export type TransacaoTipo = 'receita' | 'despesa';

export interface TransacaoFinanceira {
  id: string;
  tipo: TransacaoTipo;
  descricao: string;
  categoria:
    | 'Sinal 50%'
    | 'Pagamento Final'
    | 'Ensaio Completo'
    | 'Álbum / Impressão'
    | 'Locação Estúdio'
    | 'Equipamentos'
    | 'Transporte / Gasolina'
    | 'Software / Assinaturas'
    | 'Marketing / Tráfego'
    | 'Outros';
  valor: number;
  data: string;
  status: 'pago' | 'pendente';
  formaPagamento: 'Pix' | 'Cartão de Crédito' | 'Transferência' | 'Dinheiro' | 'Boleto';
  clienteOuFornecedor?: string;
  ensaioId?: string;
}
