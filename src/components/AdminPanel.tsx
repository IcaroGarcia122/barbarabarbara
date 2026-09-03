import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  DollarSign,
  Edit2,
  ExternalLink,
  Eye,
  EyeOff,
  Filter,
  FolderOpen,
  Globe,
  GripVertical,
  Heart,
  Kanban,
  Lock,
  LogIn,
  LogOut,
  Menu,
  MessageCircle,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import {
  CRMLead,
  CRMStage,
  Ensaio,
  EnsaioCategoria,
  EnsaioEtapaId,
  TransacaoFinanceira,
  TransacaoTipo,
} from '../types';
import {
  getStoredEnsaios,
  getStoredLeads,
  getStoredTransactions,
  saveStoredEnsaios,
  saveStoredLeads,
  saveStoredTransactions,
} from '../utils/storage';
import { IMAGES } from '../assets/images';
import { DoodleHeart, DoodleSparkle } from './Doodles';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEnsaioPreview?: (ensaio: Ensaio) => void;
}

type AdminTab = 'ensaios' | 'crm' | 'financeiro' | 'mensagens';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onSelectEnsaioPreview,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('ensaios');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('bv_admin_auth') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('admin@gmail.com');
  const [loginPassword, setLoginPassword] = useState('admin2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Stored state
  const [ensaiosMap, setEnsaiosMap] = useState<Record<string, Ensaio>>({});
  const [leadsList, setLeadsList] = useState<CRMLead[]>([]);
  const [transactionsList, setTransactionsList] = useState<TransacaoFinanceira[]>([]);

  // Drag and Drop CRM State
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<CRMStage | null>(null);

  // Search and Filter states
  const [ensaiosSearch, setEnsaiosSearch] = useState('');
  const [crmSearch, setCrmSearch] = useState('');
  const [financialFilter, setFinancialFilter] = useState<'all' | 'receita' | 'despesa'>('all');

  // Modals state
  const [isEnsaioModalOpen, setIsEnsaioModalOpen] = useState(false);
  const [editingEnsaio, setEditingEnsaio] = useState<Ensaio | null>(null);

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<CRMLead | null>(null);

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for New / Edit Ensaio
  const [ensaioForm, setEnsaioForm] = useState<{
    id: string;
    titulo: string;
    cliente: string;
    clienteTelefone: string;
    clienteEmail: string;
    categoria: EnsaioCategoria;
    data: string;
    local: string;
    descricao: string;
    fotoCapa: string;
    googleDriveUrl: string;
    tamanhoArquivo: string;
    valor: number;
    statusEntrega: 'Galeria Pronta' | 'Em Edição' | 'Agendado';
    etapaAtual: EnsaioEtapaId;
    previsaoEntrega: string;
    mensagemEtapa: string;
  }>({
    id: '',
    titulo: '',
    cliente: '',
    clienteTelefone: '',
    clienteEmail: '',
    categoria: 'Casais',
    data: '',
    local: 'Itajaí - SC',
    descricao: '',
    fotoCapa: IMAGES.coupleRings,
    googleDriveUrl: '',
    tamanhoArquivo: '1.5 GB (50 fotos em alta resolução)',
    valor: 850,
    statusEntrega: 'Galeria Pronta',
    etapaAtual: 'pronto',
    previsaoEntrega: '',
    mensagemEtapa: '',
  });

  // Form states for New / Edit Lead
  const [leadForm, setLeadForm] = useState<{
    id?: string;
    nome: string;
    telefone: string;
    email: string;
    categoria: EnsaioCategoria;
    estagio: CRMStage;
    valor: number;
    dataEnsaio: string;
    local: string;
    observacoes: string;
    codigoEnsaio: string;
    googleDriveUrl: string;
  }>({
    nome: '',
    telefone: '',
    email: '',
    categoria: 'Casais',
    estagio: 'lead',
    valor: 800,
    dataEnsaio: '',
    local: 'Itajaí - SC',
    observacoes: '',
    codigoEnsaio: '',
    googleDriveUrl: '',
  });

  // Form states for New Transaction
  const [transactionForm, setTransactionForm] = useState<{
    tipo: TransacaoTipo;
    descricao: string;
    categoria: TransacaoFinanceira['categoria'];
    valor: number;
    data: string;
    status: 'pago' | 'pendente';
    formaPagamento: TransacaoFinanceira['formaPagamento'];
    clienteOuFornecedor: string;
    ensaioId: string;
  }>({
    tipo: 'receita',
    descricao: '',
    categoria: 'Sinal 50%',
    valor: 400,
    data: new Date().toISOString().split('T')[0],
    status: 'pago',
    formaPagamento: 'Pix',
    clienteOuFornecedor: '',
    ensaioId: '',
  });

  // Load from localStorage on mount & open
  useEffect(() => {
    if (isOpen) {
      setEnsaiosMap(getStoredEnsaios());
      setLeadsList(getStoredLeads());
      setTransactionsList(getStoredTransactions());
    }
  }, [isOpen]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPass = loginPassword.trim();

    if (cleanEmail === 'admin@gmail.com' && cleanPass === 'admin2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('bv_admin_auth', 'true');
      setLoginError(null);
      triggerToast('Acesso administrador autorizado!');
    } else {
      setLoginError('E-mail ou senha incorretos. Use admin@gmail.com / admin2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('bv_admin_auth');
    triggerToast('Sessão encerrada.');
  };

  if (!isOpen) return null;

  // Helper to generate next Ensaio Code
  const generateNewEnsaioCode = () => {
    const existingIds = Object.keys(ensaiosMap);
    const count = existingIds.length + 1;
    const padded = count < 10 ? `00${count}` : count < 100 ? `0${count}` : `${count}`;
    return `BV2026-${padded}`;
  };

  // Ensaio Actions
  const handleOpenNewEnsaioModal = () => {
    const newCode = generateNewEnsaioCode();
    setEditingEnsaio(null);
    setEnsaioForm({
      id: newCode,
      titulo: '',
      cliente: '',
      clienteTelefone: '',
      clienteEmail: '',
      categoria: 'Casais',
      data: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      local: 'Itajaí - SC',
      descricao:
        'Um ensaio cheio de luz, emoção e momentos autênticos registrados com muito carinho.',
      fotoCapa: IMAGES.coupleRings,
      googleDriveUrl: '',
      tamanhoArquivo: '1.5 GB (50 fotos em alta resolução)',
      valor: 850,
      statusEntrega: 'Galeria Pronta',
      etapaAtual: 'pronto',
      previsaoEntrega: '',
      mensagemEtapa: 'Todas as fotos foram tratadas e estão disponíveis para download!',
    });
    setIsEnsaioModalOpen(true);
  };

  const handleOpenEditEnsaioModal = (ensaio: Ensaio) => {
    setEditingEnsaio(ensaio);
    setEnsaioForm({
      id: ensaio.id,
      titulo: ensaio.titulo,
      cliente: ensaio.cliente,
      clienteTelefone: ensaio.clienteTelefone || '',
      clienteEmail: ensaio.clienteEmail || '',
      categoria: ensaio.categoria,
      data: ensaio.data,
      local: ensaio.local,
      descricao: ensaio.descricao,
      fotoCapa: ensaio.fotoCapa || IMAGES.coupleRings,
      googleDriveUrl: ensaio.googleDriveUrl || '',
      tamanhoArquivo: ensaio.tamanhoArquivo || '1.5 GB (50 fotos)',
      valor: ensaio.valor || 850,
      statusEntrega: ensaio.statusEntrega || 'Galeria Pronta',
      etapaAtual: ensaio.etapaAtual || 'pronto',
      previsaoEntrega: ensaio.previsaoEntrega || '',
      mensagemEtapa: ensaio.mensagemEtapa || '',
    });
    setIsEnsaioModalOpen(true);
  };

  const handleSaveEnsaio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ensaioForm.id || !ensaioForm.cliente) {
      alert('Por favor preencha o código e o nome do cliente.');
      return;
    }

    const updatedEnsaio: Ensaio = {
      id: ensaioForm.id.trim().toUpperCase(),
      titulo: ensaioForm.titulo || `Ensaio ${ensaioForm.cliente}`,
      cliente: ensaioForm.cliente,
      clienteTelefone: ensaioForm.clienteTelefone,
      clienteEmail: ensaioForm.clienteEmail,
      categoria: ensaioForm.categoria,
      data: ensaioForm.data,
      local: ensaioForm.local,
      descricao: ensaioForm.descricao,
      fotoCapa: ensaioForm.fotoCapa,
      googleDriveUrl: ensaioForm.googleDriveUrl.trim(),
      tamanhoArquivo: ensaioForm.tamanhoArquivo,
      valor: Number(ensaioForm.valor) || 0,
      statusEntrega: ensaioForm.statusEntrega,
      etapaAtual: ensaioForm.etapaAtual,
      previsaoEntrega: ensaioForm.previsaoEntrega,
      mensagemEtapa: ensaioForm.mensagemEtapa,
      fotos: editingEnsaio?.fotos || [
        {
          id: 'f-capa',
          url: ensaioForm.fotoCapa,
          legenda: 'Destaque do ensaio',
          orientacao: 'portrait',
        },
      ],
    };

    const newMap = { ...ensaiosMap, [updatedEnsaio.id]: updatedEnsaio };
    setEnsaiosMap(newMap);
    saveStoredEnsaios(newMap);
    setIsEnsaioModalOpen(false);
    triggerToast(`Ensaio ${updatedEnsaio.id} salvo com sucesso!`);
  };

  const handleDeleteEnsaio = (id: string) => {
    if (confirm(`Tem certeza que deseja excluir o ensaio ${id}?`)) {
      const newMap = { ...ensaiosMap };
      delete newMap[id];
      setEnsaiosMap(newMap);
      saveStoredEnsaios(newMap);
      triggerToast(`Ensaio ${id} removido.`);
    }
  };

  const handleCopyClientAccess = (ensaio: Ensaio) => {
    const text = `Oi ${ensaio.cliente}! ♡ Passando para avisar que o seu ensaio já está disponível no site da Bárbara Vitória Fotografia!\n\nSeu código de acesso: *${ensaio.id}*\nAcesse: ${window.location.origin}\nLink da Galeria: ${ensaio.googleDriveUrl}\n\nQualquer dúvida estou à disposição!`;
    navigator.clipboard.writeText(text);
    triggerToast('Mensagem de acesso copiada para envio no WhatsApp!');
  };

  // Lead Actions
  const handleOpenNewLeadModal = () => {
    setEditingLead(null);
    setLeadForm({
      nome: '',
      telefone: '',
      email: '',
      categoria: 'Casais',
      estagio: 'lead',
      valor: 850,
      dataEnsaio: '',
      local: 'Itajaí - SC',
      observacoes: '',
      codigoEnsaio: '',
      googleDriveUrl: '',
    });
    setIsLeadModalOpen(true);
  };

  const handleOpenEditLeadModal = (lead: CRMLead) => {
    setEditingLead(lead);
    setLeadForm({
      id: lead.id,
      nome: lead.nome,
      telefone: lead.telefone,
      email: lead.email || '',
      categoria: lead.categoria,
      estagio: lead.estagio,
      valor: lead.valor,
      dataEnsaio: lead.dataEnsaio || '',
      local: lead.local || 'Itajaí - SC',
      observacoes: lead.observacoes || '',
      codigoEnsaio: lead.codigoEnsaio || '',
      googleDriveUrl: lead.googleDriveUrl || '',
    });
    setIsLeadModalOpen(true);
  };

  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.nome || !leadForm.telefone) {
      alert('Nome e telefone são obrigatórios.');
      return;
    }

    let updatedLeads: CRMLead[];
    if (editingLead) {
      updatedLeads = leadsList.map((l) =>
        l.id === editingLead.id
          ? {
              ...l,
              ...leadForm,
              valor: Number(leadForm.valor) || 0,
            }
          : l
      );
    } else {
      const newLead: CRMLead = {
        id: `lead-${Date.now()}`,
        nome: leadForm.nome,
        telefone: leadForm.telefone,
        email: leadForm.email,
        categoria: leadForm.categoria,
        estagio: leadForm.estagio,
        valor: Number(leadForm.valor) || 0,
        dataEnsaio: leadForm.dataEnsaio,
        local: leadForm.local,
        observacoes: leadForm.observacoes,
        codigoEnsaio: leadForm.codigoEnsaio,
        googleDriveUrl: leadForm.googleDriveUrl,
        criadoEm: new Date().toISOString().split('T')[0],
      };
      updatedLeads = [newLead, ...leadsList];
    }

    setLeadsList(updatedLeads);
    saveStoredLeads(updatedLeads);
    setIsLeadModalOpen(false);
    triggerToast('Cliente salvo no CRM!');
  };

  const handleMoveLeadStage = (leadId: string, newStage: CRMStage) => {
    const updated = leadsList.map((l) =>
      l.id === leadId ? { ...l, estagio: newStage } : l
    );
    setLeadsList(updated);
    saveStoredLeads(updated);
    triggerToast('Estágio atualizado!');
  };

  const handleDeleteLead = (leadId: string) => {
    if (confirm('Deseja excluir este cliente do CRM?')) {
      const updated = leadsList.filter((l) => l.id !== leadId);
      setLeadsList(updated);
      saveStoredLeads(updated);
      triggerToast('Cliente removido do CRM.');
    }
  };

  // Financial Actions
  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionForm.descricao || !transactionForm.valor) {
      alert('Preencha a descrição e o valor.');
      return;
    }

    const newTx: TransacaoFinanceira = {
      id: `tx-${Date.now()}`,
      tipo: transactionForm.tipo,
      descricao: transactionForm.descricao,
      categoria: transactionForm.categoria,
      valor: Number(transactionForm.valor) || 0,
      data: transactionForm.data,
      status: transactionForm.status,
      formaPagamento: transactionForm.formaPagamento,
      clienteOuFornecedor: transactionForm.clienteOuFornecedor,
      ensaioId: transactionForm.ensaioId,
    };

    const updated = [newTx, ...transactionsList];
    setTransactionsList(updated);
    saveStoredTransactions(updated);
    setIsTransactionModalOpen(false);
    triggerToast('Transação financeira registrada!');
  };

  const handleDeleteTransaction = (id: string) => {
    if (confirm('Deseja excluir esta transação?')) {
      const updated = transactionsList.filter((t) => t.id !== id);
      setTransactionsList(updated);
      saveStoredTransactions(updated);
      triggerToast('Transação excluída.');
    }
  };

  // Financial Calculations
  const totalReceitas = transactionsList
    .filter((t) => t.tipo === 'receita' && t.status === 'pago')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const totalDespesas = transactionsList
    .filter((t) => t.tipo === 'despesa' && t.status === 'pago')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const lucroLiquido = totalReceitas - totalDespesas;

  const totalPendente = transactionsList
    .filter((t) => t.tipo === 'receita' && t.status === 'pendente')
    .reduce((acc, curr) => acc + curr.valor, 0);

  // Filtered Ensaios
  const ensaiosArray: Ensaio[] = Object.values(ensaiosMap) as Ensaio[];
  const filteredEnsaios = ensaiosArray.filter(
    (e: Ensaio) =>
      e.id.toLowerCase().includes(ensaiosSearch.toLowerCase()) ||
      e.cliente.toLowerCase().includes(ensaiosSearch.toLowerCase()) ||
      e.categoria.toLowerCase().includes(ensaiosSearch.toLowerCase())
  );

  // CRM Columns definition (Exact 6 stages)
  const CRM_COLUMNS: { id: CRMStage; title: string; color: string; badge: string }[] = [
    {
      id: 'lead',
      title: '1. LEAD / CONTATO',
      color: 'border-blue-500/50 text-blue-400 bg-blue-500/10',
      badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
    {
      id: 'agendado',
      title: '2. AGENDADO',
      color: 'border-purple-500/50 text-purple-400 bg-purple-500/10',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    {
      id: 'fotografado',
      title: '3. FOTOGRAFADO',
      color: 'border-amber-500/50 text-amber-400 bg-amber-500/10',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'selecao',
      title: '4. SELEÇÃO DO CLIENTE',
      color: 'border-orange-500/50 text-orange-400 bg-orange-500/10',
      badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    },
    {
      id: 'edicao',
      title: '5. EDIÇÃO & COR',
      color: 'border-pink-500/50 text-pink-400 bg-pink-500/10',
      badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    },
    {
      id: 'entregue',
      title: '6. ENTREGUE (GALERIA)',
      color: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
  ];

  // Helper for quick stage shift (Left / Right)
  const shiftLeadStage = (lead: CRMLead, direction: 'prev' | 'next') => {
    const currentIndex = CRM_COLUMNS.findIndex((c) => c.id === lead.estagio);
    if (direction === 'prev' && currentIndex > 0) {
      handleMoveLeadStage(lead.id, CRM_COLUMNS[currentIndex - 1].id);
    } else if (direction === 'next' && currentIndex < CRM_COLUMNS.length - 1) {
      handleMoveLeadStage(lead.id, CRM_COLUMNS[currentIndex + 1].id);
    }
  };

  // If user is not authenticated, show Admin Login Screen
  if (!isAuthenticated) {
    return (
      <div
        id="admin-login-overlay"
        className="fixed inset-0 z-50 bg-[#0B0B0D]/95 backdrop-blur-md overflow-hidden flex items-center justify-center p-4 animate-in fade-in duration-200 text-[#F3F0EA]"
      >
        <div className="bg-[#111114] border border-white/10 rounded-2xl max-w-md w-full p-8 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#B8B1AA] hover:text-[#E85D83] transition-colors cursor-pointer"
            title="Fechar"
          >
            <X size={16} />
          </button>

          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#E85D83]/20 border border-[#E85D83]/40 flex items-center justify-center text-[#E85D83] mx-auto mb-4 shadow-lg shadow-[#E85D83]/20">
              <Lock size={26} />
            </div>
            <h2 className="font-playfair text-3xl font-bold text-[#F3F0EA]">
              Painel Administrativo
            </h2>
            <p className="text-xs text-[#B8B1AA] mt-1">
              Área restrita para a fotógrafa Bárbara Vitória
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#B8B1AA] mb-1">
                E-mail de Acesso
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-[#18181D] border border-white/10 text-sm text-[#F3F0EA] focus:outline-none focus:border-[#E85D83]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#B8B1AA] mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="admin2026"
                  className="w-full px-4 py-3 rounded-xl bg-[#18181D] border border-white/10 text-sm text-[#F3F0EA] focus:outline-none focus:border-[#E85D83] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8B1AA] hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs text-center">
                {loginError}
              </div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-[#B8B1AA] flex items-center justify-between">
              <span className="font-mono text-[11px]">Credenciais padrão:</span>
              <span className="font-mono text-[11px] text-[#E85D83] font-bold">admin@gmail.com / admin2026</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#E85D83] hover:bg-[#d64b71] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#E85D83]/30 transition-all cursor-pointer"
            >
              <LogIn size={16} />
              <span>Entrar no Painel</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Value in pipeline
  const totalPipelineValue = leadsList.reduce((acc, l) => acc + (l.valor || 0), 0);

  return (
    <div
      id="admin-page-container"
      className="fixed inset-0 z-50 bg-[#0B0B0D] overflow-hidden flex flex-row animate-in fade-in duration-200 text-[#F3F0EA] select-none"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl bg-[#E85D83] text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-2 border border-white/20">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= LEFT SIDEBAR (DEDICATED PAGE NAVIGATION) ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#111114] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          isMobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E85D83] to-[#B3395B] flex items-center justify-center text-white shadow-lg shadow-[#E85D83]/30">
                <Camera size={20} />
              </div>
              <div>
                <h1 className="font-playfair font-bold text-lg text-white leading-tight">
                  Bárbara Vitória
                </h1>
                <span className="text-[10px] font-mono tracking-widest text-[#E85D83] uppercase font-semibold">
                  Painel Fotógrafa
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg bg-white/5 text-[#B8B1AA] hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
            <span className="text-[#B8B1AA] text-[11px]">Status do Sistema</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </span>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          <p className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-[0.25em] text-[#B8B1AA]/70">
            Sessões & Módulos
          </p>

          {/* 1. Ensaios & Galeria */}
          <button
            onClick={() => {
              setActiveTab('ensaios');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full px-4 py-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'ensaios'
                ? 'bg-[#E85D83] text-white shadow-lg shadow-[#E85D83]/30'
                : 'text-[#B8B1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Camera size={18} />
              <span>Ensaios & Galerias</span>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'ensaios' ? 'bg-black/30 text-white' : 'bg-white/10 text-[#B8B1AA]'
              }`}
            >
              {ensaiosArray.length}
            </span>
          </button>

          {/* 2. CRM & Funil */}
          <button
            onClick={() => {
              setActiveTab('crm');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full px-4 py-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'crm'
                ? 'bg-[#E85D83] text-white shadow-lg shadow-[#E85D83]/30'
                : 'text-[#B8B1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Kanban size={18} />
              <span>CRM & Pipeline</span>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'crm' ? 'bg-black/30 text-white' : 'bg-white/10 text-[#B8B1AA]'
              }`}
            >
              {leadsList.length}
            </span>
          </button>

          {/* 3. Financeiro */}
          <button
            onClick={() => {
              setActiveTab('financeiro');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full px-4 py-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'financeiro'
                ? 'bg-[#E85D83] text-white shadow-lg shadow-[#E85D83]/30'
                : 'text-[#B8B1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <DollarSign size={18} />
              <span>Controle Financeiro</span>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'financeiro'
                  ? 'bg-black/30 text-white'
                  : 'bg-emerald-500/20 text-emerald-300'
              }`}
            >
              R$ {lucroLiquido.toFixed(0)}
            </span>
          </button>

          {/* 4. Modelos WhatsApp */}
          <button
            onClick={() => {
              setActiveTab('mensagens');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full px-4 py-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'mensagens'
                ? 'bg-[#E85D83] text-white shadow-lg shadow-[#E85D83]/30'
                : 'text-[#B8B1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageCircle size={18} />
              <span>Modelos WhatsApp</span>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'mensagens' ? 'bg-black/30 text-white' : 'bg-white/10 text-[#B8B1AA]'
              }`}
            >
              2
            </span>
          </button>
        </nav>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {/* Back to Website Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-[#F3F0EA] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Globe size={15} className="text-[#E85D83]" />
            <span>Voltar ao Site</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-semibold text-red-300 hover:text-red-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-xs"
        />
      )}

      {/* ================= MAIN CONTENT ON THE RIGHT ================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0E0E12]">
        {/* Top App Bar */}
        <header className="h-16 px-6 lg:px-10 border-b border-white/10 bg-[#111114] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-[#B8B1AA] hover:text-white"
            >
              <Menu size={18} />
            </button>

            <div>
              <h2 className="font-playfair text-xl lg:text-2xl font-bold text-white tracking-wide">
                {activeTab === 'ensaios' && 'Ensaios & Links das Galerias'}
                {activeTab === 'crm' && 'CRM & Funil de Atendimento'}
                {activeTab === 'financeiro' && 'Fluxo de Caixa & Finanças'}
                {activeTab === 'mensagens' && 'Modelos Rápidos de Atendimento'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#D8D2C9] hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Ver Site Público</span>
            </button>
          </div>
        </header>

        {/* Dynamic Section Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-8 lg:p-10">
          {/* ========================================================================= */}
          {/* TAB 1: ENSAIOS & GALERIAS */}
          {/* ========================================================================= */}
          {activeTab === 'ensaios' && (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Header & Quick Add */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B1AA]"
                  />
                  <input
                    type="text"
                    placeholder="Buscar por código (BV2026-...), cliente ou categoria..."
                    value={ensaiosSearch}
                    onChange={(e) => setEnsaiosSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#141419] border border-white/10 text-sm text-[#F3F0EA] focus:outline-none focus:border-[#E85D83]"
                  />
                </div>

                <button
                  id="btn-add-ensaio"
                  onClick={handleOpenNewEnsaioModal}
                  className="px-6 py-3.5 rounded-xl bg-[#E85D83] hover:bg-[#d64b71] text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-lg shadow-[#E85D83]/25 transition-all cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Novo Ensaio</span>
                </button>
              </div>

              {/* Grid of Ensaios */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEnsaios.map((ensaio) => {
                  const cleanPhone = (ensaio.clienteTelefone || '').replace(/\D/g, '');
                  const waPhone = cleanPhone
                    ? cleanPhone.startsWith('55')
                      ? cleanPhone
                      : `55${cleanPhone}`
                    : '5547999999999';
                  const waText = encodeURIComponent(
                    `Oi ${ensaio.cliente}! ♡ Passando para avisar que o seu ensaio já está disponível no site da Bárbara Vitória Fotografia!\n\nSeu código de acesso: *${ensaio.id}*\nAcesse: ${window.location.origin}\nLink da Galeria: ${ensaio.googleDriveUrl}\n\nQualquer dúvida estou à disposição!`
                  );
                  const waUrl = `https://wa.me/${waPhone}?text=${waText}`;

                  return (
                    <div
                      key={ensaio.id}
                      className="bg-[#141419] border border-white/10 rounded-2xl p-6 hover:border-[#E85D83]/50 transition-all flex flex-col justify-between shadow-xl"
                    >
                      <div>
                        {/* Header: Code & Category */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-xs font-bold px-3 py-1 rounded-lg bg-[#E85D83]/20 text-[#E85D83] border border-[#E85D83]/40">
                            {ensaio.id}
                          </span>
                          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#B8B1AA]">
                            {ensaio.categoria}
                          </span>
                        </div>

                        {/* Client & Description */}
                        <h3 className="font-playfair text-2xl font-bold text-[#F3F0EA] mb-2">
                          {ensaio.cliente}
                        </h3>
                        <p className="text-xs text-[#B8B1AA] line-clamp-2 mb-5 font-light leading-relaxed">
                          {ensaio.descricao}
                        </p>

                        {/* Metadata Details */}
                        <div className="space-y-2 text-xs text-[#B8B1AA] border-t border-white/5 pt-4 mb-5">
                          <div className="flex items-center justify-between">
                            <span>Data:</span>
                            <strong className="text-[#F3F0EA]">{ensaio.data}</strong>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Local:</span>
                            <span className="text-[#F3F0EA]">{ensaio.local}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>WhatsApp:</span>
                            <span className="text-[#F3F0EA] font-mono">
                              {ensaio.clienteTelefone || 'Não informado'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Valor:</span>
                            <span className="text-emerald-400 font-bold font-mono">
                              R$ {ensaio.valor || 0}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Etapa Atual:</span>
                            <span className="text-[#E85D83] font-mono uppercase font-semibold">
                              {ensaio.etapaAtual || 'pronto'}
                            </span>
                          </div>
                        </div>

                        {/* Gallery Link Box */}
                        <div className="bg-black/40 border border-white/10 rounded-xl p-3 mb-5 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <FolderOpen size={18} className="text-[#E85D83] shrink-0" />
                            <span className="text-xs font-mono text-stone-300 truncate">
                              {ensaio.googleDriveUrl || 'Nenhum link de galeria cadastrado'}
                            </span>
                          </div>
                          {ensaio.googleDriveUrl && (
                            <a
                              href={ensaio.googleDriveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#E85D83] shrink-0"
                              title="Abrir Galeria"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Actions Footer */}
                      <div className="space-y-2.5 pt-4 border-t border-white/5">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                          title="Enviar código de acesso direto no WhatsApp do cliente"
                        >
                          <MessageCircle size={15} />
                          <span>Enviar Código no WhatsApp</span>
                        </a>

                        <div className="flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleCopyClientAccess(ensaio)}
                            className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#F3F0EA] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            title="Copiar mensagem pronta para o cliente"
                          >
                            <Copy size={13} />
                            <span>Copiar</span>
                          </button>

                          <button
                            onClick={() => handleOpenEditEnsaioModal(ensaio)}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#B8B1AA] hover:text-white transition-colors cursor-pointer"
                            title="Editar Ensaio"
                          >
                            <Edit2 size={15} />
                          </button>

                          <button
                            onClick={() => handleDeleteEnsaio(ensaio.id)}
                            className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                            title="Excluir Ensaio"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: CRM & FUNIL ESPAÇOSO */}
          {/* ========================================================================= */}
          {activeTab === 'crm' && (
            <div className="space-y-8">
              {/* Spacious CRM KPI Metrics Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div className="bg-[#141419] border border-white/10 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-[#B8B1AA] mb-2 font-mono uppercase">
                    <span>Total de Clientes</span>
                    <Users size={16} className="text-[#E85D83]" />
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">
                    {leadsList.length}
                  </div>
                  <span className="text-[11px] text-[#B8B1AA] mt-1 block">
                    No funil de atendimento
                  </span>
                </div>

                <div className="bg-[#141419] border border-white/10 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-amber-400 mb-2 font-mono uppercase">
                    <span>Em Negociação</span>
                    <Clock size={16} className="text-amber-400" />
                  </div>
                  <div className="text-3xl font-bold text-amber-400 font-mono">
                    {leadsList.filter((l) => l.estagio === 'lead' || l.estagio === 'agendado').length}
                  </div>
                  <span className="text-[11px] text-[#B8B1AA] mt-1 block">
                    Leads & Agendados
                  </span>
                </div>

                <div className="bg-[#141419] border border-white/10 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-pink-400 mb-2 font-mono uppercase">
                    <span>Em Produção</span>
                    <Camera size={16} className="text-pink-400" />
                  </div>
                  <div className="text-3xl font-bold text-pink-400 font-mono">
                    {leadsList.filter((l) => l.estagio === 'fotografado' || l.estagio === 'selecao' || l.estagio === 'edicao').length}
                  </div>
                  <span className="text-[11px] text-[#B8B1AA] mt-1 block">
                    Fotografia, Seleção & Edição
                  </span>
                </div>

                <div className="bg-[#141419] border border-white/10 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-emerald-400 mb-2 font-mono uppercase">
                    <span>Valor em Pipeline</span>
                    <DollarSign size={16} className="text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-emerald-400 font-mono">
                    R$ {totalPipelineValue.toLocaleString('pt-BR')}
                  </div>
                  <span className="text-[11px] text-[#B8B1AA] mt-1 block">
                    Volume total previsto
                  </span>
                </div>
              </div>

              {/* CRM Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-white">
                    Pipeline Visual de Ensaios
                  </h3>
                  <p className="text-xs text-[#B8B1AA] mt-0.5">
                    Arraste os cards entre as colunas ou utilize as setas de navegação rápida
                  </p>
                </div>

                <button
                  onClick={handleOpenNewLeadModal}
                  className="px-6 py-3.5 rounded-xl bg-[#E85D83] hover:bg-[#d64b71] text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#E85D83]/25 transition-all cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Adicionar Lead</span>
                </button>
              </div>

              {/* SPACIOUS KANBAN PIPELINE BOARD */}
              <div className="flex gap-6 overflow-x-auto pb-8 pt-2">
                {CRM_COLUMNS.map((col, colIndex) => {
                  const columnLeads = leadsList.filter((l) => l.estagio === col.id);
                  const isOver = dragOverColumn === col.id;
                  const colTotalValue = columnLeads.reduce((acc, curr) => acc + (curr.valor || 0), 0);

                  return (
                    <div
                      key={col.id}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverColumn(col.id);
                      }}
                      onDragLeave={() => setDragOverColumn(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        const leadId = e.dataTransfer.getData('text/plain') || draggedLeadId;
                        if (leadId) {
                          handleMoveLeadStage(leadId, col.id);
                        }
                        setDraggedLeadId(null);
                        setDragOverColumn(null);
                      }}
                      className={`bg-[#141419] border rounded-2xl p-5 flex flex-col min-w-[320px] max-w-[340px] shrink-0 transition-all duration-200 shadow-xl ${
                        isOver
                          ? 'border-[#E85D83] bg-[#E85D83]/10 ring-2 ring-[#E85D83]/30 scale-[1.01]'
                          : 'border-white/10'
                      }`}
                    >
                      {/* Spacious Column Header */}
                      <div className="pb-4 mb-4 border-b border-white/10">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-bold font-mono tracking-wider uppercase ${col.color.split(' ')[1]}`}>
                            {col.title}
                          </span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border ${col.badge}`}>
                            {columnLeads.length}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-[#B8B1AA]">
                          Total: <span className="text-emerald-400 font-bold">R$ {colTotalValue.toLocaleString('pt-BR')}</span>
                        </div>
                      </div>

                      {/* Cards Container with generous gap */}
                      <div className="space-y-4 flex-1">
                        {columnLeads.map((lead) => {
                          const isBeingDragged = draggedLeadId === lead.id;

                          return (
                            <div
                              key={lead.id}
                              draggable
                              onDragStart={(e) => {
                                setDraggedLeadId(lead.id);
                                e.dataTransfer.setData('text/plain', lead.id);
                              }}
                              onDragEnd={() => {
                                setDraggedLeadId(null);
                                setDragOverColumn(null);
                              }}
                              className={`bg-[#181820] border rounded-xl p-5 transition-all text-left group cursor-grab active:cursor-grabbing shadow-md ${
                                isBeingDragged
                                  ? 'opacity-40 border-dashed border-[#E85D83]'
                                  : 'border-white/10 hover:border-[#E85D83]/60 hover:shadow-xl'
                              }`}
                            >
                              {/* Top Row: Drag Handle + Name + Tag */}
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 overflow-hidden">
                                  <GripVertical
                                    size={15}
                                    className="text-[#B8B1AA]/40 group-hover:text-[#E85D83] shrink-0"
                                  />
                                  <span className="font-bold text-base text-white truncate">
                                    {lead.nome}
                                  </span>
                                </div>
                                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#E85D83]/20 text-[#E85D83] border border-[#E85D83]/30 font-mono font-semibold shrink-0">
                                  {lead.categoria}
                                </span>
                              </div>

                              {/* Phone / Contact */}
                              <p className="text-xs text-[#B8B1AA] mb-2.5 font-mono pl-5">
                                {lead.telefone}
                              </p>

                              {/* Notes */}
                              {lead.observacoes && (
                                <p className="text-xs text-[#D8D2C9] bg-black/30 rounded-lg p-2.5 mb-3 italic leading-relaxed border border-white/5">
                                  "{lead.observacoes}"
                                </p>
                              )}

                              {/* Value & Planned Date */}
                              <div className="flex items-center justify-between text-xs pt-1 mb-4 pl-1">
                                <span className="text-emerald-400 font-bold font-mono text-sm">
                                  R$ {lead.valor}
                                </span>
                                {lead.dataEnsaio && (
                                  <span className="text-[#B8B1AA] text-[11px] font-mono">
                                    📅 {lead.dataEnsaio}
                                  </span>
                                )}
                              </div>

                              {/* Action Buttons: WhatsApp & Move Stage */}
                              <div className="flex items-center justify-between gap-1.5 pt-3 border-t border-white/10">
                                <a
                                  href={`https://wa.me/55${lead.telefone.replace(/\D/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/30 transition-colors"
                                  title="Chamar no WhatsApp"
                                >
                                  <MessageCircle size={13} />
                                  <span>Whats</span>
                                </a>

                                {/* Shift Navigation */}
                                <div className="flex items-center gap-1">
                                  {colIndex > 0 && (
                                    <button
                                      onClick={() => shiftLeadStage(lead, 'prev')}
                                      className="p-1.5 rounded-lg bg-white/5 hover:bg-[#E85D83]/20 text-[#B8B1AA] hover:text-[#E85D83] text-xs transition-colors cursor-pointer"
                                      title="Mover para o estágio anterior"
                                    >
                                      <ChevronLeft size={14} />
                                    </button>
                                  )}

                                  {colIndex < CRM_COLUMNS.length - 1 && (
                                    <button
                                      onClick={() => shiftLeadStage(lead, 'next')}
                                      className="p-1.5 rounded-lg bg-white/5 hover:bg-[#E85D83]/20 text-[#B8B1AA] hover:text-[#E85D83] text-xs transition-colors cursor-pointer"
                                      title="Mover para o próximo estágio"
                                    >
                                      <ChevronRight size={14} />
                                    </button>
                                  )}

                                  <button
                                    onClick={() => handleOpenEditLeadModal(lead)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#B8B1AA] hover:text-white text-xs cursor-pointer"
                                    title="Editar Lead"
                                  >
                                    <Edit2 size={13} />
                                  </button>

                                  <button
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs cursor-pointer"
                                    title="Excluir"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {columnLeads.length === 0 && (
                          <div className="text-center py-10 text-xs text-[#B8B1AA]/50 border border-dashed border-white/10 rounded-xl">
                            Nenhum cliente nesta etapa
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: CONTROLE FINANCEIRO */}
          {/* ========================================================================= */}
          {activeTab === 'financeiro' && (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-[#141419] border border-white/10 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between text-xs text-[#B8B1AA] mb-2 font-mono uppercase">
                    <span>Receitas Pagas</span>
                    <TrendingUp size={18} className="text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-emerald-400 font-mono">
                    R$ {totalReceitas.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-[#B8B1AA] mt-1 block">
                    Entradas confirmadas em conta
                  </span>
                </div>

                <div className="bg-[#141419] border border-white/10 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between text-xs text-[#B8B1AA] mb-2 font-mono uppercase">
                    <span>Despesas Operacionais</span>
                    <TrendingDown size={18} className="text-red-400" />
                  </div>
                  <div className="text-3xl font-bold text-red-400 font-mono">
                    R$ {totalDespesas.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-[#B8B1AA] mt-1 block">
                    Equipamentos, estúdios & locomoção
                  </span>
                </div>

                <div className="bg-[#181116] border border-[#E85D83]/40 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between text-xs text-[#E85D83] mb-2 font-mono uppercase font-bold">
                    <span>Lucro Líquido Real</span>
                    <Sparkles size={18} className="text-[#E85D83]" />
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">
                    R$ {lucroLiquido.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-[#D8D2C9] mt-1 block">
                    Saldo positivo consolidado
                  </span>
                </div>

                <div className="bg-[#141419] border border-white/10 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between text-xs text-[#B8B1AA] mb-2 font-mono uppercase">
                    <span>A Receber (Pendentes)</span>
                    <Clock size={18} className="text-amber-400" />
                  </div>
                  <div className="text-3xl font-bold text-amber-400 font-mono">
                    R$ {totalPendente.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-[#B8B1AA] mt-1 block">
                    Saldos finais de ensaios futuros
                  </span>
                </div>
              </div>

              {/* Transactions Header & Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFinancialFilter('all')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      financialFilter === 'all'
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-[#B8B1AA] hover:text-white'
                    }`}
                  >
                    Todas ({transactionsList.length})
                  </button>
                  <button
                    onClick={() => setFinancialFilter('receita')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      financialFilter === 'receita'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/5 text-[#B8B1AA] hover:text-white'
                    }`}
                  >
                    Receitas
                  </button>
                  <button
                    onClick={() => setFinancialFilter('despesa')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      financialFilter === 'despesa'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-white/5 text-[#B8B1AA] hover:text-white'
                    }`}
                  >
                    Despesas
                  </button>
                </div>

                <button
                  onClick={() => setIsTransactionModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#E85D83] hover:bg-[#d64b71] text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Nova Transação</span>
                </button>
              </div>

              {/* Transactions Table */}
              <div className="bg-[#141419] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 text-[#B8B1AA] uppercase tracking-wider font-mono">
                      <tr>
                        <th className="p-4">Tipo</th>
                        <th className="p-4">Descrição</th>
                        <th className="p-4">Categoria</th>
                        <th className="p-4">Data</th>
                        <th className="p-4">Forma</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Valor</th>
                        <th className="p-4 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-[#F3F0EA]">
                      {transactionsList
                        .filter(
                          (t) =>
                            financialFilter === 'all' || t.tipo === financialFilter
                        )
                        .map((t) => (
                          <tr key={t.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                              <span
                                className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase font-mono ${
                                  t.tipo === 'receita'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}
                              >
                                {t.tipo}
                              </span>
                            </td>
                            <td className="p-4 font-semibold text-white">{t.descricao}</td>
                            <td className="p-4 text-[#B8B1AA]">{t.categoria}</td>
                            <td className="p-4 text-[#B8B1AA] font-mono">{t.data}</td>
                            <td className="p-4 text-[#B8B1AA]">{t.formaPagamento}</td>
                            <td className="p-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                                  t.status === 'pago'
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                }`}
                              >
                                {t.status === 'pago' ? 'Pago' : 'Pendente'}
                              </span>
                            </td>
                            <td
                              className={`p-4 text-right font-bold font-mono text-sm ${
                                t.tipo === 'receita'
                                  ? 'text-emerald-400'
                                  : 'text-red-400'
                              }`}
                            >
                              {t.tipo === 'receita' ? '+' : '-'} R$ {t.valor.toFixed(2)}
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleDeleteTransaction(t.id)}
                                className="p-1.5 rounded-lg text-[#B8B1AA] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                title="Excluir"
                              >
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: MODELOS DE MENSAGENS WHATSAPP */}
          {/* ========================================================================= */}
          {activeTab === 'mensagens' && (
            <div className="max-w-5xl mx-auto space-y-8">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-white">
                  Modelos de Respostas Rápidas WhatsApp
                </h3>
                <p className="text-xs text-[#B8B1AA] mt-1">
                  Textos prontos e humanizados para copiar e responder seus clientes com agilidade ♡
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Template 1: Envio de Orçamento */}
                <div className="bg-[#141419] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                  <div>
                    <h4 className="font-bold text-sm text-[#E85D83] mb-3 flex items-center gap-2">
                      <Sparkles size={16} />
                      1. Proposta & Apresentação Afetiva
                    </h4>
                    <div className="bg-black/40 rounded-xl p-4 text-xs text-[#D8D2C9] whitespace-pre-line font-mono mb-5 leading-relaxed border border-white/5">
                      {`Oi [Nome do Cliente]! Tudo bem? ♡
Que alegria receber seu contato para registrar esse momento tão especial!

Trabalho com fotografia afetiva e autêntica, focada em conexões sinceras e cheias de verdade.

📸 Pacote Ensaio Completo:
• Duração: ~1h30 a 2h de ensaio leve
• Fotos tratadas em alta resolução prontas para download
• Acesso exclusivo com código na minha plataforma
• Investimento: R$ 850 (em até 2x no Pix ou Cartão)

Vamos sonhar esse ensaio juntos?`}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `Oi! Tudo bem? ♡ Que alegria receber seu contato para registrar esse momento tão especial! Trabalho com fotografia afetiva e autêntica, focada em momentos sinceros. Vamos sonhar esse ensaio juntos?`
                      );
                      triggerToast('Texto copiado para o WhatsApp!');
                    }}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 text-[#F3F0EA] transition-all cursor-pointer"
                  >
                    <Copy size={14} />
                    <span>Copiar Mensagem</span>
                  </button>
                </div>

                {/* Template 2: Entrega de Link da Galeria & Código */}
                <div className="bg-[#141419] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                  <div>
                    <h4 className="font-bold text-sm text-emerald-400 mb-3 flex items-center gap-2">
                      <FolderOpen size={16} />
                      2. Entrega do Ensaio (Galeria Digital)
                    </h4>
                    <div className="bg-black/40 rounded-xl p-4 text-xs text-[#D8D2C9] whitespace-pre-line font-mono mb-5 leading-relaxed border border-white/5">
                      {`Oii [Nome do Cliente]! ✶
Suas fotos estão PRONTINHAS e ficaram a coisa mais linda do mundo! ♡

Para acessar sua entrega:
1. Entre no meu site oficial: ${window.location.origin}
2. Digite o código do seu ensaio: [BV2026-XXX]
3. Ou acesse direto a sua galeria: [LINK_GALERIA]

Depois me conta qual foi a sua foto favorita! ✨`}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `Oii! Suas fotos estão PRONTINHAS e ficaram a coisa mais linda do mundo! ♡ Para acessar, entre no site e digite o seu código de ensaio ou acesse direto pelo link da sua galeria online.`
                      );
                      triggerToast('Texto copiado para o WhatsApp!');
                    }}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 text-[#F3F0EA] transition-all cursor-pointer"
                  >
                    <Copy size={14} />
                    <span>Copiar Mensagem</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: NOVO / EDITAR ENSAIO */}
      {/* ========================================================================= */}
      {isEnsaioModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141419] border border-white/10 rounded-2xl max-w-2xl w-full p-7 my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h3 className="font-playfair text-2xl font-bold text-white">
                {editingEnsaio ? 'Editar Ensaio' : 'Cadastrar Novo Ensaio'}
              </h3>
              <button
                onClick={() => setIsEnsaioModalOpen(false)}
                className="text-[#B8B1AA] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEnsaio} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Código do Ensaio (Identificador Único)
                  </label>
                  <input
                    type="text"
                    required
                    value={ensaioForm.id}
                    onChange={(e) =>
                      setEnsaioForm({ ...ensaioForm, id: e.target.value.toUpperCase() })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] font-mono focus:border-[#E85D83] focus:outline-none"
                    placeholder="ex: BV2026-004"
                  />
                </div>

                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Categoria
                  </label>
                  <select
                    value={ensaioForm.categoria}
                    onChange={(e) =>
                      setEnsaioForm({
                        ...ensaioForm,
                        categoria: e.target.value as EnsaioCategoria,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                  >
                    <option value="Casais">Casais</option>
                    <option value="Família">Família</option>
                    <option value="Individual">Individual</option>
                    <option value="Gestante">Gestante</option>
                    <option value="Formatura">Formatura</option>
                    <option value="Eventos">Eventos</option>
                    <option value="Corporativo">Corporativo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Nome do Cliente / Casal / Família
                  </label>
                  <input
                    type="text"
                    required
                    value={ensaioForm.cliente}
                    onChange={(e) =>
                      setEnsaioForm({ ...ensaioForm, cliente: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                    placeholder="ex: Mariana & João"
                  />
                </div>

                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    WhatsApp do Cliente
                  </label>
                  <input
                    type="text"
                    value={ensaioForm.clienteTelefone}
                    onChange={(e) =>
                      setEnsaioForm({
                        ...ensaioForm,
                        clienteTelefone: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                    placeholder="(47) 99999-9999"
                  />
                </div>
              </div>

              {/* GALERIA LINK FIELD */}
              <div className="bg-[#1a0f14] border border-[#E85D83]/40 rounded-xl p-4">
                <label className="block text-[#E85D83] mb-1.5 font-bold flex items-center gap-2">
                  <FolderOpen size={16} />
                  <span>Link da Galeria Online (Obrigatório)</span>
                </label>
                <input
                  type="url"
                  required
                  value={ensaioForm.googleDriveUrl}
                  onChange={(e) =>
                    setEnsaioForm({
                      ...ensaioForm,
                      googleDriveUrl: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-xl bg-[#141419] border border-white/20 text-[#F3F0EA] font-mono focus:border-[#E85D83] focus:outline-none"
                  placeholder="https://..."
                />
                <p className="text-[11px] text-[#B8B1AA] mt-1.5 font-light">
                  Quando o cliente digitar o código dele no site, o botão abrirá esse link da galeria!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Data do Ensaio
                  </label>
                  <input
                    type="text"
                    value={ensaioForm.data}
                    onChange={(e) =>
                      setEnsaioForm({ ...ensaioForm, data: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                    placeholder="12 de agosto de 2026"
                  />
                </div>

                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Local / Cidade
                  </label>
                  <input
                    type="text"
                    value={ensaioForm.local}
                    onChange={(e) =>
                      setEnsaioForm({ ...ensaioForm, local: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                    placeholder="Praia Brava, Itajaí - SC"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#B8B1AA] mb-1 font-semibold">
                  Mensagem Afetiva / Descrição do Ensaio
                </label>
                <textarea
                  rows={3}
                  value={ensaioForm.descricao}
                  onChange={(e) =>
                    setEnsaioForm({ ...ensaioForm, descricao: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                  placeholder="Conte um pouco de como foi esse dia especial..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Valor do Ensaio (R$)
                  </label>
                  <input
                    type="number"
                    value={ensaioForm.valor}
                    onChange={(e) =>
                      setEnsaioForm({
                        ...ensaioForm,
                        valor: Number(e.target.value),
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] font-mono focus:border-[#E85D83] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Etapa Atual (Visível para o cliente no site)
                  </label>
                  <select
                    value={ensaioForm.etapaAtual || 'entregue'}
                    onChange={(e) =>
                      setEnsaioForm({
                        ...ensaioForm,
                        etapaAtual: e.target.value as any,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-[#E85D83]/40 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                  >
                    <option value="lead">1. Lead / Contato</option>
                    <option value="agendado">2. Agendado</option>
                    <option value="fotografado">3. Fotografado</option>
                    <option value="selecao">4. Seleção do Cliente</option>
                    <option value="edicao">5. Edição & Cor</option>
                    <option value="entregue">6. Galeria Entregue</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEnsaioModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#B8B1AA] hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#E85D83] hover:bg-[#d64b71] text-white font-bold tracking-wider uppercase shadow-lg cursor-pointer"
                >
                  Salvar Ensaio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: NOVO / EDITAR LEAD (CRM) */}
      {/* ========================================================================= */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141419] border border-white/10 rounded-2xl max-w-lg w-full p-7 my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h3 className="font-playfair text-2xl font-bold text-white">
                {editingLead ? 'Editar Cliente (CRM)' : 'Cadastrar Novo Lead'}
              </h3>
              <button
                onClick={() => setIsLeadModalOpen(false)}
                className="text-[#B8B1AA] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveLead} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#B8B1AA] mb-1 font-semibold">
                  Nome do Cliente / Casal
                </label>
                <input
                  type="text"
                  required
                  value={leadForm.nome}
                  onChange={(e) =>
                    setLeadForm({ ...leadForm, nome: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                  placeholder="ex: Amanda & Felipe"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    WhatsApp / Telefone
                  </label>
                  <input
                    type="text"
                    required
                    value={leadForm.telefone}
                    onChange={(e) =>
                      setLeadForm({ ...leadForm, telefone: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                    placeholder="(47) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Categoria
                  </label>
                  <select
                    value={leadForm.categoria}
                    onChange={(e) =>
                      setLeadForm({
                        ...leadForm,
                        categoria: e.target.value as EnsaioCategoria,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                  >
                    <option value="Casais">Casais</option>
                    <option value="Família">Família</option>
                    <option value="Individual">Individual</option>
                    <option value="Gestante">Gestante</option>
                    <option value="Formatura">Formatura</option>
                    <option value="Eventos">Eventos</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Estágio no Funil
                  </label>
                  <select
                    value={leadForm.estagio}
                    onChange={(e) =>
                      setLeadForm({
                        ...leadForm,
                        estagio: e.target.value as CRMStage,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                  >
                    <option value="lead">1. LEAD / CONTATO</option>
                    <option value="agendado">2. AGENDADO</option>
                    <option value="fotografado">3. FOTOGRAFADO</option>
                    <option value="selecao">4. SELEÇÃO DO CLIENTE</option>
                    <option value="edicao">5. EDIÇÃO & COR</option>
                    <option value="entregue">6. GALERIA ENTREGUE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Valor Previsto (R$)
                  </label>
                  <input
                    type="number"
                    value={leadForm.valor}
                    onChange={(e) =>
                      setLeadForm({
                        ...leadForm,
                        valor: Number(e.target.value),
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] font-mono focus:border-[#E85D83] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#B8B1AA] mb-1 font-semibold">
                  Observações / Preferências do Cliente
                </label>
                <textarea
                  rows={3}
                  value={leadForm.observacoes}
                  onChange={(e) =>
                    setLeadForm({ ...leadForm, observacoes: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                  placeholder="Anotações sobre locais preferidos, estilo, referências..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#B8B1AA] hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#E85D83] hover:bg-[#d64b71] text-white font-bold tracking-wider uppercase shadow-lg cursor-pointer"
                >
                  Salvar no CRM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: NOVA TRANSAÇÃO FINANCEIRA */}
      {/* ========================================================================= */}
      {isTransactionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141419] border border-white/10 rounded-2xl max-w-lg w-full p-7 my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h3 className="font-playfair text-2xl font-bold text-white">
                Nova Transação Financeira
              </h3>
              <button
                onClick={() => setIsTransactionModalOpen(false)}
                className="text-[#B8B1AA] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTransaction} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setTransactionForm({ ...transactionForm, tipo: 'receita' })
                  }
                  className={`py-2.5 rounded-xl font-bold uppercase transition-all ${
                    transactionForm.tipo === 'receita'
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-white/5 text-[#B8B1AA]'
                  }`}
                >
                  + Receita (Entrada)
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setTransactionForm({ ...transactionForm, tipo: 'despesa' })
                  }
                  className={`py-2.5 rounded-xl font-bold uppercase transition-all ${
                    transactionForm.tipo === 'despesa'
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-white/5 text-[#B8B1AA]'
                  }`}
                >
                  - Despesa (Saída)
                </button>
              </div>

              <div>
                <label className="block text-[#B8B1AA] mb-1 font-semibold">
                  Descrição
                </label>
                <input
                  type="text"
                  required
                  value={transactionForm.descricao}
                  onChange={(e) =>
                    setTransactionForm({
                      ...transactionForm,
                      descricao: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                  placeholder="ex: Sinal 50% Ensaio Casal Mariana & João"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Valor (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={transactionForm.valor}
                    onChange={(e) =>
                      setTransactionForm({
                        ...transactionForm,
                        valor: Number(e.target.value),
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] font-mono focus:border-[#E85D83] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Data
                  </label>
                  <input
                    type="date"
                    required
                    value={transactionForm.data}
                    onChange={(e) =>
                      setTransactionForm({
                        ...transactionForm,
                        data: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Forma de Pagamento
                  </label>
                  <select
                    value={transactionForm.formaPagamento}
                    onChange={(e) =>
                      setTransactionForm({
                        ...transactionForm,
                        formaPagamento: e.target.value as any,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                  >
                    <option value="Pix">Pix</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Transferência">Transferência</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Boleto">Boleto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#B8B1AA] mb-1 font-semibold">
                    Status
                  </label>
                  <select
                    value={transactionForm.status}
                    onChange={(e) =>
                      setTransactionForm({
                        ...transactionForm,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#181820] border border-white/10 text-[#F3F0EA] focus:border-[#E85D83] focus:outline-none"
                  >
                    <option value="pago">Pago / Recebido</option>
                    <option value="pendente">Pendente / A Receber</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsTransactionModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#B8B1AA] hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#E85D83] hover:bg-[#d64b71] text-white font-bold tracking-wider uppercase shadow-lg cursor-pointer"
                >
                  Salvar Transação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
