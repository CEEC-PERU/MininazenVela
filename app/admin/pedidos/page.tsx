import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Eye } from "lucide-react"

export default function PedidosAdmin() {
  const pedidos = [
    { id: 1234, cliente: "Juan Pérez", total: 89.99, estado: "Pendiente", fecha: "2024-01-15" },
    { id: 1235, cliente: "María García", total: 156.5, estado: "Completado", fecha: "2024-01-14" },
    { id: 1236, cliente: "Carlos López", total: 45.0, estado: "En proceso", fecha: "2024-01-14" },
    { id: 1237, cliente: "Ana Martínez", total: 78.25, estado: "Pendiente", fecha: "2024-01-13" },
  ]

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Completado":
        return "bg-green-100 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "En proceso":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Pedidos</h2>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar pedidos..." className="pl-8" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
          <CardDescription>Gestiona todos los pedidos de la tienda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">Pedido #{pedido.id}</p>
                    <p className="text-sm text-muted-foreground">{pedido.cliente}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${pedido.total}</p>
                    <p className="text-sm text-muted-foreground">{pedido.fecha}</p>
                  </div>
                  <Badge className={getStatusColor(pedido.estado)}>{pedido.estado}</Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
