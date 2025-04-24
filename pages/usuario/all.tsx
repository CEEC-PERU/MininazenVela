'use client';

import React from 'react';

const AllContent = () => (
  <div>
    <h2>Todas las Categorías</h2>
    <div>
      <div>
        <img src="https://images.unsplash.com/photo-1595186346695-9fe3e657f40c?q=80&w=987&auto=format&fit=crop" alt="Vela Aromática" />
        <h3>Vela Aromática</h3>
        <p>$159</p>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=987&auto=format&fit=crop" alt="Jarrón Decorativo" />
        <h3>Jarrón Decorativo</h3>
        <p>$399</p>
      </div>
      {/* Agrega más productos aquí */}
    </div>
  </div>
);

export default AllContent;
