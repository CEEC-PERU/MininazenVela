"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollapsibleFilterProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function CollapsibleFilter({ title, children, defaultOpen = false, className }: CollapsibleFilterProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number | undefined>(defaultOpen ? undefined : 0)

  // Medir la altura del contenido cuando cambia
  useEffect(() => {
    if (!contentRef.current) return

    if (isOpen) {
      const height = contentRef.current.scrollHeight
      setContentHeight(height)
    } else {
      setContentHeight(0)
    }
  }, [isOpen, children])

  return (
    <div className={cn("border-b border-gray-200 py-4", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium">{title}</span>
        {isOpen ? (
          <Minus className="h-4 w-4 text-gray-500 transition-transform duration-200" />
        ) : (
          <Plus className="h-4 w-4 text-gray-500 transition-transform duration-200" />
        )}
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? `${contentHeight}px` : "0px" }}
      >
        <div className="pt-4">{children}</div>
      </div>
    </div>
  )
}
