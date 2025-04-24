
'use client'

import React from 'react';

const MainContent = () => {
  return (
    <>
{/* Hero Section */}
<section className="relative">
  <div className="w-full h-[60vh] bg-[url('/vela.jpg')] bg-cover bg-center">
    <div className="absolute inset-0 bg-black/30"></div>
    <div className="container mx-auto h-full flex items-center justify-center relative z-10">
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-6xl font-light mb-4">Luz que Inspira</h1>
        <p className="text-lg md:text-xl mb-8">Velas artesanales para iluminar tus momentos especiales</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
          }}
          className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors"
        >
          Explorar Ahora
        </a>
      </div>
    </div>
  </div>
</section>


      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">Categorías Destacadas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Velas Category */}
            <div className="group">
              <a href="#" className="block relative overflow-hidden">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=987&auto=format&fit=crop" 
                    alt="Velas" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white/80 px-6 py-4">
                    <h3 className="text-lg font-semibold uppercase">Velas</h3>
                  </div>
                </div>
              </a>
            </div>
            
            {/* Decorativos Category */}
            <div className="group">
              <a href="#" className="block relative overflow-hidden">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=987&auto=format&fit=crop" 
                    alt="Decorativos" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white/80 px-6 py-4">
                    <h3 className="text-lg font-semibold uppercase">Decorativos</h3>
                  </div>
                </div>
              </a>
            </div>
            
            {/* Esencias Category */}
            <div className="group">
              <a href="#" className="block relative overflow-hidden">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1595186346695-9fe3e657f40c?q=80&w=1170&auto=format&fit=crop" 
                    alt="Esencias" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white/80 px-6 py-4">
                    <h3 className="text-lg font-semibold uppercase">Esencias</h3>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="text-center">
            <h2 className="text-3xl font-light mb-6">Suscríbete a Nuestro Newsletter</h2>
            <p className="text-gray-600 mb-8">Recibe nuestras últimas novedades y ofertas exclusivas.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainContent;
