import React from 'react';
import { IMAGES } from '../assets/images';
import {
  DoodleCurvedArrow,
  DoodleHeart,
  DoodleStar,
  DoodleUnderline,
  WashiTapeStrip,
} from './Doodles';

interface PortfolioStoryProps {
  onScrollToSearch?: () => void;
  onOpenPortfolio: () => void;
}

export const PortfolioStory: React.FC<PortfolioStoryProps> = ({
  onScrollToSearch,
  onOpenPortfolio,
}) => {
  return (
    <section
      id="capitulos"
      className="relative bg-[#111114] py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden select-none border-t border-white/5"
    >
      {/* Subtle Analog Grain Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,93,131,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        {/* LEFT COLUMN: Polaroid Scrapbook Collage */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
          <div className="relative w-full max-w-md h-[460px] sm:h-[540px]">
            {/* Top Polaroid (Bárbara smiling in brown jacket) */}
            <div className="absolute top-0 left-4 sm:left-8 z-10 transform -rotate-6 hover:rotate-0 transition-transform">
              <WashiTapeStrip variant="pink" rotate="8deg" className="-top-3 left-8" />
              <div className="polaroid-card w-48 sm:w-56 shadow-2xl">
                <div className="aspect-[4/5] bg-stone-900 overflow-hidden">
                  <img
                    src={IMAGES.barbaraPortrait}
                    alt="Bárbara Vitória retrato"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-[1.05]"
                  />
                </div>
              </div>
            </div>

            {/* Handwritten Note near Top Polaroid: "você linda! ♡" */}
            <div className="absolute top-12 right-0 sm:right-6 z-30 transform rotate-6">
              <p className="font-diary text-2xl sm:text-3xl text-[#F3F0EA] drop-shadow-md">
                você
                <br />
                linda! <span className="text-[#E85D83] font-bold">♡</span>
              </p>
            </div>

            {/* Middle Right Polaroid (Couple hands showing wedding rings) */}
            <div className="absolute top-36 sm:top-40 right-2 sm:right-6 z-20 transform rotate-3 hover:rotate-0 transition-transform">
              <div className="polaroid-card w-44 sm:w-52 shadow-2xl">
                <div className="aspect-square bg-stone-900 overflow-hidden">
                  <img
                    src={IMAGES.coupleRings}
                    alt="Ensaio casal alianças"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -left-6 top-1/2">
                <DoodleHeart size={20} color="#E85D83" />
              </div>
            </div>

            {/* Bottom Polaroid (Bárbara mirror selfie with camera) */}
            <div className="absolute bottom-2 left-10 sm:left-16 z-25 transform rotate-2 hover:rotate-0 transition-transform">
              <WashiTapeStrip variant="beige" rotate="-4deg" className="-top-3 left-10" />
              <div className="polaroid-card w-48 sm:w-56 shadow-2xl">
                <div className="aspect-[4/3] bg-stone-900 overflow-hidden">
                  <img
                    src={IMAGES.heroBarbara}
                    alt="Bárbara com câmera"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Little Star Doodle on bottom right of polaroid */}
              <div className="absolute -right-4 -bottom-2 z-30">
                <DoodleStar size={24} color="#E85D83" />
              </div>
            </div>

            {/* Extra Little Heart on left */}
            <div className="absolute bottom-24 left-2 z-30">
              <DoodleHeart size={18} color="#F3F0EA" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Title & Story Narrative */}
        <div className="lg:col-span-6 text-left space-y-6 max-w-xl">
          {/* Handwritten Title */}
          <div className="relative">
            <h2 className="font-handwriting text-5xl sm:text-6xl lg:text-7xl text-[#F3F0EA] leading-[0.92] tracking-wide font-normal">
              Cada ensaio
              <br />
              é um capítulo
              <br />
              diferente.
            </h2>

            {/* Hand-drawn Pink Scribble Underline */}
            <div className="w-48 sm:w-64 mt-2">
              <DoodleUnderline color="#E85D83" />
            </div>

            {/* Pink Accent Star */}
            <div className="absolute top-12 right-2 sm:right-8">
              <DoodleStar size={34} color="#E85D83" />
            </div>
          </div>

          {/* Body Paragraph */}
          <p className="text-base sm:text-lg text-[#B8B1AA] leading-relaxed font-normal pt-4">
            Aqui você encontra fotos que fazem sentido. Seja um momento simples,
            um grande acontecimento ou só aquela vontade de se ver de um jeito
            ainda mais bonito.
          </p>

          {/* CTA: Ver Portfólio */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <button
              id="btn-ver-portfolio-story"
              onClick={onOpenPortfolio}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#E85D83] hover:bg-[#d64a71] active:scale-95 text-white font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-[0_4px_25px_rgba(232,93,131,0.45)] hover:shadow-[0_6px_30px_rgba(232,93,131,0.65)] cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>VER PORTFÓLIO COMPLETO</span>
              <span className="text-white group-hover:translate-x-1.5 transition-transform text-sm">→</span>
            </button>

            <button
              id="btn-see-portfolio-handwritten"
              onClick={onOpenPortfolio}
              className="group flex items-center gap-2 text-left cursor-pointer transition-transform hover:translate-x-1"
            >
              <span className="font-diary text-2xl sm:text-3xl text-[#F3F0EA] group-hover:text-[#E85D83] transition-colors">
                ver histórias reais <span className="text-[#E85D83]">♡</span>
              </span>
              <DoodleCurvedArrow
                size={30}
                direction="down-right"
                color="#E85D83"
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
