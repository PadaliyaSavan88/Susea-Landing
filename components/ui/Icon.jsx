'use client'
import * as LucideIcons from 'lucide-react'

export default function Icon({ name, size = 16, strokeWidth = 1.85 }) {
  const key = name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
  const LucideIcon = LucideIcons[key]
  if (!LucideIcon) return null
  return <LucideIcon size={size} strokeWidth={strokeWidth} />
}
