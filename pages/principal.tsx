// pages/principal.tsx
'use client';
import React, { useRef } from 'react';
import {
  Heroe,
  CategoriasDestacadas,
  ProductosDestacados as ProductosDestacadosComponent, 
  Newsletter,
} from '@/components/principal';
import Instagram from '@/components/principal/instagram';

const Principal = () => {
  const productosSectionRef = useRef<HTMLDivElement>(null);

  const scrollToProductos = () => {
    productosSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Heroe onExploreClick={scrollToProductos} />
      <CategoriasDestacadas />
      <Instagram
        instagramLink="https://www.instagram.com/mininazen.pe/"
        instagramIconSrc="/icono.png"
      />
      <div ref={productosSectionRef}>
        <ProductosDestacadosComponent />
      </div>
      <Newsletter />
    </>
  );
};

export default Principal;