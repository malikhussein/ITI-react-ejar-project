import React from 'react'
import HomeSlider from '../HomeSlider/HomeSlider'
import CategoriesSection from '../CategoriesSection/CategoriesSection'
import './HomePage.css'
import StartRenting from '../StartRenting/StartRenting'

function HomePage() {
  return (
    <>
    <div className='home mt-4'></div>
      <div className='container'>
          <HomeSlider />
          <CategoriesSection />
          <StartRenting />
      </div>
    </>
  )
}

export default HomePage