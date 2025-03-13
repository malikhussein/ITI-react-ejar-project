import React, { useState } from "react";
import ReactImageMagnify from "react-image-magnify";

const images = ["/img/1.jpg", "/img/2.jpg", "/img/3.jpg", "/img/8.jpg"];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-lg">
        <div className="row">
          <div className="col-md-6 text-center">
            <div className="magnifier-container">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Product Image",
                    isFluidWidth: true,
                    src: mainImage,
                  },
                  largeImage: {
                    src: mainImage,
                    width: 1200,
                    height: 1200,
                  },
                  enlargedImageContainerDimensions: {
                    width: "120%",
                    height: "120%",
                  },
                }}
              />
            </div>

            <div className="d-flex justify-content-center mt-3">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="img-thumbnail mx-2 thumb-img w-25"
                  onClick={() => setMainImage(img)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <h3>Brand: PlayStation</h3>
            <p className="text-muted">⭐⭐⭐⭐☆ 440 Reviews</p>
            <h3>
              NISMO has become the embodiment of Nissan's outstanding
              performance, inspired by the most unforgiving proving ground, the
              race track.
            </h3>
            <div className="d-flex flex-wrap mb-3">
              <div className="d-flex w-50">
                <span className="text-muted me-2">Type Car</span>
                <span className="fw-bold mx-4">Sport</span>
              </div>
              <div className="d-flex w-50">
                <span className="text-muted me-2">Capacity</span>
                <span className="fw-bold mx-4">2 Person</span>
              </div>
              <div className="d-flex w-50">
                <span className="text-muted me-2">Steering</span>
                <span className="fw-bold mx-4">Manual</span>
              </div>
              <div className="d-flex w-50">
                <span className="text-muted me-2">Gasoline</span>
                <span className="fw-bold mx-4">70L</span>
              </div>
            </div>

            <h4 className="text-danger">500.00 / days</h4>
            <div className="mt-3">
              <button className="btn btn-outline-primary me-2 w-25">
                <i className="fa-solid fa-phone"></i> Call
              </button>
              <button className="btn btn-primary w-25">
                <i className="fa-solid fa-comment"></i> Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
