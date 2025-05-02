"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "@/context/CartContext"

const CarritoContent = () => {
  const { items, removeFromCart, updateQuantity, clearCart, itemCount } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [showCouponInput, setShowCouponInput] = useState(false)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity)
  }

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 5000 : 0 
  const discount = 0 
  const total = subtotal + shipping - discount

  const handleCheckout = () => {
    setIsCheckingOut(true)

    setTimeout(() => {
      alert("¡Gracias por tu compra!")
      clearCart()
      setIsCheckingOut(false)
    }, 2000)
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()

    alert(`Cupón "${couponCode}" aplicado`)
    setCouponCode("")
    setShowCouponInput(false)
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-light mb-8 text-center">Tu Carrito</h1>

        {items.length === 0 ? (
          // Carrito vacío
          <div className="text-center py-16">
            <p className="text-xl mb-8">Tu carrito está vacío</p>
            <a
              href="#"
              className="inline-block px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors"
            >
              Continuar Comprando
            </a>
          </div>
        ) : (
          // Carrito con productos
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos (2/3 del ancho en desktop) */}
            <div className="lg:col-span-2">
              <div className="border-b border-gray-200 pb-2 mb-4 hidden md:grid md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <h2 className="text-sm font-medium text-gray-500">PRODUCTO</h2>
                </div>
                <div className="md:col-span-2 text-center">
                  <h2 className="text-sm font-medium text-gray-500">PRECIO</h2>
                </div>
                <div className="md:col-span-2 text-center">
                  <h2 className="text-sm font-medium text-gray-500">CANTIDAD</h2>
                </div>
                <div className="md:col-span-2 text-right">
                  <h2 className="text-sm font-medium text-gray-500">SUBTOTAL</h2>
                </div>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-200 py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                >
                  {/* Producto y imagen */}
                  <div className="md:col-span-6 flex items-center">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden border border-gray-200">
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-1 text-xs text-gray-500 flex items-center hover:text-[#a384a3]"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Eliminar
                      </button>
                    </div>
                  </div>

                  {/* Precio unitario */}
                  <div className="md:col-span-2 text-center">
                    <span className="text-sm">${item.price.toLocaleString()}</span>
                  </div>

                  {/* Cantidad */}
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-center border border-gray-300 rounded-sm">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-500 hover:text-black"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = Number.parseInt(e.target.value)
                          if (!isNaN(val)) {
                            handleQuantityChange(item.id, val)
                          }
                        }}
                        className="w-8 text-center text-sm border-0 focus:ring-0"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-500 hover:text-black"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="md:col-span-2 text-right">
                    <span className="text-sm font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}

              <div className="mt-6 flex justify-between items-center">
                <button onClick={clearCart} className="text-sm text-gray-600 hover:text-[#a384a3] flex items-center">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Vaciar carrito
                </button>
                <button
                  onClick={() => setShowCouponInput(!showCouponInput)}
                  className="text-sm text-[#a384a3] hover:underline"
                >
                  {showCouponInput ? "Cancelar cupón" : "¿Tienes un cupón?"}
                </button>
              </div>

              {/* Formulario de cupón */}
              {showCouponInput && (
                <div className="mt-4 p-4 bg-gray-50 rounded-sm">
                  <form onSubmit={handleApplyCoupon} className="flex">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Código de cupón"
                      className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#a384a3]"
                    />
                    <button
                      type="submit"
                      className="ml-2 px-4 py-2 bg-[#a384a3] text-white text-sm font-medium hover:bg-[#8a6d8a] transition-colors"
                    >
                      Aplicar
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Resumen del pedido (1/3 del ancho en desktop) */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-sm">
                <h2 className="text-lg font-medium mb-4">Resumen del pedido</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal ({itemCount} productos)</span>
                    <span className="text-sm font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#a384a3]">
                      <span className="text-sm">Descuento</span>
                      <span className="text-sm font-medium">-${discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Envío</span>
                    <span className="text-sm font-medium">${shipping.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="text-base font-medium">Total</span>
                    <span className="text-base font-medium">${total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-3 px-4 bg-[#a384a3] text-white text-sm font-medium hover:bg-[#8a6d8a] transition-colors ${
                    isCheckingOut ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isCheckingOut ? "Procesando..." : "Finalizar compra"}
                </button>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  <p>Envío calculado en el siguiente paso</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CarritoContent
