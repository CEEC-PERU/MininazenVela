'use client';
import React from 'react';
import Image from 'next/image';
import newsletterImage from '../../public/wes.jpg'; 

const Newsletter = () => (
  <section className="newsletter-section py-16">
    <div className="container mx-auto px-4 max-w-xl lg:max-w-5xl">
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">        <div className="text-center lg:text-left mb-8 lg:mb-0">
          <h2 className="newsletter-title text-3xl font-light mb-4">Suscríbete</h2>
          <p className="newsletter-description text-gray-600 mb-6">
            y recibe nuestras últimas novedades y mantente al tanto de nuestras promociones.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="newsletter-input flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black rounded-md"
              required
            />
            <button
              type="submit"
              className="newsletter-button px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-md"
            >
              Suscribirse
            </button>
          </form>
        </div>
        <div className="hidden lg:block">
          <div className="relative w-full h-64 rounded-lg shadow-md overflow-hidden">
            <Image
              src={newsletterImage}
              alt="Imagen de suscripción"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Newsletter;