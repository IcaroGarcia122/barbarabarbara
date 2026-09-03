import React from 'react';
import { Instagram, Mail, Lock } from 'lucide-react';
import { DoodleHeart } from './Doodles';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const navItems = [
    { id: 'inicio', label: 'INÍCIO' },
    { id: 'buscar-ensaio', label: 'ENSAIOS' },
    { id: 'sobre', label: 'SOBRE' },
    { id: 'contato', label: 'CONTATO' },
  ];

  return (
    <footer
      id="footer-main"
      className="bg-[#0B0B0D] border-t border-white/10 pt-16 pb-12 px-6 sm:px-10 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Row: Brand, Nav & Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
          {/* Logo */}
          <button
            onClick={() => onNavigate('inicio')}
            className="flex items-center gap-1.5 text-left group cursor-pointer"
          >
            <span className="font-diary text-3xl font-semibold tracking-wide text-[#F3F0EA] group-hover:text-[#E85D83] transition-colors">
              Bárbara Vitória
            </span>
            <span className="text-[#E85D83] text-xl">✶</span>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-xs tracking-[0.2em] font-medium text-[#B8B1AA] hover:text-[#F3F0EA] transition-colors uppercase cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/barbaravitoria.ph"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram @barbaravitoria.ph"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F3F0EA]/80 hover:text-[#E85D83] hover:border-[#E85D83]/50 transition-all"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://tiktok.com/@barbaravitoria.ph"
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F3F0EA]/80 hover:text-[#E85D83] hover:border-[#E85D83]/50 transition-all font-diary font-bold text-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.3 0 .59.05.86.13V9.41a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52v-3.4c-.46 0-.9-.04-1.01-.12z" />
              </svg>
            </a>
            <a
              href="mailto:contato@barbaravitoria.ph"
              title="E-mail contato@barbaravitoria.ph"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F3F0EA]/80 hover:text-[#E85D83] hover:border-[#E85D83]/50 transition-all"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Bottom Row: Copyright, Discreet Admin & "fotografia é amor ♡" */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8B1AA]/70">
          <div className="flex items-center gap-3">
            <p>© 2026 Bárbara Vitória. Todos os direitos reservados. Itajaí, SC.</p>
            {onOpenAdmin && (
              <button
                id="btn-admin-access"
                onClick={onOpenAdmin}
                className="opacity-40 hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] text-[#B8B1AA] hover:text-[#E85D83] cursor-pointer ml-2 py-1 px-2 rounded hover:bg-white/5"
                title="Área Administrativa Bárbara Vitória"
              >
                <Lock size={11} />
                <span>Painel Admin</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 font-diary text-xl text-[#F3F0EA]">
            <span>fotografia é amor</span>
            <DoodleHeart size={18} color="#E85D83" />
          </div>
        </div>
      </div>
    </footer>
  );
};
