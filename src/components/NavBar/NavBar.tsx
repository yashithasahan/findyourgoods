import React from "react";
import { ShoppingCart, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import CartIcon from "../Cart/CartIcon";

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          FindYourGoods
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/cart" className="btn btn-ghost btn-circle">
          <CartIcon />
        </Link>
        <Link to="/login" className="btn btn-ghost btn-circle">
          <User />
        </Link>
      </div>
    </div>
  );
};

export default Header;
