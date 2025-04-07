'use client'

import { useEffect, useRef } from 'react'
import Isotope from 'isotope-layout'
import { isBrowser } from '@/utils/environment'

export default function IsotopeComponent({ children }) {
  const isotope = useRef()
  const containerRef = useRef()

  useEffect(() => {
    if (!isBrowser) return;

    isotope.current = new Isotope(containerRef.current, {
      itemSelector: '.grid-item',
      layoutMode: 'fitRows'
    })

    return () => isotope.current?.destroy()
  }, [])

  const handleFilterKeyChange = (key) => {
    if (!isBrowser || !isotope.current) return;
    isotope.current.arrange({ filter: key })
  }

  return (
    <div className="isotope-container" ref={containerRef}>
      {children}
    </div>
  )
}