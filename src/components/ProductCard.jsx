import React from 'react'

import product from "../assets/1.jpg"

import  "./ProductCard.css"

export default function ProductCard() {
  return (


    <>
     <br /><br /><br />
      <div className="row g-5 overflow-hidden flex-md-row mb-4 shadow-sm  position-relative"> 
     
        <div id='imgProduct' className="col-auto d-none d-lg-block">
        <img src={product} className="bd-placeholder-img" width={300} height={260}/>
            
        </div>

        <div id='data' className="col-md-5 p-4 d-flex flex-column position-static">
          <h2 id='title' className="d-inline-block mb-2 ">Havic HV G-92 Gamepad</h2>
          <h5 className="">Descriptin :</h5>
          <h5 className="">Nikkor Fish Eye- 10.5 F. 2.8 New </h5>
          <h2 id='price' className=""> 1800 E.g</h2> 
        </div>

        <div id='iconsButtons' className="col p-4 d-flex flex-column position-static">
            <h5><i className="fa-solid fa-heart"></i></h5>
            <h5 >
            <i className="fa-solid fa-star"></i> 
            <i className="fa-solid fa-star"></i> 
            <i className="fa-solid fa-star"></i> 
            <i className="fa-solid fa-star"></i>           
            <i className="fa-solid fa-star"></i> 
         </h5>
          <button style={{"width":200}} className="btn btn-secondary">Rent Now</button>
        </div>


      </div>
{/*     
<div className="line">

</div> */}

    </>
  )
}
