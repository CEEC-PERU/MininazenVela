import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { mockProducts } from "@/data/products";

// Define la interfaz de tus props de página
// Ahora, 'params' es una Promesa que se resuelve a un objeto con 'slug'
interface ProductPageProps {
  params: Promise<{ slug: string }>; 
  // Si también se usara 'searchParams', también serían una Promesa:
  // searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Tu componente de página ahora debe ser 'async'
export default async function ProductPage({ params }: ProductPageProps) {
  const awaitedParams = await params; 
  const { slug } = awaitedParams; // Accedes a 'slug' desde el objeto resuelto

  // Buscar el producto por slug
  const product = mockProducts.find((product) => product.slug === slug);

  // Si no se encuentra el producto, mostrar 404
  if (!product) {
    notFound();
  }

  // Productos relacionados (4 productos aleatorios diferentes al actual)
  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}

// --- Importante: Si tienes generateMetadata, también necesita este cambio ---
// import type { Metadata } from 'next';

// export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
//   const awaitedParams = await params;
//   const { slug } = awaitedParams;
//   const product = mockProducts.find((p) => p.slug === slug);

//   if (!product) {
//     return {
//       title: 'Producto no encontrado',
//     };
//   }

//   return {
//     title: product.name,
//     description: `Descubre más sobre ${product.name}.`,
//   };
// }