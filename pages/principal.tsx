// pages/principal.tsx
'use client';
import React from 'react';
import {
  Heroe,
  CategoriasDestacadas,
  ProductosDestacados,
  Newsletter,
} from '@/components/principal';
import Instagram from '@/components/principal/instagram'; 

const Principal = () => (
  <>
    <Heroe />
    <CategoriasDestacadas />
    <Instagram
      instagramLink="https://www.instagram.com/mininazen.pe/" 
      instagramIconSrc="/icono.png" 
    />
    <ProductosDestacados />
    <Newsletter />
  </>
);

export default Principal;