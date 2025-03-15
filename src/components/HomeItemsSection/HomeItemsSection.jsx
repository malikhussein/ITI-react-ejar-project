import React from 'react';
import Slider from 'react-slick';
import './HomeItemsSection.css';
import { Link } from 'react-router-dom';

function HomeItemsSection() {
  const items = [
    {
      title: 'Breed Dry Dog Food',
      image: 'src/assets/cesarpets.jpg',
      price: '100',
      rating: '3',
      reviews: '35',
    },
    {
      title: 'CANON EOS DSLR Camera',
      image: 'src/assets/canon.png',
      price: '360',
      rating: '4',
      reviews: '95',
    },
    {
      title: 'ASUS FHD Gaming Laptop',
      image: 'src/assets/laptop.png',
      price: '700',
      rating: '5',
      reviews: '325',
    },
    {
      title: 'Curology Product Set ',
      image: 'src/assets/coz.png',
      price: '500',
      rating: '4',
      reviews: '145',
    },
    {
      title: 'Kids Electric Car',
      image: 'src/assets/babycar.png',
      price: '960',
      rating: '5',
      reviews: '65',
    },
    {
      title: 'Jr. Zoom Soccer Cleats',
      image: 'src/assets/foot.png',
      price: '1160',
      rating: '4',
      reviews: '35',
    },
    {
      title: 'GP11 Shooter USB Gamepad',
      image: 'src/assets/joy.png',
      price: '660',
      rating: '4',
      reviews: '55',
    },
    {
      title: 'Quilted Satin Jacket',
      image: 'src/assets/jacket.png',
      price: '400',
      rating: '5',
      reviews: '75',
    },
    {
      title: 'Breed Dry Dog Food',
      image: 'src/assets/cesarpets.jpg',
      price: '100',
      rating: '3',
      reviews: '35',
    },
    {
      title: 'CANON EOS DSLR Camera',
      image: 'src/assets/canon.png',
      price: '360',
      rating: '4',
      reviews: '95',
    },
    {
      title: 'ASUS FHD Gaming Laptop',
      image: 'src/assets/laptop.png',
      price: '700',
      rating: '5',
      reviews: '325',
    },
    {
      title: 'Curology Product Set ',
      image: 'src/assets/coz.png',
      price: '500',
      rating: '4',
      reviews: '145',
    },
    {
      title: 'Kids Electric Car',
      image: 'src/assets/babycar.png',
      price: '960',
      rating: '5',
      reviews: '65',
    },
    {
      title: 'Jr. Zoom Soccer Cleats',
      image: 'src/assets/foot.png',
      price: '1160',
      rating: '4',
      reviews: '35',
    },
    {
      title: 'GP11 Shooter USB Gamepad',
      image: 'src/assets/joy.png',
      price: '660',
      rating: '4',
      reviews: '55',
    },
    {
      title: 'Quilted Satin Jacket',
      image: 'src/assets/jacket.png',
      price: '400',
      rating: '5',
      reviews: '75',
    },
  ];

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

  return (
    <div className="items-section">
      <h2 className="mb-5">Explore Our Products</h2>
      <Slider {...settings}>
        {items.map((item, index) => (
          <Link className="nav-link" to="product/123">
            <div key={index} className="item mb-4">
              <div className='card-icons'>
                
                <i class="fa-regular fa-heart"></i>
                <i class="fa-regular fa-eye"></i>
              </div>

              <div className="image">
                <img src={item.image} alt="" />
              </div>

              <h3 className="mt-3 mb-0 fs-6 fw-normal">{item.title}</h3>

              <div className="d-flex gap-3 mt-2">
                <p className="price fw-bold">${item.price}</p>
                <div className="rating">⭐⭐⭐⭐☆</div>
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
