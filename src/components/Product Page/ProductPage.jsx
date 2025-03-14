import React from 'react'
import Sidebar from '../Sidebar'
import ProductLIst from '../ProductLIst'
import Paginatin from '../Paginatin'

export default function ProductPage() {
 
    return (
    <> 
    <div className="container">
      <div className="row">
      <Sidebar/>

      <ProductLIst/>      
      
      </div>
    </div>
    
    <Paginatin/>
    </>
  )
}
