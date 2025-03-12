import React from 'react'
import HomeSlider from '../HomeSlider/HomeSlider'
import './HomePage.css'
import CategoriesSection from '../CategoriesSection/CategoriesSection'

function HomePage() {
  return (
    <>
    <div className='home mt-4'></div>
      <div className='container'>
          <HomeSlider/>
          <CategoriesSection/>
      </div>
    </>
  )
}

export default HomePage