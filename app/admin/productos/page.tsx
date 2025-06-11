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

  const existingProductNames = products.map(p => p.name.toLowerCase());

  const filteredProducts = products.filter((product) => {
    const productNameLower = product.name.toLowerCase();
    const matchesSearch = productNameLower.includes(searchTerm.toLowerCase());

    let matchesCategory = false;
    if (selectedCategory === "todos") {
      matchesCategory = true;
    } else if (selectedCategory === "velas") {
      // **Esta es la lógica correcta para "velas" basada en el nombre del producto,
      matchesCategory = productNameLower.includes("candle");
    } 
 
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Productos</h2>
          <p className="text-muted-foreground">Gestiona el inventario de productos de MININAZEN</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="w-full sm:w-auto custom-create-button"
        >
          <Plus className="mr-2 h-4 w-4 text-white" />
          Crear Producto
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            className="pl-8 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px] text-gray-700">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Buscar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los productos</SelectItem>
            <SelectItem value="velas">Las velas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Filtrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredProducts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Precio Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.length > 0 ? `$${(products.reduce((acc, p) => acc + p.price, 0) / products.length).toFixed(2)}` : "$0.00"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid de productos */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDeleteProduct} />
        ))}
      </div>

      {/* Mensaje si no hay productos */}
      {filteredProducts.length === 0 && (
        <Card className="p-8 text-center">
          <CardContent>
            <p className="text-muted-foreground">
              No se encontraron productos que coincidan con los filtros seleccionados.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Modal de crear producto */}
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