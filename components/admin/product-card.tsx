"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"
import type { Product } from "@/types/product"
import Image from "next/image"
import { ProductModals } from "./product-modals"

interface ProductCardProps {
  product: Product
  onDelete: (productId: string) => void
  onUpdate?: (updatedProduct: Product) => void
  existingProductNames?: string[]
}

export function ProductCard({ product, onDelete, onUpdate, existingProductNames = [] }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const [modalType, setModalType] = useState<"view" | "edit" | "delete" | null>(null)

  const handleCloseModal = () => {
    setModalType(null)
  }

  const handleSaveProduct = (updatedProduct: Product) => {
    if (onUpdate) {
      onUpdate(updatedProduct)
    }
  }

  return (
    <>
      <Card className="product-card group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 h-full flex flex-col bg-white shadow-sm border border-gray-200">
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
            {!imageError ? (
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                onError={() => setImageError(true)}
                sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 25vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
                <span className="text-sm">Sin imagen</span>
              </div>
            )}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Badge variant="secondary" className="bg-white/90 text-gray-600 text-xs">
                ID: {product.id}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="product-card-content p-2 xs:p-3 sm:p-4 flex-1 flex flex-col">
          <div className="flex-1 space-y-1 xs:space-y-2 sm:space-y-3">
            <div>
              <CardTitle className="product-card-title text-sm xs:text-base sm:text-lg line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[3.5rem] text-gray-900">
                {product.name}
              </CardTitle>
              <p className="product-card-price text-lg xs:text-xl sm:text-2xl font-bold text-green-600 mt-1 sm:mt-2">
                ${product.price}
              </p>
            </div>

            {/* Características del producto  */}
            <div className="product-card-details space-y-1.5 xs:space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-gray-600">
              <div className="product-characteristic">
                <span className="product-characteristic-label font-medium">Aroma:</span>
                <Badge
                  variant="outline"
                  className="product-characteristic-badge whitespace-normal text-center py-1 px-2 h-auto min-h-[1.5rem] bg-blue-50 text-blue-700 border-blue-200 break-words"
                >
                  {product.aroma}
                </Badge>
              </div>
              <div className="product-characteristic">
                <span className="product-characteristic-label font-medium">Tamaño:</span>
                <Badge
                  variant="outline"
                  className="product-characteristic-badge whitespace-normal text-center py-1 px-2 h-auto min-h-[1.5rem] bg-purple-50 text-purple-700 border-purple-200 break-words"
                >
                  {product.tamano}
                </Badge>
              </div>
              <div className="product-characteristic">
                <span className="product-characteristic-label font-medium">Estilo:</span>
                <Badge
                  variant="outline"
                  className="product-characteristic-badge whitespace-normal text-center py-1 px-2 h-auto min-h-[1.5rem] bg-amber-50 text-amber-700 border-amber-200 break-words"
                >
                  {product.estilo}
                </Badge>
              </div>
            </div>
          </div>

          {/* Botones de acción -  iconos  */}
          <div className="product-card-actions flex gap-2 pt-2 sm:pt-3 mt-auto border-t border-gray-100">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setModalType("view")}
              className="product-action-button product-view-button border-blue-200 text-blue-700 hover:bg-blue-50"
              aria-label="Ver producto"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setModalType("edit")}
              className="product-action-button product-edit-button border-amber-200 text-amber-700 hover:bg-amber-50"
              aria-label="Editar producto"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setModalType("delete")}
              className="product-action-button product-delete-button"
              aria-label="Eliminar producto"
            >
              <Trash2 className="h-4 w-4 product-delete-icon" /> 
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Modales */}
      <ProductModals
        product={product}
        modalType={modalType}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        onDelete={onDelete}
        existingProductNames={existingProductNames}
      />
    </>
  )
}
