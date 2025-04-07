import React from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import "./HomeItemsSection.css";
import { Link } from "react-router-dom";
import useProductStore from "../../Store/productsStore";
import ItemCard from "../ItemCard/ItemCard";

function HomeItemsSection() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const confirmedProducts = products.filter((item) => item.confirmed === true);

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
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          rows: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
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
        {confirmedProducts.map((item) => (
          <ItemCard key={item._id} item={item} renderStars={renderStars} />
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
