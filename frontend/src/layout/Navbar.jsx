 import React from "react";
import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (

    <nav className="navbar navbar-expand-lg navbar-modern px-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/addImg">
           Login System
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <NavLink
                to="/blog"
                className="nav-link"
              >
                Add Blog
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/addImg"
                className="nav-link"
              >
                Add Image
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                to="/changePass"
                className="nav-link"
              >
                Change Password
              </NavLink>
            </li>

            

            <li className="nav-item">
              <NavLink
                to="/forgotPass"
                className="nav-link"
              >
                Forgot Password
              </NavLink>
            </li>



            <li className="nav-item">
              <NavLink
                to="/signup"
                className="nav-link"
              >
                Signup
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/login"
                className="nav-link"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;