import { ProgressSpinner } from 'primereact/progressspinner'
import React from 'react'

function ItemLoader() {
  return (
    <div style={{ width: '100%', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        animationDuration=".5s"
      />
    </div>
  )
}

export default ItemLoader