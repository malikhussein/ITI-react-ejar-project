import React from 'react';

export default function Footer() {
  return (
    <>
      <div className="container">
        <footer className="py-5">
          <div className="row flex-column flex-lg-row justify-content-center align-items-center align-items-lg-start">
            <div className="col-3 col-lg-2 mb-3">
              <h5 className="mb-4 text-center text-lg-start">Support</h5>
              <ul className="nav flex-column align-items-center align-items-lg-start">
                <li className="nav-item mb-2 col-10 text-body-secondary">
                  Beni Suef, Beni Suef, Egypt
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    support@ejar.com
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    +201000000001
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-3 col-lg-2 mb-3">
              <h5 className="mb-4 text-center text-lg-start">Account</h5>
              <ul className="nav flex-column align-items-center align-items-lg-start">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    My Account
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Wishlist
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Shop
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-3 col-lg-2 mb-3">
              <h5 className="mb-4 text-center text-lg-start">Quick Links</h5>
              <ul className="nav flex-column align-items-center align-items-lg-start">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Privacy Policy
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Terms of Use
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-3 col-lg-2 mb-3">
              <ul className="nav flex-row flex-lg-column justify-content-between">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    <i class="fa-brands fa-square-facebook h3"></i>
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    <i class="fa-brands fa-square-x-twitter h3"></i>
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    <i class="fa-brands fa-square-instagram h3"></i>
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    <i class="fa-brands fa-linkedin h3"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-center py-4 my-4 border-top">
            <p>© Copyright Ejar 2025. All right reserved</p>
          </div>
        </footer>
      </div>
    </>
  );
}
