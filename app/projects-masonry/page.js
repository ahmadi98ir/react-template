'use client'

import ClientOnly from '@/components/ClientOnly'
import dynamic from 'next/dynamic'

const IsotopeGrid = dynamic(() => import('@/components/Isotope'), {
  ssr: false
})

export default function ProjectsMasonry() {
  return (
    <ClientOnly>
      <IsotopeGrid />
    </ClientOnly>
  )
}