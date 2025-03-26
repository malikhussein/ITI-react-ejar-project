// import product from "../assets/1.jpg"

import './ProductCard.css';

export default function ProductCard({ product }) {
  console.log(product);

  return (
    <>
      <br />
      <br />
      <br />

      <div className="row g-5 overflow-hidden flex-md-row mb-4 shadow-sm position-relative">
        <div
          id="imgProduct"
          className="col-12 col-md-auto d-flex justify-content-center"
        >
          <img
            src={product.images[0]}
            className="bd-placeholder-img img-fluid"
            width={300}
            height={260}
          />
        </div>

        <div
          id="data"
          className="col-12 col-md-5 p-4 d-flex flex-column position-static text-center text-md-start"
        >
          <h2 id="title" className="d-inline-block mb-2">
            {product.name}
          </h2>
          <h5>Description:</h5>
          <h5>{product.description}</h5>
          <h2 id="price">{product.daily} E.G</h2>
        </div>

        <div
          id="iconsButtons"
          className="col-12 col-md p-4 d-flex flex-column align-items-center align-items-md-start position-static"
        >
          <h5>
            <i className="fa-solid fa-heart d-none d-md-block"></i>
          </h5>
          <h5 className="d-none d-md-block">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </h5>
          <button
            style={{ width: 200 }}
            className="btn btn-secondary rent-button"
          >
            Rent Now
          </button>
        </div>
      </div>
    </>
  );
}
