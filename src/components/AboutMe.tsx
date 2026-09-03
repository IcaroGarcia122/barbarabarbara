import React from 'react';
import { IMAGES } from '../assets/images';
import { DoodleHeart, DoodleSparkle, DoodleSketchStar, DoodleCamera } from './Doodles';
import { Instagram, ArrowRight } from 'lucide-react';

interface AboutMeProps {
  onScrollToSearch?: () => void;
}

export const AboutMe: React.FC<AboutMeProps> = ({ onScrollToSearch }) => {
  return (
    <section
      id="sobre"
      className="relative w-full bg-[#0B0B0D] py-20 sm:py-28 px-6 sm:px-10 lg:px-12 overflow-hidden select-none"
    >
      {/* Background Subtle Grunge Texture - Idêntico ao da seção Encontre Seu Ensaio */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,93,131,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Polaroid Style Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              {/* Washi Tape analog decoration */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-28 h-7 bg-[#F3F0EA]/20 backdrop-blur-sm rotate-2 shadow-sm border-x border-white/10" />

              {/* Polaroid Container */}
              <div className="bg-[#141418] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-2xl transition-transform duration-300 hover:rotate-1 hover:scale-[1.01]">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#1A1A20]">
                  <img
                    src={IMAGES.qme || IMAGES.quemEBarbara}
                    alt="Quem é a Bárbara Vitória - Fotógrafa"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-[1.05] saturate-[1.05] brightness-[1.01] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Polaroid bottom caption */}
                <div className="pt-4 pb-2 px-2 flex items-center justify-between">
                  <div>
                    <p className="font-marker text-2xl text-[#F3F0EA] tracking-wide">
                      Bárbara Vitória
                    </p>
                    <p className="text-[11px] font-mono tracking-widest text-[#B8B1AA] uppercase">
                      Fotografia Afetiva
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DoodleHeart size={22} color="#E85D83" className="animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Decorative floating doodles around photo */}
              <div className="absolute -bottom-6 -left-6 hidden sm:block pointer-events-none">
                <DoodleSketchStar size={48} color="#E85D83" />
              </div>
              <div className="absolute -top-3 -right-3 pointer-events-none">
                <DoodleSparkle size={26} color="#E85D83" />
              </div>
            </div>
          </div>

          {/* Right Column: Bio Story & Philosophy */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Tagline Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#1A1A20] border border-white/10 text-xs font-mono tracking-[0.2em] text-[#E85D83] uppercase flex items-center gap-1.5 shadow-sm">
                <DoodleSparkle size={13} color="#E85D83" />
                Sobre Mim
              </span>
            </div>

            {/* Main Headline */}
            <div className="relative inline-block">
              <h2 className="font-marker text-4xl sm:text-5xl lg:text-6xl text-[#F3F0EA] leading-[1.15] tracking-wide lowercase drop-shadow-md">
                cada ensaio <br />
                é um capítulo <br />
                diferente.
              </h2>
              {/* Pink hand-drawn underline */}
              <div className="w-44 sm:w-60 h-2.5 mt-2">
                <svg viewBox="0 0 240 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#E85D83]">
                  <path d="M3 6.5C55 3.5 165 3.5 237 6.5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Narrative Bio */}
            <div className="space-y-4 text-[#D8D2C9] font-light text-base sm:text-lg leading-relaxed pt-2">
              <p>
                Olá! Eu sou a <strong className="font-marker text-2xl font-normal text-[#E85D83]">Bárbara Vitória</strong>.{' '}
                Acredito que a fotografia vai muito além do clique: é a arte de acolher histórias,
                revelar a beleza das conexões sinceras e criar memórias tangíveis para toda a vida.
              </p>
              <p>
                Meu olhar busca a naturalidade — sem poses engessadas ou roteiros forçados.
                Quero que no seu ensaio você sinta a liberdade de sorrir, abraçar e viver o presente,
                enquanto eu cuido da luz, da sensibilidade e dos pequenos detalhes que tornam você único.
              </p>
            </div>

            {/* Core Values / Focus Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-[#141418] border border-white/5 hover:border-[#E85D83]/30 transition-all">
                <span className="text-[#E85D83] font-mono text-sm block mb-1">✧ Luz Natural</span>
                <p className="text-xs text-[#A8A199] leading-normal">
                  Cores vivas e iluminação aconchegante que realçam a atmosfera real.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#141418] border border-white/5 hover:border-[#E85D83]/30 transition-all">
                <span className="text-[#E85D83] font-mono text-sm block mb-1">✧ Conexão Leve</span>
                <p className="text-xs text-[#A8A199] leading-normal">
                  Direção carinhosa e descontraída para você se sentir à vontade.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#141418] border border-white/5 hover:border-[#E85D83]/30 transition-all">
                <span className="text-[#E85D83] font-mono text-sm block mb-1">✧ Memórias Vivas</span>
                <p className="text-xs text-[#A8A199] leading-normal">
                  Imagens com alma prontas para emocionar hoje e no futuro.
                </p>
              </div>
            </div>

            {/* Actions & Social Links */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                id="about-btn-whatsapp"
                href="https://wa.me/message/5LSLZWJI3FYXB1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#E85D83] hover:bg-[#d64a71] active:scale-95 text-white text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-[#E85D83]/30 flex items-center gap-2 cursor-pointer"
              >
                <span>VAMOS CONVERSAR</span>
                <ArrowRight size={14} />
              </a>
              <a
                id="about-btn-instagram"
                href="https://instagram.com/barbaravitoria.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono tracking-wider text-[#F3F0EA] hover:text-[#E85D83] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Instagram size={15} />
                <span>@barbaravitoria.ph</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
