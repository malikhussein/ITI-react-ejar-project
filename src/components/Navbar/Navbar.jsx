import React, { useState } from 'react';
import ejarLogo from '../../assets/logo.png';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../Store/Auth';
import { jwtDecode } from 'jwt-decode';

export default function Navbar() {
  const { token, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  let decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
  }
  const userId = decodedToken?.id;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
    e.target.reset(); // Reset the form after submission

  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white p-3">
        <div className="container">
          {/* Logo */}
          <div className="col-1">
            <Link to="/">
              <img src={ejarLogo} className="img-fluid" width={50} />
            </Link>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="d-flex col-9 col-lg-5">
            <div className="input-group">
              <input
                className="form-control bg-light rounded-start-1 border-0 ps-4"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <button
                type="submit"
                className="input-group-text rounded-end-1 border-0 pe-4"
              >
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
            <i className="fa-solid fa-bars"></i>
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-body">
              <ul className="navbar-nav w-100 mx-auto d-flex justify-content-around">
                <div className="d-flex flex-lg-row flex-column gap-lg-2">
                  <li className="nav-item ms-lg-3 mx-auto">
                    <Link className="nav-link" aria-current="page" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item mx-auto">
                    <Link className="nav-link" to="/product">
                      Products
                    </Link>
                  </li>
                  {token && (
                    <li className="nav-item mx-auto">
                      <Link className="nav-link" to="/requests">
                        Requests
                      </Link>
                    </li>
                  )}
                </div>

                {token && (
                  <div className="d-flex flex-lg-row flex-column gap-lg-2">
                    {/* Messages */}
                    <li className="nav-item d-none d-lg-block">
                      <Link className="nav-link" to="/chat">
                        <i className="fa-regular fa-message"></i>
                      </Link>
                    </li>
                    <li className="nav-item d-block d-lg-none mx-auto">
                      <Link className="nav-link" to="/chat">
                        Messages
                      </Link>
                    </li>

                    {/* Wishlist */}
                    <li className="nav-item d-none d-lg-block">
                      <Link className="nav-link" to="/wishlist">
                        <i className="fa-regular fa-heart"></i>
                      </Link>
                    </li>
                    <li className="nav-item d-block d-lg-none mx-auto">
                      <Link className="nav-link" to="/wishlist">
                        Wishlist
                      </Link>
                    </li>

                    {/* History */}
                    <li className="nav-item d-none d-lg-block">
                      <Link className="nav-link" to="/ReviewPage">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                      </Link>
                    </li>
                    <li className="nav-item d-block d-lg-none mx-auto">
                      <Link className="nav-link" to="/ReviewPage">
                        <i className="fa-solid fa-clock-rotate-left me-2"></i> History
                      </Link>
                    </li>

                    {/* Profile & Logout */}
                    <li className="nav-item dropdown d-none d-lg-block">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-regular fa-user"></i>
                      </a>

                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/profile/${userId}`}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={logout}
                          >
                            Logout
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item d-block d-lg-none mx-auto">
                      <Link className="nav-link" to={`/profile/${userId}`}>
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item d-block d-lg-none mx-auto">
                      <a className="nav-link" href="#" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </div>
                )}

                {/* List an item button */}
                <li className="nav-item mx-auto mt-3 m-lg-0">
                  {token ? (
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#productModal"
                      className="btn btn-primary rounded-1 fw-bold"
                    >
                      List an item
                    </button>
                  ) : (
                    <>
                      <Link
                        className="btn btn-primary rounded-1 me-3 fw-bold"
                        to="/login"
                      >
                        Login
                      </Link>
                      <Link
                        className="btn btn-primary rounded-1 fw-bold"
                        to="/register"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
