"use client"

import type React from "react"

import { useState, useRef } from 'react';
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Search, Facebook, Twitter, Check } from "lucide-react"
import { useCart } from "@/context/CartContext"

//  tipo de producto
interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  slug: string
  finalizar?: string
  aroma?: string
  colocar?: string
  estilo?: string
  tamano?: string
}

// Descripciones para los primeros 4 productos
const productDescriptions: Record<string, string> = {
  "large-seashell-candles":
    "Vela ajustable con diseño de concha marina ¡Es DIVINA! Al ser ajustable puedes graduarla y usarla tipo decoración o como centro de mesa. Ideal para usar sola o con varias velas.",

  "clam-shell-trinket-dish":
    "Plato decorativo ajustable con diseño de concha marina ¡Es DIVINA! Al ser ajustable puedes graduarla y usarla tipo decoración o como centro de mesa. Ideal para usar solo o con varios accesorios.",

  "shell-candle-set":
    "Set de velas ajustables con diseño de concha marina ¡Es DIVINA! Al ser ajustables puedes graduarlas y usarlas tipo decoración o como centro de mesa. Ideal para usar solas o con varias velas.",

  "conch-shell-holder":
    "Portavelas ajustable con diseño de caracol marino ¡Es DIVINA! Al ser ajustable puedes graduarlo y usarlo tipo decoración o como centro de mesa. Ideal para usar solo o con varias velas.",
}

// Información de cuidado estándar
const careInstructions =
  "Recomendamos guardar por separado cada accesorio, almacenarlos en lugares secos y a temperatura ambiente; limpiarlos con un pañito o franela y sin ningún tipo de producto, evitar contacto con productos químicos como cremas y perfumes, no dormir ni bañarse con ellos. La durabilidad de los accesorios depende 100% del cuidado de cada persona."

interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"description" | "additional">("description")
  const [showSearch, setShowSearch] = useState(false)


  const [zoomMode, setZoomMode] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current || !zoomMode) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2)',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };


  // Usar el contexto del carrito
  const { addToCart, items } = useCart()

  // Verificar si el producto ya está en el carrito
  const isInCart = items.some((item) => item.id === product.id)

  // Obtener la descripción del producto o usar una genérica
  const description =
    productDescriptions[product.slug] ||
    "Accesorio ajustable con diseño único ¡Es DIVINA! Al ser ajustable puedes graduarlo y usarlo de diferentes formas. Ideal para usar solo o con varios accesorios."

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    // Añadir al carrito usando la función del contexto
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: quantity,
    })

    // Resetear la cantidad después de añadir al carrito
    setQuantity(1)
  }

  // Formatear el precio con separador de miles
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  return (
    <main className="product-detail-page">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <div className="breadcrumb-container flex items-center text-gray-500">
            <Link href="/" className="hover:text-amber-800">
              Home
            </Link>
            <span className="mx-2">{">"}</span>
            <Link href="/usuario/accesorios" className="hover:text-amber-800">
              Accesorios
            </Link>
            <span className="mx-2">{">"}</span>
            <span className="font-medium text-gray-700">{product.name}</span>
          </div>
        </div>











        {/* Product Detail Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="product-image-container relative">
            <div
              ref={imageRef}
              className="aspect-square overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-200"
                style={zoomStyle}
              />
            </div>

            <button
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
              onClick={() => setZoomMode(!zoomMode)}
            >
              <Search className="h-5 w-5" />
            </button>

            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>







          {/* Product Info */}
          <div className="product-info">
            <h1 className="mb-6 font-serif text-3xl font-normal uppercase tracking-wider">{product.name}</h1>
            <p className="mb-6 text-xl font-medium">${formatPrice(product.price)}</p>

            <div className="mb-6 text-sm leading-relaxed text-gray-700">
              <p>{description}</p>
              <p className="mt-2 italic">(Precio por unidad)</p>
            </div>

            {/* Product Attributes */}
            <div className="mb-8 space-y-2 text-sm">
              {product.finalizar && (
                <div className="product-attribute">
                  <span className="font-medium">Material:</span> {product.finalizar.replace(/-/g, " ")} y perla
                </div>
              )}
              {product.tamano && (
                <div className="product-attribute">
                  <span className="font-medium">Medidas:</span> 45 cms
                </div>
              )}
              {product.aroma && (
                <div className="product-attribute">
                  <span className="font-medium">Colores:</span> Dorado
                </div>
              )}
              <div className="product-attribute">
                <span className="font-medium">Cuidados:</span> {careInstructions}
              </div>
            </div>

            <div className="mb-2 text-sm">
              <span>11 disponibles</span>
            </div>

            {/* Quantity Selector and Add to Cart */}
            <div className="mb-8 flex items-center gap-4">
              <div className="quantity-selector flex h-12 w-24 flex-col border border-gray-300">
                <div className="flex h-full items-center">
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => {
                      const val = Number.parseInt(e.target.value)
                      if (!isNaN(val) && val > 0) {
                        setQuantity(val)
                      }
                    }}
                    className="h-full w-full text-center"
                  />
                  <div className="flex h-full flex-col border-l border-gray-300">
                    <button
                      onClick={incrementQuantity}
                      className="flex h-1/2 w-8 items-center justify-center border-b border-gray-300"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button onClick={decrementQuantity} className="flex h-1/2 w-8 items-center justify-center">
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`add-to-cart-btn flex h-12 items-center justify-center px-8 text-sm uppercase text-white transition ${isInCart ? "bg-green-600 hover:bg-green-700" : "bg-black hover:bg-gray-800"
                  }`}
              >
                {isInCart ? "Añadir más" : "Añadir al carrito"}
              </button>
            </div>

            {/* Categories and Tags */}
            <div className="mb-6 text-xs text-gray-600">
              <div className="mb-1">
                <span className="font-medium">Categorías: </span>
                <Link href="#" className="hover:text-amber-800">
                  Choker
                </Link>
                ,{" "}
                <Link href="#" className="hover:text-amber-800">
                  Collares
                </Link>
                ,{" "}
                <Link href="#" className="hover:text-amber-800">
                  RODIO
                </Link>
              </div>
              <div>
                <span className="font-medium">Etiquetas: </span>
                <Link href="#" className="hover:text-amber-800">
                  Accesorios
                </Link>
                ,{" "}
                <Link href="#" className="hover:text-amber-800">
                  Accesorios mujer
                </Link>
                ,{" "}
                <Link href="#" className="hover:text-amber-800">
                  Bisutería
                </Link>
                ,{" "}
                <Link href="#" className="hover:text-amber-800">
                  Cadenas
                </Link>
                ,{" "}
                <Link href="#" className="hover:text-amber-800">
                  choker
                </Link>
                ,{" "}
                <Link href="#" className="hover:text-amber-800">
                  Collar
                </Link>
                ,{" "}
                <Link href="#" className="hover:text-amber-800">
                  Estilo
                </Link>
                ,{" "}
                <Link href="#" className="hover:text-amber-800">
                  Fashion
                </Link>
                ,{" "}
                <Link href="#" className="hover:text-amber-800">
                  Joyería
                </Link>
                ,{" "}
                <Link href="#" className="hover:text-amber-800">
                  Moda
                </Link>
                ,{" "}
                <Link href="#" className="hover:text-amber-800">
                  Mujer
                </Link>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 border-t border-gray-200 pt-6 text-sm">
              <span className="font-medium">Compartir</span>
              <div className="flex gap-2">
                <Link href="#" className="text-gray-500 hover:text-amber-800">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-500 hover:text-amber-800">
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs mt-12 border-t border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("description")}
              className={`tab-button py-4 pr-8 text-sm font-medium ${activeTab === "description" ? "border-b-2 border-black text-black" : "text-gray-500"
                }`}
            >
              Descripción
            </button>
            <button
              onClick={() => setActiveTab("additional")}
              className={`tab-button py-4 pr-8 text-sm font-medium ${activeTab === "additional" ? "border-b-2 border-black text-black" : "text-gray-500"
                }`}
            >
              Información adicional
            </button>
          </div>

          <div className="py-6">
            {activeTab === "description" ? (
              <div className="product-description text-sm leading-relaxed text-gray-700">
                <p>{description}</p>
                <p className="mt-2 italic">(Precio por unidad)</p>
              </div>
            ) : (
              <div className="additional-info text-sm leading-relaxed text-gray-700">
                <div className="mb-2">
                  <span className="font-medium">Material:</span> Rodio y perla
                </div>
                <div className="mb-2">
                  <span className="font-medium">Medidas:</span> 45 cms
                </div>
                <div className="mb-2">
                  <span className="font-medium">Colores:</span> Dorado
                </div>
                <div>
                  <span className="font-medium">Cuidados:</span> {careInstructions}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="related-products mt-16">
          <h2 className="mb-8 text-center text-2xl font-normal uppercase tracking-wider">Productos relacionados</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {relatedProducts.map((relatedProduct, index) => (
              <RelatedProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                isSale={index % 2 === 1}
              />
            ))}
          </div>
        </div>

        {/* Information and Contact Sections */}
        <div className="mt-20 grid grid-cols-1 gap-8 border-t border-gray-200 pt-8 md:grid-cols-3">
          <div className="information">
            <h3 className="mb-4 text-sm font-medium uppercase">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-amber-800">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-amber-800">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div className="contact">
            <h3 className="mb-4 text-sm font-medium uppercase">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">+59 999 999 9999</li>
              <li>
                <Link href="mailto:ventas@anele.com.co" className="text-gray-600 hover:text-amber-800">
                  mininazen.com.co
                </Link>
              </li>
             
              <li>
                <Link href="https://www.instagram.com/mininazen.pe/" className="text-gray-600 hover:text-amber-800">
                  @mininazen.pe
                </Link>
              </li>
            </ul>
          </div>

          <div className="payments">
  <h3 className="mb-4 text-sm font-medium uppercase">Pagos SEGUROS con</h3>
  <div className="flex flex-wrap items-center gap-2">
    <Image src="/pago.png" alt="pagos" width={100} height={40} className="pago-logo-grande" />
  </div>
</div>
        </div>
      </div>
    </main>
  )
}

// Componente para  productos relacionados
interface RelatedProductCardProps {
  product: Product
  isSale?: boolean
}

function RelatedProductCard({ product, isSale = false }: RelatedProductCardProps) {
  // Usar el contexto del carrito para el botón rápido de añadir al carrito
  const { addToCart, items } = useCart()

  // Verificar si el producto ya está en el carrito
  const isInCart = items.some((item) => item.id === product.id)

  // Formatear el precio con separador de miles
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  // Precio con descuento para productos en oferta (25% de descuento)
  const salePrice = isSale ? Math.round(product.price * 0.75) : null

  // Función para añadir rápidamente al carrito
  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart({
      id: product.id,
      name: product.name,
      price: salePrice || product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    })
  }

  return (
    <div className="group relative">
      <Link href={`/product/${product.slug}`}>
        <div className="relative overflow-hidden">
          {isSale && <div className="absolute right-0 top-0 z-10 bg-black px-2 py-1 text-xs text-white">SALE</div>}
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          {/* Quick add to cart button */}
          <div className="absolute bottom-4 right-4 z-10 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ${isInCart ? "text-green-600" : ""
                }`}
              onClick={handleQuickAddToCart}
            >
              {isInCart ? (
                <Check className="h-5 w-5" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-sm font-normal uppercase">{product.name}</h3>
          <div className="mt-1 flex items-center justify-center gap-2">
            {salePrice ? (
              <>
                <span className="text-sm line-through">${formatPrice(product.price)}</span>
                <span className="text-sm font-medium">${formatPrice(salePrice)}</span>
              </>
            ) : (
              <span className="text-sm">${formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
