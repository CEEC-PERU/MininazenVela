import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"

// Importamos los productos mock
import { mockProducts } from "@/data/products"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Buscar el producto por slug
  const product = mockProducts.find((product) => product.slug === slug)

  // Si no se encuentra el producto, mostrar 404
  if (!product) {
    notFound()
  }

  // Productos relacionados (4 productos aleatorios diferentes al actual)
  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)

  return <ProductDetail product={product} relatedProducts={relatedProducts} />
}
