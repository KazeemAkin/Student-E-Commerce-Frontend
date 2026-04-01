import React from 'react'

function TitleValue({ title, value = '--', mr = '' }) {
  return (
    <div className={mr}><strong>{title}</strong> { value }</div>
  )
}

export default TitleValue