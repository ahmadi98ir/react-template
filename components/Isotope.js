import dynamic from 'next/dynamic'

const IsotopeComponent = dynamic(() => import('./IsotopeComponent'), {
  ssr: false // This will only render on client-side
})

export default IsotopeComponent