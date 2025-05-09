"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Definir el tipo para los items del carrito
interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

// Definir el tipo para el contexto del carrito
interface CartContextType {
  items: CartItem[]
  itemCount: number
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>
  showNotification: boolean
  lastAddedItem: CartItem | null
}

// Crear el contexto
const CartContext = createContext<CartContextType | undefined>(undefined)

// Proveedor del contexto
export function CartProvider({ children }: { children: React.ReactNode }) {
  // Intentar cargar el estado del carrito desde localStorage al iniciar
  const [items, setItems] = useState<CartItem[]>([])
  const [itemCount, setItemCount] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null)

  // Cargar el estado del carrito desde localStorage al iniciar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart)
          setItems(parsedCart)
          const count = parsedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0)
          setItemCount(count)
        } catch (error) {
          console.error("Error parsing cart from localStorage:", error)
        }
      }
    }
  }, [])

  // Guardar el estado del carrito en localStorage cuando cambia
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items])

  // Actualizar el contador de items cuando cambia el carrito
  useEffect(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0)
    setItemCount(count)
  }, [items])

  // Añadir un item al carrito
  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      // Verificar si el item ya existe en el carrito
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id)

      let updatedItems

      if (existingItemIndex >= 0) {
        // Si existe, actualizar la cantidad
        updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity || 1
      } else {
        // Si no existe, añadir el nuevo item
        updatedItems = [...prevItems, { ...newItem, quantity: newItem.quantity || 1 }]
      }

      // Guardar en localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedItems))
      }

      return updatedItems
    })

    // Mostrar notificación
    setLastAddedItem(newItem)
    setShowNotification(true)

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  // Eliminar un item del carrito
  const removeFromCart = (id: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id)

      // Guardar en localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedItems))
      }

      return updatedItems
    })
  }

  // Actualizar la cantidad de un item
  const updateQuantity = (id: string, quantity: number) => {
    setItems((prevItems) => {
      let updatedItems

      if (quantity <= 0) {
        // Si la cantidad es 0 o menos, eliminar el item
        updatedItems = prevItems.filter((item) => item.id !== id)
      } else {
        // Actualizar la cantidad del item
        updatedItems = prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      }

      // Guardar en localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedItems))
      }

      return updatedItems
    })
  }

  // Vaciar el carrito
  const clearCart = () => {
    setItems([])
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart")
    }
  }

  // Valor del contexto
  const value = {
    items,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    showNotification,
    lastAddedItem,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Hook personalizado para usar el contexto
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider")
  }
  return context
}
