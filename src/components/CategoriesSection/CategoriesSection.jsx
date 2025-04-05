import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import useCategoryStore from '../../Store/categoryStore';
import './CategoriesSection.css';

function CategoriesSection() {
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
        },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2, rows: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 1, rows: 2 },
      },
    ],
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="category">
      <h2 className="ms-2">Browse By Category</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <Link
            key={category._id}
            className="nav-link"
            to={`/product?category=${category._id}`}
          >
            <div className="cat mb-4">
              <i className={`fa-solid ${category.icon} fs-1`}></i>
              <h3 className="mt-3 mb-0 fs-5 fw-normal text-capitalize">{category.name}</h3>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default CategoriesSection;
