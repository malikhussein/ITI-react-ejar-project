import React from 'react';
import ejarLogo from '../../assets/logo.png';
import './Navbar.css';

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white p-3">
        <div className="container">
          {/* Logo */}
          <div className="col-1">
            <img src={ejarLogo} className="img-fluid " width={50} />
          </div>

          {/* Search bar */}
          <form className="d-flex col-9 col-lg-6">
            <div className="input-group">
              <input
                className="form-control bg-light rounded-start-1 border-0 ps-4"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="input-group-text rounded-end-1 border-0 pe-4">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>

          {/* Sandwich icon */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <i class="fa-solid fa-bars"></i>
          </button>
          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div class="offcanvas-body">
              <ul className="navbar-nav w-100 mx-auto d-flex justify-content-around">
                <div className="d-flex flex-lg-row flex-column gap-lg-2">
                  <li className="nav-item ms-lg-3 mx-auto">
                    <a className="nav-link active" aria-current="page" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item mx-auto">
                    <a className="nav-link" href="#">
                      Products
                    </a>
                  </li>
                </div>

                <div className="d-flex flex-lg-row flex-column gap-lg-2">
                  {/* Wishlist icon in desktop text in mobile */}
                  <li className="nav-item d-none d-lg-block">
                    <a className="nav-link" href="#">
                      <i class="fa-regular fa-heart"></i>
                    </a>
                  </li>
                  <li className="nav-item d-block d-lg-none mx-auto">
                    <a className="nav-link" href="#">
                      Wishlist
                    </a>
                  </li>

                  {/* Profile icon with a dropdown in desktop profile and logout text in mobile */}
                  <li className="nav-item dropdown d-none d-lg-block">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fa-regular fa-user"></i>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item d-block d-lg-none mx-auto">
                    <a className="nav-link" href="#">
                      Profile
                    </a>
                  </li>
                  <li className="nav-item d-block d-lg-none mx-auto">
                    <a className="nav-link" href="#">
                      Logout
                    </a>
                  </li>
                </div>

                {/* List an item button */}
                <li className="nav-item mx-auto mt-3 m-lg-0">
                  <button className="btn btn-primary rounded-1 fw-bold">
                    List an item
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
