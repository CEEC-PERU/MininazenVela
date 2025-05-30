"use client"

import { useState, useCallback } from "react"
import { X } from 'lucide-react'
import { CollapsibleFilter } from "@/components/ui/collapsible-filter"
import { Slider } from "@/components/ui/slider"

interface FilterOption {
  id: string
  label: string
  checked: boolean
}

interface FilterCategory {
  name: string
  options: FilterOption[]
}

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void
  minPrice: number
  maxPrice: number
}

export function FilterSidebar({ onFilterChange, minPrice, maxPrice }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})

  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>([
    {
      name: "Finalizar",
      options: [
        { id: "gris-texturizado", label: "Gris texturizado", checked: false },
        { id: "blanco-liso", label: "Blanco liso", checked: false },
      ],
    },
    {
      name: "Aroma",
      options: [
        { id: "florencia", label: "Florencia", checked: false },
        { id: "lago-de-como", label: "Lago de Como", checked: false },
        { id: "miconos", label: "Miconos", checked: false },
        { id: "paris", label: "París", checked: false },
        { id: "rodas", label: "Rodas", checked: false },
        { id: "santorini", label: "Santorini", checked: false },
        { id: "sicilia", label: "Sicilia", checked: false },
        { id: "saint-tropez", label: "Saint-Tropez", checked: false },
        { id: "toscana", label: "Toscana", checked: false },
        { id: "venecia", label: "Venecia", checked: false },
        { id: "verbier", label: "Verbier", checked: false },
      ],
    },
    {
      name: "Colocar",
      options: [
        { id: "individual-oval", label: "Individual (Oval)", checked: false },
        { id: "individual-ronda", label: "Individual (Ronda)", checked: false },
        { id: "juego-de-2", label: "Juego de 2", checked: false },
      ],
    },
    {
      name: "Estilo de concha",
      options: [
        { id: "concha-de-caracol-1", label: "Concha de caracol", checked: false },
        { id: "concha-de-caracol-2", label: "Concha de caracol", checked: false },
      ],
    },
    {
      name: "Tamaño",
      options: [
        { id: "gran-redondo", label: "Gran redondo", checked: false },
        { id: "rectangulo-largo", label: "Rectángulo largo", checked: false },
        { id: "mini-redondo", label: "Mini redondo (anillo de parafina)", checked: false },
        { id: "pequeno-redondo", label: "Pequeño redondo", checked: false },
      ],
    },
  ])

  const handlePriceChange = useCallback(
    (value: number[]) => {
      setPriceRange(value)

      const newFilters = { ...activeFilters, price: value }
      setActiveFilters(newFilters)
      onFilterChange(newFilters)
    },
    [activeFilters, onFilterChange],
  )

  const handleCheckboxChange = useCallback(
    (categoryName: string, optionId: string, checked: boolean) => {
      setFilterCategories((prevCategories) =>
        prevCategories.map((category) => {
          if (category.name === categoryName) {
            return {
              ...category,
              options: category.options.map((option) => {
                if (option.id === optionId) {
                  return { ...option, checked }
                }
                return option
              }),
            }
          }
          return category
        }),
      )

      setActiveFilters((prevFilters) => {
        const newFilters = { ...prevFilters }

        if (!newFilters[categoryName]) {
          newFilters[categoryName] = []
        }

        if (checked) {
          newFilters[categoryName] = [...newFilters[categoryName], optionId]
        } else {
          newFilters[categoryName] = newFilters[categoryName].filter((id: string) => id !== optionId)

          if (newFilters[categoryName].length === 0) {
            delete newFilters[categoryName]
          }
        }

        onFilterChange(newFilters)
        return newFilters
      })
    },
    [onFilterChange],
  )

  const clearFilters = useCallback(() => {
    setPriceRange([minPrice, maxPrice])

    setFilterCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        options: category.options.map((option) => ({
          ...option,
          checked: false,
        })),
      })),
    )

    setActiveFilters({})
    onFilterChange({})
  }, [minPrice, maxPrice, onFilterChange])

  const hasActiveFilters =
    Object.keys(activeFilters).length > 0 || priceRange[0] !== minPrice || priceRange[1] !== maxPrice

  return (
    <div className="filter-sidebar-wrapper" style={{ padding: 0, margin: 0, height: 'auto' }}>
      <div className="filter-sidebar-container w-full text-black" style={{ padding: 0, margin: 0, height: 'auto' }}> 
        <h2 className="filter-main-title text-lg font-medium">FILTRADO POR</h2>

        <div className="filter-section-spacing">
          <CollapsibleFilter title="Precio" defaultOpen={true}>
            <div className="filter-collapsible-content">
              <div className="price-slider-container">
                <Slider
                  min={minPrice}
                  max={maxPrice}
                  step={1}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="mb-6"
                />
                <div className="price-range-display">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </CollapsibleFilter>
        </div>

        {filterCategories.map((category) => (
          <div key={category.name} className="filter-section-spacing">
            <CollapsibleFilter title={category.name}>
              <div className="filter-collapsible-content">
                <div className="filter-options-container">
                  {category.options.map((option) => (
                    <label key={option.id} className="filter-option-label">
                      <input
                        type="checkbox"
                        className="filter-checkbox"
                        checked={option.checked}
                        onChange={(e) => handleCheckboxChange(category.name, option.id, e.target.checked)}
                      />
                      <span className="filter-label text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CollapsibleFilter>
          </div>
        ))}

        {hasActiveFilters && (
          <div className="clear-filters-container">
            <button onClick={clearFilters} className="clear-filters-button">
              Borrar filtros <X className="clear-filters-icon" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}