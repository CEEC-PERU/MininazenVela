"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Upload } from "lucide-react"
import type { Product } from "@/types/product"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductFormProps {
  onClose: () => void
  onSave: (product: Omit<Product, "id">) => void
  existingProductNames?: string[]
}

export function ProductForm({ onClose, onSave, existingProductNames = [] }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    finalizar: "",
    aroma: "",
    colocar: "",
    estilo: "",
    tamano: "",
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isDragOver, setIsDragOver] = useState(false)
  const [imageSource, setImageSource] = useState<"url" | "file">("url")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (imageSource === "url" && !formData.imageUrl) {
      setImagePreview("")
    }
    if (imageSource === "file" && !imageFile) {
      setImagePreview("")
    }
  }, [formData.imageUrl, imageFile, imageSource])


  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = "El nombre del producto es obligatorio."
    } else if (existingProductNames.includes(formData.name.trim().toLowerCase())) {
      errors.name = "Ya existe un producto con este nombre."
    }

    const priceValue = Number.parseFloat(formData.price)
    if (!formData.price.trim()) {
      errors.price = "El precio es obligatorio."
    } else if (isNaN(priceValue)) {
      errors.price = "El precio debe ser un número válido."
    } else if (priceValue <= 0) {
      errors.price = "El precio debe ser mayor que cero."
    }

    if (imageSource === "url" && !formData.imageUrl.trim()) {
      errors.imageUrl = "Ingresar URL o subir archivo obligatorio."
    }
    if (imageSource === "file" && !imageFile) {
      errors.imageFile = "Debe subir una imagen."
    }

    if (!formData.aroma) {
      errors.aroma = "Debe seleccionar un aroma."
    }
    if (!formData.finalizar) {
      errors.finalizar = "Debe seleccionar un acabado."
    }
    if (!formData.tamano) {
      errors.tamano = "Debe seleccionar un tamaño."
    }
    if (!formData.estilo) {
      errors.estilo = "Debe seleccionar un estilo."
    }
    if (!formData.colocar) {
      errors.colocar = "Debe seleccionar una disposición."
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }, [formData, imageSource, imageFile, existingProductNames])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return
    }

    const product = {
      ...formData,
      price: Number.parseFloat(formData.price),
      slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      imageUrl: imageSource === "file" && imageFile ? URL.createObjectURL(imageFile) : formData.imageUrl,
    }

    onSave(product)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }

    if (field === "imageUrl" && imageSource === "url") {
      setImagePreview(value)
    }
  }

  const handleFileSelect = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        setImageFile(file)
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setImagePreview(result)
        }
        reader.readAsDataURL(file)
        setImageSource("file")

        if (validationErrors.imageFile) {
          setValidationErrors((prev) => {
            const newErrors = { ...prev }
            delete newErrors.imageFile
            return newErrors
          })
        }
      } else {
        setImageFile(null);
        setImagePreview("");
        setValidationErrors(prev => ({ ...prev, imageFile: "Por favor, seleccione un archivo de imagen." }));
      }
    },
    [validationErrors],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      const imageFile = files.find((file) => file.type.startsWith("image/"))

      if (imageFile) {
        handleFileSelect(imageFile)
      } else if (files.length > 0) {
        setValidationErrors(prev => ({ ...prev, imageFile: "El archivo arrastrado no es una imagen válida." }));
      }
    },
    [handleFileSelect],
  )

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const clearImage = () => {
    setImageFile(null)
    setImagePreview("")
    setFormData((prev) => ({ ...prev, imageUrl: "" }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    if (validationErrors.imageUrl) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.imageUrl
        return newErrors
      })
    }
    if (validationErrors.imageFile) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.imageFile
        return newErrors
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-lg sm:text-xl">Crear Nuevo Producto</CardTitle>
            <CardDescription className="text-sm">Completa la información del producto</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder=""
                  required
                  className={validationErrors.name ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""}
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1 animate-fadeIn">{validationErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  type="text" 
                  inputMode="decimal" 
                  pattern="[0-9]*[.,]?[0-9]*" 
                  value={formData.price}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value) || value === '') {
                      handleInputChange("price", value);
                    }
                  }}
                  placeholder=""
                  required
                  className={validationErrors.price ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""}
                />
                {validationErrors.price && (
                  <p className="text-red-500 text-sm mt-1 animate-fadeIn">{validationErrors.price}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Imagen del Producto</Label>
              <Tabs
                value={imageSource}
                onValueChange={(value) => {
                  setImageSource(value as "url" | "file")
                  setValidationErrors((prev) => {
                    const newErrors = { ...prev }
                    delete newErrors.imageUrl
                    delete newErrors.imageFile
                    return newErrors
                  })
                }}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url" className="text-xs sm:text-sm">
                    URL Externa
                  </TabsTrigger>
                  <TabsTrigger value="file" className="text-xs sm:text-sm">
                    Subir Archivo
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="space-y-3">
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                    placeholder="pegue URL"
                    className={`${validationErrors.imageUrl ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""} custom-placeholder`}
                  />
                  {validationErrors.imageUrl && (
                    <p className="text-red-500 text-sm mt-1 animate-fadeIn">{validationErrors.imageUrl}</p>
                  )}
                </TabsContent>

                <TabsContent value="file" className="space-y-3">
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-colors ${
                      isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                    } ${validationErrors.imageFile ? "border-red-500 ring-red-500" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground" />
                      <div className="space-y-2">
                        <p className="text-sm sm:text-base font-medium">Arrastra y suelta tu imagen aquí</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          o haz clic para seleccionar desde tus archivos
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBrowseClick}
                        className="text-xs sm:text-sm"
                      >
                        Buscar Archivos
                      </Button>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  {validationErrors.imageFile && (
                    <p className="text-red-500 text-sm mt-1 animate-fadeIn">{validationErrors.imageFile}</p>
                  )}
                </TabsContent>
              </Tabs>

              {/* vista previa de la img optimizada */}
              {imagePreview && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Vista Previa</Label>
                    <Button type="button" variant="ghost" size="sm" onClick={clearImage}>
                      <X className="h-3 w-3 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                  <div className="relative w-full max-w-[200px] sm:max-w-[250px] mx-auto overflow-hidden rounded-lg border aspect-square">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="aroma">Aroma</Label>
                <Select onValueChange={(value) => handleInputChange("aroma", value)}>
                  <SelectTrigger className={validationErrors.aroma ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""}>
                    <SelectValue placeholder="Seleccionar aroma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venecia">Venecia</SelectItem>
                    <SelectItem value="paris">París</SelectItem>
                    <SelectItem value="santorini">Santorini</SelectItem>
                    <SelectItem value="toscana">Toscana</SelectItem>
                    <SelectItem value="florencia">Florencia</SelectItem>
                    <SelectItem value="miconos">Miconos</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.aroma && (
                  <p className="text-red-500 text-sm mt-1 animate-fadeIn">{validationErrors.aroma}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="finalizar">Finalizar</Label>
                <Select onValueChange={(value) => handleInputChange("finalizar", value)}>
                  <SelectTrigger className={validationErrors.finalizar ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""}>
                    <SelectValue placeholder="Seleccionar acabado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gris-texturizado">Gris Texturizado</SelectItem>
                    <SelectItem value="blanco-liso">Blanco Liso</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.finalizar && (
                  <p className="text-red-500 text-sm mt-1 animate-fadeIn">{validationErrors.finalizar}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tamano">Tamaño</Label>
                <Select onValueChange={(value) => handleInputChange("tamano", value)}>
                  <SelectTrigger className={validationErrors.tamano ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""}>
                    <SelectValue placeholder="Seleccionar tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gran-redondo">Gran Redondo</SelectItem>
                    <SelectItem value="pequeno-redondo">Pequeño Redondo</SelectItem>
                    <SelectItem value="mini-redondo">Mini Redondo</SelectItem>
                    <SelectItem value="rectangulo-largo">Rectángulo Largo</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.tamano && (
                  <p className="text-red-500 text-sm mt-1 animate-fadeIn">{validationErrors.tamano}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="estilo">Estilo</Label>
                <Select onValueChange={(value) => handleInputChange("estilo", value)}>
                  <SelectTrigger className={validationErrors.estilo ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""}>
                    <SelectValue placeholder="Seleccionar estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concha-de-caracol-1">Concha de Caracol 1</SelectItem>
                    <SelectItem value="concha-de-caracol-2">Concha de Caracol 2</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.estilo && (
                  <p className="text-red-500 text-sm mt-1 animate-fadeIn">{validationErrors.estilo}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="colocar">Colocar</Label>
              <Select onValueChange={(value) => handleInputChange("colocar", value)}>
                <SelectTrigger className={validationErrors.colocar ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""}>
                  <SelectValue placeholder="Seleccionar disposición" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual-oval">Individual Oval</SelectItem>
                  <SelectItem value="individual-ronda">Individual Ronda</SelectItem>
                  <SelectItem value="juego-de-2">Juego de 2</SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.colocar && (
                <p className="text-red-500 text-sm mt-1 animate-fadeIn">{validationErrors.colocar}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 order-2 sm:order-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 order-1 sm:order-2 my-custom-submit-button">
                Crear Producto
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}