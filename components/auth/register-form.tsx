"use client"

import type React from "react"

import { useState } from "react"
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react"

interface RegisterFormProps {
  onSuccess?: () => void
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validación básica
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setIsLoading(true)

    try {
      // lógica registro real
      console.log("Registrando usuario:", { name, email, password })

      // Simular retraso para mostrar  estado de carga
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Llamar a onSuccess si el registro es exitoso
      if (onSuccess) onSuccess()
    } catch (err) {
      setError("Error al registrar. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <UserPlus className="auth-icon" />
          <h2>Crear Cuenta</h2>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <div className="input-with-icon">
              <User className="input-icon" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <div className="input-with-icon">
              <Mail className="input-icon" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-with-icon">
              <Lock className="input-icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <div className="input-with-icon">
              <Lock className="input-icon" />
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
          </div>

          <div className="form-checkbox">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              Acepto los{" "}
              <a href="#" className="text-[#a384a3]">
                Términos y Condiciones
              </a>
            </label>
          </div>

          <button type="submit" className={`auth-submit ${isLoading ? "loading" : ""}`} disabled={isLoading}>
            {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
          </button>
        </form>

        <div className="auth-alternate">
          <p>¿Ya tienes una cuenta?</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              document.dispatchEvent(new CustomEvent("navigate", { detail: { page: "iniciar-sesion" } }))
            }}
          >
            Inicia sesión aquí
          </a>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
