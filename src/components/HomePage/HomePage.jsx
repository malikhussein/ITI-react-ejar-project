import React from 'react'
import HomeSlider from '../HomeSlider/HomeSlider'
import CategoriesSection from '../CategoriesSection/CategoriesSection'
import './HomePage.css'
import StartRenting from '../StartRenting/StartRenting'
import HomeItemsSection from '../HomeItemsSection/HomeItemsSection'

function HomePage() {
  return (
    <>
    <div className='home mt-4'></div>
      <div className='container'>
          <HomeSlider />
          <CategoriesSection />
          <StartRenting />
          <HomeItemsSection />
      </div>
    </>
  )
}

export default HomePage