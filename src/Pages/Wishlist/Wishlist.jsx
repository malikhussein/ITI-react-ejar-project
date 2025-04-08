import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useWishlistStore from '../../Store/Wishlist';
import { useProductStore } from '../../Store/Deatils';
import axios from 'axios';
import ItemCard from '../../components/ItemCard/ItemCard'; // Reuse your existing card

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist, addToWishlist } = useWishlistStore();
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [error, setError] = useState(null);

  //  Fetch confirmed products and filter related ones by wishlist categories
  useEffect(() => {
    if (wishlist.length === 0) return;
  
    const fetchRecommendations = async () => {
      try {
        setLoadingRecommendations(true);
        setError(null);
  
        const res = await axios.get('http://localhost:3000/api/product');
        const confirmed = res.data.data.filter(p => p.confirmed === true);
  
        const wishlistIds = wishlist.map((w) => w.id);
  
        //  exclude only wishlist items
        const related = confirmed.filter(
          (item) => !wishlistIds.includes(item._id)
        );        
  
        setRecommendedItems(related.slice(0, 4)); // max 4 items
      } catch (err) {
        console.error('Error fetching related items:', err.message);
        setError('Failed to load related items. Please try again later.');
      } finally {
        setLoadingRecommendations(false);
      }
    };
  
    fetchRecommendations();
  }, [wishlist]);
  
  

  //  Handle adding an item to wishlist and remove from related
  const handleAddToWishlist = (item) => {
    const itemWithCategoryId = {
      ...item,
      category: item.category?._id || item.category, // ensures we store category as ID string
    };
  
    addToWishlist(itemWithCategoryId);
  
    setRecommendedItems((prevItems) =>
      prevItems.filter((relatedItem) => relatedItem._id !== item._id)
    );

  };
  

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <i
        key={i}
        className={`fa-star ${i < rating ? 'fa-solid' : 'fa-regular'}`}
        style={{ color: i < rating ? '#ffc107' : '#ddd' }}
      ></i>
    ));
  };

  const itemStyle = {
    position: 'relative',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    padding: '16px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const imageStyle = {
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'contain',
    borderRadius: '5px',
    backgroundColor: '#f8f9fa',
  };

  return (
    <div className="container mt-4 wishlist-page">
      {/* ===== Header ===== */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h1 className="m-0" style={{ color: '#562DDD', fontWeight: 600, fontSize: '2.2rem' }}>
          Wishlist ({wishlist.length})
        </h1>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            style={{
              backgroundColor: '#562DDD',
              color: '#fff',
              fontWeight: 400,
              fontSize: '1rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3f1fa7')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#562DDD')}
          >
            <i className="fa-solid fa-trash"></i> Clear All
          </button>
        )}
      </div>

      <hr />

      {/* ===== Wishlist Items ===== */}
      {wishlist.length > 0 ? (
        <>
          <div className="row gy-4 mb-5 mt-4">
            {wishlist.map((product) => (
              <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 d-flex">
                <div style={itemStyle} className="w-100 position-relative">
                  {product.review.length === 0 && (
                    <span className="position-absolute top-0 start-0 m-2 badge bg-success">New</span>
                  )}
                  <button
                    className="position-absolute top-0 end-0 m-2"
                    onClick={() => removeFromWishlist(product.id)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      zIndex: 2,
                      fontSize: '1.25rem',
                      transition: 'transform 0.2s ease-in-out',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <i className="fa-solid fa-trash text-danger"></i>
                  </button>

                  <div className="text-center">
                    <img src={product.images[0]} alt={product.name} style={imageStyle} />
                  </div>

                  <h3 className="mt-3 mb-0 fs-6 fw-semibold text-center" style={{ minHeight: '3.4rem' }}>
                    {product.name}
                  </h3>

                  <div className="d-flex justify-content-center gap-3 mt-2 align-items-center">
                    <p className="fw-bold mb-0">EGP {product.daily}</p>
                    <div className="d-flex flex-column align-items-center gap-1 small">
                      <div className="d-flex align-items-center gap-1">
                        {renderStars(product.averageRating)}
                        <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                          {product.averageRating?.toFixed(1)} / 5
                        </span>
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                        {product.review.length} {product.review.length === 1 ? 'review' : 'reviews'}
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow-1"></div>

                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-outline-dark w-100 mt-3"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <i className="fa-solid fa-eye"></i> See Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ===== Custom Related Items ===== */}
          <div className="col-12 my-5">
            <hr />
            <h4 style={{
                  color: '#562DDD',
                  
                }}  className="mb-4 text-center"> Explore More Products</h4>

            {loadingRecommendations ? (
              <div className="text-center text-muted my-5">
                <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                <div className="mt-2">Loading related items...</div>
              </div>
            ) : error ? (
              <div className="text-center text-danger mt-5">{error}</div>
            ) : recommendedItems.length > 0 ? (
              <>
              <div className="row">
                {recommendedItems.map((product) => (
                  <div key={product._id} className="col-md-3 col-sm-12 mb-4">
                    <ItemCard
                      item={product}
                      onAddToWishlist={handleAddToWishlist}
                      renderStars={(rating) =>
                        Array.from({ length: 5 }, (_, i) => (
                          <i
                            key={i}
                            className={`fa-star ${i + 1 <= rating ? 'fas' : 'far'}`}
                            style={{ color: i + 1 <= rating ? 'gold' : 'lightgray' }}
                          ></i>
                        ))
                      }
                    />
                  </div>
                ))}
              </div>
               {/* SEE MORE BUTTON */}
              <div className="text-center mt-3">
              <Link
                to="/product"
                className="btn"
                style={{
                  backgroundColor: '#562DDD',
                  color: '#fff',
                  borderRadius: '20px',
                  padding: '0.6rem 1.4rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3f1fa7')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#562DDD')}
              >
               Click Here to See More Products 
              </Link>
            </div>
              </>

            ) : (
              <div className="text-center text-muted mt-5">
                No additional related items found.
              </div>
            )}
          </div>
        </>
      ) : (
        // ===== Empty Wishlist Message =====
        <div className="text-center mt-5">
          <i className="fa-regular fa-heart fs-1 mb-3 text-muted"></i>
          <p className="lead text-muted mb-3">Your wishlist is Empty...</p>
          <Link
            to="/"
            style={{
              backgroundColor: '#562DDD',
              color: '#fff',
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3f1fa7')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#562DDD')}
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}
