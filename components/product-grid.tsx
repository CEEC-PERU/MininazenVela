import { ProductCard } from "@/components/product-card"

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  slug: string
  finalizar?: string
  aroma?: string
  colocar?: string
  estilo?: string
  tamano?: string
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
          slug={product.slug}
        />
      ))}
    </div>
  )
}
