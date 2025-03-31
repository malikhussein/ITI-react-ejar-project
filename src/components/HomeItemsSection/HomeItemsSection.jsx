import React from 'react';
import { useEffect } from 'react';
import Slider from 'react-slick';
import './HomeItemsSection.css';
import { Link } from 'react-router-dom';

import useProductStore from '../../Store/productsStore';

function HomeItemsSection() {

  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = parseInt(rating, 10);
    const emptyStars = totalStars - filledStars;

    return (
      <>
        {Array(filledStars)
          .fill()
          .map((_, i) => (
            <span key={`filled-${i}`} className="star filled">
              <i className="fa-solid fa-star"></i>
            </span>
          ))}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <span key={`empty-${i}`} className="star empty">
              <i className="fa-regular fa-star"></i>
            </span>
          ))}
      </>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    rows: 2,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2,
        },
      },
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>error: {error}</div>;

  return (
    <div className="items-section">
      <h2 className="mb-5">Explore Our New Items</h2>
      <Slider {...settings}>
        {products.map((item, index) => (
          <Link key={item._id} className="nav-link" to={`/product/${item._id}`}>
            <div className="item mb-4">
              <div className="card-icons">
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-eye"></i>
              </div>

              <div className="image">
                <img src={item.images[0]} alt={item.name} />
              </div>

              <h3 className="mt-3 mb-0 fs-5 fw-normal">{item.name}</h3>

              <div className="d-flex gap-3 mt-2">
                <p className="price fw-bold">{item.daily} EGP/Day</p>
                <div className="rating">{renderStars(item.rating)}</div>
                <p>{`(${item.reviews})`}</p>
              </div>
            </div>
          </Link>
        ))}
      </Slider>

      <div className="loadmore mt-4 d-flex justify-content-center">
        <Link to="/product">
          <button className="loadmore-btn">View All Products</button>
        </Link>
      </div>
    </div>
  );
}

export default HomeItemsSection;
