import React, { useState } from 'react';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { getEnsaioByCode, SAMPLE_CODES } from '../data/mockEnsaios';
import { Ensaio, SearchState } from '../types';
import {
  DoodleCurvedArrow,
  DoodleHeart,
  DoodleSparkle,
  WashiTapeStrip,
} from './Doodles';
import {
  DoodleHandStar,
  DoodleHandLittleHeart,
  VintageAffectiveStamp,
} from './TornPaperEdge';
import { IMAGES } from '../assets/images';

interface EnsaioSearchProps {
  onSelectEnsaio: (ensaio: Ensaio) => void;
}

export const EnsaioSearch: React.FC<EnsaioSearchProps> = ({ onSelectEnsaio }) => {
  const [inputCode, setInputCode] = useState('');
  const [searchState, setSearchState] = useState<SearchState>({
    code: '',
    status: 'idle',
  });

  const handleSearch = (e?: React.FormEvent, customCode?: string) => {
    if (e) e.preventDefault();
    const codeToSearch = (customCode || inputCode).trim().toUpperCase();
    if (!codeToSearch) return;

    setSearchState({ code: codeToSearch, status: 'loading' });

    setTimeout(() => {
      const foundEnsaio = getEnsaioByCode(codeToSearch);
      if (foundEnsaio) {
        setSearchState({
          code: codeToSearch,
          status: 'success',
          result: foundEnsaio,
        });
        // Reveal gallery with smooth callback
        setTimeout(() => {
          onSelectEnsaio(foundEnsaio);
        }, 800);
      } else {
        setSearchState({
          code: codeToSearch,
          status: 'error',
          errorMessage:
            'Ops! Não encontramos esse ensaio ♡ Confira o código ou entre em contato.',
        });
      }
    }, 600);
  };

  const handleQuickSampleClick = (code: string) => {
    setInputCode(code);
    handleSearch(undefined, code);
  };

  return (
    <section
      id="buscar-ensaio"
      className="relative bg-[#0B0B0D] py-14 sm:py-20 lg:py-24 px-6 sm:px-10 z-20 overflow-hidden"
    >
      {/* Background Photo with Atmospheric Lighting - aspect identical to the penultimate section (ContactCTA) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src={IMAGES.ctaCameraBg}
          alt="Bárbara Vitória Fotografia - Encontre seu ensaio"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter contrast-[1.08] saturate-[1.15] brightness-[0.85] opacity-75 sm:opacity-85"
        />
        {/* Soft edge fades at top and bottom seams for seamless blending with neighboring sections */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/80 to-transparent" />
        {/* Subtle dark vignette overlay to ensure high contrast and focus on the search elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/60 via-black/35 to-[#0B0B0D]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,93,131,0.04)_0%,transparent_70%)]" />
      </div>

      {/* Polaroid Inclinada com fita adesiva no canto esquerdo (fiel à imagem de referência) */}
      <div className="absolute left-2 sm:left-6 lg:left-14 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center gap-3 select-none pointer-events-none">
        <div className="relative">
          <WashiTapeStrip variant="kraft" rotate="-8deg" className="-top-3 left-4 z-10" />
          <div className="bg-[#FAF8F5] p-2.5 sm:p-3 pb-8 sm:pb-9 shadow-[0_15px_35px_rgba(0,0,0,0.85)] border border-stone-300/40 rounded-xs w-28 sm:w-36 lg:w-44 transform -rotate-8 hover:rotate-0 transition-transform duration-300">
            <div className="aspect-[4/5] bg-stone-900 overflow-hidden">
              <img
                src={IMAGES.polaroidNature}
                alt="Ensaio fotográfico afetivo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
            </div>
            <div className="mt-2 text-center">
              <span className="font-diary text-stone-700 text-xs font-bold">
                afeto & memórias
              </span>
            </div>
          </div>
        </div>
        <DoodleHandLittleHeart size={24} color="#E85D83" className="transform rotate-12 -mt-10" />
      </div>

      {/* Selo Afetivo Vintage no canto direito com fita washi tape e brilho doodle */}
      <div className="absolute right-3 sm:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center gap-2 select-none pointer-events-none">
        <div className="relative">
          <WashiTapeStrip variant="pink" rotate="10deg" className="-top-2.5 right-6 z-10" />
          <VintageAffectiveStamp size={110} dark={true} className="transform rotate-6" />
        </div>
        <DoodleSparkle size={18} color="#E85D83" className="hidden lg:block -mt-8" />
      </div>

      {/* Bloco Central de Busca */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Título com Estrelinha Rosa desenhada à mão */}
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <DoodleHandStar size={30} color="#E85D83" className="transform -rotate-6 shrink-0" />
            <h2 className="font-diary text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#F3F0EA] tracking-wide leading-tight">
              Encontre seu ensaio
            </h2>
          </div>

          {/* Subtítulo Caixa Alta com Espaçamento */}
          <p className="text-xs sm:text-sm tracking-[0.25em] text-[#B8B1AA] uppercase font-medium mb-7">
            DIGITE O CÓDIGO DO SEU ENSAIO
          </p>

          {/* Input em Pílula Arredondada (Exato como na imagem de referência) */}
          <form
            id="form-search-ensaio"
            onSubmit={handleSearch}
            className="relative max-w-xl mx-auto"
          >
            <div className="relative flex items-center bg-[#141418] border border-white/20 focus-within:border-[#E85D83] rounded-full p-2 pl-6 sm:pl-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all">
              <input
                id="input-ensaio-code"
                type="text"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value);
                  if (searchState.status !== 'idle') {
                    setSearchState({ code: e.target.value, status: 'idle' });
                  }
                }}
                placeholder="Ex: BV2026-001"
                className="w-full bg-transparent text-[#F3F0EA] text-base sm:text-lg placeholder:text-stone-500 focus:outline-none tracking-wider font-mono uppercase"
              />
              {/* Botão Circular Rosa com Seta Branca */}
              <button
                id="btn-search-submit"
                type="submit"
                disabled={searchState.status === 'loading'}
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#E85D83] hover:bg-[#d64b71] active:scale-95 text-white flex items-center justify-center transition-all shadow-lg hover:shadow-[#E85D83]/40 flex-shrink-0 cursor-pointer disabled:opacity-70"
                aria-label="Buscar ensaio"
              >
                {searchState.status === 'loading' ? (
                  <Loader2 size={20} className="animate-spin text-white" />
                ) : (
                  <ArrowRight size={22} className="stroke-[2.5]" />
                )}
              </button>
            </div>
          </form>

          {/* Legenda com Seta Curvada Doodle */}
          <div className="mt-5 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 text-center text-[#B8B1AA]">
              <DoodleCurvedArrow
                size={28}
                direction="up-left"
                color="#E85D83"
                className="hidden sm:inline-block -mt-2"
              />
              <p className="font-diary text-base sm:text-xl text-[#F3F0EA]/90">
                O código está no seu comprovante ou foi enviado por e-mail{' '}
                <span className="text-[#E85D83] font-bold">♡</span>
              </p>
            </div>

            {/* Códigos Rápidos para Teste */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-[#B8B1AA]/60 uppercase tracking-widest mr-1">
                Testar códigos:
              </span>
              {SAMPLE_CODES.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleQuickSampleClick(code)}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#E85D83]/60 hover:text-[#E85D83] text-[#F3F0EA]/80 transition-all cursor-pointer"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

        {/* Feedback States */}
        {searchState.status === 'loading' && (
          <div className="mt-8 p-4 rounded-lg bg-[#111114] border border-[#E85D83]/30 animate-pulse flex items-center justify-center gap-3 text-[#F3F0EA]">
            <Sparkles size={18} className="text-[#E85D83]" />
            <span className="font-diary text-xl">
              Procurando seu ensaio com todo carinho... ♡
            </span>
          </div>
        )}

        {searchState.status === 'success' && searchState.result && (
          <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[#111114] via-[#1c1216] to-[#111114] border border-[#E85D83]/60 shadow-2xl text-center animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center gap-2 text-[#E85D83] mb-1">
              <span className="text-2xl">✶</span>
              <p className="font-diary text-2xl sm:text-3xl font-bold text-[#F3F0EA]">
                Encontramos seu ensaio ♡
              </p>
              <span className="text-2xl">✶</span>
            </div>
            <p className="text-sm sm:text-base text-[#F3F0EA]/90 mt-1 font-medium">
              {searchState.result.titulo} ({searchState.result.data})
            </p>
            <button
              onClick={() => onSelectEnsaio(searchState.result!)}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#E85D83] hover:bg-[#d64b71] text-white font-medium text-sm inline-flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
            >
              <span>Abrir Galeria Completa</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {searchState.status === 'error' && (
          <div className="mt-8 p-6 rounded-xl bg-[#140D10] border border-[#8E304A]/60 shadow-2xl text-center">
            <p className="font-diary text-2xl text-[#E85D83] font-semibold">
              Ops! Não encontramos esse ensaio ♡
            </p>
            <p className="text-sm text-[#F3F0EA]/80 mt-1">
              Confira o código e tente novamente.
            </p>
            <div className="mt-4">
              <a
                href="https://wa.me/message/5LSLZWJI3FYXB1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#E85D83] underline hover:text-[#f27a9c] font-medium"
              >
                Precisa de ajuda com o código? Fale comigo no WhatsApp →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
