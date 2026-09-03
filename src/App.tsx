/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { EnsaioSearch } from './components/EnsaioSearch';
import { ValuesBar } from './components/ValuesBar';
import { PortfolioStory } from './components/PortfolioStory';
import { HowItWorks } from './components/HowItWorks';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { GalleryModal } from './components/GalleryModal';
import { AdminPanel } from './components/AdminPanel';
import { PortfolioPage } from './components/PortfolioPage';
import { getEnsaioByCode } from './data/mockEnsaios';
import { Ensaio } from './types';

export default function App() {
  const [selectedEnsaio, setSelectedEnsaio] = useState<Ensaio | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<'inicio' | 'portfolio'>('inicio');
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#portfolio') {
        setCurrentTab('portfolio');
        setActiveSection('portfolio');
      } else if (window.location.hash === '#inicio' || !window.location.hash) {
        setCurrentTab('inicio');
        setActiveSection('inicio');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openPortfolio = () => {
    setCurrentTab('portfolio');
    setActiveSection('portfolio');
    window.location.hash = 'portfolio';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openHome = () => {
    setCurrentTab('inicio');
    setActiveSection('inicio');
    window.location.hash = 'inicio';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'portfolio') {
      openPortfolio();
      return;
    }

    if (currentTab !== 'inicio') {
      setCurrentTab('inicio');
      setActiveSection(sectionId);
      window.location.hash = sectionId;
      if (sectionId === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
      return;
    }

    setActiveSection(sectionId);
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCategorySelect = (categoria: string) => {
    if (categoria === 'ENSAIOS') {
      openPortfolio();
    } else if (categoria === 'FAMÍLIA') {
      const ensaio = getEnsaioByCode('BV2026-002') || getEnsaioByCode('OK-15-VALENTINA');
      if (ensaio) {
        setSelectedEnsaio(ensaio);
      } else {
        openPortfolio();
      }
    } else if (categoria === 'CASAIS') {
      const ensaio = getEnsaioByCode('SOLAR-818T') || getEnsaioByCode('OK-CASAMENTO-LUCAS');
      if (ensaio) {
        setSelectedEnsaio(ensaio);
      } else {
        openPortfolio();
      }
    } else if (categoria === 'INDIVIDUAL') {
      const ensaio = getEnsaioByCode('OK-15-MARYANA') || getEnsaioByCode('SOLAR-818T');
      if (ensaio) {
        setSelectedEnsaio(ensaio);
      } else {
        openPortfolio();
      }
    } else if (categoria === 'EVENTOS') {
      scrollToSection('contato');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F3F0EA] font-sans selection:bg-[#E85D83] selection:text-white film-grain overflow-x-hidden">
      {/* Top Floating Navigation */}
      <Header onNavigate={scrollToSection} activeSection={currentTab === 'portfolio' ? 'portfolio' : activeSection} />

      {currentTab === 'portfolio' ? (
        <PortfolioPage
          onBackToHome={openHome}
          onSelectEnsaio={(ensaio) => setSelectedEnsaio(ensaio)}
        />
      ) : (
        <main id="main-content">
          {/* Hero Section */}
          <Hero
            onScrollToSearch={() => scrollToSection('buscar-ensaio')}
            onSelectCategory={handleCategorySelect}
            onOpenPortfolio={openPortfolio}
          />

          {/* Search / Client Ensaio Lookup Section with Torn Paper Edge */}
          <EnsaioSearch onSelectEnsaio={(ensaio) => setSelectedEnsaio(ensaio)} />

          {/* 4 Values Bar */}
          <ValuesBar />

          {/* How It Works - Full Width Aged Paper Section (#EFECE6) */}
          <HowItWorks />

          {/* Sobre Mim / About Me Section */}
          <AboutMe onScrollToSearch={() => scrollToSection('buscar-ensaio')} />

          {/* Portfolio & Visual Scrapbook Collage Story: "Cada ensaio é um capítulo diferente" */}
          <PortfolioStory
            onScrollToSearch={() => scrollToSection('buscar-ensaio')}
            onOpenPortfolio={openPortfolio}
          />

          {/* Final Contact & WhatsApp CTA Section */}
          <ContactCTA />
        </main>
      )}

      {/* Footer with discreet Admin button */}
      <Footer
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Gallery Delivery & Client Portal Modal */}
      {selectedEnsaio && (
        <GalleryModal
          ensaio={selectedEnsaio}
          onClose={() => setSelectedEnsaio(null)}
        />
      )}

      {/* Complete Admin Panel (Ensaios, CRM Pipeline & Financial) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onSelectEnsaioPreview={(ensaio) => {
          setIsAdminOpen(false);
          setSelectedEnsaio(ensaio);
        }}
      />
    </div>
  );
}
