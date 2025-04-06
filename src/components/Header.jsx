import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="header_section">
        <div className="menu-btn d-flex align-items-center">
          <i className="bx bx-menu-alt-left"></i>
        </div>
        <div className="right-menu-btn d-flex align-items-center gap-4">
        <Link to="/cart" className="text-decoration-none">
          <div className="cart-btn d-flex align-items-center">
            <div className="cart-count">0</div>
            <i className="bx bx-cart-alt"></i>
          </div>
        </Link>
          <Link to="/profile" className="text-decoration-none">
            <div className="profile-btn d-flex align-items-center">
              <i className="bx bxs-user-circle"></i>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
