'use client'

import ClientOnly from '@/components/ClientOnly'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const IsotopeGrid = dynamic(() => import('@/components/Isotope'), {
  ssr: false
})

export default function ProjectsMasonry() {
  const [projects] = useState([
    { id: 1, category: 'web', title: 'Project 1' },
    { id: 2, category: 'app', title: 'Project 2' },
    // Add more projects as needed
  ])

  return (
    <ClientOnly>
      <div className="projects-section">
        <IsotopeGrid>
          {projects.map(project => (
            <div key={project.id} className={`grid-item ${project.category}`}>
              <h3>{project.title}</h3>
            </div>
          ))}
        </IsotopeGrid>
      </div>
    </ClientOnly>
  )
}