'use client'

import React, { useState } from 'react';
import { Search, ShoppingBag } from 'lucide-react';


interface HeaderProps {
  setCurrentPage: (page: string) => void;
}

const Header = ({ setCurrentPage }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (page: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

const toggleMobileSearch = () => {
  setIsMobileSearchVisible(!isMobileSearchVisible);
};


  return (
    <header className="w-full">

      {/* Top bar */}
      <div className="top-bar bg-[#e6ecf5] py-5 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Enlace izquierdo */}
          <div className="text-base md:text-lg text-[#4b4b4b] tracking-wide font-light italic">
            <a
              href="#"
              onClick={(e) => handleNavigation('envios-devoluciones', e)}
              className="hover:text-[#a384a3] transition-colors duration-300"
            >
              Envíos & Devoluciones
            </a>
          </div>

          {/* Íconos + buscador */}
          <div className="flex items-center space-x-6 text-[#4b4b4b]">

            {/* Buscador visible solo en md y arriba */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent border-b border-[#4b4b4b] focus:outline-none focus:border-[#a384a3] placeholder-[#7d7d7d] pl-8 pr-4 py-2 text-base font-light w-[220px] md:w-[260px]"
              />
              <Search className="absolute left-1.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4b4b4b]" />
            </div>

            {/* Ícono lupa solo en móvil */}
            <button onClick={toggleMobileSearch} className="block md:hidden" aria-label="Buscar">
              <Search className="h-6 w-6 text-[#4b4b4b]" />
            </button>

            {/* Carrito moderno */}
            <a href="#" onClick={(e) => handleNavigation('carrito', e)} className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 text-[#4b4b4b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2m0 0L7 13h10l4-8H5.4m.6 0L7 13m0 0l-1 5h13l-1-5M10 21h.01M16 21h.01" />
              </svg>
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#a384a3] text-white text-[10px] md:text-[11px] flex items-center justify-center font-semibold shadow-md">0</span>
            </a>
          </div>

          {/* Input en móvil cuando se activa */}
          {isMobileSearchVisible && (
            <div className="w-full mt-3 md:hidden">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full border-b border-[#4b4b4b] bg-transparent py-2 px-4 placeholder-[#7d7d7d] text-base focus:outline-none focus:border-[#a384a3] transition-all duration-300"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className="bg-[#e6ecf5]">
        <div className="container mx-auto px-4 text-center">
          <a href="#" onClick={(e) => handleNavigation('inicio', e)} className="inline-block w-full max-w-full">
            <h1 className="header-logo">MININAZEN</h1>
          </a>
        </div>
      </div>


      <nav className="border-t border-b border-gray-300 bg-white shadow-sm">
    <div className="container mx-auto px-4">
      <button
        className="md:hidden w-full py-4 text-lg font-semibold flex items-center justify-center text-gray-700 hover:text-black transition"
        onClick={toggleMenu}
      >
        <span>Categorías</span>
        <span className="ml-2 text-xl">{isMenuOpen ? '▲' : '▼'}</span>
      </button>

      <ul className={`md:flex flex-col md:flex-row justify-center items-center gap-y-3 md:gap-y-0 md:gap-x-10 py-4 md:py-3 ${isMenuOpen ? 'flex' : 'hidden'}`}>
        {[
          ['inicio', 'Inicio'],
          ['velas', 'Velas'],
          ['decorativos', 'Decorativos'],
          ['waxMelts', 'Wax melts'],
          ['accesorios', 'Accesorios'],
          ['all', 'All'],
          ['esencias', 'Esencias'],
        ].map(([key, label]) => (
          <li key={key}>
            <a
              href="#"
              onClick={(e) => handleNavigation(key, e)}
              className="text-base font-medium text-gray-600 hover:text-black tracking-wide uppercase transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </nav>

    </header>
  );
};

export default Header;