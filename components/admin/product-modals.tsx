"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Upload } from "lucide-react"
import type { Product } from "@/types/product"
import Image from "next/image"

interface ProductModalsProps {
    product: Product | null
    modalType: "view" | "edit" | "delete" | null
    onClose: () => void
    onSave?: (updatedProduct: Product) => void
    onDelete?: (productId: string) => void
    existingProductNames?: string[]
}

export function ProductModals({
    product,
    modalType,
    onClose,
    onSave,
    onDelete,
    existingProductNames = [],
}: ProductModalsProps) {
    const [editedProduct, setEditedProduct] = useState<Product | null>(product)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    if (!product) return null

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setImagePreview(result)
                if (editedProduct) {
                    setEditedProduct({ ...editedProduct, imageUrl: result })
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSave = () => {
        if (editedProduct && onSave) {
            onSave(editedProduct)
            onClose()
        }
    }

    const handleDelete = async () => {
        if (onDelete) {
            setIsDeleting(true)
            await new Promise((resolve) => setTimeout(resolve, 500))
            onDelete(product.id)
            setIsDeleting(false)
            onClose()
        }
    }

    const isNameDuplicate =
        editedProduct &&
        existingProductNames.includes(editedProduct.name.toLowerCase()) &&
        editedProduct.name.toLowerCase() !== product.name.toLowerCase()

    // Modal Ver Producto 
    if (modalType === "view") {
        return (
            <Dialog open={true} onOpenChange={onClose}>
                <DialogContent className="product-modal-compact max-w-lg w-[95vw] max-h-[90vh] p-0">
                    <DialogHeader className="px-6 py-4 border-b border-gray-200">
                        <DialogTitle className="text-lg font-bold text-gray-900 text-center">Detalles del Producto</DialogTitle>
                    </DialogHeader>

                    <div className="p-6 space-y-4">
                        {/* Imagen del producto */}
                        <div className="flex justify-center">
                            <div className="relative aspect-square w-48 overflow-hidden rounded-lg bg-gray-100 shadow-md">
                                <Image
                                    src={product.imageUrl || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="192px"
                                />
                            </div>
                        </div>

                        {/* Información principal */}
                        <div className="text-center space-y-3">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Nombre del Producto</p>
                                <h2 className="text-xl font-bold text-gray-900 leading-tight">{product.name}</h2>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Precio</p>
                                <p className="text-3xl font-bold text-green-600">${product.price}</p>
                            </div>
                        </div>

                        {/* Características con badges  */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-3 text-center">
                                Características
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-center">
                                    <p className="text-xs text-gray-600 mb-2">Aroma</p>
                                    <Badge className="bg-blue-100 text-blue-800 text-xs px-2 py-1 w-full justify-center whitespace-normal leading-tight min-h-[1.5rem] flex items-center">
                                        {product.aroma}
                                    </Badge>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-600 mb-2">Tamaño</p>
                                    <Badge className="bg-purple-100 text-purple-800 text-xs px-2 py-1 w-full justify-center whitespace-normal leading-tight min-h-[1.5rem] flex items-center">
                                        {product.tamano}
                                    </Badge>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-600 mb-2">Estilo</p>
                                    <Badge className="bg-amber-100 text-amber-800 text-xs px-2 py-1 w-full justify-center whitespace-normal leading-tight min-h-[1.5rem] flex items-center">
                                        {product.estilo}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* ID del producto */}
                        <div className="text-center pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">ID del Producto</p>
                            <p className="text-sm text-gray-600 font-mono bg-gray-100 inline-block px-3 py-1 rounded">{product.id}</p>
                        </div>
                    </div>

                    <DialogFooter className="px-6 py-4 border-t border-gray-200">
                        <Button onClick={onClose} variant="outline" className="w-full">
                            Cerrar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }


    // Modal Editar Producto
    if (modalType === "edit" && editedProduct) {
        return (
            <Dialog open={true} onOpenChange={onClose}>
                <DialogContent className="product-modal-edit-compact max-w-lg w-[95vw] max-h-[90vh] p-0">
                    <DialogHeader className="px-6 py-4 border-b border-gray-200">
                        <DialogTitle className="text-lg font-bold text-gray-900 text-center">Editar Producto</DialogTitle>
                    </DialogHeader>

                    <div className="p-6 space-y-4">
                        {/* Imagen del producto */}
                        <div className="flex flex-col items-center">
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2 text-center">
                                Imagen del Producto
                            </p>
                            <div className="relative aspect-square w-40 overflow-hidden rounded-lg bg-gray-100 shadow-md mb-2">
                                <Image
                                    src={imagePreview || editedProduct.imageUrl || "/placeholder.svg"}
                                    alt={editedProduct.name}
                                    fill
                                    className="object-cover"
                                    sizes="160px"
                                />
                            </div>
                            <label className="product-modal-upload-button cursor-pointer inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
                                <Upload className="h-3 w-3 mr-1.5" />
                                Cambiar Imagen
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>

                        {/* Campos principales */}
                        <div className="space-y-3">
                            <div>
                                <Label htmlFor="edit-name" className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                    Nombre del Producto
                                </Label>
                                <Input
                                    id="edit-name"
                                    value={editedProduct.name}
                                    onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                                    className={`mt-1 product-input-text ${isNameDuplicate ? "border-red-500" : ""}`} 
                                />
                                {isNameDuplicate && <p className="text-red-500 text-xs mt-1">Este nombre ya existe</p>}
                            </div>

                            <div>
                                <Label htmlFor="edit-price" className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                    Precio
                                </Label>
                                <Input
                                    id="edit-price"
                                    type="number"
                                    step="0.01"
                                    value={editedProduct.price}
                                    onChange={(e) =>
                                        setEditedProduct({ ...editedProduct, price: Number.parseFloat(e.target.value) || 0 })
                                    }
                                    className="mt-1 product-input-text" 
                                />
                            </div>
                        </div>

                        {/* Características en grid */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-3 text-center">
                                Características
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <Label htmlFor="edit-aroma" className="text-xs text-gray-600 mb-1 block">
                                        Aroma
                                    </Label>
                                    <Input
                                        id="edit-aroma"
                                        value={editedProduct.aroma}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, aroma: e.target.value })}
                                        className="text-xs h-8 product-input-text" 
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="edit-tamano" className="text-xs text-gray-600 mb-1 block">
                                        Tamaño
                                    </Label>
                                    <Input
                                        id="edit-tamano"
                                        value={editedProduct.tamano}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, tamano: e.target.value })}
                                        className="text-xs h-8 product-input-text" 
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="edit-estilo" className="text-xs text-gray-600 mb-1 block">
                                        Estilo
                                    </Label>
                                    <Input
                                        id="edit-estilo"
                                        value={editedProduct.estilo}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, estilo: e.target.value })}
                                        className="text-xs h-8 product-input-text" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
                        <Button onClick={onClose} variant="outline" className="w-full sm:w-auto">
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={!editedProduct.name.trim() || editedProduct.price <= 0 || Boolean(isNameDuplicate)}
                            className="w-full sm:w-auto product-modal-save-button" // Class for "Guardar Cambios" button
                        >
                            Guardar Cambios
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    // Modal Eliminar Producto 
    if (modalType === "delete") {
        return (
            <Dialog open={true} onOpenChange={onClose}>
                <DialogContent className="product-modal-delete max-w-md w-[95vw] p-0 overflow-hidden">
                    <div className="bg-white rounded-lg shadow-lg">
                        <div className="border-b border-gray-200 bg-red-50 px-4 py-3 sm:px-6">
                            <div className="flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                                <h3 className="text-lg font-medium text-gray-900">Eliminar Producto</h3>
                            </div>
                        </div>

                        <div className="px-4 py-4 sm:p-6">
                            <div className="flex flex-col items-center">
                                <div className="relative h-24 w-24 overflow-hidden rounded-md border-2 border-gray-200 mb-4">
                                    <Image
                                        src={product.imageUrl || "/placeholder.svg"}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                    />
                                </div>

                                <h4 className="text-base font-medium text-gray-900 text-center mb-2">{product.name}</h4>

                                <p className="text-sm text-gray-600 text-center mb-2">
                                    ¿Estás seguro de que deseas eliminar este producto?
                                </p>

                                <p className="text-sm font-medium text-red-600 text-center">Esta acción no se puede deshacer.</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col sm:flex-row sm:justify-center gap-2">
                            <Button onClick={onClose} variant="outline" className="w-full sm:w-auto" disabled={isDeleting}>
                                Cancelar
                            </Button>
                            <Button onClick={handleDelete} variant="destructive" className="w-full sm:w-auto product-modal-delete-button" disabled={isDeleting}>
                                {isDeleting ? "Eliminando..." : "Eliminar"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return null
}
