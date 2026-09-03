import React from 'react';
import { IMAGES } from '../assets/images';
import { DoodleSketchStar, DoodleHeart, DoodleSparkle, DoodleCurvedArrow } from './Doodles';
import { TornPaperTop } from './TornPaperEdge';

interface HeroProps {
  onScrollToSearch: () => void;
  onSelectCategory: (categoria: string) => void;
  onOpenPortfolio: () => void;
}

const SESSION_ITEMS = [
  { id: 'ENSAIOS', label: 'ENSAIOS' },
  { id: 'FAMÍLIA', label: 'FAMÍLIA' },
  { id: 'CASAIS', label: 'CASAIS' },
  { id: 'INDIVIDUAL', label: 'INDIVIDUAL' },
  { id: 'EVENTOS', label: 'EVENTOS' },
];

export const Hero: React.FC<HeroProps> = ({ onScrollToSearch, onSelectCategory, onOpenPortfolio }) => {
  return (
    <section
      id="hero-section"
      className="relative min-h-[85vh] sm:min-h-screen w-full bg-[#0B0B0D] overflow-hidden flex flex-col justify-end pt-24 sm:pt-28 pb-14 sm:pb-20 md:pb-24 select-none"
    >
      {/* Background Photograph with lively filter */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.heroAtencao}
          alt="Bárbara Vitória Fotografia"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter contrast-[1.08] saturate-[1.25] brightness-[1.03]"
        />
        {/* Soft vignette gradient to enhance text legibility and button contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75 pointer-events-none" />
      </div>

      {/* Top / Center Branding Title - ONLY ON MOBILE (< md), with stylish typography placed lower */}
      <div className="md:hidden relative z-10 max-w-sm mx-auto px-6 w-full text-center flex flex-col items-center mt-auto mb-6 pt-32">
        <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
          <DoodleSparkle size={12} color="#E85D83" />
          <span className="text-[10px] font-mono tracking-[0.28em] text-[#E85D83] uppercase">
            Fotografia Afetiva
          </span>
          <DoodleSparkle size={12} color="#E85D83" />
        </div>
        <h1 className="font-playfair italic font-normal text-3xl sm:text-4xl text-white tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          Bárbara Vitória
        </h1>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span className="h-[1px] w-6 bg-white/30" />
          <span className="font-diary text-base text-[#F3F0EA]/95 tracking-wide drop-shadow-md">
            memórias com alma
          </span>
          <DoodleHeart size={16} color="#E85D83" className="inline-block" />
          <span className="h-[1px] w-6 bg-white/30" />
        </div>
      </div>

      {/* Right-side Interactive Sessions ("Sessões") Menu - Desktop/Tablet only */}
      <div
        id="hero-sessions-menu"
        className="hidden md:flex absolute right-6 sm:right-12 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 z-20 flex-col items-start gap-4 sm:gap-6 pointer-events-auto"
      >
        <div className="flex flex-col items-start space-y-3.5 sm:space-y-4">
          {SESSION_ITEMS.map((item) => (
            <button
              key={item.id}
              id={`hero-session-${item.id.toLowerCase()}`}
              onClick={() => onSelectCategory(item.id)}
              className="group text-left font-mono text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-[0.22em] text-white/90 hover:text-[#E85D83] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] transition-all transform hover:translate-x-1.5 cursor-pointer relative"
              title={`Ver sessão de ${item.label}`}
            >
              <span className="relative z-10">{item.label}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-[#E85D83] font-bold">
                ♡
              </span>
            </button>
          ))}
        </div>

        {/* Hand-drawn Pink Star Doodle below words */}
        <div className="mt-1 sm:mt-2 -ml-1 transition-transform hover:scale-110 cursor-pointer">
          <DoodleSketchStar size={42} color="#E85D83" />
        </div>
      </div>

      {/* Desktop / PC Bottom Interactive Buttons */}
      <div className="hidden md:flex relative z-30 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full items-center justify-between mb-8 sm:mb-12">
        <div />
        <div className="relative flex items-center gap-3">
          {/* Hand-drawn annotation pointing directly to the "VER PORTFÓLIO" button */}
          <div className="absolute -top-11 right-2 sm:right-4 flex items-center gap-1.5 pointer-events-none select-none z-40">
            <span className="font-diary text-2xl lg:text-3xl text-[#F3F0EA] font-semibold tracking-wider -rotate-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              portfólio
            </span>
            <span className="text-[#E85D83] font-bold text-lg -rotate-12 select-none">♡</span>
            <DoodleCurvedArrow size={34} direction="down" color="#E85D83" className="translate-y-1 rotate-12" />
          </div>

          <a
            id="hero-btn-agendar-desktop"
            href="https://wa.me/message/5LSLZWJI3FYXB1"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E85D83] hover:bg-[#d64a71] active:scale-95 text-white text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(232,93,131,0.4)] hover:shadow-[0_6px_25px_rgba(232,93,131,0.6)] cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>AGENDAR ENSAIO</span>
          </a>
          <button
            id="hero-btn-portfolio-desktop"
            onClick={onOpenPortfolio}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#111114]/80 hover:bg-[#1A1A20] backdrop-blur-md border border-white/15 hover:border-[#E85D83]/60 text-xs font-mono tracking-widest text-[#F3F0EA] hover:text-[#E85D83] transition-all shadow-xl cursor-pointer"
          >
            <span>VER PORTFÓLIO</span>
            <span className="text-[#E85D83] group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Centered Action Buttons */}
      <div className="flex md:hidden relative z-30 max-w-xs mx-auto px-4 w-full flex-col items-center justify-center gap-2 mb-10 sm:mb-12">
        {/* Top Button: Agendar Ensaio */}
        <a
          id="hero-btn-agendar"
          href="https://wa.me/message/5LSLZWJI3FYXB1"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#E85D83] hover:bg-[#d64a71] active:scale-95 text-white font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(232,93,131,0.45)] cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>AGENDAR ENSAIO</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>

        {/* Hand-drawn note with arrow pointing to the "VER PORTFÓLIO" button */}
        <div className="flex items-center justify-center gap-1.5 pt-1 -mb-1 pointer-events-none select-none">
          <span className="font-diary text-2xl text-[#F3F0EA] font-semibold tracking-wider -rotate-6 drop-shadow-md">
            portfólio
          </span>
          <span className="text-[#E85D83] font-bold text-base -rotate-6">♡</span>
          <DoodleCurvedArrow size={26} direction="down" color="#E85D83" className="translate-y-0.5 rotate-6" />
        </div>

        {/* Bottom Button: Ver Portfólio */}
        <button
          id="hero-btn-portfolio"
          onClick={onOpenPortfolio}
          className="group w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#111114]/85 hover:bg-[#1A1A20] backdrop-blur-md border border-white/20 hover:border-[#E85D83]/60 text-xs font-mono tracking-widest text-[#F3F0EA] hover:text-[#E85D83] transition-all shadow-xl cursor-pointer"
        >
          <span>VER PORTFÓLIO</span>
          <span className="text-[#E85D83] group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Torn Paper Edge - Idêntico ao da sessão Como Funciona (TornPaperTop com borda de fibra branca) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none w-full overflow-hidden leading-none -mb-[1px]">
        <TornPaperTop paperColor="#0B0B0D" fiberColor="#FFFFFF" />
      </div>
    </section>
  );
};
