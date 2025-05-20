// components/header.tsx
"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Search, X, User, LogIn, UserPlus } from "lucide-react"
import { useCart } from "@/context/CartContext"
import Image from "next/image"

interface HeaderProps {
  setCurrentPage: (page: string) => void
}

const Header = ({ setCurrentPage }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const {
    items,
    itemCount,
    isCartOpen,
    setIsCartOpen,
    showNotification,
    lastAddedItem,
    removeFromCart,
    updateQuantity,
  } = useCart()
  const cartRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavigation = (page: string, e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentPage(page)
  }

  const toggleMobileSearch = () => {
    setIsMobileSearchVisible(!isMobileSearchVisible)
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  // Cerrar el carrito al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setIsCartOpen])

  // Calcular el subtotal del carrito
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="top-bar bg-[#e6ecf5] py-5 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Enlace izquierdo (Icono - Logo) */}
          <div>
            <a
              href="#"
              onClick={(e) => handleNavigation("envios-devoluciones", e)}
              className="hover:opacity-75 transition-opacity duration-300"
            >
              <Image
                src="/icono.png"
                alt="Logo Envíos y Devoluciones"
                width={59}
                height={50}
                className="inline-block align-middle"
                style={{ maxWidth: "none", height: "auto" }}
              />
            </a>
          </div>

          {/* Íconos + buscador */}
          <div className="flex items-center space-x-6 text-[#4b4b4b]">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent border-b border-[#4b4b4b] focus:outline-none focus:border-[#a384a3] placeholder-[#7d7d7d] pl-8 pr-4 py-2 text-base font-light w-[220px] md:w-[260px]"
              />
              <Search className="absolute left-1.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4b4b4b]" />
            </div>

            {/* Ícono lupa solo en móvil */}
            <button onClick={toggleMobileSearch} className="block md:hidden" aria-label="Buscar">
              <Search className="h-6 w-6 text-[#4b4b4b]" />
            </button>

            <div className="relative" ref={cartRef}>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative flex items-center"
                onMouseEnter={() => setIsCartOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 md:h-8 md:w-8 text-[#4b4b4b]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2m0 0L7 13h10l4-8H5.4m.6 0L7 13m0 0l-1 5h13l-1-5M10 21h.01M16 21h.01"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-3 -right-2 h-6 w-6 rounded-full bg-[#8894a7] text-white text-[10px] md:text-[14px] flex items-center justify-center font-semibold shadow-md">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Vista previa del carrito */}
              {isCartOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-lg z-50 border border-gray-200 rounded-sm">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium">TU CARRITO ({itemCount})</h3>
                      <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {items.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">Tu carrito está vacío</p>
                    ) : (
                      <>
                        <div className="max-h-60 overflow-y-auto">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center py-3 border-b border-gray-100 last:border-0"
                            >
                              <div className="w-16 h-16 flex-shrink-0 overflow-hidden border border-gray-100">
                                <Image
                                  src={item.imageUrl || "/placeholder.svg"}
                                  alt={item.name}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-3 flex-1">
                                <h4 className="text-xs font-medium">{item.name}</h4>
                                <div className="flex items-center mt-1">
                                  <div className="flex items-center border border-gray-200 rounded-sm">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="px-1 py-0.5 text-gray-500 hover:text-black text-xs"
                                    >
                                      -
                                    </button>
                                    <span className="px-2 text-xs">{item.quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="px-1 py-0.5 text-gray-500 hover:text-black text-xs"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <span className="ml-auto text-xs font-medium">
                                    ${(item.price * item.quantity).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-2 text-gray-400 hover:text-gray-600"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <div className="flex justify-between mb-4">
                            <span className="text-sm font-medium">Subtotal</span>
                            <span className="text-sm font-medium">${subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <a
                              href="#"
                              onClick={(e) => handleNavigation("carrito", e)}
                              className="w-full py-2 px-4 bg-[#a384a3] text-white text-center text-sm font-medium hover:bg-[#8a6d8a] transition-colors"
                            >
                              Ver carrito
                            </a>
                            <button className="w-full py-2 px-4 border border-black text-black text-sm font-medium hover:bg-black hover:text-white transition-colors">
                              Finalizar compra
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Notificación de producto añadido */}
              {showNotification && lastAddedItem && (
                <div className="fixed top-5 right-5 bg-white shadow-lg border border-gray-200 rounded-sm p-4 z-50 w-80 animate-slide-in-right">
                  <div className="flex items-center">
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden border border-gray-100">
                      <Image
                        src={lastAddedItem.imageUrl || "/placeholder.svg"}
                        alt={lastAddedItem.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Producto añadido</h4>
                        <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs mt-1">{lastAddedItem.name}</p>
                      <a
                        href="#"
                        onClick={(e) => handleNavigation("carrito", e)}
                        className="text-xs text-[#a384a3] hover:underline mt-1 inline-block"
                      >
                        Ver carrito ({itemCount})
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Icono de perfil de usuario */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleProfileMenu}
                className="relative flex items-center text-[#4b4b4b] hover:text-[#a384a3] transition-colors"
                aria-label="Perfil de usuario"
              >
                <User className="h-7 w-7 md:h-8 md:w-8" />
              </button>

              {/* Menú desplegable de perfil */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-lg z-50 border border-gray-200 rounded-sm overflow-hidden profile-menu-animation">
                  <div className="py-2">
                    <a
                      href="#"
                      onClick={(e) => {
                        handleNavigation("mi-cuenta", e)
                        setIsProfileMenuOpen(false)
                      }}
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#f8f0f8] hover:text-[#a384a3] transition-colors"
                    >
                      <User className="h-4 w-4 mr-3" />
                      <span>Mi Cuenta</span>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        handleNavigation("iniciar-sesion", e)
                        setIsProfileMenuOpen(false)
                      }}
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#f8f0f8] hover:text-[#a384a3] transition-colors"
                    >
                      <LogIn className="h-4 w-4 mr-3" />
                      <span>Iniciar Sesión</span>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        handleNavigation("registrarse", e)
                        setIsProfileMenuOpen(false)
                      }}
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#f8f0f8] hover:text-[#a384a3] transition-colors"
                    >
                      <UserPlus className="h-4 w-4 mr-3" />
                      <span>Registrarse</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input en móvil cuando se activa */}
          {isMobileSearchVisible && (
            <div className="w-full mt-3 md:hidden">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full border-b border-[#4b4b4b] bg-transparent py-2 px-4 placeholder-[#7d7d7d] text-base focus:outline-none focus:border-[#a384a3] transition-all duration-300"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className="bg-[#e6ecf5]">
        <div className="container mx-auto px-4 text-center">
          <a href="#" onClick={(e) => handleNavigation("inicio", e)} className="inline-block w-full max-w-full">
            <h1 className="header-logo">MININAZEN</h1>
          </a>
        </div>
      </div>

      <nav className="border-t border-b border-gray-300 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <button
            className="md:hidden w-full py-4 text-lg font-semibold flex items-center justify-center text-gray-700 hover:text-black transition"
            onClick={toggleMenu}
          >
            <span>Categorías</span>
            <span className="ml-2 text-xl">{isMenuOpen ? "▲" : "▼"}</span>
          </button>

          <ul
            className={`md:flex flex-col md:flex-row justify-center items-center gap-y-3 md:gap-y-0 md:gap-x-10 py-4 md:py-3 ${isMenuOpen ? "flex" : "hidden"}`}
          >
            {[
              ["inicio", "Inicio"],
              ["velas", "Velas"],
              ["decorativos", "Decorativos"],
              ["waxMelts", "Wax melts"],
              ["accesorios", "Accesorios"],
              ["all", "All"],
              ["esencias", "Esencias"],
            ].map(([key, label]) => (
              <li key={key}>
                <a
                  href="#"
                  onClick={(e) => handleNavigation(key, e)}
                  className="text-base font-medium text-gray-600 hover:text-black tracking-wide uppercase transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
