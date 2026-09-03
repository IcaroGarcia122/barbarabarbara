import React from 'react';
import { Camera, Heart, Sparkles, Star, Film } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { text: 'REGISTROS REAIS DE PESSOAS REAIS', icon: Sparkles },
    { text: 'ENSAIOS EM ITAJAÍ & REGIÃO', icon: Star },
    { text: 'FOTOGRAFIA ANALÓGICA & AFETIVA', icon: Heart },
    { text: 'MEMÓRIAS QUE TRANSFORMAM O AGORA', icon: Camera },
    { text: 'LUZ NATURAL & MOMENTOS ESPONTÂNEOS', icon: Film },
    { text: 'BÁRBARA VITÓRIA FOTOGRAFIA', icon: Sparkles },
  ];

  return (
    <div className="relative py-0 overflow-hidden select-none z-20">
      <div
        id="marquee-ticker"
        className="w-full bg-[#111114] border-y border-[#E85D83]/30 py-3.5 shadow-2xl backdrop-blur-md"
      >
        <div className="flex w-max animate-marquee space-x-8 items-center">
          {/* Doubled for continuous seamless loop */}
          {[...items, ...items, ...items, ...items].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 shrink-0 group"
              >
                <span className="font-mono text-xs tracking-[0.25em] text-[#F3F0EA] font-semibold group-hover:text-[#E85D83] transition-colors uppercase">
                  {item.text}
                </span>
                <Icon size={13} className="text-[#E85D83] shrink-0" />
                <span className="text-[#E85D83]/40 text-xs select-none">✦</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
