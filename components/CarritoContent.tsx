// components/CarritoContent.tsx
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
        <h1 className="text-4xl font-light mb-12 text-center text-gray-800 tracking-wide">
         TU CARRITO DE COMPRAS
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <p className="text-xl mb-10 text-gray-700">Tu carrito está vacío.</p>
            <a
              href="/usuario/accesorios"
              className="inline-block px-10 py-4
                         border border-[#a6b7d1]
                         bg-[#e3ebf3]
                         text-[#717c8f]
                         text-base font-semibold  //  para darle más peso
                         hover:bg-[#a6b7d1]
                         hover:text-white
                         transition-all duration-300 ease-in-out // Transición más genérica y suave
                         rounded-md // Bordes ligeramente redondeados
                         shadow-md // Sombra sutil para darle profundidad
                         "
            >
              CONTINUAR COMPRANDO
            </a>
          </div>
        ) : (
          // Carrito con productos
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10"> 
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg"> 
              {/* Encabezados de tabla */}
              <div className="border-b border-gray-200 pb-4 mb-6 hidden md:grid md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <h2 className="text-xs font-semibold uppercase text-gray-600 tracking-wider">PRODUCTO</h2> 
                </div>
                <div className="md:col-span-2 text-center">
                  <h2 className="text-xs font-semibold uppercase text-gray-600 tracking-wider">PRECIO</h2>
                </div>
                <div className="md:col-span-2 text-center">
                  <h2 className="text-xs font-semibold uppercase text-gray-600 tracking-wider">CANTIDAD</h2>
                </div>
                <div className="md:col-span-2 text-right">
                  <h2 className="text-xs font-semibold uppercase text-gray-600 tracking-wider">SUBTOTAL</h2>
                </div>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-100 py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center last:border-b-0" 
                >
                  {/* Producto y imagen */}
                  <div className="md:col-span-6 flex items-center">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden border border-gray-200 rounded-md"> 
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.name}
                        width={96} 
                        height={96} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-5 flex-1"> 
                      <h3 className="text-base font-medium text-gray-800">{item.name}</h3> 
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 text-xs text-gray-500 flex items-center hover:text-[#d9534f] transition-colors" 
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Eliminar
                      </button>
                    </div>
                  </div>

                  {/* Precio unitario */}
                  <div className="md:col-span-2 text-center">
                    <span className="text-base font-medium text-gray-800">${item.price.toLocaleString()}</span> 
                  </div>

                  {/* Cantidad */}
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-center border border-gray-300 rounded-md overflow-hidden"> 
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-black transition-colors" 
                      >
                        <Minus className="h-4 w-4" /> 
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
                        className="w-10 text-center text-base border-0 focus:ring-0 text-gray-800" 
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-black transition-colors" 
                      >
                        <Plus className="h-4 w-4" /> 
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="md:col-span-2 text-right">
                    <span className="text-base font-semibold text-gray-800">${(item.price * item.quantity).toLocaleString()}</span> 
                  </div>
                </div>
              ))}

              <div className="mt-8 flex justify-between items-center"> 
                <button onClick={clearCart} className="text-sm text-gray-600 hover:text-[#d9534f] flex items-center transition-colors">
                  <Trash2 className="h-4 w-4 mr-2" /> 
                  Vaciar carrito
                </button>
                <button
                  onClick={() => setShowCouponInput(!showCouponInput)}
                  className="text-sm text-[#a6b7d1] hover:underline transition-colors"
                >
                  {showCouponInput ? "Cancelar cupón" : "¿Tienes un cupón?"}
                </button>
              </div>

              {/* Formulario de cupón */}
              {showCouponInput && (
                <div className="mt-6 p-5 bg-gray-50 rounded-lg shadow-inner"> 
                  <form onSubmit={handleApplyCoupon} className="flex gap-3"> 
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Código de cupón"
                      className="flex-1 border border-gray-300 px-4 py-2 text-base rounded-md focus:outline-none focus:border-[#a384a3] text-gray-800 shadow-sm" 
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#e3ebf3] text-[#717c8f] text-base font-semibold hover:bg-[#a6b7d1] hover:text-white transition-all duration-300 ease-in-out rounded-md shadow-md" 
                    >
                      Aplicar
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Resumen del pedido (1/3 del ancho en desktop) */}
            <div className="lg:col-span-1">
              <div className="bg-white p-7 rounded-lg shadow-lg border border-gray-100"> 
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Resumen del pedido</h2>

                <div className="space-y-4 mb-8"> 
                  <div className="flex justify-between">
                    <span className="text-base text-gray-700">Subtotal ({itemCount} productos)</span>
                    <span className="text-base font-medium text-gray-800">${subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#a384a3]">
                      <span className="text-base">Descuento</span>
                      <span className="text-base font-medium">-${discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-base text-gray-700">Envío</span>
                    <span className="text-base font-medium text-gray-800">${shipping.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between"> 
                    <span className="text-lg font-bold text-gray-900">Total</span> 
                    <span className="text-lg font-bold text-gray-900">${total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-4 px-4 bg-[#a6b7d1] text-white text-base font-semibold hover:bg-[#717c8f] transition-all duration-300 ease-in-out rounded-md shadow-lg ${ 
                    isCheckingOut ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isCheckingOut ? "Procesando..." : "FINALIZAR COMPRA"}
                </button>

                <div className="mt-5 text-sm text-gray-600 text-center"> 
                  <p>Envío calculado en el siguiente paso.</p>
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