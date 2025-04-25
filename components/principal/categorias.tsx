'use client';
import React from 'react';

const CategoriasDestacadas = () => (
  <section className="py-8 md:py-16 bg-[url('/fondo-madera.jpg')] bg-cover bg-center">
    <div className="container mx-auto px-4">
      <h2 className="featured-categories-title-elegant text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-10">
        Categorías Destacadas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {[
          {
            img: '/velas.jpg',
            titulo: 'VELAS',
            descripcion: 'Descubre nuestra colección de velas artesanales, hechas con amor y esencias únicas. Ilumina tus espacios con calidez, estilo y un aroma que cautiva.',
          },
          {
            img: '/decorativos.jpg',
            titulo: 'DECORATIVOS',
            descripcion: 'Dale vida y armonía a tu hogar con nuestros detalles decorativos. Desde portavelas elegantes hasta piezas que transforman cualquier rincón en un refugio acogedor.',
          },
          {
            img: '/esencias.jpg',
            titulo: 'ESENCIA',
            descripcion: 'Explora el poder de las fragancias naturales. Nuestras esencias están diseñadas para relajar, inspirar y llenar tu hogar de sensaciones que abrazan el alma.',
          },
        ].map(({ img, titulo, descripcion }) => (
          <div key={titulo} className="categoria-card">
            <img src={img} alt={titulo} className="categoria-img" />
            <div className="categoria-text">
              <h3 className="categoria-titulo">{titulo}</h3>
              <p className="categoria-descripcion">{descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriasDestacadas;
