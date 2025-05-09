"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ShoppingBag, Check } from "lucide-react"
import { useCart } from "@/context/CartContext"

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
}

interface AddToCartButtonProps {
  product: Product
  quantity?: number
}

export default function AddToCartButton({ product, quantity = 1 }: AddToCartButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const { addToCart, items } = useCart()

  // Verificar si el producto ya está en el carrito
  useEffect(() => {
    // Comprobamos si el producto está en el carrito buscando su ID en los items
    const productInCart = items.some((item) => item.id === product.id)
    setIsInCart(productInCart)
  }, [product.id, items])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Añadir al carrito usando la función del contexto
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: quantity,
    })
  }

  return (
    <button
      className={`add-to-cart-quick absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-3 text-white opacity-0 transition-opacity group-hover:opacity-100 ${
        isInCart ? "bg-green-600" : "bg-amber-800"
      }`}
      onClick={handleAddToCart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={isInCart ? "Producto en el carrito" : "Añadir al carrito"}
    >
      {isInCart ? (
        <>
          <Check className="h-5 w-5" />
          <span>En el carrito</span>
        </>
      ) : (
        <>
          <ShoppingBag className="h-5 w-5" />
          <span>Añadir al carrito</span>
        </>
      )}
    </button>
  )
}
