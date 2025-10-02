import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./Button.css";
import Flash from "../../Flash/Flash.jsx";

function SignUp() {
  const [flash, setFlash] = useState({ type: '', message: '' });
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      if (isAuthenticated) {
        setFlash({ type: "error", message: "You are already logged in. Please log out to create a new account." });
        setTimeout(() => navigate("/"), 1500);
        ;
      }
      isInitialMount.current = false;
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    state: "",
    email: "",
    phone: "",
    address: "",
    idProof: "",
    username: "",
    password: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.idProof.trim()) newErrors.idProof = "ID Proof is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = "You must accept the terms and privacy policy";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (formData.address.trim().length < 15) {
      newErrors.address = "Address must be at least 15 characters long";
    } else if (formData.address.trim().length > 100) {
      newErrors.address = "Address can't exceed 100 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSigningUp(true);
      try {
        const response = await fetch("http://localhost:8080/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("New User Added", data);
          setFlash({ type: "success", message: data.message || "Successful Registration" })
          setIsAuthenticated(true);
          setIsSigningUp(false); // End signup process
          setTimeout(() => {
            setFlash({ type: "", message: "" }); 
            navigate("/");
          }, 1500);

        } else {
          setFlash({ type: "", message: "" })
          const errorData = await response.json();
          console.error("Registration error:", errorData);
          setFlash({ type: "error", message: errorData.message || "Registration failed:" })
          setIsSigningUp(false); // End signup process
        }
      } catch (error) {
        console.error("Network error:", error);
        setFlash({ type: "error", message: "Network error: Unable to connect to the server." })
        setIsSigningUp(false); // End signup process
      }
    }
  };

  return (
    <>
      {flash.message && <Flash type={flash.type} message={flash.message} />}
      <div className="container my-5 p-4 shadow rounded-4 bg-light">
        <div className="text-center mb-4">
          <h2 className="mt-3">Open a New Account</h2>
          <p className="text-muted">Complete the form to create your account</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-lg-4">
              <label className="form-label">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                className={`form-control rounded-pill ${errors.firstName ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.firstName}</div>
            </div>
            <div className="col-lg-4">
              <label className="form-label">Middle Name</label>
              <input
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                type="text"
                className="form-control rounded-pill"
              />
            </div>
            <div className="col-lg-4">
              <label className="form-label">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                className={`form-control rounded-pill ${errors.lastName ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.lastName}</div>
            </div>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-md-4">
              <label className="form-label">Date of Birth</label>
              <input
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                type="date"
                className={`form-control rounded-pill ${errors.dob ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.dob}</div>
            </div>
            <div className="col-md-4">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`form-select rounded-pill ${errors.gender ? "is-invalid" : ""}`}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <div className="invalid-feedback">{errors.gender}</div>
            </div>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`form-select rounded-pill ${errors.state ? "is-invalid" : ""}`}
              >
                <option value="">Select State</option>
                <option>J&K</option>
                <option>Punjab</option>
                <option>Haryana</option>
              </select>
              <div className="invalid-feedback">{errors.state}</div>
            </div>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className={`form-control rounded-pill ${errors.email ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                className={`form-control rounded-pill ${errors.phone ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.phone}</div>
            </div>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                className={`form-control rounded-pill ${errors.username ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.username}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                className={`form-control rounded-pill ${errors.password ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>
          </div>

          <div className="mt-4">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className={`form-control rounded-3 ${errors.address ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.address}</div>
          </div>

          <div className="mt-4">
            <label className="form-label">ID Proof Number</label>
            <input
              name="idProof"
              value={formData.idProof}
              onChange={handleChange}
              type="text"
              className={`form-control rounded-pill ${errors.idProof ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.idProof}</div>
          </div>

          <div className="form-check mt-4">
            <input
              className={`form-check-input ${errors.acceptedTerms ? "is-invalid" : ""}`}
              type="checkbox"
              id="check1"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="check1">
              I agree with{" "}
              <Link style={{ textDecoration: "none" }} to="/privacypolicy">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link style={{ textDecoration: "none" }} to="/terms&condition">
                Terms and Conditions
              </Link>
            </label>
            <div className="invalid-feedback">{errors.acceptedTerms}</div>
          </div>

          <div className="text-center mt-5">
            <button
              type="submit"
              className="btn btn-primary rounded-pill px-5"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="mt-2">
              Already have an account? <Link to="/login">Login</Link>
            </p>

          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;