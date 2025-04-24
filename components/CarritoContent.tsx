
'use client'

import React from 'react';

const CarritoContent = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-light mb-8 text-center">Tu Carrito</h1>
        
        {/* Carrito vacío */}
        <div className="text-center py-16">
          <p className="text-xl mb-8">Tu carrito está vacío</p>
          <a href="#" className="inline-block px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors">
            Continuar Comprando
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarritoContent;