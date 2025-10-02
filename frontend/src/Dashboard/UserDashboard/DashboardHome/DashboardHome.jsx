import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Flash from "../../../Flash/Flash";

function DashboardHome() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [flash, setFlash] = useState({ type: "", message: "" });
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        setFlash({ type: "success", message: data.message || "Logged out successfully." });
        setIsAuthenticated(false);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setFlash({ type: "error", message: data.message || "Logout failed." });
      }
    } catch (err) {
      console.error('Logout failed:', err);
      setFlash({ type: "error", message: "Network error during logout." });
    }
  };

  const handleSelection = (index) => {
    setSelectedMenu(index);
  };

  return (
    <>
      {flash.message && <Flash type={flash.type} message={flash.message} />}

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand" to="/">
            Student Union Bank
          </Link>

          {/* Toggle button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedMenu === 0 ? "active fw-bold text-primary" : ""}`}
                  to="/dashboard/support"
                  onClick={() => handleSelection(0)}
                >
                  Support
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedMenu === 1 ? "active fw-bold text-primary" : ""}`}
                  to="/dashboard/transfer"
                  onClick={() => handleSelection(1)}
                >
                  Transfer
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedMenu === 2 ? "active fw-bold text-primary" : ""}`}
                  to="/dashboard/loan"
                  onClick={() => handleSelection(2)}
                >
                  Loans
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedMenu === 3 ? "active fw-bold text-primary" : ""}`}
                  to="/dashboard/history"
                  onClick={() => handleSelection(3)}
                >
                  Transaction History
                </Link>
              </li>

              {/* Profile dropdown */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="/dashboard/profile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                      type="button"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/accountdeletion">
                      Account Deletion
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default DashboardHome;
