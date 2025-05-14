"use client"

import Image from "next/image"

const EnviosDevoluciones = () => {
  return (
    <div className="shipping-returns-container">
      <div className="shipping-returns-header">
        <h1>Envíos & Devoluciones</h1>
      </div>

      <div className="shipping-returns-content">
        <section className="shipping-section">
          <h2>Envíos</h2>
          <p>
            En Mininazen, nos esforzamos por procesar y enviar tu pedido lo más rápido posible. Todos los pedidos se
            procesan dentro de 1-3 días hábiles.
          </p>

          <h3>Tiempos de entrega estimados</h3>
          <ul>
            <li>Lima Metropolitana: 1-3 días hábiles</li>
            <li>Provincias: 3-7 días hábiles</li>
          </ul>

          <p>
            Una vez que tu pedido ha sido enviado, recibirás un correo electrónico de confirmación con la información de
            seguimiento.
          </p>

          <h3>Costos de envío</h3>
          <p>
            Los costos de envío se calculan en el momento del pago y dependen de la ubicación de entrega y el peso total
            del pedido.
          </p>
          <ul>
            <li>Envío gratuito en pedidos superiores a S/150 en Lima Metropolitana</li>
            <li>Envío con costo adicional para provincias</li>
          </ul>

          <p>
            Ten en cuenta que los tiempos de entrega pueden variar debido a factores externos como condiciones
            climáticas, días festivos o problemas logísticos. Haremos todo lo posible para mantener los tiempos de
            entrega estimados.
          </p>
        </section>

        <section className="returns-section">
          <h2>Devoluciones</h2>
          <p>
            Queremos que estés completamente satisfecho con tu compra. Si por alguna razón no estás contento con tu
            pedido, aceptamos devoluciones dentro de los 14 días posteriores a la recepción del producto.
          </p>

          <h3>Política de devoluciones</h3>
          <ul>
            <li>
              Los productos deben estar sin usar, en su embalaje original y en las mismas condiciones en que fueron
              recibidos.
            </li>
            <li>
              Para iniciar una devolución, por favor contáctanos por correo electrónico a{" "}
              <a href="mailto:contacto@mininazen.com" className="email-link">
                contacto@mininazen.com
              </a>{" "}
              con tu número de pedido y el motivo de la devolución.
            </li>
            <li>Una vez aprobada la devolución, te proporcionaremos instrucciones sobre cómo devolver el producto.</li>
            <li>
              El costo de envío de la devolución corre por cuenta del cliente, a menos que el producto esté defectuoso o
              dañado.
            </li>
          </ul>

          <h3>Reembolsos</h3>
          <p>
            Una vez que recibamos e inspeccionemos el artículo devuelto, te notificaremos que hemos recibido tu
            devolución. Te informaremos también sobre la aprobación o rechazo de tu reembolso.
          </p>
          <p>
            Si tu devolución es aprobada, procesaremos el reembolso a tu método de pago original. Dependiendo de la
            política de tu banco o tarjeta de crédito, el reembolso puede tardar entre 5-10 días hábiles en reflejarse
            en tu cuenta.
          </p>

          <h3>Productos dañados o defectuosos</h3>
          <p>
            Si recibes un producto dañado o defectuoso, por favor contáctanos dentro de las 48 horas posteriores a la
            recepción con fotos del producto y el embalaje. Organizaremos un reemplazo o reembolso según corresponda, y
            cubriremos los gastos de envío para la devolución.
          </p>
        </section>
      </div>

      <div className="contact-container">
        <div className="contact-section">
          <h2>¿Tienes preguntas?</h2>
          <p>Si tienes alguna pregunta sobre nuestras políticas de envío o devolución, no dudes en contactarnos:</p>
          <p>
            Email:{" "}
            <a href="mailto:contacto@mininazen.com" className="email-link">
              contacto@mininazen.com
            </a>
          </p>
          <p>Teléfono: +51 123 456 789</p>
          <p>Horario de atención: Lunes a Viernes, 9:00 AM - 6:00 PM</p>
        </div>
        <div className="contact-image">
          <Image src="/devo.png" alt="Imagen de vela" width={170} height={170} />
        </div>
      </div>
    </div>
  )
}

export default EnviosDevoluciones
