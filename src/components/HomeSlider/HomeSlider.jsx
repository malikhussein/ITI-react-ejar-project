import React from "react";
import Slider from "react-slick";
import Bannar from '../../assets/Banar.png'
import './HomeSlider.css'

function PauseOnHover() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img className="w-100" src={Bannar} alt="Home Bannar" />
        </div>
        <div>
          <img className="w-100" src={Bannar} alt="Home Bannar" />
        </div>
        <div>
          <img className="w-100" src={Bannar} alt="Home Bannar" />
        </div>
      </Slider>
    </div>
  );
}

export default PauseOnHover;
