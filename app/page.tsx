// app/page.tsx
'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import MainContent from '../pages/principal';
import VelasContent from '../pages/usuario/velas';
import DecorativosContent from '../pages/usuario/decorativos';
import WaxMeltsContent from '../pages/usuario/wax-melts';
import AccesoriosContent from '../pages/usuario/accesorios';
import AllContent from '../pages/usuario/all';
import EsenciasContent from '../pages/usuario/esencias';
import CarritoContent from '../components/CarritoContent';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('inicio');

  const renderContent = () => {
    switch (currentPage) {
      case 'velas':
        return <VelasContent />;
      case 'decorativos':
        return <DecorativosContent />;
      case 'waxMelts':
        return <WaxMeltsContent />;
      case 'accesorios':
        return <AccesoriosContent />;
      case 'all':
        return <AllContent />;
      case 'esencias':
        return <EsenciasContent />;
      case 'carrito':
        return <CarritoContent />;
      default:
        return <MainContent />;
    }
  };

  return (
    <Layout setCurrentPage={setCurrentPage}>
      {renderContent()}
    </Layout>
  );
}