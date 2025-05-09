import type React from "react"
import ProductPageHeader from "@/components/product-page-header"


export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductPageHeader />
      {children}
    </>
  )
}
