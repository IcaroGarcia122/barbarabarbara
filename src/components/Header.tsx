import React, { useState, useEffect } from 'react';
import { Instagram, Mail, Menu, X } from 'lucide-react';
import { DoodleStar } from './Doodles';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'INÍCIO' },
    { id: 'portfolio', label: 'PORTFÓLIO' },
    { id: 'buscar-ensaio', label: 'ENSAIOS' },
    { id: 'sobre', label: 'SOBRE' },
    { id: 'contato', label: 'CONTATO' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0D]/90 backdrop-blur-md py-3.5 border-b border-white/5 shadow-xl'
          : 'bg-gradient-to-b from-[#0B0B0D]/80 via-[#0B0B0D]/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          id="btn-brand-logo"
          onClick={() => handleLinkClick('inicio')}
          className="flex items-center gap-1.5 text-left group transition-transform hover:scale-102 cursor-pointer"
        >
          <span className="text-[#E85D83] text-xl animate-pulse">✶</span>
          <span className="font-diary text-2xl sm:text-3xl font-semibold tracking-wide text-[#F3F0EA] group-hover:text-[#E85D83] transition-colors">
            Bárbara Vitória
          </span>
          <span className="text-[#E85D83] text-sm">☆</span>
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className="relative py-1 text-xs tracking-[0.2em] font-medium text-[#F3F0EA]/80 hover:text-[#F3F0EA] transition-colors uppercase cursor-pointer"
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#E85D83] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Socials & Contact */}
        <div className="hidden md:flex items-center gap-4">
          <a
            id="social-instagram"
            href="https://instagram.com/barbaravitoria.ph"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram @barbaravitoria.ph"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F3F0EA]/80 hover:text-[#E85D83] hover:border-[#E85D83]/50 hover:bg-[#E85D83]/10 transition-all"
          >
            <Instagram size={17} />
          </a>
          <a
            id="social-tiktok"
            href="https://tiktok.com/@barbaravitoria.ph"
            target="_blank"
            rel="noopener noreferrer"
            title="TikTok"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F3F0EA]/80 hover:text-[#E85D83] hover:border-[#E85D83]/50 hover:bg-[#E85D83]/10 transition-all font-diary font-bold text-base"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.3 0 .59.05.86.13V9.41a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52v-3.4c-.46 0-.9-.04-1.01-.12z" />
            </svg>
          </a>
          <a
            id="social-email"
            href="mailto:contato@barbaravitoria.ph"
            title="E-mail contato@barbaravitoria.ph"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F3F0EA]/80 hover:text-[#E85D83] hover:border-[#E85D83]/50 hover:bg-[#E85D83]/10 transition-all"
          >
            <Mail size={17} />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="btn-mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F3F0EA] hover:text-[#E85D83] transition-colors"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden bg-[#111114] border-b border-white/10 px-6 py-8 shadow-2xl animate-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-link-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className="text-left font-diary text-2xl text-[#F3F0EA] hover:text-[#E85D83] transition-colors flex items-center justify-between border-b border-white/5 pb-2"
              >
                <span>{item.label}</span>
                <span className="text-[#E85D83] text-sm">✦</span>
              </button>
            ))}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="https://instagram.com/barbaravitoria.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#F3F0EA]/70 hover:text-[#E85D83]"
              >
                <Instagram size={16} />
                <span>Instagram</span>
              </a>
              <a
                href="mailto:contato@barbaravitoria.ph"
                className="flex items-center gap-2 text-sm text-[#F3F0EA]/70 hover:text-[#E85D83]"
              >
                <Mail size={16} />
                <span>E-mail</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
