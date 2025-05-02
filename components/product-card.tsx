import Image from "next/image"
import Link from "next/link"
import AddToCartButton from "./AddToCartButton"

interface ProductCardProps {
  id: string
  name: string
  price: number
  imageUrl: string
  slug: string
}

export function ProductCard({ id, name, price, imageUrl, slug }: ProductCardProps) {
  const product = { id, name, price, imageUrl }

  return (
    <div className="group relative">
      <Link href={`/product/${slug}`}>
        <div className="relative overflow-hidden">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              width={400}
              height={400}
              className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <AddToCartButton product={product} />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-sm font-normal">{name}</h3>
          <p className="mt-1 text-sm">${price.toLocaleString()}</p>
        </div>
      </Link>
    </div>
  )
}
