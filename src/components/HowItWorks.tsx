import React from 'react';
import { Camera, Calendar, Sparkles, FolderOpen, ArrowRight, MessageCircle } from 'lucide-react';
import { IMAGES } from '../assets/images';
import {
  DoodleHeart,
  DoodleSparkle,
  DoodleStar,
  WashiTapeStrip,
} from './Doodles';
import {
  TornPaperTop,
  TornPaperBottom,
  DoodleHandStar,
  DoodleHandLightning,
  DoodleHandLittleHeart,
  PaperClip,
  VintageAffectiveStamp,
} from './TornPaperEdge';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'O Primeiro Contato',
      subtitle: 'Conversa & Alinhamento',
      desc: 'Batemos um papo no WhatsApp para entender seus desejos, definir estilo, paleta de roupas e o local perfeito em Itajaí e região.',
      icon: Calendar,
      tag: 'Sem pressa',
      rotation: '',
      tapeVariant: 'pink' as const,
      tapeRotate: '0deg',
    },
    {
      num: '02',
      title: 'O Dia do Ensaio',
      subtitle: 'Leve & Descontraído',
      desc: 'Nada de poses duras ou forçadas. Vou conduzindo de forma suave e divertida para capturar os sorrisos mais sinceros.',
      icon: Camera,
      tag: 'Direção natural',
      rotation: '',
      tapeVariant: 'beige' as const,
      tapeRotate: '0deg',
    },
    {
      num: '03',
      title: 'Edição & Cor',
      subtitle: 'Cuidado Artesanal',
      desc: 'Tratamento foto por foto, realçando tons quentes, luz natural e a estética poética que define a fotografia afetiva.',
      icon: Sparkles,
      tag: 'Foto por foto',
      rotation: '',
      tapeVariant: 'pink' as const,
      tapeRotate: '0deg',
    },
    {
      num: '04',
      title: 'Sua Galeria Digital',
      subtitle: 'Entrega em Alta Resolução',
      desc: 'Você recebe seu código exclusivo para acessar a galeria online com todas as fotos tratadas para download vitalício.',
      icon: FolderOpen,
      tag: 'Acesso vitalício',
      rotation: '',
      tapeVariant: 'beige' as const,
      tapeRotate: '0deg',
    },
  ];

  return (
    <section
      id="como-funciona"
      className="relative w-full bg-[#0B0B0D] overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* TOP TORN PAPER EDGE */}
      {/* ========================================================================= */}
      <div className="relative w-full z-20">
        {/* The Realistic Top Torn Paper Edge (Modeled after reference image) */}
        <TornPaperTop paperColor="#F4F1EA" fiberColor="#FFFFFF" />
      </div>

      {/* ========================================================================= */}
      {/* MAIN ARTISANAL PAPER SHEET (Cream #F4F1EA with Scrapbook Texture) */}
      {/* ========================================================================= */}
      <div className="relative w-full bg-[#F4F1EA] text-[#1F1C18] py-10 sm:py-16 md:py-20 px-5 sm:px-8 lg:px-12">
        {/* Subtle Paper Fiber & Dot Grid Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(#C8C0B2 0.75px, transparent 0.75px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient Decorative Accents: Corner Washi Tapes */}
        <div className="absolute top-6 left-8 opacity-70 pointer-events-none hidden md:block">
          <WashiTapeStrip variant="beige" rotate="-4deg" />
        </div>
        <div className="absolute top-16 right-10 opacity-70 pointer-events-none hidden md:block">
          <VintageAffectiveStamp size={95} className="opacity-60" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* ===================================================================== */}
          {/* HEADER: ★ Como funciona? ⚡ ♡ (Fielmente baseado na imagem de referência) */}
          {/* ===================================================================== */}
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
            {/* Main title with Pink Star on left, cursive font, and Lightning + Heart on right */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 my-1">
              <DoodleHandStar
                size={34}
                color="#E85D83"
                className="shrink-0 transform -rotate-12 animate-pulse"
              />
              <h2 className="font-diary text-4xl sm:text-6xl lg:text-7xl font-bold text-[#1F1C18] tracking-tight leading-none">
                Como funciona?
              </h2>
              <div className="flex flex-col items-center justify-center shrink-0 -space-y-1">
                <DoodleHandLightning
                  size={26}
                  color="#E85D83"
                  className="transform rotate-3"
                />
                <DoodleHandLittleHeart
                  size={16}
                  color="#E85D83"
                  className="transform -rotate-6 ml-2"
                />
              </div>
            </div>

            {/* 3 Quick Steps Horizontal Banner directly from user image */}
            <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 lg:gap-8 bg-[#EFECE3]/70 backdrop-blur-xs py-3.5 px-6 rounded-2xl border border-stone-300/60 shadow-xs">
                {/* Step 1 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#E85D83] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                    1
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-stone-800 tracking-tight text-left">
                    Digite o código do seu ensaio
                  </span>
                </div>

                {/* Pink Vertical Divider Line */}
                <div className="hidden sm:block w-[1px] h-6 bg-[#E85D83]/40 shrink-0" />

                {/* Step 2 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#E85D83] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                    2
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-stone-800 tracking-tight text-left">
                    Acesse suas fotos na galeria
                  </span>
                </div>

                {/* Pink Vertical Divider Line */}
                <div className="hidden sm:block w-[1px] h-6 bg-[#E85D83]/40 shrink-0" />

                {/* Step 3 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#E85D83] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                    3
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-stone-800 tracking-tight text-left">
                    Baixe e aproveite seus registros!
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 4 STEPS GRID WITH SCRAPBOOK CARDS & CONNECTING ELEMENTS */}
          {/* ===================================================================== */}
          <div className="relative">
            {/* Desktop Connecting Curved Dashed Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-8 pointer-events-none z-0">
              <svg
                viewBox="0 0 1200 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-12 stroke-[#E85D83]/30"
              >
                <path
                  d="M150,30 Q300,5 450,30 T750,30 T1050,30"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Grid of 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7 relative z-10">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className={`relative bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group ${step.rotation}`}
                  >
                    {/* Corner Washi Tape Strip */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                      <WashiTapeStrip
                        variant={step.tapeVariant}
                        rotate={step.tapeRotate}
                        className="scale-90"
                      />
                    </div>

                    <div>
                      {/* Top Row: Step Tag + Icon */}
                      <div className="flex items-center justify-between mb-4 pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#E85D83]/15 text-[#E85D83] border border-[#E85D83]/25">
                            {step.num}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400 uppercase">
                            Etapa
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-[#E85D83] border border-stone-200 group-hover:scale-110 group-hover:bg-[#E85D83] group-hover:text-white transition-all shadow-xs">
                          <Icon size={20} />
                        </div>
                      </div>

                      {/* Step Title in Marker Style */}
                      <h3 className="font-marker text-2xl text-[#1F1C18] mb-1 leading-snug">
                        {step.title}
                      </h3>

                      {/* Subtitle with Sparkle */}
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#E85D83] font-semibold block mb-3">
                        ✦ {step.subtitle}
                      </span>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>

                    {/* Bottom Tag & Little Heart */}
                    <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-diary text-stone-500">
                      <span className="font-medium">{step.tag}</span>
                      <span className="text-[#E85D83] text-sm group-hover:scale-125 transition-transform">
                        ♡
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* AFFECTIVE POST-IT STICKY NOTE & BOTTOM WHATSAPP CALLOUT */}
          {/* ===================================================================== */}
          <div className="mt-12 sm:mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Pinned Sticky Note from Bárbara */}
            <div className="relative bg-[#FFF9E6] border border-amber-200/80 rounded-xl p-4 sm:p-5 shadow-sm max-w-lg transform -rotate-1 hover:rotate-0 transition-transform">
              <div className="absolute -top-2.5 left-8 z-10">
                <WashiTapeStrip variant="pink" rotate="2deg" className="scale-75" />
              </div>
              <p className="font-diary text-stone-800 text-lg sm:text-xl leading-snug">
                <strong className="text-[#E85D83]">Dica com carinho:</strong> Não se preocupe
                com poses! O segredo é curtir o momento, rir e deixar as memórias acontecerem
                naturalmente. ✨
              </p>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                id="btn-whatsapp-passo"
                href="https://wa.me/message/5LSLZWJI3FYXB1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1F1C18] hover:bg-[#E85D83] active:scale-95 text-white text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-md hover:shadow-lg cursor-pointer group"
              >
                <MessageCircle size={15} className="group-hover:rotate-12 transition-transform" />
                <span>TIRAR DÚVIDAS NO WHATSAPP</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM TORN PAPER EDGE (Seamlessly tearing back to dark #0B0B0D) */}
      {/* ========================================================================= */}
      <div className="relative w-full z-20">
        <TornPaperBottom paperColor="#F4F1EA" fiberColor="#FFFFFF" />
      </div>
    </section>
  );
};
