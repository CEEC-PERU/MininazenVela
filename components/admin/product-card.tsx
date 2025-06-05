"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"
import type { Product } from "@/types/product"
import Image from "next/image"

interface ProductCardProps {
  product: Product
  onDelete: (productId: string) => void
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
          {!imageError ? (
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
              <span className="text-sm">Sin imagen</span>
            </div>
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Badge variant="secondary" className="bg-white/90">
              ID: {product.id}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <CardTitle className="text-lg line-clamp-2 min-h-[3.5rem]">{product.name}</CardTitle>
            <p className="text-2xl font-bold text-green-600 mt-2">${product.price}</p>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Aroma:</span>
              <Badge variant="outline" className="text-xs">
                {product.aroma}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Tamaño:</span>
              <Badge variant="outline" className="text-xs">
                {product.tamano}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Estilo:</span>
              <Badge variant="outline" className="text-xs">
                {product.estilo}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="mr-1 h-3 w-3" />
              Ver
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="mr-1 h-3 w-3" />
              Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(product.id)} className="flex-1">
              <Trash2 className="mr-1 h-3 w-3" />
              Eliminar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
