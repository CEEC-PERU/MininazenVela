"use client"

import type React from "react"
import { useState } from "react"
import Header from "./header"
import Footer from "./footer"
import { useRouter } from "next/navigation"
import { CartProvider } from "@/context/CartContext"
import LoginForm from "./auth/login-form"
import RegisterForm from "./auth/register-form"
import UserAccount from "./auth/user-account"

interface LayoutProps {
  children: React.ReactNode
  setCurrentPage?: (page: string) => void
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<string | null>(null)

  const handleNavigation = (page: string) => {
    console.log(`Navegando desde Layout a: ${page}`)

    // Manejar las vistas de autenticación
    if (page === "iniciar-sesion" || page === "registrarse" || page === "mi-cuenta") {
      setCurrentView(page)
      return
    }

    // Resetear la vista actual si navegamos a otra página
    setCurrentView(null)

    // Navegación normal
    if (page === "inicio") {
      router.push("/")
    } else if (page === "velas") {
      router.push("/usuario/velas")
    } else if (page === "decorativos") {
      router.push("/usuario/decorativos")
    } else if (page === "waxMelts") {
      router.push("/usuario/wax-melts")
    } else if (page === "accesorios") {
      router.push("/usuario/accesorios")
    } else if (page === "all") {
      router.push("/usuario/all")
    } else if (page === "esencias") {
      router.push("/usuario/esencias")
    } else if (page === "carrito") {
      router.push("/carrito")
    } else if (page === "envios-devoluciones") {
      router.push("/envios-devoluciones")
    } else {
      console.log(`Implementar navegación para: ${page}`)
    }
  }

  // Funciones para pasar a los formularios de autenticación
  const navigateToRegister = () => {
    setCurrentView("registrarse");
  };

  const navigateToLogin = () => {
    setCurrentView("iniciar-sesion");
  };

  // Renderizar el contenido según la vista actual
  const renderAuthContent = () => {
    switch (currentView) {
      case "iniciar-sesion":
        return (
          <LoginForm
            onSuccess={() => setCurrentView(null)}
            onNavigateToRegister={navigateToRegister} // Pasamos la función para ir a registrarse
          />
        );
      case "registrarse":
        return (
          <RegisterForm
            onSuccess={() => setCurrentView(null)}
            onNavigateToLogin={navigateToLogin} // Pasamos la función para ir a iniciar sesión
          />
        );
      case "mi-cuenta":
        return <UserAccount />;
      default:
        return children;
    }
  };

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header setCurrentPage={handleNavigation} />
        <main className="flex-grow">{renderAuthContent()}</main>
        <Footer setCurrentPage={handleNavigation} />
      </div>
    </CartProvider>
  );
};

export default Layout;
