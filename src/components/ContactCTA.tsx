import React from 'react';
import { IMAGES } from '../assets/images';
import { DoodleHeart, DoodleSparkle } from './Doodles';

export const ContactCTA: React.FC = () => {
  return (
    <section
      id="contato"
      className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] w-full bg-[#0B0B0D] overflow-hidden flex items-center justify-center py-24 sm:py-32 px-6 sm:px-10 select-none"
    >
      {/* Background Photo of Bárbara with Atmospheric Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={IMAGES.ctaFinal || IMAGES.ctaCameraBg}
          alt="Bárbara Vitória Fotografia"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter contrast-[1.08] saturate-[1.15] brightness-[1.02]"
        />
        {/* Soft edge fade at top and bottom seams for seamless blending with neighboring sections */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0B0B0D] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0B0D] to-transparent" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto w-full text-center flex flex-col items-center">
        {/* Subtle decorative sparkle badge */}
        <div className="mb-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-xl">
          <DoodleSparkle size={14} color="#E85D83" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#E85D83] uppercase font-semibold">
            Atendimento & Dúvidas
          </span>
          <DoodleSparkle size={14} color="#E85D83" />
        </div>

        {/* Direct Contact Call to Action */}
        <h3 className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          Não encontrou seu ensaio?
        </h3>
        <p className="font-marker text-3xl sm:text-4xl lg:text-5xl text-[#F3F0EA] mb-9 flex items-center justify-center gap-2 drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]">
          <span>Me chama, vou te ajudar!</span>
          <DoodleHeart size={26} color="#E85D83" className="inline-block animate-pulse" />
        </p>

        {/* Pink Button: ◉ FALAR COMIGO */}
        <a
          id="btn-whatsapp-cta"
          href="https://wa.me/message/5LSLZWJI3FYXB1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-9 sm:px-12 py-4 sm:py-5 rounded-full bg-[#E85D83] hover:bg-[#d64b71] active:scale-95 text-white font-sans font-bold tracking-widest text-xs sm:text-sm uppercase shadow-[0_8px_30px_rgba(232,93,131,0.5)] hover:shadow-[0_10px_40px_rgba(232,93,131,0.7)] transition-all cursor-pointer group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          <span>FALAR COMIGO</span>
        </a>
      </div>
    </section>
  );
};
