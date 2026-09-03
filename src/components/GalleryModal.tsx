import React, { useState } from 'react';
import {
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  ExternalLink,
  FolderCheck,
  FolderOpen,
  Image as ImageIcon,
  MapPin,
  MessageCircle,
  Palette,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { Ensaio, EnsaioEtapaId } from '../types';
import { DoodleHeart, WashiTapeStrip } from './Doodles';

interface GalleryModalProps {
  ensaio: Ensaio;
  onClose: () => void;
}

interface StepDefinition {
  id: EnsaioEtapaId;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  description: string;
  detailText: string;
}

const ETAPAS: StepDefinition[] = [
  {
    id: 'lead',
    label: '1. Lead / Contato',
    shortLabel: 'Contato',
    icon: User,
    description: 'Primeiro contato e alinhamento de ideias e expectativas.',
    detailText: 'Conversa inicial para entender o que você sonha para este ensaio.',
  },
  {
    id: 'agendado',
    label: '2. Agendado',
    shortLabel: 'Agendado',
    icon: Calendar,
    description: 'Data e horário confirmados na agenda com briefing de looks e locação.',
    detailText: 'Tudo pronto e reservado para o seu momento especial.',
  },
  {
    id: 'fotografado',
    label: '3. Fotografado',
    shortLabel: 'Fotografado',
    icon: Camera,
    description: 'Cliques realizados com sucesso! Fotos em processo seguro de backup.',
    detailText: 'Os registros brutos foram descarregados e organizados com segurança.',
  },
  {
    id: 'selecao',
    label: '4. Seleção do Cliente',
    shortLabel: 'Seleção',
    icon: ImageIcon,
    description: 'Curadoria das fotos favoritas e definição dos melhores cliques.',
    detailText: 'Momento de escolher as imagens que irão para a edição autoral.',
  },
  {
    id: 'edicao',
    label: '5. Edição & Cor',
    shortLabel: 'Edição & Cor',
    icon: Palette,
    description: 'Tratamento autoral foto por foto, paleta de cores quentes e grão analógico.',
    detailText: 'Cada foto recebe color grading artesanal para realçar a emoção e beleza natural.',
  },
  {
    id: 'entregue',
    label: '6. Galeria Entregue',
    shortLabel: 'Galeria Entregue',
    icon: FolderCheck,
    description: 'Galeria 100% finalizada e liberada para download em altíssima resolução.',
    detailText: 'Todas as fotos disponíveis para você visualizar e baixar para sempre.',
  },
];

export const GalleryModal: React.FC<GalleryModalProps> = ({
  ensaio,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Determine active etapa index from unified 6 stages
  const currentEtapaId: EnsaioEtapaId =
    ensaio.etapaAtual ||
    (ensaio.statusEntrega === 'Agendado'
      ? 'agendado'
      : ensaio.statusEntrega === 'Em Edição'
      ? 'edicao'
      : 'entregue');

  const currentStepIndex = Math.max(
    0,
    ETAPAS.findIndex((e) => e.id === currentEtapaId)
  );

  const [selectedStepDetail, setSelectedStepDetail] = useState<number>(currentStepIndex);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(ensaio.googleDriveUrl || window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleOpenDrive = () => {
    if (ensaio.googleDriveUrl) {
      window.open(ensaio.googleDriveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Oi Bárbara! Estou acompanhando meu ensaio (${ensaio.id} - ${ensaio.cliente}) pelo site! ♡`
  );

  const isReady = currentEtapaId === 'entregue';

  return (
    <div
      id="gallery-modal-overlay"
      className="fixed inset-0 z-50 bg-[#0B0B0D]/95 backdrop-blur-md overflow-y-auto flex flex-col justify-start animate-in fade-in duration-200"
    >
      {/* Top Fixed Header */}
      <div className="sticky top-0 z-40 bg-[#111114]/95 border-b border-white/10 px-6 py-4 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F3F0EA] hover:text-[#E85D83] hover:border-[#E85D83]/50 transition-all cursor-pointer"
            aria-label="Fechar galeria"
          >
            <X size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-diary text-2xl sm:text-3xl text-[#F3F0EA] font-semibold">
                {ensaio.titulo}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E85D83]/20 text-[#E85D83] border border-[#E85D83]/40 font-mono uppercase font-bold">
                {ensaio.id}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#B8B1AA] mt-0.5">
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-[#E85D83]" />
                {ensaio.data}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-[#E85D83]" />
                {ensaio.local}
              </span>
            </div>
          </div>
        </div>

        {/* Top Gallery Action */}
        <div className="flex items-center gap-3">
          {isReady ? (
            <button
              onClick={handleOpenDrive}
              className="px-4 sm:px-5 py-2 rounded-full bg-[#E85D83] hover:bg-[#d64b71] text-white text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg hover:shadow-[#E85D83]/40 cursor-pointer group"
            >
              <FolderOpen size={16} />
              <span className="hidden sm:inline">Acessar Galeria Completa</span>
              <span className="sm:hidden">Galeria</span>
              <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-full bg-white/10 text-[#F3F0EA] text-xs font-mono flex items-center gap-1.5 border border-white/10">
              <Clock size={13} className="text-[#E85D83] animate-spin" />
              <span>{ETAPAS[currentStepIndex].shortLabel}</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Delivery View */}
      <div className="max-w-4xl mx-auto w-full px-6 py-8 sm:py-10 flex-1 flex flex-col justify-start">
        {/* ================= ETAPAS DO ENSAIO (CARDS DO STATUS DO ENSAIO) ================= */}
        <div className="bg-[#111114] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D83]/15 border border-[#E85D83]/30 text-[#E85D83] text-xs font-mono uppercase tracking-wider mb-2">
                <Sparkles size={13} />
                <span>Rastreamento do Ensaio</span>
              </div>
              <h3 className="font-diary text-2xl sm:text-3xl font-bold text-[#F3F0EA]">
                Etapas do seu Ensaio Fotográfico
              </h3>
              <p className="text-xs text-[#B8B1AA]">
                Acompanhe o status em tempo real do seu ensaio. Clique em cada card para ver os detalhes da etapa.
              </p>
            </div>
            {ensaio.previsaoEntrega && (
              <div className="self-start sm:self-auto bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl text-right">
                <span className="text-[10px] text-[#B8B1AA] uppercase tracking-wider block">Previsão</span>
                <span className="text-xs font-mono font-semibold text-[#E85D83]">
                  {ensaio.previsaoEntrega}
                </span>
              </div>
            )}
          </div>

          {/* 6 Cards das Etapas do Ensaio */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {ETAPAS.map((etapa, idx) => {
              const IconComponent = etapa.icon;
              const isCompleted = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isSelected = selectedStepDetail === idx;

              return (
                <button
                  key={etapa.id}
                  onClick={() => setSelectedStepDetail(idx)}
                  className={`flex flex-col items-center text-center p-3 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#E85D83]/15 border-[#E85D83] shadow-lg shadow-[#E85D83]/20 ring-2 ring-[#E85D83]/30'
                      : isCurrent
                      ? 'bg-[#181820] border-[#E85D83]/70 ring-1 ring-[#E85D83]/40'
                      : isCompleted
                      ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50'
                      : 'bg-white/5 border-white/5 hover:border-white/15'
                  }`}
                >
                  {/* Step Number Tag */}
                  <span className="text-[10px] font-mono text-[#B8B1AA] mb-1.5 font-bold">
                    0{idx + 1}
                  </span>
                  {/* Icon Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all mb-2 ${
                      isCompleted
                        ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                        : isCurrent
                        ? 'bg-[#E85D83] text-white ring-4 ring-[#E85D83]/30 animate-pulse shadow-lg shadow-[#E85D83]/40'
                        : 'bg-[#18181D] border border-white/15 text-[#B8B1AA]/60'
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={18} strokeWidth={3} />
                    ) : (
                      <IconComponent size={18} />
                    )}
                  </div>
                  {/* Step Title */}
                  <span
                    className={`text-xs font-semibold leading-tight mb-1 line-clamp-1 ${
                      isCurrent
                        ? 'text-[#E85D83] font-bold'
                        : isCompleted
                        ? 'text-emerald-400'
                        : 'text-[#B8B1AA]'
                    }`}
                  >
                    {etapa.shortLabel}
                  </span>
                  {/* Status Badge */}
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : isCurrent
                        ? 'bg-[#E85D83]/25 text-[#E85D83] font-bold'
                        : 'text-[#B8B1AA]/60'
                    }`}
                  >
                    {isCompleted ? 'Concluído' : isCurrent ? 'Em Curso' : 'Aguardando'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Step Explanatory Card */}
          <div className="bg-[#18181D] border border-white/10 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#E85D83]/20 border border-[#E85D83]/30 text-[#E85D83] flex items-center justify-center shrink-0 mt-0.5">
                {React.createElement(ETAPAS[selectedStepDetail].icon, { size: 22 })}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#F3F0EA]">
                    {ETAPAS[selectedStepDetail].label}
                  </h4>
                  {selectedStepDetail === currentStepIndex && (
                    <span className="px-2 py-0.5 rounded-full bg-[#E85D83] text-white text-[10px] font-mono font-bold animate-pulse">
                      Status Atual do seu Ensaio
                    </span>
                  )}
                  {selectedStepDetail < currentStepIndex && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                      <CheckCircle2 size={11} /> Concluída
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#F3F0EA]/90 mt-1">
                  {ETAPAS[selectedStepDetail].description}
                </p>
                <p className="text-xs text-[#B8B1AA] mt-1 italic">
                  {ETAPAS[selectedStepDetail].detailText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Drive Access Hero Card */}
        <div className="relative bg-[#111114] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden mb-8">
          {/* Subtle Pink Ambient Glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#E85D83]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Polaroid Cover Art */}
            <div className="relative shrink-0 transform -rotate-2 hover:rotate-0 transition-transform">
              <WashiTapeStrip variant="pink" rotate="-6deg" className="-top-3 left-4" />
              <div className="polaroid-card w-48 sm:w-56">
                <div className="aspect-[4/5] bg-stone-900 overflow-hidden">
                  <img
                    src={ensaio.fotoCapa}
                    alt={ensaio.titulo}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="font-diary text-stone-800 text-sm font-bold block">
                    {ensaio.cliente}
                  </span>
                  <span className="font-mono text-[10px] text-stone-500 uppercase">
                    {ensaio.data}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Delivery Text & Direct Drive Button */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D83]/15 border border-[#E85D83]/30 text-[#E85D83] text-xs font-mono uppercase tracking-wider mb-4">
                <Sparkles size={13} />
                <span>{isReady ? 'Ensaio Disponível para Download' : 'Ensaio em Andamento'}</span>
              </div>
              <h1 className="font-diary text-3xl sm:text-4xl text-[#F3F0EA] font-bold leading-tight mb-3">
                {isReady
                  ? 'Seu ensaio está prontinho na sua galeria digital! ♡'
                  : 'Seu ensaio está sendo preparado com muito carinho! ♡'}
              </h1>
              <p className="text-sm sm:text-base text-[#B8B1AA] leading-relaxed mb-6">
                {ensaio.mensagemEtapa || ensaio.descricao}
              </p>

              {/* Package Details Badge */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#F3F0EA]/90">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E85D83]" />
                  <span><strong>Pacote:</strong> {ensaio.tamanhoArquivo || 'Fotos tratadas em alta resolução'}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[#B8B1AA]">
                  <span><strong>Código:</strong> {ensaio.id}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Primary Button to Gallery */}
                <button
                  id="btn-open-gallery"
                  onClick={handleOpenDrive}
                  className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-[#E85D83] to-[#d64b71] hover:from-[#d64b71] hover:to-[#b8385b] text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-[#E85D83]/30 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <FolderOpen size={20} />
                  <span>Acessar Galeria Completa</span>
                  <ExternalLink size={17} />
                </button>
                {/* Secondary Button: Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="px-5 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-[#F3F0EA] text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                  title="Copiar link da Galeria"
                >
                  {copiedLink ? (
                    <>
                      <Check size={18} className="text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Link Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      <span className="hidden sm:inline">Copiar Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Instructions & Help Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* How to Download Box */}
          <div className="bg-[#111114] border border-white/10 rounded-xl p-6">
            <h3 className="font-diary text-2xl text-[#F3F0EA] flex items-center gap-2 mb-3">
              <Download size={18} className="text-[#E85D83]" />
              Como baixar suas fotos?
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#B8B1AA] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E85D83]/20 text-[#E85D83] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <span>Clique no botão acima para abrir a sua galeria digital.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E85D83]/20 text-[#E85D83] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  No computador, clique em <strong>"Fazer download"</strong> para baixar o pacote completo em altíssima resolução.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E85D83]/20 text-[#E85D83] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <span>No celular, abra as fotos desejadas e salve diretamente no rolo da câmera.</span>
              </li>
            </ul>
          </div>

          {/* Testimonial / Message from Bárbara */}
          <div className="relative bg-[#140D10] border border-[#E85D83]/30 rounded-xl p-6 flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-handwriting text-2xl text-[#E85D83]">
                  Com muito carinho, Bárbara ♡
                </span>
                <DoodleHeart size={20} color="#E85D83" />
              </div>
              <p className="font-diary text-lg sm:text-xl text-[#F3F0EA] leading-snug">
                "{ensaio.depoimento?.texto || 'Obrigada por confiar no meu olhar e permitir que eu eternizasse momentos tão preciosos da sua história.'}"
              </p>
            </div>

            {/* Direct WhatsApp button */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <a
                href={`https://wa.me/5547999999999?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle size={15} />
                <span>Falar com a Bárbara no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
