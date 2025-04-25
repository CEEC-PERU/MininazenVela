'use client';
import React from 'react';

const productosData = [
  { id: 1, nombre: 'Producto A', precio: '$19.99', imagen: '/decorativo2.jpg' },
  { id: 2, nombre: 'Producto B', precio: '$29.50', imagen: '/decorativo3.jpg' },
  { id: 3, nombre: 'Producto C', precio: '$9.75', imagen: '/decorativo4.jpg' },
  { id: 4, nombre: 'Producto D', precio: '$49.00', imagen: '/vela5.jpg' },
  { id: 5, nombre: 'Producto E', precio: '$12.30', imagen: '/vela6.jpg' },
  { id: 6, nombre: 'Producto F', precio: '$35.99', imagen: '/vela7.jpg' },
  { id: 7, nombre: 'Producto G', precio: '$22.00', imagen: '/vela8.jpg' },
  { id: 8, nombre: 'Producto H', precio: '$55.75', imagen: '/decorativos.jpg' },
];

const ProductosDestacados = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 style={{
        fontSize: '3.6rem',
        color: '#a3b4d1',
        fontWeight: 'normal',
        textAlign: 'center',
        marginBottom: '2.5rem',
        fontFamily: "'Playfair Display', serif"
      }}>
        Nuestros Productos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosData.map((producto) => (
          <div key={producto.id} className="bg-white rounded-md shadow-sm overflow-hidden group">
            <a href="#" className="block">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-1">{producto.nombre}</h3>
                <p className="text-sm text-gray-500">{producto.precio}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="verTodosProductos__boton" 
        >
          Ver Todos los Productos
        </a>
      </div>
    </div>
  </section>
);

export default ProductosDestacados;