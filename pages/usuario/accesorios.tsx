"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ProductGrid } from "@/components/product-grid"
import { PageHeader } from "@/components/page-header"

const mockProducts = [
  {
    id: "1",
    name: "Large Seashell Candles",
    price: 24.99,
    imageUrl: "/accesorios/acces1.jpeg",
    slug: "large-seashell-candles",
    finalizar: "gris-texturizado",
    aroma: "venecia",
    colocar: "individual-oval",
    estilo: "concha-de-caracol-1",
    tamano: "gran-redondo",
  },
  {
    id: "2",
    name: "Clam Shell trinket dish",
    price: 19.99,
    imageUrl: "/accesorios/acces2.jpeg",
    slug: "clam-shell-trinket-dish",
    finalizar: "blanco-liso",
    aroma: "paris",
    colocar: "individual-ronda",
    estilo: "concha-de-caracol-2",
    tamano: "pequeno-redondo",
  },
  {
    id: "3",
    name: "Shell Candle Set",
    price: 39.99,
    imageUrl: "/accesorios/acces8.jpeg",
    slug: "shell-candle-set",
    finalizar: "gris-texturizado",
    aroma: "santorini",
    colocar: "juego-de-2",
    estilo: "concha-de-caracol-1",
    tamano: "mini-redondo",
  },
  {
    id: "4",
    name: "Conch Shell Holder",
    price: 14.99,
    imageUrl: "/accesorios/acces4.jpeg",
    slug: "conch-shell-holder",
    finalizar: "blanco-liso",
    aroma: "toscana",
    colocar: "individual-oval",
    estilo: "concha-de-caracol-2",
    tamano: "rectangulo-largo",
  },
  {
    id: "5",
    name: "Decorative Shell Bowl",
    price: 22.99,
    imageUrl: "/accesorios/acces5.jpeg",
    slug: "decorative-shell-bowl",
    finalizar: "gris-texturizado",
    aroma: "florencia",
    colocar: "individual-ronda",
    estilo: "concha-de-caracol-1",
    tamano: "gran-redondo",
  },
  {
    id: "6",
    name: "Mini Shell Candle",
    price: 9.99,
    imageUrl: "/accesorios/acces6.jpeg",
    slug: "mini-shell-candle",
    finalizar: "blanco-liso",
    aroma: "miconos",
    colocar: "individual-oval",
    estilo: "concha-de-caracol-2",
    tamano: "mini-redondo",
  },
  {
    id: "7",
    name: "Decorative Shell Bowl",
    price: 22.99,
    imageUrl: "/accesorios/acces7.jpeg",
    slug: "decorative-shell-bowl-2",
    finalizar: "gris-texturizado",
    aroma: "florencia",
    colocar: "individual-ronda",
    estilo: "concha-de-caracol-1",
    tamano: "gran-redondo",
  },
  {
    id: "8",
    name: "Mini Shell Candle",
    price: 9.99,
    imageUrl: "/accesorios/acces8.jpeg",
    slug: "mini-shell-candle-2",
    finalizar: "blanco-liso",
    aroma: "miconos",
    colocar: "individual-oval",
    estilo: "concha-de-caracol-2",
    tamano: "mini-redondo",
  },
  {
    id: "9",
    name: "Decorative Shell Bowl",
    price: 22.99,
    imageUrl: "/accesorios/acces9.jpeg",
    slug: "decorative-shell-bowl-3",
    finalizar: "gris-texturizado",
    aroma: "florencia",
    colocar: "individual-ronda",
    estilo: "concha-de-caracol-1",
    tamano: "gran-redondo",
  },
  {
    id: "10",
    name: "Mini Shell Candle",
    price: 9.99,
    imageUrl: "/accesorios/acces10.jpeg",
    slug: "mini-shell-candle-3",
    finalizar: "blanco-liso",
    aroma: "miconos",
    colocar: "individual-oval",
    estilo: "concha-de-caracol-2",
    tamano: "mini-redondo",
  },
  {
    id: "11",
    name: "Decorative Shell Bowl",
    price: 22.99,
    imageUrl: "/accesorios/acces11.jpeg",
    slug: "decorative-shell-bowl-4",
    finalizar: "gris-texturizado",
    aroma: "florencia",
    colocar: "individual-ronda",
    estilo: "concha-de-caracol-1",
    tamano: "gran-redondo",
  },
  {
    id: "12",
    name: "Mini Shell Candle",
    price: 9.99,
    imageUrl: "/accesorios/acces12.jpeg",
    slug: "mini-shell-candle-4",
    finalizar: "blanco-liso",
    aroma: "miconos",
    colocar: "individual-oval",
    estilo: "concha-de-caracol-2",
    tamano: "mini-redondo",
  },
  {
    id: "13",
    name: "Large Seashell Candles",
    price: 24.99,
    imageUrl: "/accesorios/acces13.jpeg",
    slug: "large-seashell-candles-2",
    finalizar: "gris-texturizado",
    aroma: "venecia",
    colocar: "individual-oval",
    estilo: "concha-de-caracol-1",
    tamano: "gran-redondo",
  },
  {
    id: "14",
    name: "Clam Shell trinket dish",
    price: 19.99,
    imageUrl: "/accesorios/acces14.jpeg",
    slug: "clam-shell-trinket-dish-2",
    finalizar: "blanco-liso",
    aroma: "paris",
    colocar: "individual-ronda",
    estilo: "concha-de-caracol-2",
    tamano: "pequeno-redondo",
  },
  {
    id: "15",
    name: "Shell Candle Set",
    price: 39.99,
    imageUrl: "/accesorios/acces15.jpeg",
    slug: "shell-candle-set-2",
    finalizar: "gris-texturizado",
    aroma: "santorini",
    colocar: "juego-de-2",
    estilo: "concha-de-caracol-1",
    tamano: "mini-redondo",
  },
  {
    id: "16",
    name: "Conch Shell Holder",
    price: 14.99,
    imageUrl: "/accesorios/acces16.jpeg",
    slug: "conch-shell-holder-2",
    finalizar: "blanco-liso",
    aroma: "toscana",
    colocar: "individual-oval",
    estilo: "concha-de-caracol-2",
    tamano: "rectangulo-largo",
  },
  {
    id: "15",
    name: "Shell Candle Set",
    price: 39.99,
    imageUrl: "/accesorios/acces17.jpeg",
    slug: "shell-candle-set-2",
    finalizar: "gris-texturizado",
    aroma: "santorini",
    colocar: "juego-de-2",
    estilo: "concha-de-caracol-1",
    tamano: "mini-redondo",
  },
  {
    id: "16",
    name: "Conch Shell Holder",
    price: 14.99,
    imageUrl: "/accesorios/acces11.jpeg",
    slug: "conch-shell-holder-2",
    finalizar: "blanco-liso",
    aroma: "toscana",
    colocar: "individual-oval",
    estilo: "concha-de-caracol-2",
    tamano: "rectangulo-largo",
  },
  {
    id: "15",
    name: "Shell Candle Set",
    price: 39.99,
    imageUrl: "/accesorios/acces3.jpeg",
    slug: "shell-candle-set-2",
    finalizar: "gris-texturizado",
    aroma: "santorini",
    colocar: "juego-de-2",
    estilo: "concha-de-caracol-1",
    tamano: "mini-redondo",
  },
  {
    id: "16",
    name: "Conch Shell Holder",
    price: 14.99,
    imageUrl: "/accesorios/acces17.jpeg",
    slug: "conch-shell-holder-2",
    finalizar: "blanco-liso",
    aroma: "toscana",
    colocar: "individual-oval",
    estilo: "concha-de-caracol-2",
    tamano: "rectangulo-largo",
  },{
    id: "15",
    name: "Shell Candle Set",
    price: 39.99,
    imageUrl: "/accesorios/acces16.jpeg",
    slug: "shell-candle-set-2",
    finalizar: "gris-texturizado",
    aroma: "santorini",
    colocar: "juego-de-2",
    estilo: "concha-de-caracol-1",
    tamano: "mini-redondo",
  },
  {
    id: "16",
    name: "Conch Shell Holder",
    price: 14.99,
    imageUrl: "/accesorios/acces12.jpeg",
    slug: "conch-shell-holder-2",
    finalizar: "blanco-liso",
    aroma: "toscana",
    colocar: "individual-oval",
    estilo: "concha-de-caracol-2",
    tamano: "rectangulo-largo",
  },
  {
    id: "15",
    name: "Shell Candle Set",
    price: 39.99,
    imageUrl: "/accesorios/acces10.jpeg",
    slug: "shell-candle-set-2",
    finalizar: "gris-texturizado",
    aroma: "santorini",
    colocar: "juego-de-2",
    estilo: "concha-de-caracol-1",
    tamano: "mini-redondo",
  },
  {
    id: "16",
    name: "Conch Shell Holder",
    price: 14.99,
    imageUrl: "/accesorios/acces14.jpeg",
    slug: "conch-shell-holder-2",
    finalizar: "blanco-liso",
    aroma: "toscana",
    colocar: "individual-oval",
    estilo: "concha-de-caracol-2",
    tamano: "rectangulo-largo",
  },
]

const PRODUCTS_PER_PAGE = 12

export default function AccesoriosPage() {
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(Math.ceil(mockProducts.length / PRODUCTS_PER_PAGE))
  const [paginatedProducts, setPaginatedProducts] = useState<typeof mockProducts>([])

  const handleFilterChange = useCallback((filters: Record<string, any>) => {
    setActiveFilters(filters)
    setCurrentPage(1) // Resetear a la primera página cuando se cambian los filtros
  }, [])

  useEffect(() => {
    // Filtrar productos basados en los filtros activos
    let result = [...mockProducts]

    // Filtrar por precio
    if (activeFilters.price) {
      const [min, max] = activeFilters.price
      result = result.filter((product) => product.price >= min && product.price <= max)
    }

    // Filtrar por otras categorías
    Object.entries(activeFilters).forEach(([category, values]) => {
      if (category === "price") return // Ya procesado arriba

      if (Array.isArray(values) && values.length > 0) {
        switch (category) {
          case "Finalizar":
            result = result.filter((product) => values.includes(product.finalizar))
            break
          case "Aroma":
            result = result.filter((product) => values.includes(product.aroma))
            break
          case "Colocar":
            result = result.filter((product) => values.includes(product.colocar))
            break
          case "Estilo de concha":
            result = result.filter((product) => values.includes(product.estilo))
            break
          case "Tamaño":
            result = result.filter((product) => values.includes(product.tamano))
            break
        }
      }
    })

    setFilteredProducts(result)
    setTotalPages(Math.ceil(result.length / PRODUCTS_PER_PAGE))
  }, [activeFilters])

  // Paginar los productos filtrados
  useEffect(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    const endIndex = startIndex + PRODUCTS_PER_PAGE
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex))
  }, [filteredProducts, currentPage])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const headerImage = "https://static.wixstatic.com/media/bb43c7_1ff71499c78b471eb00485ec7b523729~mv2.jpg"

  return (
    <main className="text-black">
      <PageHeader title="ACCESORIOS" backgroundImage={headerImage} />
      <div className="container mx-auto px-4 py-12 main-content-area">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]">
          <div className="md:sticky md:top-24 md:self-start">
            <FilterSidebar onFilterChange={handleFilterChange} minPrice={5} maxPrice={25} />
          </div>

          <div>
            {filteredProducts.length === 0 ? (
              <div className="mt-8 text-center">
                <p className="text-lg">No se encontraron productos que coincidan con los filtros seleccionados.</p>
                <button onClick={() => setActiveFilters({})} className="mt-4 text-amber-800 underline">
                  Borrar filtros
                </button>
              </div>
            ) : (
              <ProductGrid products={paginatedProducts} />
            )}

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center space-x-4">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-button"
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    className={`pagination-number ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-button"
                  aria-label="Página siguiente"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}