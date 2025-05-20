"use client"

import type React from "react"

import { useState } from "react"
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react"

interface LoginFormProps {
  onSuccess?: () => void
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Aquí iría la lógica de autenticación real
      console.log("Iniciando sesión con:", { email, password })

      // Simular un retraso para mostrar el estado de carga
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Llamar a onSuccess si la autenticación es exitosa
      if (onSuccess) onSuccess()
    } catch (err) {
      setError("Error al iniciar sesión. Por favor, verifica tus credenciales.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <User className="auth-icon" />
          <h2>Iniciar Sesión</h2>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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

          <div className="form-footer">
            <a href="#" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button type="submit" className={`auth-submit ${isLoading ? "loading" : ""}`} disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="auth-alternate">
          <p>¿No tienes una cuenta?</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              document.dispatchEvent(new CustomEvent("navigate", { detail: { page: "registrarse" } }))
            }}
          >
            Regístrate aquí
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
