import React from 'react';
import {
  DoodleCamera,
  DoodleHeart,
  DoodleLightning,
  DoodleSparkle,
} from './Doodles';

export const ValuesBar: React.FC = () => {
  const values = [
    {
      id: 'v1',
      icon: <DoodleCamera size={34} color="#F3F0EA" />,
      title1: 'REGISTROS',
      title2: 'AUTÊNTICOS',
    },
    {
      id: 'v2',
      icon: <DoodleSparkle size={32} color="#E85D83" />,
      title1: 'ESTÉTICA',
      title2: 'NATURAL',
    },
    {
      id: 'v3',
      icon: <DoodleHeart size={30} color="#E85D83" />,
      title1: 'COM MUITO',
      title2: 'AMOR',
    },
    {
      id: 'v4',
      icon: <DoodleLightning size={32} color="#F3F0EA" />,
      title1: 'FOTOS QUE',
      title2: 'CONTAM HISTÓRIAS',
    },
  ];

  return (
    <section
      id="values-bar"
      className="bg-[#0B0B0D] border-b border-white/10 py-12 sm:py-16 px-6 relative z-10"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {values.map((item, idx) => (
          <div
            key={item.id}
            className={`flex flex-col items-center text-center px-4 ${
              idx > 1 ? 'pt-8 md:pt-0' : ''
            }`}
          >
            <div className="mb-4 h-10 flex items-center justify-center transform hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="tracking-[0.2em] text-xs sm:text-sm font-semibold text-[#F3F0EA] leading-snug uppercase">
              {item.title1}
              <br />
              <span className="text-[#B8B1AA]">{item.title2}</span>
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
