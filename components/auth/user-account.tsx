"use client"

import { useState } from "react"
import { User, Package, Heart, LogOut, Settings, CreditCard } from "lucide-react"

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState("profile")

  // Datos de ejemplo del usuario
  const user = {
    name: "Usuario de Ejemplo",
    email: "usuario@ejemplo.com",
    joinDate: "Enero 2023",
  }

  return (
    <div className="user-account-container">
      <div className="user-account-wrapper">
        <div className="user-account-sidebar">
          <div className="user-info">
            <div className="user-avatar">
              <User size={40} />
            </div>
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <nav className="user-nav">
            <button
              className={`user-nav-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <User size={18} />
              <span>Mi Perfil</span>
            </button>
            <button
              className={`user-nav-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <Package size={18} />
              <span>Mis Pedidos</span>
            </button>
            <button
              className={`user-nav-item ${activeTab === "wishlist" ? "active" : ""}`}
              onClick={() => setActiveTab("wishlist")}
            >
              <Heart size={18} />
              <span>Lista de Deseos</span>
            </button>
            <button
              className={`user-nav-item ${activeTab === "payment" ? "active" : ""}`}
              onClick={() => setActiveTab("payment")}
            >
              <CreditCard size={18} />
              <span>Métodos de Pago</span>
            </button>
            <button
              className={`user-nav-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings size={18} />
              <span>Configuración</span>
            </button>
            <button className="user-nav-item logout">
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </nav>
        </div>

        <div className="user-account-content">
          {activeTab === "profile" && (
            <div className="user-profile">
              <h2>Mi Perfil</h2>
              <div className="profile-info">
                <div className="info-group">
                  <label>Nombre Completo</label>
                  <p>{user.name}</p>
                </div>
                <div className="info-group">
                  <label>Correo Electrónico</label>
                  <p>{user.email}</p>
                </div>
                <div className="info-group">
                  <label>Miembro desde</label>
                  <p>{user.joinDate}</p>
                </div>
                <button className="edit-profile-btn">Editar Perfil</button>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="user-orders">
              <h2>Mis Pedidos</h2>
              <p className="empty-state">No tienes pedidos recientes.</p>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="user-wishlist">
              <h2>Lista de Deseos</h2>
              <p className="empty-state">Tu lista de deseos está vacía.</p>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="user-payment">
              <h2>Métodos de Pago</h2>
              <p className="empty-state">No tienes métodos de pago guardados.</p>
              <button className="add-payment-btn">Añadir Método de Pago</button>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="user-settings">
              <h2>Configuración</h2>
              <div className="settings-section">
                <h3>Preferencias de Notificaciones</h3>
                <div className="setting-option">
                  <label htmlFor="email-notifications">Notificaciones por correo</label>
                  <input type="checkbox" id="email-notifications" defaultChecked />
                </div>
              </div>
              <div className="settings-section">
                <h3>Seguridad</h3>
                <button className="change-password-btn">Cambiar Contraseña</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserAccount
