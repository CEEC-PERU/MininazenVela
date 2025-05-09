"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Check, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"

interface ProductCardProps {
  id: string
  name: string
  price: number
  imageUrl: string
  slug: string
  isSale?: boolean
}

export function ProductCard({ id, name, price, imageUrl, slug, isSale = false }: ProductCardProps) {
  // Formatear el precio con separador de miles
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  // Precio con descuento para productos en oferta (25% de descuento)
  const salePrice = isSale ? Math.round(price * 0.75) : null

  // Usar el contexto del carrito para el botón rápido de añadir al carrito
  const { addToCart, items } = useCart()

  //si el producto ya está en el carrito
  const isInCart = items.some((item) => item.id === id)

  // Función para añadir rápidamente al carrito
  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart({
      id: id,
      name: name,
      price: salePrice || price,
      imageUrl: imageUrl,
      quantity: 1,
    })
  }

  return (
    <div className="product-card-container">
      <div className="group relative">
        <Link href={`/product/${slug}`}>
          <div className="relative overflow-hidden">
            {isSale && <div className="absolute right-0 top-0 z-10 bg-black px-2 py-1 text-xs text-white">SALE</div>}
            <div className="aspect-square overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={name}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
           
            <button
              className={`quick-add-to-cart-button ${isInCart ? "text-green-600" : ""}`}
              onClick={handleQuickAddToCart}
            >
              {isInCart ? (
                <Check className="lucide-check h-5 w-5" />
              ) : (
                <ShoppingCart className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-sm font-normal uppercase">{name}</h3>
            <div className="mt-1 flex items-center justify-center gap-2">
              {salePrice ? (
                <>
                  <span className="text-sm line-through">${formatPrice(price)}</span>
                  <span className="text-sm font-medium">${formatPrice(salePrice)}</span>
                </>
              ) : (
                <span className="text-sm">${formatPrice(price)}</span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}