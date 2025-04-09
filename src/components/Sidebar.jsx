import React, { useEffect } from "react";
import useCategoryStore from "../Store/categoryStore";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css"; // 👈 Make sure to create/import this CSS
// import  banner from "../assets/a1.png";

export default function Sidebar() {
  const { categories, fetchCategories } = useCategoryStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="sidebar d-none d-md-block col-md-3 ">
      <div className="">
        <div className="sidebar-header">
          <svg className="bi pe-none me-2" width="30" height="24">
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span className="sidebar-title">Categories</span>
        </div>


        <ul className="category-list">
        <button
          onClick={() => navigate("/product")}
          className="sidebar-button"
        >
          <i className="fa-solid fa-layer-group sidebar-icon"></i>
          All Categories
        </button>

          {categories.map((category) => (
            <li key={category._id}>
              <button
                onClick={() => navigate(`/product?category=${category._id}`)}
                className="sidebar-button"
              >
                <i className={`fa-solid ${category.icon} sidebar-icon`}></i>
                {category.name.charAt(0).toUpperCase() +
                  category.name.slice(1).toLowerCase()}
              </button>
            </li>
          ))}
        </ul>

        {/* <div className="sidebar-banner">
          <img
            src={banner}
            className=""
            alt="Banner"
          />
        </div> */}
      </div>
    </div>
  );
}
