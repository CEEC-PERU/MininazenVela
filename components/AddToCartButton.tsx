"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/context/CartContext"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    imageUrl: string
  }
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart, isItemInCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isInCart, setIsInCart] = useState(false)

  // Verificar si el producto ya está en el carrito
  useEffect(() => {
    setIsInCart(isItemInCart(product.id))
  }, [product.id, isItemInCart])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAdding(true)
    addToCart(product)

    setTimeout(() => {
      setIsAdding(false)
      setIsInCart(true)
    }, 1000)
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`add-to-cart-button ${
        isAdding ? "adding" : ""
      } ${isInCart && !isAdding ? "added" : ""}`}
      aria-label="Agregar al carrito"
    >
      {isAdding ? (
        <Check className="h-5 w-5" />
      ) : isInCart ? (
        <Check className="h-5 w-5" />
      ) : (
        <ShoppingCart className="h-5 w-5" />
      )}
    </button>
  )
}

export default AddToCartButton