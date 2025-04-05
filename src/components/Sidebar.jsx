import React, { useEffect } from "react";
import useCategoryStore from "../Store/categoryStore";
import { Link, useNavigate } from "react-router-dom";


export default function Sidebar() {
  const { categories, fetchCategories } = useCategoryStore();


  const navigate = useNavigate(); // Initialize useNavigate
  
  useEffect(() => {
    fetchCategories();


  }, []);

  //   try {
  //       const response = await axios.get(`http://localhost:3000/api/product`, {
  //       params: { category: categoryName } });
  //     console.log("Fetched Products:", response.data.data); // Debugging log
  //     setProducts(response.data.data);
       
  //   } catch (err) {
  //     console.log("Error fetching products:", err.message);
  //   }
  // };

  return (
    <>
      <div className="d-none d-md-block  col-md-3 ">
        <div className="flex-shrink-0 p-3" style={{ width: 300 }}>
          <a
            href="/"
            className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom"
          >
            <svg className="bi pe-none me-2" width="30" height="24">
              <use xlink:href="#bootstrap"></use>
            </svg>
            <span className="fs-3 fw-semibold"> Catagories</span>
          </a>

          {categories.map((category) => (
            <ul className="list-unstyled ps-0">
              <li className="mb-1">
                <button
                  onClick={() => {
                    navigate(`/product?category=${category._id}`);
                  }}
                  class="btn btn-toggle d-inline-flex align-items-center rounded border-0"
                  data-bs-toggle="collapse"
                  data-bs-target="#home-collapse"
                  aria-expanded="true"
                >
                  {category.name}
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}

// <div className="d-none d-md-block  col-md-3 ">

// <div className="flex-shrink-0 p-3" style={{"width":300}}>
// <a href="/" className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
// <svg className="bi pe-none me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
// <span className="fs-3 fw-semibold"> Catagories</span>
// </a>
// <ul className="list-unstyled ps-0">
// <li className="mb-1">
//   <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
//   <i class="fa-solid fa-angle-right"></i>
//   Woman’s Fashion
//   </button>
//   {/* <div className="collapse show" id="home-collapse">
//     <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small p-3 ">
//       <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</a></li>
//       <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Updates</a></li>
//       <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Reports</a></li>
//     </ul>
//   </div> */}
// </li>

// <li className="mb-1 ">
//   <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#accoun-collapse" aria-expanded="false">
//   Groceries & Pets
//   </button>
//   {/* <div className="collapse p-3" id="accoun-collapse">
//     <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//       <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">New...</a></li>
//       <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Profile</a></li>
//       <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Settings</a></li>
//       <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Sign out</a></li>
//     </ul>
//   </div> */}
// </li>

// <li className="mb-1">
//   <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
//     Orders
//   </button>
// </li>

// <li className="mb-1">
//   <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
//     Orders
//   </button>
// </li>

// <li className="mb-1">
//   <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
//   Electronics
//   </button>
// </li>

// <li className="mb-1">
//   <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
//   Home & Lifestyle
//   </button>
// </li>

// <li className="mb-1">
//   <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
//   Home & Lifestyle
//   </button>
// </li>

// <li className="mb-1">
//   <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
//   Groceries & Pets
//   </button>
//   <div className="collapse p-3" id="account-collapse">
//     <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//       <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">New...</a></li>
//       <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Profile</a></li>
//       <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Settings</a></li>
//       <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Sign out</a></li>
//     </ul>
//   </div>
// </li>

// </ul>
// </div>

// </div>
