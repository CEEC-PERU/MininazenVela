"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"
import { mockProducts } from "@/data/products"

import type { Product } from "@/types/product"
import { ProductForm } from "@/components/admin/product-form"
import { ProductCard } from "@/components/admin/product-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductosAdmin() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [products, setProducts] = useState<Product[]>(mockProducts)

  const existingProductNames = products.map((p) => p.name.toLowerCase())

  const filteredProducts = products.filter((product) => {
    const productNameLower = product.name.toLowerCase()
    const matchesSearch = productNameLower.includes(searchTerm.toLowerCase())

    let matchesCategory = false
    if (selectedCategory === "todos") {
      matchesCategory = true
    } else if (selectedCategory === "velas") {
      matchesCategory = productNameLower.includes("candle")
    }

    return matchesSearch && matchesCategory
  })

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
  }

  return (
    <div className="productos-admin flex-1 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="productos-admin-header bg-white border-b border-gray-200 px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Productos</h1>
            <p className="text-sm sm:text-base text-gray-600">Gestiona el inventario de productos de MININAZEN</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar productos..."
                className="pl-10 text-black bg-white border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Dropdown */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px] text-gray-700 bg-white border-gray-300">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Las velas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los productos</SelectItem>
                <SelectItem value="velas">Las velas</SelectItem>
              </SelectContent>
            </Select>

            {/* Create Product Button */}
            <Button onClick={() => setShowCreateForm(true)} className="custom-create-button whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4 text-white" />
              Crear Producto
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="productos-admin-content px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Statistics Cards */}
        <div className="productos-admin-stats grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-3">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-2 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Total Productos</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-3 sm:p-4">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{products.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-2 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Productos Filtrados</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-3 sm:p-4">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{filteredProducts.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-2 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Precio Promedio</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-3 sm:p-4">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {products.length > 0
                  ? `$${(products.reduce((acc, p) => acc + p.price, 0) / products.length).toFixed(2)}`
                  : "$0.00"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid  */}
        <div className="productos-admin-grid grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 grid-cols-1 xxs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDeleteProduct}
              onUpdate={handleUpdateProduct}
              existingProductNames={existingProductNames}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Card className="bg-white shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 text-center">
            <CardContent>
              <div className="text-gray-400 text-3xl sm:text-4xl mb-3 sm:mb-4">🔍</div>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-2">
                No se encontraron productos que coincidan con los filtros seleccionados.
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">Intenta ajustar los filtros o crear un nuevo producto.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Product Modal */}
      {showCreateForm && (
        <ProductForm
          onClose={() => setShowCreateForm(false)}
          onSave={(newProduct) => {
            setProducts([...products, { ...newProduct, id: Date.now().toString() }])
            setShowCreateForm(false)
          }}
          existingProductNames={existingProductNames}
        />
      )}
    </div>
  )
}
