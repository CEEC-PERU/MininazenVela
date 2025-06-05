"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import type { Product } from "@/types/product"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFormProps {
  onClose: () => void
  onSave: (product: Omit<Product, "id">) => void
}

export function ProductForm({ onClose, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    slug: "",
    finalizar: "",
    aroma: "",
    colocar: "",
    estilo: "",
    tamano: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const product = {
      ...formData,
      price: Number.parseFloat(formData.price),
      slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
    }

    onSave(product)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Crear Nuevo Producto</CardTitle>
            <CardDescription>Completa la información del producto</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ej: Large Seashell Candles"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="24.99"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL de la Imagen</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                placeholder="/accesorios/acces1.jpeg"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="aroma">Aroma</Label>
                <Select onValueChange={(value) => handleInputChange("aroma", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar aroma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venecia">Venecia</SelectItem>
                    <SelectItem value="paris">París</SelectItem>
                    <SelectItem value="santorini">Santorini</SelectItem>
                    <SelectItem value="toscana">Toscana</SelectItem>
                    <SelectItem value="florencia">Florencia</SelectItem>
                    <SelectItem value="miconos">Miconos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="finalizar">Finalizar</Label>
                <Select onValueChange={(value) => handleInputChange("finalizar", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar acabado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gris-texturizado">Gris Texturizado</SelectItem>
                    <SelectItem value="blanco-liso">Blanco Liso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tamano">Tamaño</Label>
                <Select onValueChange={(value) => handleInputChange("tamano", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gran-redondo">Gran Redondo</SelectItem>
                    <SelectItem value="pequeno-redondo">Pequeño Redondo</SelectItem>
                    <SelectItem value="mini-redondo">Mini Redondo</SelectItem>
                    <SelectItem value="rectangulo-largo">Rectángulo Largo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estilo">Estilo</Label>
                <Select onValueChange={(value) => handleInputChange("estilo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concha-de-caracol-1">Concha de Caracol 1</SelectItem>
                    <SelectItem value="concha-de-caracol-2">Concha de Caracol 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="colocar">Colocar</Label>
              <Select onValueChange={(value) => handleInputChange("colocar", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar disposición" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual-oval">Individual Oval</SelectItem>
                  <SelectItem value="individual-ronda">Individual Ronda</SelectItem>
                  <SelectItem value="juego-de-2">Juego de 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Crear Producto
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
