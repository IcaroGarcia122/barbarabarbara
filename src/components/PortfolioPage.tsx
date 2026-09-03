import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Calendar,
  Camera,
  Download,
  ExternalLink,
  Eye,
  Heart,
  Image as ImageIcon,
  MapPin,
  MessageCircle,
  Sparkles,
  X,
} from 'lucide-react';
import {
  DoodleCamera,
  DoodleCurvedArrow,
  DoodleHeart,
  DoodleSketchStar,
  DoodleSparkle,
  DoodleStar,
  DoodleUnderline,
  WashiTapeStrip,
} from './Doodles';
import { PORTFOLIO_STORIES, PortfolioStoryItem } from '../data/portfolioStories';
import { getEnsaioByCode } from '../data/mockEnsaios';
import { Ensaio } from '../types';

interface PortfolioPageProps {
  onBackToHome: () => void;
  onSelectEnsaio: (ensaio: Ensaio) => void;
}

type FilterCategory = 'TODOS' | 'CASAIS' | '15 ANOS' | 'FAMÍLIA' | 'INDIVIDUAL' | 'CASAMENTOS' | 'GESTANTE';

const CATEGORIES: FilterCategory[] = [
  'TODOS',
  'CASAIS',
  '15 ANOS',
  'FAMÍLIA',
  'INDIVIDUAL',
  'CASAMENTOS',
  'GESTANTE',
];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onBackToHome,
  onSelectEnsaio,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('TODOS');
  const [lightboxImage, setLightboxImage] = useState<{
    url: string;
    caption: string;
    storyTitle: string;
  } | null>(null);
  const [activeStoryModal, setActiveStoryModal] = useState<PortfolioStoryItem | null>(null);

  const filteredStories = useMemo(() => {
    if (selectedCategory === 'TODOS') return PORTFOLIO_STORIES;
    if (selectedCategory === 'CASAIS') {
      return PORTFOLIO_STORIES.filter(
        (s) => s.categoria === 'Casais' || s.tags.includes('Casais')
      );
    }
    if (selectedCategory === '15 ANOS') {
      return PORTFOLIO_STORIES.filter((s) => s.categoria === '15 Anos');
    }
    if (selectedCategory === 'FAMÍLIA') {
      return PORTFOLIO_STORIES.filter((s) => s.categoria === 'Família');
    }
    if (selectedCategory === 'INDIVIDUAL') {
      return PORTFOLIO_STORIES.filter((s) => s.categoria === 'Individual');
    }
    if (selectedCategory === 'CASAMENTOS') {
      return PORTFOLIO_STORIES.filter((s) => s.categoria === 'Casamento');
    }
    if (selectedCategory === 'GESTANTE') {
      return PORTFOLIO_STORIES.filter((s) => s.categoria === 'Gestante');
    }
    return PORTFOLIO_STORIES;
  }, [selectedCategory]);

  const handleOpenClientGallery = (story: PortfolioStoryItem) => {
    if (story.codigoEnsaio) {
      const ensaio = getEnsaioByCode(story.codigoEnsaio);
      if (ensaio) {
        onSelectEnsaio(ensaio);
        return;
      }
    }
    // If not found in mockEnsaios, open the story modal
    setActiveStoryModal(story);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F3F0EA] pt-24 sm:pt-28 pb-20 px-4 sm:px-8 lg:px-12 relative overflow-hidden select-none">
      {/* Background Subtle Analog Grain & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(232,93,131,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(232,93,131,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(243,240,234,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Breadcrumb & Quick Back Button */}
        <div className="flex items-center justify-between mb-8 sm:mb-12 border-b border-white/10 pb-4">
          <button
            id="btn-back-to-home"
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 hover:bg-[#E85D83]/15 border border-white/10 hover:border-[#E85D83]/50 text-xs sm:text-sm font-mono tracking-wider text-[#F3F0EA] transition-all cursor-pointer"
          >
            <ArrowLeft
              size={16}
              className="text-[#E85D83] group-hover:-translate-x-1 transition-transform"
            />
            <span>VOLTAR PARA O INÍCIO</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-[#B8B1AA] hidden sm:flex">
            <span>INÍCIO</span>
            <span>/</span>
            <span className="text-[#E85D83] font-bold">PORTFÓLIO AUTORAL</span>
          </div>
        </div>

        {/* Hero Banner / Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E85D83]/10 border border-[#E85D83]/30 shadow-md">
            <DoodleSparkle size={14} color="#E85D83" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#E85D83] uppercase font-bold">
              Portfólio Autoral • Bárbara Vitória
            </span>
            <DoodleSparkle size={14} color="#E85D83" />
          </div>

          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-[#F3F0EA] tracking-wide leading-tight">
            Histórias reais contadas com{' '}
            <span className="italic font-diary text-5xl sm:text-6xl lg:text-7xl text-[#E85D83] lowercase block sm:inline">
              luz natural & afeto ♡
            </span>
          </h1>

          {/* Underline doodle */}
          <div className="w-48 sm:w-64 mx-auto -mt-1">
            <DoodleUnderline color="#E85D83" />
          </div>

          <p className="text-sm sm:text-base md:text-lg text-[#B8B1AA] leading-relaxed max-w-2xl mx-auto pt-2">
            Cada ensaio é um capítulo único. Sem poses artificiais ou roteiros engessados:
            valorizamos a sensibilidade analógica, os sorrisos espontâneos e a beleza dos seus melhores momentos em Itajaí e região.
          </p>

          {/* Highlights Mini-Badges */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-[#F3F0EA]/80">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E85D83]" />
              <span>+150 Ensaios Entregues</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E85D83]" />
              <span>Luz Natural & Tons Quentes</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E85D83]" />
              <span>Itajaí & Balneário Camboriú</span>
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-2.5 pb-4 mb-10 border-b border-white/10">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#E85D83] text-white font-bold shadow-[0_4px_15px_rgba(232,93,131,0.4)] scale-102'
                    : 'bg-[#111114] text-[#B8B1AA] hover:text-[#F3F0EA] border border-white/10 hover:border-white/20'
                }`}
              >
                {cat}
                {isActive && <span className="ml-1.5">♡</span>}
              </button>
            );
          })}
        </div>

        {/* Portfolio Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredStories.map((story, index) => {
            return (
              <article
                key={story.id}
                className="group relative bg-[#111114] rounded-2xl border border-white/10 hover:border-[#E85D83]/60 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-[0_12px_35px_rgba(232,93,131,0.15)] hover:-translate-y-1"
              >
                {/* Visual Header / Photo Preview */}
                <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden cursor-pointer" onClick={() => handleOpenClientGallery(story)}>
                  <img
                    src={story.fotoCapa}
                    alt={story.titulo}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Dark gradient for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Category Pill on Photo */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest text-[#F3F0EA] uppercase">
                      {story.categoria}
                    </span>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#B8B1AA]">
                    <Calendar size={11} className="text-[#E85D83]" />
                    <span>{story.data}</span>
                  </div>

                  {/* Hover Quick Action Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E85D83] text-white text-xs font-mono font-bold tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye size={14} />
                      <span>VER DETALHES & FOTOS</span>
                    </div>
                  </div>

                  {/* Tape scrap on first item */}
                  {index === 0 && (
                    <WashiTapeStrip
                      variant="pink"
                      rotate="4deg"
                      className="absolute -top-2 left-1/3 z-20"
                    />
                  )}
                </div>

                {/* Article Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Location Pin */}
                    <div className="flex items-center gap-1.5 text-xs text-[#B8B1AA] font-mono mb-2">
                      <MapPin size={12} className="text-[#E85D83]" />
                      <span>{story.local}</span>
                    </div>

                    {/* Story Title */}
                    <h2 className="font-playfair text-xl sm:text-2xl text-[#F3F0EA] group-hover:text-[#E85D83] transition-colors font-medium">
                      {story.titulo}
                    </h2>

                    {/* Narrative Description */}
                    <p className="mt-2 text-xs sm:text-sm text-[#B8B1AA] line-clamp-3 leading-relaxed">
                      {story.descricao}
                    </p>
                  </div>

                  {/* Client Testimonial Snippet (if available) */}
                  {story.depoimento && (
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#E85D83]">
                        <span className="flex items-center gap-1 font-bold">
                          <Heart size={11} fill="#E85D83" /> Depoimento
                        </span>
                        <span className="text-[#B8B1AA]">— {story.depoimento.autor}</span>
                      </div>
                      <p className="text-xs text-[#F3F0EA]/90 italic font-diary text-base leading-snug">
                        "{story.depoimento.texto}"
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#B8B1AA]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleOpenClientGallery(story)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#E85D83] hover:bg-[#d64a71] active:scale-98 text-white font-mono text-xs font-bold tracking-wider transition-all cursor-pointer"
                    >
                      <ImageIcon size={14} />
                      <span>VER GALERIA</span>
                    </button>

                    <a
                      href={`https://wa.me/message/5LSLZWJI3FYXB1?text=${encodeURIComponent(
                        `Olá Bárbara! Vi o ensaio "${story.titulo}" no seu portfólio e gostaria de saber valores e datas para um ensaio parecido ♡`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-600/20 border border-white/10 hover:border-emerald-500/50 flex items-center justify-center text-[#F3F0EA] hover:text-emerald-400 transition-all"
                      title="Quero um ensaio assim pelo WhatsApp"
                    >
                      <MessageCircle size={17} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Booking Section */}
        <div className="mt-20 relative bg-gradient-to-br from-[#16161C] to-[#111114] rounded-3xl border border-white/10 p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
          {/* Subtle Background Star Doodles */}
          <div className="absolute top-6 left-8 text-[#E85D83]/20 pointer-events-none">
            <DoodleSketchStar size={64} color="#E85D83" />
          </div>
          <div className="absolute bottom-6 right-8 text-[#E85D83]/20 pointer-events-none">
            <DoodleHeart size={48} color="#E85D83" />
          </div>

          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <span className="font-diary text-2xl sm:text-3xl text-[#E85D83]">
              vamos criar algo inesquecível juntos? ♡
            </span>

            <h2 className="font-playfair text-3xl sm:text-4xl text-[#F3F0EA] leading-tight">
              Pronto para ter suas memórias guardadas com esse mesmo afeto?
            </h2>

            <p className="text-sm sm:text-base text-[#B8B1AA] leading-relaxed">
              Consulte a disponibilidade da agenda para Itajaí, Balneário Camboriú ou destinos especiais.
              Tiramos todas as dúvidas sobre locação, roupas e o melhor horário de luz.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/message/5LSLZWJI3FYXB1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#E85D83] hover:bg-[#d64a71] active:scale-95 text-white text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[0_4px_25px_rgba(232,93,131,0.5)] cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>AGENDAR MEU ENSAIO VIA WHATSAPP</span>
                <span>→</span>
              </a>

              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono tracking-widest text-[#F3F0EA] transition-all cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>VOLTAR AO INÍCIO</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Story Quick Modal (for items not linked to mock code) */}
      {activeStoryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setActiveStoryModal(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#141418] rounded-2xl border border-white/15 shadow-2xl p-6 sm:p-8 space-y-6 text-left my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveStoryModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#F3F0EA] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E85D83]">
                <MapPin size={13} />
                <span>{activeStoryModal.local}</span>
                <span>•</span>
                <span>{activeStoryModal.data}</span>
              </div>
              <h3 className="font-playfair text-2xl sm:text-3xl text-white">
                {activeStoryModal.titulo}
              </h3>
              <p className="text-sm text-[#B8B1AA] leading-relaxed">
                {activeStoryModal.descricao}
              </p>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
              {activeStoryModal.fotosExtras.map((foto, idx) => (
                <div
                  key={idx}
                  className="aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/10 cursor-pointer group"
                  onClick={() =>
                    setLightboxImage({
                      url: foto,
                      caption: activeStoryModal.titulo,
                      storyTitle: activeStoryModal.cliente,
                    })
                  }
                >
                  <img
                    src={foto}
                    alt={`${activeStoryModal.titulo} ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>

            {/* Testimonial */}
            {activeStoryModal.depoimento && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <p className="text-xs font-mono text-[#E85D83] font-bold">
                  Depoimento de {activeStoryModal.depoimento.autor}
                </p>
                <p className="font-diary text-xl text-[#F3F0EA] italic">
                  "{activeStoryModal.depoimento.texto}"
                </p>
              </div>
            )}

            {/* Direct Booking Link */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <a
                href={`https://wa.me/message/5LSLZWJI3FYXB1?text=${encodeURIComponent(
                  `Olá Bárbara! Me encantei pelo ensaio "${activeStoryModal.titulo}" e quero agendar o meu!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E85D83] hover:bg-[#d64a71] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-lg"
              >
                <span>AGENDAR ENSAIO PARECIDO</span>
                <span>→</span>
              </a>
              <button
                onClick={() => setActiveStoryModal(null)}
                className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-[#B8B1AA]"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer z-10"
          >
            <X size={22} />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.url}
              alt={lightboxImage.caption}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto rounded-lg shadow-2xl border border-white/20 object-contain"
            />
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-white">{lightboxImage.caption}</p>
              <p className="text-xs text-[#E85D83] font-mono">{lightboxImage.storyTitle}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
