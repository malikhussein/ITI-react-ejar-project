import React from "react";
import Slider from "react-slick";
import "./CategoriesSection.css";

function CategoriesSection() {
  
  const data = [
    {
      icon: "fa-solid fa-mobile-screen-button",
      title: "Phones",
    },
    {
      icon: "fa-solid fa-desktop",
      title: "Computers",
    },
    {
      icon: "fa-solid fa-camera",
      title: "Cameras",
    },
    {
      icon: "fa-solid fa-headphones-simple",
      title: "Headphones",
    },
    {
      icon: "fa-solid fa-chair",
      title: "Furniture",
    },
    {
      icon: "fa-solid fa-building",
      title: "Properties",
    },
    {
      icon: "fa-solid fa-shirt",
      title: "Clothes",
    },
    {
      icon: "fa-solid fa-screwdriver-wrench",
      title: "Tools",
    },
    {
      icon: "fa-solid fa-car",
      title: "Cars",
    },
    {
      icon: "fa-solid fa-bicycle",
      title: "Bikes",
    },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    rows: 1, 
    slidesPerRow: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          rows: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 2,
        },
      },
    ],
  };

  return (
    <div className="category">
      <h2 className="ms-2">Browse By Category</h2>
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index} className="cat mb-4">
            <i className={`${item.icon} fs-1`}></i>
            <h3 className="mt-3 mb-0 fs-5 fw-normal">{item.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategoriesSection;