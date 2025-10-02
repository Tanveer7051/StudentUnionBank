import React, { useEffect, useState,useContext } from "react";

import { Link } from "react-router-dom";
import './Navbar.css';
import { AuthContext } from "../context/AuthContext";
import Flash from "../Flash/Flash";

function NavBar() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const[flash,setFlash]=useState({ type: '', message: '' });
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8080/check-auth', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (err) {
        console.error('Auth check failed:', err);
        setFlash({type: "error", message: "Authentication check failed. Please try again."});
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    setFlash({type:"",message:""});
    try {
      const res = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      // alert(data.message);
      setFlash({type:"success", message: data.message || "Logout Successfully!."})
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <>
     {flash.message && <Flash type={flash.type} message={flash.message} />}
    <nav className="navbar navbar-expand-sm sticky-top bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><img style={{width:"10rem" , borderRadius:"1rem"}} src="logo.png" alt="logo" /></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item btn Navbar border-0">
              <Link className="nav-link active" to="/feature">Features</Link>
            </li>

            <li className="nav-item btn Navbar border-0">
              <Link className="nav-link active" to="/aboutUs">About Us</Link>
            </li>

            <li className="nav-item btn Navbar border-0">
              <Link className="nav-link active" to="/contact&support">Contact Support</Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item btn Navbar border-0">
                <Link className="nav-link active" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            )}

            {!isAuthenticated ? (
              <>
                <li className="nav-item btn Navbar">
                  <Link className="nav-link active" to="/login">Login</Link>
                </li>

                <li className="nav-item btn Navbar">
                  <Link className="nav-link active" to="/signup">Sign Up</Link>
                </li>
              </>
            ) : (
              <li className="nav-item btn Navbar">
                <Link
                  onClick={handleLogout}
                  className="btn btn-link nav-link active"
                  to="/login"
                  style={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                  Logout
                </Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
    </>
  );
}

export default NavBar;
