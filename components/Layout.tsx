
'use client'

import React from 'react';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
  children: React.ReactNode;
  setCurrentPage: (page: string) => void;
}

const Layout = ({ children, setCurrentPage }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Layout;
