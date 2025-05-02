// components/principal/heroe.tsx
'use client';
import React from 'react';

interface HeroeProps {
  onExploreClick: () => void;
}

const Heroe: React.FC<HeroeProps> = ({ onExploreClick }) => (
  <section className="relative">
    <div className="w-full h-[60vh] bg-[url('/header.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto h-full flex items-center justify-center relative z-10">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-light mb-4">Luz que Inspira</h1>
          <p className="text-lg md:text-xl mb-8">Armonia en cada llama  Handmade candle | 100% Soja</p>
          <button
            onClick={onExploreClick}
            className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors"
          >
            Explorar Ahora
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default Heroe;