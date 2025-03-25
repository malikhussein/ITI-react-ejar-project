import React from "react";
import  { useEffect } from 'react';

import Slider from "react-slick";
import "./CategoriesSection.css";
import { Link } from "react-router-dom";

import useCategoryStore from "../../Store/categoryStore"

function CategoriesSection() {
  // const data = [
  //   {
  //     icon: "fa-solid fa-mobile-screen-button",
  //     title: "Phones",
  //   },
  //   {
  //     icon: "fa-solid fa-desktop",
  //     title: "Computers",
  //   },
  //   {
  //     icon: "fa-solid fa-camera",
  //     title: "Cameras",
  //   },
  //   {
  //     icon: "fa-solid fa-headphones-simple",
  //     title: "Headphones",
  //   },
  //   {
  //     icon: "fa-solid fa-chair",
  //     title: "Furniture",
  //   },
  //   {
  //     icon: "fa-solid fa-building",
  //     title: "Properties",
  //   },
  //   {
  //     icon: "fa-solid fa-shirt",
  //     title: "Clothes",
  //   },
  //   {
  //     icon: "fa-solid fa-screwdriver-wrench",
  //     title: "Tools",
  //   },
  //   {
  //     icon: "fa-solid fa-car",
  //     title: "Cars",
  //   },
  //   {
  //     icon: "fa-solid fa-bicycle",
  //     title: "Bikes",
  //   },
  // ];

  // جلب البيانات من الـ Store
  
  const { categories, loading, error, fetchCategories } = useCategoryStore();

  
  useEffect(() => {
    fetchCategories();
  }, []);

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

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(categories)

  return (
    <div className="category">
      <h2 className="ms-2">Browse By Category</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <Link className="nav-link" to="/product">
            <div key={category._id} className="cat mb-4">
              <i className={`fa-solid ${category.icon} fs-1`}></i>
              <h3 className="mt-3 mb-0 fs-5 fw-normal">{category.name}</h3>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default CategoriesSection;
