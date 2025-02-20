'use client'

import { useEffect, useRef } from 'react'
import Isotope from 'isotope-layout'

export default function IsotopeComponent({ children }) {
  const isotope = useRef()
  const containerRef = useRef()

  useEffect(() => {
    isotope.current = new Isotope(containerRef.current, {
      itemSelector: '.grid-item',
      layoutMode: 'fitRows'
    })

    return () => isotope.current?.destroy()
  }, [])

  const handleFilterKeyChange = (key) => {
    isotope.current?.arrange({ filter: key })
  }

  return (
    <div className="isotope-container" ref={containerRef}>
      {children}
    </div>
  )
}