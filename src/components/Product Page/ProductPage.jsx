import React from 'react'
import ProductCard from '../ProductCard'
import Sidebar from '../Sidebar'
import ProductLIst from '../ProductLIst'

export default function ProductPage() {
 
    return (
    <> 
    <div className="container">
      <div className="row">
      <Sidebar/>

      <ProductLIst/>      
      {/* <ProductCard/>      */}
      
      </div>
    </div>
    
    </>
  )
}
